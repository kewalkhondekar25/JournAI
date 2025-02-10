import { getUserId } from '@/utils/query'
import React from 'react'

const page = async () => {
  const userId = await getUserId<{id: string}>();
  return (
    <div>dashboard page {userId?.id}</div>
  )
}

export default page