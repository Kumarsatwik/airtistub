import { db } from "@/config/db";
import { projectTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userInput, deviceType, projectId } = await req.json();
  const user = await currentUser();

  try {
    const result = await db
      .insert(projectTable)
      .values({
        projectId,
        userInput,
        deviceType,
        userId: user?.emailAddresses[0].emailAddress as string,
      })
      .returning();
    return NextResponse.json({ result: result[0] });
  } catch (error) {
    console.error("Error inserting project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
