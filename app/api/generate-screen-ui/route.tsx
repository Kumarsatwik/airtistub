import { db } from "@/config/db";
import { and, eq } from "drizzle-orm";
import { API_CALL, openrouter } from "@/config/openrouter";
import { screenConfigTable } from "@/config/schema";
import { GENERATION_SYSTEM_PROMPT } from "@/lib/prompt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    projectId,
    screenId,
    screenName,
    purpose,
    projectVisualDescription,
    screenDescription,
  } = await req.json();
  const userInput = `
    Screen Name: ${screenName}
    Purpose: ${purpose}
    Screen Description: ${screenDescription}
    Project Visual Description: ${projectVisualDescription}
  `;
  //   const response = await openrouter.chat.send({
  //     model: "openai/gpt-oss-120b:free",
  //     messages: [
  //       {
  //         role: "system",
  //         content: [
  //           {
  //             type: "text",
  //             text: GENERATION_SYSTEM_PROMPT,
  //           },
  //         ],
  //       },
  //       {
  //         role: "user",
  //         content: [
  //           {
  //             type: "text",
  //             text: userInput,
  //           },
  //         ],
  //       },
  //     ],
  //     stream: false,
  //   });

  const code = await API_CALL(
    GENERATION_SYSTEM_PROMPT,
    userInput,
    "gpt-oss-120b",
    "cerebras"
  );

  if (!code) {
    return NextResponse.json(
      { error: "Failed to generate code" },
      { status: 500 }
    );
  }

  await db
    .update(screenConfigTable)
    .set({
      code: code as string,
    })
    .where(
      and(
        eq(screenConfigTable.projectId, projectId),
        eq(screenConfigTable.screenId, screenId)
      )
    );

  return NextResponse.json(code as string);
}
