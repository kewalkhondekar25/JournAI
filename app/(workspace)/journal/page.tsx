export const dynamic = 'force-dynamic'

import JournalCard from '@/components/JournalCard';
import { getJournalData, getUserId } from '@/utils/query'
import { Journal } from '@prisma/client';
import React from 'react'

const fetchJournals = async () => {
  const userId = await getUserId<{id: string}>();
  if(!userId){
    throw new Error("User Id not found");
  };

  return await getJournalData<Journal[]>(userId);
}

const page = async () => {

  const data = await fetchJournals();
  
  return (
    <div>
      {
        data && data.length > 0 ? "non empty" : "empty"
      }
      <JournalCard/>
    </div>
  )
}

export default page