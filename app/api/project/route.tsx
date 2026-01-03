import { db } from "@/config/db";
import { projectTable, usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createProjectSchema = z.object({
  projectId: z.string(),
  userInput: z.string().min(1),
  deviceType: z.enum(["mobile", "web"]),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = createProjectSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: "Invalid request body", details: validation.error.issues },
      { status: 400 }
    );
  }
  const { userInput, deviceType, projectId } = validation.data;

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

  try {
    const result = await db
      .insert(projectTable)
      .values({
        projectId,
        userInput,
        deviceType,
        userId,
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

export async function GET(req: NextRequest) {
  try {
    const projectId = await req.nextUrl.searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
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

    const result = await db
      .select()
      .from(projectTable)
      .where(
        and(
          eq(projectTable.projectId, projectId),
          eq(projectTable.userId, userId)
        )
      );

    if (!result[0]) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ result: result[0] });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
