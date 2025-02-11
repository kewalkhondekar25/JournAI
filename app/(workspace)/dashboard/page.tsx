import { EmotionBreakdownChart } from '@/components/EmotionBreakdownChart';
import { JournalingStreakChart } from '@/components/JournalingStreakChart';
import { KeywordTrendsChart } from '@/components/KeywordTrendsChart';
import LineChartComponent from '@/components/LineChart';
import { getUserId } from '@/utils/query'
import React from 'react'

const page = async () => {
  const userId = await getUserId<{id: string}>();
  return (
    <div className='flex'>
      <LineChartComponent/>
      <JournalingStreakChart/>
      <EmotionBreakdownChart/>
      <KeywordTrendsChart/>
    </div>
  )
}

export default page