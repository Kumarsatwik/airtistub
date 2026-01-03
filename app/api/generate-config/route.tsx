import { openrouter } from "@/config/openrouter";
import { db } from "@/config/db";
import { projectTable, screenConfigTable } from "@/config/schema";
import { APP_LAYOUT_CONFIG_PROMPT } from "@/lib/prompt";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  userInput: z.string().min(1),
  deviceType: z.enum(["mobile", "website"]).or(z.string().min(1)),
  projectId: z.string().min(1).optional(),
});

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
      .min(1)
      .max(4),
  })
  .passthrough();

function extractFirstJsonObject(text: string): string | null {
  const trimmed = text.trim();

  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenced?.[1]) {
    const inner = fenced[1].trim();
    if (inner.startsWith("{") && inner.endsWith("}")) return inner;
  }

  const first = trimmed.indexOf("{");
  const last = trimmed.lastIndexOf("}");
  if (first === -1 || last === -1 || last <= first) return null;
  return trimmed.slice(first, last + 1);
}

function normalizeDeviceTypeForPrompt(deviceType: string) {
  const normalized = deviceType.trim().toLowerCase();
  if (normalized === "mobile") return "Mobile";
  if (normalized === "website" || normalized === "web") return "Website";
  return deviceType;
}

export async function POST(req: NextRequest) {
  if (!process.env.OPENROUTER_API_KEY) {
    return NextResponse.json(
      { error: "OPENROUTER_API_KEY is not configured" },
      { status: 500 }
    );
  }

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

  const bodyResult = requestSchema.safeParse(await req.json());

  if (!bodyResult.success) {
    return NextResponse.json(
      { error: "Invalid request body", issues: bodyResult.error.issues },
      { status: 400 }
    );
  }

  const { userInput, deviceType, projectId } = bodyResult.data;

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

  let result;
  try {
    result = await openrouter.chat.send({
      model: "mistralai/devstral-2512:free",
      messages: [
        {
          role: "system",
          content: APP_LAYOUT_CONFIG_PROMPT.replace(
            "{deviceType}",
            normalizeDeviceTypeForPrompt(deviceType)
          ),
        },
        {
          role: "user",
          content: userInput,
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

  const content = result?.choices?.[0]?.message?.content;
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

  const jsonText = extractFirstJsonObject(text);
  if (!jsonText) {
    return NextResponse.json(
      { error: "Model returned invalid JSON" },
      { status: 502 }
    );
  }

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(jsonText);
  } catch {
    return NextResponse.json(
      { error: "Model returned invalid JSON" },
      { status: 502 }
    );
  }

  const parsedConfig = modelConfigSchema.safeParse(parsedJson);
  if (!parsedConfig.success) {
    return NextResponse.json(
      { error: "Generated config failed validation" },
      { status: 502 }
    );
  }

  if (!projectId) {
    return NextResponse.json({ config: parsedConfig.data });
  }

  try {
    await db
      .delete(screenConfigTable)
      .where(eq(screenConfigTable.projectId, projectId));

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

    const projectUpdate: Record<string, unknown> = {
      config: parsedConfig.data,
    };
    if (parsedConfig.data.projectName)
      projectUpdate.projectName = parsedConfig.data.projectName;
    if (parsedConfig.data.theme) projectUpdate.theme = parsedConfig.data.theme;

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

    return NextResponse.json({
      projectDetail: updated[0] ?? projectDetail,
      screenConfig: insertedScreenConfig,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to persist generated config" },
      { status: 500 }
    );
  }
}
