import path from "path";
import fs from "fs";
import { app } from "electron";
import Database from "better-sqlite3";

export function loadDatabase() {
  const isDev = !app.isPackaged;

  if (isDev) {
    // DB from root folder during development
    return new Database(path.join(process.cwd(), "app.sqlite"));
  }

  // DB packaged into build/resources/app.sqlite
  const packagedDbPath = path.join(process.resourcesPath, "app.sqlite");

  // Writable location in user data
  const userDbPath = path.join(app.getPath("userData"), "app.sqlite");

  // If first launch → copy the DB to a writable place
  if (!fs.existsSync(userDbPath)) {
    fs.copyFileSync(packagedDbPath, userDbPath);
  }

  return new Database(userDbPath);
}
