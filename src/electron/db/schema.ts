import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const items = sqliteTable("items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  type: text("type").notNull(),
  company: text("company").notNull(),
  total: integer("total").notNull(),
  remaining: integer("remaining").notNull(),
  sold: integer("sold").notNull(),
});
