import React from 'react'

const HomePagelayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  )
}

export default HomePagelayout