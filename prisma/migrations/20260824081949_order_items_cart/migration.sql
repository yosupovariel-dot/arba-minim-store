/*
  Warnings:

  - You are about to drop the column `priceSnapshot` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `setId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `setNameSnapshot` on the `Order` table. All the data in the column will be lost.
  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "setId" TEXT NOT NULL,
    "setNameSnapshot" TEXT NOT NULL,
    "etrogTypeSnapshot" TEXT NOT NULL,
    "unitPrice" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_setId_fkey" FOREIGN KEY ("setId") REFERENCES "ProductSet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderNumber" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "depositAmount" INTEGER NOT NULL,
    "customerName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "neighborhood" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "notes" TEXT,
    "depositMarkedPaid" BOOLEAN NOT NULL DEFAULT false,
    "depositMarkedAt" DATETIME,
    "depositConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "depositConfirmedAt" DATETIME,
    "termsAccepted" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "adminNotes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Order" ("address", "adminNotes", "createdAt", "customerName", "depositAmount", "depositConfirmed", "depositConfirmedAt", "depositMarkedAt", "depositMarkedPaid", "email", "id", "neighborhood", "notes", "orderNumber", "phone", "status", "termsAccepted", "updatedAt") SELECT "address", "adminNotes", "createdAt", "customerName", "depositAmount", "depositConfirmed", "depositConfirmedAt", "depositMarkedAt", "depositMarkedPaid", "email", "id", "neighborhood", "notes", "orderNumber", "phone", "status", "termsAccepted", "updatedAt" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
