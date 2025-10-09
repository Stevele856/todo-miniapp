import Task from "../models/Task.js"

// Read all tasks
export const getAlltasks = async (req, res) => {

    const { filter = 'today' } = req.query
    const now = new Date()
    let startDate

    switch (filter) {
        case 'today': {
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()) // 2025-10-07 00:00
            break
        }
        case 'week': {
            const mondayDate = now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0)
            startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate)
            break
        }
        case 'month': {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1)
            break
        }
        case 'all': 
            default: {
                startDate = null
            }    
    }
        const query = startDate ? { createdAt: { $gte: startDate } } : {}
    
    try {
        // const tasks = await Task.find().sort({ createdAt: -1 })
        const results = await Task.aggregate([
            {$match: query},
            {
                $facet: {
                    tasks: [{ $sort: { createdAt: -1 } }],
                    activeCount: [{ $match: { status: 'active' } }, { $count: 'count' }],
                    pendingCount: [{ $match: { status: 'pending' } }, { $count: 'count' }],
                    completedCount: [{$match: {status: 'completed'}}, {$count: 'count'}]
                }
            }
        ])
        const tasks = results[0].tasks
        const activeCount = results[0].activeCount[0]?.count || 0
        const pendingCount = results[0].pendingCount[0]?.count || 0
        const completedCount = results[0].completedCount[0]?.count || 0
        
        res.status(200).json({tasks, activeCount, pendingCount, completedCount})
        // res.status(200).json(tasks)
    } catch (error) {
        console.error('Lỗi khi gọi getAlltasks', error)
        res.status(500).json({message: 'Lỗi hệ thống'})
    }
}


// POST METHOD
export const createTasks = async (req, res) => {

    try {
        const { title,status } = req.body
        const task = new Task({ title, status })
        
        const newTask = await task.save()
        res.status(201).json(newTask)

    } catch (error) {
        console.error('Lỗi khi gọi createTasks', error)
        res.status(500).json({message: 'Lỗi hệ thống'})
    }

}


//UPDATE METHOD
export const updatedTasks = async (req, res) => {

    try {
        const { title, completedAt, status } = req.body
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title,
                status,
                completedAt
            },
            {new: true}
        )   

        if (!updatedTasks) {
            return res.status(404).json({message: 'Nhiệm vụ không tồn tại'})
        }

        res.status(200).json(updatedTask)
    } catch (error) {
        console.error('Lỗi khi gọi updateTasks', error)
        res.status(500).json({message: 'Lỗi hệ thống'})
    }

}


// DELETE METHOD
export const deleteTasks = async (req, res) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id)

        if (!deleteTask) {
            return res.status(404).json({message: 'Nhiệm vụ không tồn tại'})
        }
        res.status(200).json(deleteTask)
    } catch (error) {
        console.error('Lỗi khi gọi updateTasks', error)
        res.status(500).json({message: 'Lỗi hệ thống'})
    }
}