import React from 'react'

const Footer = ({completedTaskCount = 0, activeTaskCount = 0, pendingTaskCount = 0}) => {
  return (
    <>
      {completedTaskCount + activeTaskCount + pendingTaskCount  > 0 &&
        <div className='flex items-center justify-center text-center'>
          <p className='text-md text-muted-foreground'>
            {completedTaskCount > 0 && (
              <>
                👏 Bạn đã hoàn thành {completedTaskCount} việc
                {activeTaskCount > 0 && (
                   <>, còn {activeTaskCount} việc nữa thôi. Cố lên!</>
                )}
                <br></br>
                {pendingTaskCount > 0 && (
                 <> À đừng quên còn {pendingTaskCount} việc đang chờ xác nhận nha 😉</>
                )}
              </>
            )}
            {completedTaskCount === 0 && activeTaskCount > 0 && (
              <>Bắt đầu làm {activeTaskCount} việc thôi nào!</>
            )}
            {completedTaskCount === 0 && activeTaskCount > 0 && pendingTaskCount > 0 && (
              <> À đừng quên có {pendingTaskCount} việc đang chờ xác nhận nha 😉</>
            )}
          </p>
        </div>
      }
    </>
  )
}

export default Footer
