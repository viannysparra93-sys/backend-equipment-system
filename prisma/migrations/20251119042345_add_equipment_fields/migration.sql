/*
  Warnings:

  - Added the required column `serial` to the `Equipment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Equipment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "serial" TEXT NOT NULL,
    "model" TEXT,
    "brand" TEXT,
    "description" TEXT,
    "state" TEXT NOT NULL DEFAULT 'OPERATIVO',
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Equipment" ("createdAt", "description", "id", "name", "status") SELECT "createdAt", "description", "id", "name", "status" FROM "Equipment";
DROP TABLE "Equipment";
ALTER TABLE "new_Equipment" RENAME TO "Equipment";
CREATE UNIQUE INDEX "Equipment_serial_key" ON "Equipment"("serial");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
