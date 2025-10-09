import React, { useState } from 'react'
import { Card } from './ui/card'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Calendar, CheckCircle2, Circle, Clock, Ellipsis, OctagonAlert, SquarePen, Trash2 } from 'lucide-react'
import { Input } from './ui/input'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { FilterTypes } from '@/lib/data'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import clsx from 'clsx'
import api from '@/lib/axios'
import { toast } from 'sonner'



const TodoTasks = ({ task, index, handleTaskChanged }) => {
   
    // const [selectedStatus, setSelectedStatus] = useState(task.status || 'active');
    const [isEditing, setIsEditing] = useState(false);
    const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || '');
    const statusOptions = Object.entries(FilterTypes).filter(([key]) => key !== 'all').map(([key, label]) => ({ key, label }))

    // DELETE TASK
    const deletedTask = async (taskID) => {
        try {
            await api.delete(`/tasks/${taskID}`)
            toast.success('Nhiệm vụ đã được xoá thành công')
            // inform parent component
            handleTaskChanged()
        } catch (error) {
            console.error('Xoá nhiệm vụ không thành công', error)
            toast.error(`Lỗi xảy ra khi xoá nhiệm vụ`)
        }
    }

    // UPDATE TASK
    const updateTasks = async () => {
        if (!updateTaskTitle.trim()) {
            toast.error('Tiêu đề không được để trống')
            return
        }
        setIsEditing(false)
        try {
            await api.put(`/tasks/${task._id}`, { title: updateTaskTitle })
            toast.success('Nhiệm vụ đã được sửa thành công')
            handleTaskChanged()
        } catch (error) {
            console.error('Sửa nhiệm vụ không thành công', error)
            toast.error(`Lỗi xảy ra khi sửa nhiệm vụ`)
        }
    }

    
    const handleStatusUpdated = async (selectedStatus) => {
        try {
            let response;

            switch (selectedStatus) {
                case 'completed':
                    response = await api.put(`/tasks/${task._id}`, {
                        status: 'completed',
                        completedAt: new Date().toISOString(),
                    })
                    break
                
                case 'pending':
                    response = await api.put(`/tasks/${task._id}`, {
                        status: 'pending',
                        updatedAt: new Date().toISOString()
                    })
                    break
                
                case 'active':
                    response = await api.put(`/tasks/${task._id}`, {
                        status: 'active',
                        updatedAt: new Date().toISOString()
                    })
                    break
                
                default:
                    return
            }
            toast.success(`Thay đổi trạng thái nhiệm vụ "${task.title}" thành công!`)
            handleTaskChanged()
            return response

        } catch (error) {
            console.error('Thay đổi trạng thái nhiệm vụ thất bại', error)
            toast.error('Có lỗi xảy ra khi thay đổi trạng thái nhiệm vụ')
        }
    }
    
    const handleSelectedStatus = (option) => {
        // setSelectedStatus(option.key)
        handleStatusUpdated(option.key)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            updateTasks()
        }
    }

    // TOGGLE BTN
    const toggleBtnStatus = async () => {
        try {
            if (task.status === 'completed') {
                // Chuyển về active
                await api.put(`/tasks/${task._id}`, {
                    status: 'active',
                    completedAt: null
                })
            } else {
                // pending hoặc active đều chuyển thành completed
                await api.put(`/tasks/${task._id}`, {
                    status: 'completed',
                    completedAt: new Date().toISOString()
                })
            }
            toast.success(`Thay đổi trạng thái nhiệm vụ "${task.title}" thành công!`)
            handleTaskChanged()
        } catch (error) {
            console.error('Cập nhật nhiệm vụ không thành công', error)
            toast.error(`Lỗi xảy ra khi cập nhật nhiệm vụ`)
        }
    }

    return (
        <Card
            className={cn(
                "p-4 mb-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
                task.status === 'completed' && 'opacity-75'
            )}
            style={{animationDelay: `${index * 50}ms`}}
        >
            <div className='flex items-center gap-4'>
                {/* Check button */}
                <Button
                    variant='ghost'
                    size='icon'
                    className={cn(
                        "flex-shrink-0 size-8 transition-all duration-200 flex items-center justify-center ",
                        task.status === 'completed' ? 'text-success hover:text-success/90'
                            : task.status === 'pending' ? 'text-alert hover:text-alert/90' : 'text-infor'
                    )}
                    onClick={toggleBtnStatus}
        
                >
                    {task.status === 'completed' ? (
                        <CheckCircle2 className='size-5'/>
                    ) : task.status === 'pending' ? (
                        <Clock className='size-5'/>
                    ) : (
                        <Circle className='size-5' />
                    )}
                </Button>

                {/* Display and edit title */}
                <div className='flex-1 min-w-0'>
                    {
                        isEditing ? (
                            <Input
                                type = 'text'
                                placeholder='Nhập nội dung chỉnh sửa'
                                className='flex-1 h-12 text-base border-border/50 focus:border-border/50 focus:ring-primary/20'
                                onChange={(e) => setUpdateTaskTitle(e.target.value)}
                                value={updateTaskTitle}
                                onKeyPress={handleKeyPress}
                                onBlur={() => {
                                    setIsEditing(false)
                                    setUpdateTaskTitle(task.title || '')
                                }}
                            />
                        ) :
                        (
                            <p className={cn('text-base transition-all duration-200 flex items-center',
                                task.status === 'completed' ? 'line-through text-muted-foreground' : 'text-foreground')}
                            >
                                {task.title}
                                {task.status === 'pending' &&
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <OctagonAlert className='size-4 inline-block ml-2 text-muted-foreground'/>      
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Task này đang chờ xác nhận</p>        
                                        </TooltipContent>    
                                    </Tooltip>    
                                }       
                            </p>
                        )
                    }

                    {/* Date created and completed */}
                    <div className='flex items-center gap-2 mt-2'>
                        {
                            task.status === 'completed' ? (
                                <>
                                    <Calendar className='size-3 text-muted-foreground' />
                                    <span className='text-xs text-muted-foreground'>
                                        {new Date(task.createdAt).toLocaleString(['vi-VN'], {
                                            weekday: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                            month: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>

                                    <span className='text-xs text-muted-foreground'> - </span>
                                    <Calendar className='size-3 text-muted-foreground' />
                                    <span className='text-xs text-muted-foreground'>
                                        {new Date(task.completedAt).toLocaleString(['vi-VN'], {
                                            weekday: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                            month: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <Calendar className='size-3 text-muted-foreground' />
                                    <span className='text-xs text-muted-foreground'>
                                        {new Date(task.createdAt).toLocaleString(['vi-VN'], {
                                            weekday: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                            month: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </>        
                            )
                        }
                    </div>
                </div>


                {/* edit, delete, and status button */}
                <div className='inline-block items-center justify-center'>
                    {/* Status button */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant='ghost'
                                size='icon'
                                className='flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-update cursor-pointer'
                            >
                                <Ellipsis className='size-4' />
                                
                            </Button>

                        </DropdownMenuTrigger>

                        <DropdownMenuContent className='p-2'>
                            {statusOptions.map((option) => (
                                <DropdownMenuItem
                                    asChild
                                    key={option.key}
                                    className='mb-2'
                                >
                                    <Button
                                        onClick={() => handleSelectedStatus(option)}
                                        size='sm'
                                        className={clsx('flex w-full items-center justify-center', task.status === option.key && 'bg-gradient-primary text-white')}
                                    >
                                        {option.label}
                                    </Button>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>

                    </DropdownMenu>

                    {/* Edit button */}
                    <Button
                        variant='ghost'
                        size='icon'
                        className='flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info cursor-pointer'
                        onClick={() => {
                            setIsEditing(true)
                            setUpdateTaskTitle(task.title || '')
                        }
                        }
                    >
                        <SquarePen className='size-4'/>

                    </Button>

                    {/* Delete button */}
                    <Button
                        variant='ghost'
                        size='icon'
                        className='flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive cursor-pointer'
                        onClick={() => deletedTask(task._id)}
                    >
                        <Trash2 className='size-4'/>
                    </Button>
                </div>

            </div>          
        </Card>
    )
}

export default TodoTasks