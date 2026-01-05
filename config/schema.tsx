import {
  date,
  integer,
  json,
  pgTable,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer().default(5),
});

export const projectTable = pgTable("project", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  projectId: varchar({ length: 255 }).notNull().unique(),
  projectName: varchar(),
  theme: varchar(),
  userInput: varchar().notNull(),
  deviceType: varchar({ length: 255 }).notNull(),
  projectVisualDescription: varchar(),
  createdOn: date().defaultNow(),
  config: json(),
  userId: varchar({ length: 255 })
    .references(() => usersTable.email)
    .notNull(),
});

export const screenConfigTable = pgTable("screenConfig", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  projectId: varchar()
    .references(() => projectTable.projectId)
    .notNull(),
  screenId: varchar().notNull(),
  screenName: varchar(),
  purpose: varchar(),
  screenDescription: varchar(),
  code: text(),
});
