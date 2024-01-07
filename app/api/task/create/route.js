import { connectToDB } from "@utils/database";
import Task from "@model/task";

export const POST = async (req, res) => {
  const { userId, name, isCompleted, id } = await req.json();
  console.log("userID", name, isCompleted, id);
  try {
    await connectToDB();
    let tasks = await Task.find({ user_id: userId });
    console.log("takss", tasks);
    if (tasks && tasks.length === 0) {
        console.log("nooooo", id, userId)
      Task.create({
        task_list: [
          {
            task_name: name,
            is_completed: isCompleted,
            task_id: id,
          },
        ],
      });
    } else {
        console.log("yeeessss", id, userId)
      Task.updateOne(
        { _id: userId },
        {
          $push: {
            task_list: {
              task_name: name,
              is_completed: isCompleted,
              task_id: id,
            },
          },
        }
      );
    }
    return new Response("create a new item", { status: 201 });
  } catch (err) {
    console.log("err", err);
    return new Response("failed to create a new item", { status: 500 });
  }
};
