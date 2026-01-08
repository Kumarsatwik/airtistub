import { db } from "@/config/db";
import { and, eq } from "drizzle-orm";
import { API_CALL } from "@/config/openrouter";
import { screenConfigTable, projectTable } from "@/config/schema";
import { GENERATION_SYSTEM_PROMPT } from "@/lib/prompt";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Simple in-memory rate limiter (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per window
const WINDOW_MS = 60 * 1000; // 1 minute

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(identifier);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + WINDOW_MS });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT) {
    return false;
  }

  userLimit.count++;
  return true;
}

const requestSchema = z.object({
  projectId: z.string().min(1, "projectId is required"),
  screenId: z.string().min(1, "screenId is required"),
  screenName: z
    .string()
    .min(1, "screenName is required")
    .max(100, "screenName too long"),
  purpose: z
    .string()
    .min(1, "purpose is required")
    .max(500, "purpose too long"),
  projectVisualDescription: z
    .string()
    .min(1, "projectVisualDescription is required"),
  screenDescription: z.string().min(1, "screenDescription is required"),
});

export async function POST(req: NextRequest) {
  // Authenticate user
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = user.emailAddresses?.[0]?.emailAddress;
  if (!userId) {
    return NextResponse.json(
      { error: "User email not found" },
      { status: 400 }
    );
  }

  // Rate limiting
  if (!checkRateLimit(userId)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please try again later." },
      { status: 429 }
    );
  }

  // Parse and validate request body
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

  const {
    projectId,
    screenId,
    screenName,
    purpose,
    projectVisualDescription,
    screenDescription,
  } = bodyResult.data;

  // Check project ownership
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
    return NextResponse.json(
      { error: "Project not found or access denied" },
      { status: 403 }
    );
  }

  const userInput = `
    Screen Name: ${screenName}
    Purpose: ${purpose}
    Screen Description: ${screenDescription}
    Project Visual Description: ${projectVisualDescription}
  `;

  let code: string;
  try {
    const result = await API_CALL(
      GENERATION_SYSTEM_PROMPT,
      userInput,
      "mistralai/devstral-2512:free",
      "openrouter"
    );

    if (typeof result !== "string") {
      return NextResponse.json(
        { error: "Invalid response type from API" },
        { status: 502 }
      );
    }

    code = result;
  } catch (error) {
    console.error("API_CALL error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate code",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }

  try {
    const result = await db
      .update(screenConfigTable)
      .set({
        code,
      })
      .where(
        and(
          eq(screenConfigTable.projectId, projectId),
          eq(screenConfigTable.screenId, screenId)
        )
      );

    // Check if any rows were affected
    if (!result || result.rowCount === 0) {
      return NextResponse.json(
        { error: "Screen configuration not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(code);
  } catch (error) {
    console.error("Database update error:", error);
    return NextResponse.json(
      {
        error: "Failed to save code",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
