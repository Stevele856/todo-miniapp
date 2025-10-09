import React, { useState } from 'react'
import { Badge } from './ui/badge'
import { FilterTypes } from '@/lib/data'
import { Filter } from 'lucide-react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import clsx from 'clsx'


const StatsAndFilter = ({ completedTaskCount, activeTaskCount, pendingTaskCount, totalTasks, setFilter}) => {

  const [selectedOption, setSelectedOption] = useState('all')

  const handleSelectedOption = (option) => {
    setSelectedOption(option)
    setFilter(option)
  }
  
  return (
    <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>

      {/* Stats element */}
      <div className='flex gap-3'>
          <Badge
            variant='secondary'
            className="bg-violet-200 text-violet-600"
          >
            {totalTasks} {FilterTypes.all}
        </Badge>
        
          <Badge
            variant='secondary'
            className="bg-cyan-100 text-cyan-500"
          >
            {activeTaskCount} {FilterTypes.active}
          </Badge>

        <Badge
          variant='secondary'
          className="bg-yellow-100 text-yellow-600"
        >
          {pendingTaskCount} {FilterTypes.pending}
        </Badge>


        <Badge
          variant='secondary'
          className="bg-green-100 text-green-600"
        >
          {completedTaskCount} {FilterTypes.completed}
        </Badge>

      </div>

      {/* Filter element */}
      <div className='flex flex-col gap-2 sm:flex-row'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
            >
              <Filter className='size-4'/>
              {FilterTypes[selectedOption]}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent  className="w-48 p-2">
              {
                Object.keys(FilterTypes).map((option) => (
                  <DropdownMenuItem
                    key={option}
                    asChild
                    className='mb-2'
                  >
                    <Button
                      onClick={() => handleSelectedOption(option)}
                      className={clsx("flex w-full items-center justify-center",selectedOption === option && 'bg-gradient-primary text-white')}
                      size='sm'
                    >
                      {FilterTypes[option]}
                    </Button>
                  </DropdownMenuItem>
                ))
              }
          </DropdownMenuContent>

        </DropdownMenu>
      </div>
    </div>
  )
}

export default StatsAndFilter