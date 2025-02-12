"use client"

import prisma from "./db";
import { startOfDay, endOfDay } from "date-fns"
import { useUser } from "@clerk/nextjs";

export const TodaysJournal = async () => {
  
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());

  const { user } = useUser();
  
  const newJournal = await prisma.journal.findMany({
    where: { 
      user: { clerkId: user?.id },
      createdAt: { gte: todayStart, lt: todayEnd }
    },
    select: {
      id: true,
    }
  });

  if(!newJournal){
    return null;
  }

  return newJournal[0].id;
}