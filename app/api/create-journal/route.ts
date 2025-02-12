import { getUserClerkId } from "@/utils/api";
import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
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

    const newJournal = await prisma.journal.create({
      data: {
        title: "this is a title",
        paragraph: body.value,
        userId: userId.id
      }
    });
    return NextResponse.json({
      message: "Journal created successfully",
      data: newJournal
    }, { status: 201 });
  } catch (error) {
    console.log(error);
  }
};
