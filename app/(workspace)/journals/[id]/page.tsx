import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getJournal } from '@/utils/api';
import { formatDistanceToNow, isToday } from 'date-fns';

const page = async ({ params }: { params: { id: string } }) => {

  const { id } = await params;

  const journalData = await getJournal(id);
  if (!journalData) {
    throw new Error("Journal does not exist");
  };

  const updateAt = new Date(`${journalData.updatedAt}`);
  const timeAgo = formatDistanceToNow(updateAt, { addSuffix: true });
  

  return (
    <div className="min-full w-full flex flex-col justify-center items-center">
      <div>
        <Card className='w-[250px] h-[300px] shadow-lg'>
          <CardHeader>
            <CardTitle>{isToday(new Date(`${journalData.createdAt}`)) ? "Today" : new Date(`${journalData.createdAt}`).toDateString()}</CardTitle>
            <CardDescription>{journalData.title}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{journalData.paragraph}</p>
          </CardContent>
          <CardFooter>
            <p>{timeAgo}</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default page