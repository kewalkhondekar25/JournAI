"use client"

import React from 'react';
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

const JournalCard = () => {
  
  const router = useRouter();
  const handleClick = () => {
    router.push("/new-journal")
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='grid grid-cols-4 p-5 gap-5'>
        {Array.from({ length: 10 }, (_, i) => {
          return (
            <Card key={i}>
              <CardHeader>
                <CardTitle>10 feb 2025</CardTitle>
                <CardDescription>Journal Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Today I woke up at 5 am</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          )
        })}
      </div>
        <Button onClick={handleClick}>New</Button>
    </div>
  )
}

export default JournalCard;