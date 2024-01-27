import { connectToDB } from "@utils/database";
import Task from "@model/task";

export const GET = async () => {
  try {
    await connectToDB();
    let tasks = await Task.find();
    tasks && tasks.forEach(async (currentTask) => {
        let { is_completed } = currentTask
        currentTask.is_completed_yesterday = is_completed;
        currentTask.is_completed = false
        await currentTask.save();
    })
    if (!tasks) tasks = [];
    const response = new Response(JSON.stringify(tasks), {
      status: 200,
    });
    return response;
  } catch (error) {
    return new Response("no items found", { status: 500 });
  }
};
