import Task from "@model/task";
import { connectToDB } from "@utils/database";

export const PATCH = async (req, { params }) => {
  const { isCompleted, task_name } = await req.json();
  try {
    await connectToDB();
    let existingTask = await Task.findById(params.id);
    if (!existingTask) return new Response("Task not found", { status: 404 });
    if (isCompleted !== undefined) existingTask.is_completed = isCompleted;
    if (task_name) existingTask.task_name = task_name;
    await existingTask.save();
    return new Response(JSON.stringify(existingTask), { status: 200 });
  } catch (err) {
    return new Response("failed to update the item", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Task.findOneAndDelete(params.id);
    return new Response("Item deleted successfully", { status: 200 });
  } catch (err) {
    return new Response("failed to delete the item", { status: 500 });
  }
};
