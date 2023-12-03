import { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
    id: {
        type: String,
        unique: [true, "ID already exists!"],
        required: [true, "ID is required!"]
    },
    task_name: {
        type: String,
        unique: [true, "Email already exists!"],
        required: [true, "Email is required!"]
    },
    is_completed: {
        type: Boolean,
        required: [true, "Status is required"]
    },
    user_id: {
        type: String,
        required: [true, "User_id is required!"]
    }
})

const Task = models.Taks || model("Task", taskSchema)
export default Task