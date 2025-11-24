import path from "path";
import fs from "fs";
import { fileURLToPath } from "url"; // <--- import this
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema.js";
import { loadDatabase } from "./loadDatabase.js";

// Recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database setup
// const dbPath = path.join(process.cwd(), "app.sqlite");
const sqlite = loadDatabase()
export const db = drizzle(sqlite, { schema });

// --- Run migrations automatically ---
export function runMigrations() {
  const migrationsDir = path.join(__dirname, "migrations"); // now works
  const files = fs.readdirSync(migrationsDir);
  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
    sqlite.exec(sql);
    console.log("Applied migration:", file);
  }
}
