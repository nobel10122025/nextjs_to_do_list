import { connectToDB } from "@utils/database";
import Task from "@model/task";

export const POST = async (req) => {
  const { userID } = req.json;
  try {
    await connectToDB();
    let tasks = await Task.find({ user_id: userID });
    console.log("takss", tasks);
    if (!tasks) tasks = { data: [] };
    const response = new Response(JSON.stringify(tasks[0].task_list), {
      status: 200,
    });
    return response;
  } catch (error) {
    return new Response("no items found", { status: 500 });
  }
};
