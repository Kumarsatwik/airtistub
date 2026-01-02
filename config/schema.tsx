import { date, integer, json, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer().default(5),
});

export const projectTable = pgTable("project", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  projectId: varchar({ length: 255 }).notNull().unique(),
  userInput: varchar().notNull(),
  deviceType: varchar({ length: 255 }).notNull(),
  createdOn: date().defaultNow(),
  config: json(),
  userId: integer()
    .references(() => usersTable.id)
    .notNull(),
});
