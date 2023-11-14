/*
  Warnings:

  - Made the column `auth_token` on table `linked_device` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `linked_device` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_linked_device" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "auth_token" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "device_name" TEXT NOT NULL,
    "browser_name" TEXT NOT NULL,
    "full_browser_version" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_linked_device" ("auth_token", "browser_name", "code", "created_at", "device_name", "full_browser_version", "id", "updated_at", "user_id") SELECT "auth_token", "browser_name", "code", "created_at", "device_name", "full_browser_version", "id", "updated_at", "user_id" FROM "linked_device";
DROP TABLE "linked_device";
ALTER TABLE "new_linked_device" RENAME TO "linked_device";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
