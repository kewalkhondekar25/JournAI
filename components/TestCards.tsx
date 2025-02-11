"use client"

import React from 'react'
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


const TestCards = () => {

  const router = useRouter();
  const handleClick = () => {
    router.push("/journals");
  }

  const journals = [
    {
      id: 1,
      date: "Today",
      title: "Morning Reflections🌻",
      text: "Started the day with a fresh cup of coffee and some deep thoughts.",
      createdAt: "now",
    },
    {
      id: 2,
      date: "Yesterday",
      title: "Productive Workday🔗",
      text: "Made great progress on my project. Feeling accomplished!",
      createdAt: "yesterday",
    },
    {
      id: 3,
      date: "Yesterday",
      title: "Productive Workday🔗",
      text: "Made great progress on my project. Feeling accomplished!",
      createdAt: "yesterday",
    }
  ];

  return (
    <div className='grid grid-cols-2 gap-2 p-1'>
      {
        journals.map(item => {
          return (
            <Card key={item.id} className='w-full shadow-md hover:cursor-pointer'>
              <CardHeader>
                <CardTitle>{item.date}</CardTitle>
                <CardDescription>{item.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{item.text}</p>
              </CardContent>
              <CardFooter>
                <p>{item.createdAt}</p>
              </CardFooter>
            </Card>
          )
        })
      }
      <div className='flex justify-center items-center'>
        <Button onClick={handleClick}>View All</Button>
      </div>
    </div>
  )
}

export default TestCards