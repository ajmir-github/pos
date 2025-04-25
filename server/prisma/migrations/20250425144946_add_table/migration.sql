-- CreateTable
CREATE TABLE "_ItemToModifier" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ItemToModifier_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ItemToModifier_B_index" ON "_ItemToModifier"("B");

-- AddForeignKey
ALTER TABLE "_ItemToModifier" ADD CONSTRAINT "_ItemToModifier_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToModifier" ADD CONSTRAINT "_ItemToModifier_B_fkey" FOREIGN KEY ("B") REFERENCES "Modifier"("id") ON DELETE CASCADE ON UPDATE CASCADE;
