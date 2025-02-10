import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const JournalCard = () => {
  return (
    <div className='grid grid-cols-3 p-3 gap-3'>
      
      {Array.from({ length: 10 }, (_, i) => {
        return (
          <Card key={i}>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

export default JournalCard;