import { currentUser } from "@clerk/nextjs/server"
import prisma from "./db";

const getUserClerkId = async () => {

  const userClerkId = await currentUser();
  if(!userClerkId){
    throw new Error("No Clerk Id found");
  };

  return userClerkId.id;
};

const getJournal = async (id: string) => {
  
  return await prisma.journal.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      paragraph: true,
      createdAt: true,
      updatedAt: true
    }
  })
}

export {
  getUserClerkId,
  getJournal
};