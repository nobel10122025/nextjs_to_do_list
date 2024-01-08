import { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
  task_name: { type: String },
  is_completed: { type: Boolean },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Task = models.Task || model("Task", taskSchema);
export default Task;
