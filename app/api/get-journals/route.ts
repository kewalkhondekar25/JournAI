import prisma from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"

export const GET = async () => {
  try {
    const userId = await currentUser();
    if(!userId){
      throw new Error("User Id not found");
    }
    
    const journals = await prisma.user.findUnique({
      where: { clerkId: userId.id },
      select: {
        Journal: {
          select: {
            id: true,
            title: true,
            paragraph: true,
            createdAt: true,
            updatedAt: true
          },
          orderBy: { createdAt: "desc" },
        }
      }
    });
    
    if(!journals){
      return NextResponse.json({ message: "User not found"}, { status: 404 });
    };

    if(!journals.Journal.length){
      return NextResponse.json({ message: "No journal entries found"}, { status: 200 });
    };

    return NextResponse.json({ 
      message: "Journals retrieved successfully",
      data: journals.Journal }, { status: 200 });
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