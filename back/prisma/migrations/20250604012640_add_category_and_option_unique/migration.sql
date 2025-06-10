/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,userId]` on the table `Option` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Category_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_userId_key" ON "Category"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Option_name_userId_key" ON "Option"("name", "userId");
