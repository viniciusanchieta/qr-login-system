-- CreateTable
CREATE TABLE "linked_device" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "auth_token" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name_device" TEXT NOT NULL,
    "name_browser" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "linked_device_auth_token_code_key" ON "linked_device"("auth_token", "code");
