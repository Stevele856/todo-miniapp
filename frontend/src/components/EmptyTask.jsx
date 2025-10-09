import React from 'react'
import { Card } from './ui/card'
import {ListPlus } from 'lucide-react'

const EmptyTask = ({filter}) => {
    return (
        <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">

            <div className='space-y-3'>
                <ListPlus className='mx-auto size-12 text-slate-300' />
                <div className='space-y-2'>
                    <h3 className="font-medium text-foreground">
                        {
                            filter === 'pending'
                            ? 'Không có nhiệm vụ nào đang chờ xác nhận'
                            : filter === 'active'
                            ? 'Không có nhiệm vụ nào đang làm'
                            : filter === 'completed'
                            ? 'Chưa có nhiệm vụ nào hoàn thành'
                            : 'Không có nhiệm vụ'
                        }
                    </h3>

                    <p className='text-sm text-muted-foreground'>
                        {
                            filter === 'all' ? 'Thêm nhiệm vụ nha 😉' : 'Chuyển sang "Tất cả" để thấy các nhiệm vụ'
                        }
                    </p>
                </div>

            </div>

        </Card>
    )
}

export default EmptyTask