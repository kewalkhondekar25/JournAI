"use client"

import React, { useEffect, useState } from 'react'
import JournalEditor from './JournalEditor'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import Streamer from './Streamer'
import { Button } from './ui/button'
import { setIsGenerateAnalyzeClick } from '@/redux/features/motionSlice'
import { analyzeJournal } from '@/utils/llm'
import { chunk } from 'lodash'

const Analyzer = () => {
  const { isGenerateAnalyzeClick } = useAppSelector(state => state.motion);

  return (
    <div>
      {
        isGenerateAnalyzeClick ?
          <div className='grid grid-cols-2 bg-pink-300'>
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