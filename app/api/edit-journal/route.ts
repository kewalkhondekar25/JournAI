import { getUserClerkId } from "@/utils/api";
import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {
  try {
    const body = await req.json();

    const clerkId = await getUserClerkId();
    const userId = await prisma.user.findUnique({
      where: { clerkId },
      select: { id : true }
    });
    if(!userId){
      return NextResponse.json({ message: "User Id not found"}, { status: 404 });
    };

    const updatedJournal = await prisma.journal.update({
      where: { id: body.id},
      data: {
        paragraph: body.content
      },
      select: {
        id: true,
        title: true,
        paragraph: true,
        createdAt: true,
        updatedAt: true
      }
    })
    return NextResponse.json({
      message: "Journal updated successfully",
      data: updatedJournal
    }, { status: 201 });
  } catch (error) {
    console.log(error);
  }
};
