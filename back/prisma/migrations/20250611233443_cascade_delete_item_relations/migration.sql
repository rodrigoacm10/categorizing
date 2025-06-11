-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ItemCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "itemId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "ItemCategory_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ItemCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ItemCategory" ("categoryId", "id", "itemId") SELECT "categoryId", "id", "itemId" FROM "ItemCategory";
DROP TABLE "ItemCategory";
ALTER TABLE "new_ItemCategory" RENAME TO "ItemCategory";
CREATE TABLE "new_ItemOption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "itemId" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,
    CONSTRAINT "ItemOption_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ItemOption_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ItemOption" ("id", "itemId", "optionId") SELECT "id", "itemId", "optionId" FROM "ItemOption";
DROP TABLE "ItemOption";
ALTER TABLE "new_ItemOption" RENAME TO "ItemOption";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
