export const dynamic = 'force-dynamic'

import { EmotionBreakdownChart } from '@/components/EmotionBreakdownChart';
import { JournalingStreakChart } from '@/components/JournalingStreakChart';
import { KeywordTrendsChart } from '@/components/KeywordTrendsChart';
import LineChartComponent from '@/components/LineChart';
import { PlaceholdersAndVanishInputComponent } from '@/components/PlaceholdersAndVanishInput';
import TestCards from '@/components/TestCards';
import React from 'react'

const page = () => {
  return (
    <div className='grid grid-cols-4'>
      <div className='flex flex-col gap-2 p-2'>
        <p className='text-xs text-gray-500 font-bold p-1'>Mood, Sentiment and Emotion Analysis</p>
        <LineChartComponent/>
        <EmotionBreakdownChart/>
      </div>
      <div className='flex flex-col gap-2 p-2'>
      <p className='text-xs text-gray-500 font-bold p-1'>Streaks and Mentions</p>
        <JournalingStreakChart/>
        <KeywordTrendsChart/>
      </div>
      <div className='col-span-2 flex flex-col gap-2 p-2'>
        <p className='text-xs text-gray-500 font-bold p-1'>My Journals</p>
        <div>
          <TestCards/>
        </div>
        <div className='border rounded-md border-black/10 shadow-md h-full'>
          <PlaceholdersAndVanishInputComponent/>
        </div>
      </div>
    </div>
  )
}

export default page