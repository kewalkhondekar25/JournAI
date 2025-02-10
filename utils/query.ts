import { currentUser } from "@clerk/nextjs/server"
import prisma from "./db";
import { Prisma } from "@prisma/client";

const getUserId = async <T>(options?: Prisma.UserFindUniqueArgs): Promise<T | null> => {
  try {
    const user = await currentUser();
    if(!user){
      throw new Error("Unauthorized: No Clerk user found");
    };

    const userId = await prisma.user.findUnique({
      where: { clerkId: user?.id},
      select: { id: true }
    });

    if(!userId){
      throw new Error("User not found");
    };

    return userId as T;
  } catch (error) {
    console.log(error);
    return null
  }
};

const getJournalData = async<T>({id}: {id: string}): Promise<T | null> => {
  try {
    const user = await currentUser();
    if(!user){
      throw new Error("Unauthorized: No Clerk user found");
    };

    const data = await prisma.journal.findMany({
      where: { userId: id }
    });
    console.log(data);
    

    if(!data){
      throw new Error("No Journal data found");
    };

    return data as T;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export {
  getUserId,
  getJournalData
};