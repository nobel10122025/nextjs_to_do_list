import { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
    id: {
        type: String,
        unique: [true, "ID already exists!"],
        required: [true, "ID is required!"]
    },
    task_name: {
        type: Array,
        unique: [true, "Email already exists!"],
        required: [true, "Email is required!"]
    },
    is_completed: {
        type: Boolean,
        required: [true, "Status is required"]
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
})

const Task = models.Taks || model("Task", taskSchema)
export default Task