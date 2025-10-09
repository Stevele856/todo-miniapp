
import React from 'react'

function getDayGreeting() {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]

  const today = new Date()
  const date = today.getDay() 
  const getDayToday = days[date]

  return `Happy ${getDayToday} 🌞`
}

const Header = () => {
  const greeting = getDayGreeting()
  return (
    <div className='text-center space-y-4'>
      <h1 className='text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent'>
        THUY'S TODO
      </h1>

      <p className='text-muted-foreground text-xl font-light'>{greeting}</p>
    </div>
  )
}

export default Header