import React, { useState } from 'react'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import api from '@/lib/axios'

const AddTask = ({handleNewTasksAdded}) => {
  const [taskTitle, setTaskTitle] = useState('');

  // Call API
  const addTask = async () => {
    if (taskTitle.trim()) {
      try {
        await api.post('/tasks', { title: taskTitle })
        // if success
        toast.success(`Nhiệm vụ "${taskTitle}" đã được thêm thành công`)

        // Inform parent component that user just added new tasks to re-render others component
        handleNewTasksAdded()
      } catch (error) {
        console.error(`Không thể thêm task "${taskTitle}"`, error)
        toast.error(`Thêm nhiệm vụ "${taskTitle}" không thành công`)
      }
      // Whether success or not, get the setTaskTitle to empty state
      setTaskTitle('')
    } else {
      // If user has not add any task
      toast.error('Bạn cần nhập nội dung của nhiệm vụ')
    }
  }

  // Handle key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  return (
    <Card className='p-6 border-0 flex-row'>
      <div className='flex flex-col sm:flex-row w-full'>
        <Input
          type='text'
          placeholder='Bạn muốn làm gì hôm nay?'
          className="h-12 text-base bg-slate-50 sm:flex-1 focus: border-primary/10 focus:ring-primary/80"
          onChange={(event) => setTaskTitle(event.target.value)}
          value={taskTitle}
          onKeyPress={handleKeyPress}
        />
      </div>

      <Button
        variant='gradient'
        
        size='xl'
        className='px-6'
        onClick={addTask}
        disabled={!taskTitle}
      >
        <Plus className='size-5'/>
        Thêm
      </Button>
    </Card>
  )
}

export default AddTask