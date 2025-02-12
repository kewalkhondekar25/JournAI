import JournalEditor from '@/components/JournalEditor'
import React from 'react'

const page = () => {
  return (
    <div className='grid grid-cols-2'>
      <div>composer</div>
      <JournalEditor/>
    </div>
  )
}

export default page