import prisma from "@/utils/db"
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { journalId, sentimentScore } = await req.json();
    
    if(!journalId || !sentimentScore){
      throw new Error("No JournalId or Sentiment score provided");
    };

    const score = await prisma.analysis.create({
      data: { 
        journal_id: journalId,
        sentiment_score: sentimentScore
      }
    });

    if(!score){
      throw new Error("Error in creating score.");
    };

    return NextResponse.json({
      message: "Sentiment score created",
      data: score
    },{ status: 201 });

  } catch (error) {
    console.error('Journal fetch error:', error);

    if(error instanceof Error){
      if (error.message.includes('Prisma')) {
        return NextResponse.json(
          {
            success: false,
            message: 'Database operation failed',
            code: 'DATABASE_ERROR'
          },
          { status: 500 }
        );
      }
    };

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
};

