import Task from "@model/task";
import { connectToDB } from "@utils/database";

export const PATCH = async (req, { params }) => {
  const { isCompleted } = await req.json();
  try {
    connectToDB();
    let existingTask = await Task.findById(params.id);
    if (!existingTask) return new Response("Task not found", { status: 404 });
    existingTask.is_completed = isCompleted;
    await existingTask.save();
    return new Response(JSON.stringify(existingTask), { status: 200 });
  } catch (err) {
    return new Response("failed to update the propmts", { status: 500 });
  }
};
