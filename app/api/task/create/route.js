import { connectToDB } from "@utils/database";
import Task from "@model/task";

export const POST = async (req, res) => {
  const { userId, name, isCompleted, id } = await req.json();
  console.log("userID", name, isCompleted, id);
  try {
    await connectToDB();
      Task.create({
            task_name: name,
            is_completed: isCompleted,
            user_id: userId
      });
    return new Response("create a new item", { status: 201 });
  } catch (err) {
    console.log("err", err);
    return new Response("failed to create a new item", { status: 500 });
  }
};
