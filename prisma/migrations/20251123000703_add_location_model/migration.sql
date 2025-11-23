-- CreateTable
CREATE TABLE "Location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);

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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "locationId" INTEGER,
    CONSTRAINT "Equipment_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Equipment" ("brand", "createdAt", "description", "id", "model", "name", "serial", "state", "status") SELECT "brand", "createdAt", "description", "id", "model", "name", "serial", "state", "status" FROM "Equipment";
DROP TABLE "Equipment";
ALTER TABLE "new_Equipment" RENAME TO "Equipment";
CREATE UNIQUE INDEX "Equipment_serial_key" ON "Equipment"("serial");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
