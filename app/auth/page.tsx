import prisma from '@/utils/db';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

const createUser = async () => {
  
  const user = await currentUser();
  console.log("ran");
  
  
  const match = await prisma.user.findUnique({
    where: { clerkId: user?.id as string}
  });

  if(!match){
    await prisma.user.create({
      data: {
        clerkId: user?.id as string,
        name: user?.fullName as string,
        email: user?.emailAddresses[0].emailAddress as string
      }
    })
  }

  return redirect("/dashboard")
}

const page = async () => {

  await createUser();

  return (
    <div>Loading...</div>
  )
}

export default page;