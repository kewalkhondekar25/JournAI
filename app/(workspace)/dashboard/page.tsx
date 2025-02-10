import LineChartComponent from '@/components/LineChart';
import { getUserId } from '@/utils/query'
import React from 'react'

const page = async () => {
  const userId = await getUserId<{id: string}>();
  return (
    <div>
      <LineChartComponent/>
    </div>
  )
}

export default page