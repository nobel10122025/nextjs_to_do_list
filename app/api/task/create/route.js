import { connectToDB } from "@utils/database";
import Task from "@model/task";

export const POST = async (req, res) => {
  const { userId, name, isCompleted } = await req.json();
  try {
    await connectToDB();
    await Task.find({ user_id: userId });
    const createdData = await Task.create({
      task_name: name,
      is_completed: isCompleted,
      user_id: userId,
    });
    return new Response(JSON.stringify(createdData), { status: 201 });
  } catch (err) {
    console.log("err", err);
    return new Response("failed to create a new item", { status: 500 });
  }
};
