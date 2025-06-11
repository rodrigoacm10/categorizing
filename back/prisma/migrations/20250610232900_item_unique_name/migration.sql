/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Item_name_userId_key" ON "Item"("name", "userId");
