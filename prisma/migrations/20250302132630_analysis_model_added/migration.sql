-- CreateTable
CREATE TABLE "Analysis" (
    "id" TEXT NOT NULL,
    "sentiment_score" TEXT,
    "journal_id" TEXT NOT NULL,

    CONSTRAINT "Analysis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Analysis_journal_id_key" ON "Analysis"("journal_id");

-- AddForeignKey
ALTER TABLE "Analysis" ADD CONSTRAINT "Analysis_journal_id_fkey" FOREIGN KEY ("journal_id") REFERENCES "Journal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
