/**
 * API Route for generating app layout configurations using AI
 * Handles config generation, validation with retries, and database persistence
 */

import { openrouter } from "@/config/openrouter";
import { db } from "@/config/db";
import { projectTable, screenConfigTable } from "@/config/schema";
import { APP_LAYOUT_CONFIG_PROMPT } from "@/lib/prompt";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/**
 * Schema for validating incoming request body
 */
const requestSchema = z.object({
  userInput: z.string().min(1),
  deviceType: z.enum(["mobile", "website"]),
  projectId: z.string().min(1).optional(),
});

/**
 * Schema for validating AI-generated config JSON
 * Uses passthrough to allow additional properties beyond the core requirements
 */
const modelConfigSchema = z
  .object({
    projectName: z.string().min(1).optional(),
    theme: z.string().min(1).optional(),
    projectVisualDescription: z.string().min(1).optional(),
    screens: z
      .array(
        z.object({
          id: z.string().min(1),
          name: z.string().min(1),
          purpose: z.string().min(1),
          layoutDescription: z.string().min(1),
        })
      )
      .min(1),
  })

type ChatSendResult = {
  choices?: Array<{
    message?: {
      content?: unknown;
    };
  }>;
};

/**
 * Extracts the first valid JSON object from text, handling both fenced code blocks and raw JSON
 * @param text - Raw text response from AI model
 * @returns Extracted JSON string or null if no valid JSON found
 */
function extractFirstJsonObject(text: string): string | null {
  const trimmed = text.trim();

  // Try to extract from fenced code blocks first (```json or ```)
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenced?.[1]) {
    const inner = fenced[1].trim();
    if (inner.startsWith("{") && inner.endsWith("}")) return inner;
  }

  // Fallback: extract first JSON object by finding outermost braces
  const first = trimmed.indexOf("{");
  const last = trimmed.lastIndexOf("}");
  if (first === -1 || last === -1 || last <= first) return null;
  return trimmed.slice(first, last + 1);
}

function contentToText(content: unknown): string | null {
  if (typeof content === "string") return content;

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (!part || typeof part !== "object") return "";
        const maybe = part as { type?: unknown; text?: unknown };
        if (maybe.type !== "text") return "";
        return typeof maybe.text === "string" ? maybe.text : "";
      })
      .join("");
  }

  return null;
}

function withTimeout<T>(promise: Promise<T>, ms: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("Request timeout")), ms);
  });

  return Promise.race([promise, timeout]).finally(() => {
    if (timeoutId) clearTimeout(timeoutId);
  });
}

/**
 * POST handler for generating app layout configurations
 * Implements retry logic for AI validation failures and handles database persistence
 */
export async function POST(req: NextRequest) {
  // Validate API key configuration
  if (!process.env.OPENROUTER_API_KEY) {
    return NextResponse.json(
      { error: "OPENROUTER_API_KEY is not configured" },
      { status: 500 }
    );
  }

  // Authenticate user via Clerk
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Extract user ID from email
  const userId = user.emailAddresses?.[0]?.emailAddress;
  if (!userId) {
    return NextResponse.json(
      { error: "User email not found" },
      { status: 400 }
    );
  }

  let jsonBody: unknown;
  try {
    jsonBody = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const bodyResult = requestSchema.safeParse(jsonBody);
  if (!bodyResult.success) {
    return NextResponse.json(
      { error: "Invalid request body", issues: bodyResult.error.issues },
      { status: 400 }
    );
  }

  const { userInput, deviceType, projectId } = bodyResult.data;

  if (projectId) {
    const existingProject = await db
      .select({ projectId: projectTable.projectId })
      .from(projectTable)
      .where(
        and(
          eq(projectTable.projectId, projectId),
          eq(projectTable.userId, userId)
        )
      )
      .limit(1);

    if (!existingProject[0]) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
  }

  const maxAttempts = 3;
  const systemPrompt = APP_LAYOUT_CONFIG_PROMPT.replaceAll(
    "{deviceType}",
    deviceType
  );

  let validatedConfig: z.infer<typeof modelConfigSchema> | null = null;
  let lastError: string | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const currentUserInput =
      attempt === 1 || !lastError
        ? userInput
        : `The previous attempt generated invalid config JSON. Here are the validation errors: ${lastError}

Original request: ${userInput}

Please regenerate a valid config JSON that matches the required schema with proper structure, types, and required fields.`;

    let result: ChatSendResult;
    try {
      result = (await withTimeout(
        openrouter.chat.send({
          model: "openai/gpt-oss-20b:free",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: currentUserInput,
            },
          ],
        }),
        45000
      )) as ChatSendResult;

      if (!result?.choices?.[0]?.message) {
        throw new Error("Invalid response structure from AI model");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return NextResponse.json(
        { error: "AI model failed to generate config", details: errorMessage },
        { status: 502 }
      );
    }

    const text = contentToText(result.choices?.[0]?.message?.content);
    if (!text) {
      return NextResponse.json(
        { error: "No content returned from model" },
        { status: 502 }
      );
    }

    const jsonText = extractFirstJsonObject(text);
    if (!jsonText) {
      lastError = "No JSON object found in model output";
      continue;
    }

    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(jsonText);
    } catch {
      lastError = "Failed to parse JSON from model output";
      continue;
    }

    const validation = modelConfigSchema.safeParse(parsedJson);
    if (validation.success) {
      validatedConfig = validation.data;
      break;
    }

    lastError = JSON.stringify(validation.error.issues);
  }

  if (!validatedConfig) {
    return NextResponse.json(
      { error: "Generated config failed validation after retries" },
      { status: 502 }
    );
  }

  if (!projectId) {
    return NextResponse.json({ config: validatedConfig });
  }

  // Persist validated config to database
  try {
    // Replace existing screen configurations for this project
    // First delete all existing screens for the project
    await db
      .delete(screenConfigTable)
      .where(eq(screenConfigTable.projectId, projectId));

    // Then insert new screen configurations from AI-generated config
    const insertedScreenConfig = await db
      .insert(screenConfigTable)
      .values(
        validatedConfig.screens.map((screen) => ({
          projectId,
          screenId: screen.id,
          screenName: screen.name,
          purpose: screen.purpose,
          screenDescription: screen.layoutDescription,
        }))
      )
      .returning();

    // Separate table fields from config to avoid duplication
    const { projectName, theme, projectVisualDescription, screens } =
      validatedConfig;

    // Update project record with table fields and cleaned config
    const projectUpdate: Record<string, unknown> = {
      projectName,
      theme,
      projectVisualDescription,
      config: { screens }, // Only store screens in config, other fields in table columns
    };

    const updated = await db
      .update(projectTable)
      .set(projectUpdate)
      .where(
        and(
          eq(projectTable.projectId, projectId),
          eq(projectTable.userId, userId)
        )
      )
      .returning();

    // Reconstruct full config for response by merging table fields with screens
    const fullConfig = {
      projectName: updated[0]?.projectName,
      theme: updated[0]?.theme,
      projectVisualDescription: updated[0]?.projectVisualDescription,
      screens: insertedScreenConfig.map((screen) => ({
        id: screen.screenId,
        name: screen.screenName,
        purpose: screen.purpose,
        layoutDescription: screen.screenDescription,
      })),
    };

    // Return updated project details and screen configurations
    return NextResponse.json({
      projectDetail: { ...updated[0], config: fullConfig },
      screenConfig: insertedScreenConfig,
    });
  } catch (error) {
    console.error("Database persistence error:", error);
    return NextResponse.json(
      { error: "Failed to persist generated config" },
      { status: 500 }
    );
  }
}
