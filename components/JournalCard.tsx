"use client"

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatDistanceToNow, format, isToday } from 'date-fns';

interface Journal {
  id: string;
  title: string;
  paragraph: string;
  createdAt: string;
  updatedAt: string;
}

const JournalCard = () => {

  const [data, setData] = useState<Journal[]>([]);

  const router = useRouter();
  const handleClick = () => {
    router.push("/new-journal")
  };

  const fetchJournals = async () => {
    try {
      const result = await fetch("/api/get-journals");
      const response = await result.json();
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='grid grid-cols-4 p-5 gap-5'>
        {
          data && data.length > 0 ?
            data.map(item => {
              const updateAt = new Date(`${item.updatedAt}`);
              const timeAgo = formatDistanceToNow(updateAt, { addSuffix: true });
              return (
                <Link key={item.id} href={`/journals/${item.id}`}>
                  <Card className='w-[250px] h-[300px] shadow-lg'>
                    <CardHeader>
                      <CardTitle>{isToday(new Date(`${item.createdAt}`)) ? "Today" : new Date(`${item.createdAt}`).toDateString()}</CardTitle>
                      <CardDescription>{item.title}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{item.paragraph}</p>
                    </CardContent>
                    <CardFooter>
                      <p>{timeAgo}</p>
                    </CardFooter>
                  </Card>
                </Link>
              )
            }) : <p>Create New Journal</p>
        }
      </div>
      <Button onClick={handleClick}>Add New Journal</Button>
    </div>
  )
}

export default JournalCard;