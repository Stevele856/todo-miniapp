import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            enum: ['active', 'pending', 'completed'],
            default: 'active'
        },
        completedAt: {
            type: Date,
            default: null
        },
    },
    {
        timestamps: true // Mongoose tự động tạo
    }
)

const Task = mongoose.model('Task', taskSchema)
export default Task