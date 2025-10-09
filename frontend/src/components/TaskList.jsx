import React from 'react'
import EmptyTask from './EmptyTask'
import TodoTasks from './TodoTasks'

const TaskList = ({filteredTasks, filter, handleTaskChanged}) => {
  // let filter = 'all'

  if (!filteredTasks || filteredTasks.length === 0) {
    return (
      <EmptyTask filter={filter} />
    )
  }


  return (
    <div>
      {
        filteredTasks.map((task, index) => (
          <TodoTasks
            key={task._id ?? index}
            task={task}
            index={index}
            handleTaskChanged={handleTaskChanged}
          />
        ))
      }

    </div>
  )
}

export default TaskList