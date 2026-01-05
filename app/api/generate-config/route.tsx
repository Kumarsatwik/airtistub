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
  .passthrough();

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

/**
 * Normalizes device type input for use in AI prompts
 * @param deviceType - Raw device type string
 * @returns Normalized device type ("mobile" or "website")
 */
function normalizeDeviceTypeForPrompt(deviceType: string) {
  const normalized = deviceType.trim().toLowerCase();
  if (normalized === "mobile") return "mobile";
  if (normalized === "website" || normalized === "web") return "website";
  return normalized;
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

  // Validate request body schema
  const bodyResult = requestSchema.safeParse(await req.json());
  if (!bodyResult.success) {
    return NextResponse.json(
      { error: "Invalid request body", issues: bodyResult.error.issues },
      { status: 400 }
    );
  }

  const { userInput, deviceType, projectId } = bodyResult.data;

  // If projectId provided, verify project exists and belongs to user
  let projectDetail:
    | (typeof projectTable.$inferSelect & { config?: unknown })
    | undefined;

  if (projectId) {
    const existingProject = await db
      .select()
      .from(projectTable)
      .where(
        and(
          eq(projectTable.projectId, projectId),
          eq(projectTable.userId, userId)
        )
      );

    if (!existingProject[0]) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    projectDetail = existingProject[0];
  }

  // Retry loop for AI config generation with validation
  // Allows up to 3 attempts: original + 2 retries with error feedback
  const maxAttempts = 3;
  let attempts = 0;
  let parsedConfig;
  let lastError: string | null = null;

  do {
    // Prepare user input - use original for first attempt, error feedback for retries
    let currentUserInput = userInput;
    if (attempts > 0 && lastError) {
      currentUserInput = `The previous attempt generated invalid config JSON. Here are the validation errors: ${lastError}

Original request: ${userInput}

Please regenerate a valid config JSON that matches the required schema with proper structure, types, and required fields.`;
    }

    // Call AI model to generate config
    let result;
    try {
      const normalizedDeviceType = normalizeDeviceTypeForPrompt(deviceType);
      result = await openrouter.chat.send({
        model: "openai/gpt-oss-20b:free",
        messages: [
          {
            role: "system",
            content: APP_LAYOUT_CONFIG_PROMPT.replaceAll(
              "{deviceType}",
              normalizedDeviceType
            ),
          },
          {
            role: "user",
            content: currentUserInput,
          },
        ],
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Failed to generate config" },
        { status: 502 }
      );
    }

    // Extract text content from AI response
    const content = result?.choices?.[0]?.message?.content;
    console.log("generate config", content);
    const text =
      typeof content === "string"
        ? content
        : Array.isArray(content)
        ? content
            .map((part) => {
              if (!part || typeof part !== "object") return "";
              const typedPart = part as { type?: unknown; text?: unknown };
              return typedPart.type === "text" &&
                typeof typedPart.text === "string"
                ? typedPart.text
                : "";
            })
            .join("")
        : null;

    if (!text) {
      return NextResponse.json(
        { error: "No content returned from model" },
        { status: 502 }
      );
    }

    // Extract JSON from AI response text
    const jsonText = extractFirstJsonObject(text);
    if (!jsonText) {
      if (attempts === maxAttempts - 1) {
        return NextResponse.json(
          { error: "Model returned invalid JSON after retries" },
          { status: 502 }
        );
      }
      attempts++;
      continue;
    }

    // Parse extracted JSON
    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(jsonText);
    } catch {
      if (attempts === maxAttempts - 1) {
        return NextResponse.json(
          { error: "Model returned invalid JSON after retries" },
          { status: 502 }
        );
      }
      attempts++;
      continue;
    }

    // Validate parsed JSON against schema
    parsedConfig = modelConfigSchema.safeParse(parsedJson);
    if (!parsedConfig.success) {
      lastError = JSON.stringify(parsedConfig.error.issues);
      attempts++;
    }
  } while (!parsedConfig?.success && attempts < maxAttempts);

  // If all retries failed, return error
  if (!parsedConfig?.success) {
    return NextResponse.json(
      { error: "Generated config failed validation after retries" },
      { status: 502 }
    );
  }

  // If no projectId, return config without persistence
  if (!projectId) {
    return NextResponse.json({ config: parsedConfig.data });
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
        parsedConfig.data.screens.map((screen) => ({
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
      parsedConfig.data;

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
