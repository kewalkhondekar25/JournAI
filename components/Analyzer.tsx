"use client"

import React from 'react'
import JournalEditor from './JournalEditor'
import { useAppSelector } from '@/redux/hooks'
import Streamer from './Streamer'

const Analyzer = () => {
  const { isGenerateAnalyzeClick } = useAppSelector(state => state.motion);

  return (
    <div>
      {
        isGenerateAnalyzeClick ?
          <div className='grid grid-cols-2'>
            <Streamer />
            <div className='flex flex-col justify-center items-center p-3 text-center'>
              <div className='flex flex-col font-medium'>
                <span>Today</span>
                <span className='text-xs'>{new Date().toDateString()}</span>
              </div>
              <JournalEditor />
            </div>
          </div> :
          <div className='flex flex-col justify-center items-center p-3 text-center'>
            <div className='flex flex-col font-medium'>
              <span>Today</span>
              <span className='text-xs'>{new Date().toDateString()}</span>
            </div>
            <JournalEditor />
          </div>
      }
    </div>
  )
}

export default Analyzer