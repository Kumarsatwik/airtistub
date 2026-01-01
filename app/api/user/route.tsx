import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rawEmail = user.primaryEmailAddress?.emailAddress;
  const email = typeof rawEmail === "string" ? rawEmail.trim() : "";

  if (!email) {
    return NextResponse.json(
      { error: "Email address is missing for current user" },
      { status: 422 }
    );
  }

  const name = user.fullName ?? "";

  try {
    const inserted = await db
      .insert(usersTable)
      .values({ name, email })
      .onConflictDoNothing({ target: usersTable.email })
      .returning();

    if (inserted[0]) {
      return NextResponse.json(inserted[0]);
    }

    const existing = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existing[0]) {
      return NextResponse.json(existing[0]);
    }

    return NextResponse.json(
      { error: "User record could not be created or loaded" },
      { status: 500 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create or load user" },
      { status: 500 }
    );
  }
}
