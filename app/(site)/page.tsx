import TitleSection from '@/components/landing-page/title-section'
import React from 'react'

const Homepage = () => {
  return (
    <section>
      <div className='overflow-hidden 
      px-4
      sm:px-6
      mt-10
      sm:flex
      sm:flex-col
      gap-4
      md:justify-center
      md:items-center'>
        <TitleSection 
        pill='✨ Your AI Journal, Perfected' 
        title='Your AI-Powered Journaling Companion'
        subtitle='Reflect. Write. Evolve'
        />
      </div>
    </section>
  )
}

export default Homepage