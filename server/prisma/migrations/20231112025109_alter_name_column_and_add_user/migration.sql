/*
  Warnings:

  - You are about to drop the column `name_browser` on the `linked_device` table. All the data in the column will be lost.
  - You are about to drop the column `name_device` on the `linked_device` table. All the data in the column will be lost.
  - Added the required column `browser_name` to the `linked_device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `device_name` to the `linked_device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `linked_device` table without a default value. This is not possible if the table is not empty.

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
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_linked_device" ("auth_token", "code", "created_at", "id", "updated_at") SELECT "auth_token", "code", "created_at", "id", "updated_at" FROM "linked_device";
DROP TABLE "linked_device";
ALTER TABLE "new_linked_device" RENAME TO "linked_device";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
