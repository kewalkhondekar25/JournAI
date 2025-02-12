import { NextResponse } from "next/server";
import { startOfDay, endOfDay } from "date-fns";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/utils/db";

export async function GET() {
  try {
    const userId = await currentUser();
    if (!userId || !userId.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    const newJournal = await prisma.journal.findMany({
      where: { 
        user: { clerkId: userId.id }, 
        createdAt: { gte: todayStart, lt: todayEnd } 
      },
      select: { 
        id: true,
        title: true,
        paragraph: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if(newJournal.length === 0){
      return NextResponse.json({ message: "Today's journal yet to set", data: null }, { status: 200 });
    };

    return NextResponse.json({ 
      message: "Today's Journal fetched successfully",
      data: newJournal[0]
    }, { status: 200});
  } catch (error) {
    console.error("Error fetching today's journal:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
