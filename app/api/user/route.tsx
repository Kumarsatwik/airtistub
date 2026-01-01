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

  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (users?.length === 0) {
    const data = {
      name: user?.fullName ?? "",
      email,
    };
    const result = await db
      .insert(usersTable)
      .values({
        ...data,
      })
      .returning();
    return NextResponse.json(result[0] ?? {});
  }
  return NextResponse.json(users[0] ?? {});
}
