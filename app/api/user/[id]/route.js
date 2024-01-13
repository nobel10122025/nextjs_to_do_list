import { connectToDB } from "@utils/database";
import Task from "@model/task";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    let tasks = await Task.find({ user_id: params.id });
    if (!tasks) tasks = [];
    const response = new Response(JSON.stringify(tasks), {
      status: 200,
    });
    return response;
  } catch (error) {
    return new Response("no items found", { status: 500 });
  }
};
