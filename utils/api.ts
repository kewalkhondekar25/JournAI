import { currentUser } from "@clerk/nextjs/server"

const getUserClerkId = async () => {

  const userClerkId = await currentUser();
  if(!userClerkId){
    throw new Error("No Clerk Id found");
  };

  return userClerkId.id;
};



export {
  getUserClerkId,
};