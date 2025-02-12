import prisma from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
  try {
    const { journalId } = await req.json();
    const userId = await currentUser();
    if(!userId){
      throw new Error("User Id not found");
    };

    const journal = await prisma.journal.findUnique({
      where: { id: journalId},
      select: {
        id: true,
        title: true,
        paragraph: true,
        createdAt: true,
        updatedAt: true
      }
    })
    
    if(!journal){
      return NextResponse.json({ message: "Journal not found"}, { status: 404 });
    };

    return NextResponse.json({ 
      message: "Journals retrieved successfully",
      data: journal
    }, { status: 200 });
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