import Task from "@model/task";
import { connectToDB } from "@utils/database";

export const DELETE = async (req) => {
  try {
    await connectToDB();
    const { ids } = await req.json();
    ids && ids.forEach(async (currId) => await Task.findOneAndDelete(currId));
    return new Response("Deleted all the completed ", { status: 200 });
  } catch (err) {
    return new Response("Failed to delete items", { status: 500 });
  }
};
