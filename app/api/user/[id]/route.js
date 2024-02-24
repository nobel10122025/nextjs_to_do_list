import { connectToDB } from "@utils/database";
import Task from "@model/task";
import User from "@model/user";

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

export const PATCH = async (req, { params }) => {
  const { is_light_mode } = await req.json();
  try {
    await connectToDB();
    let existingUser = await User.findById(params.id);
    if (!existingUser) return new Response("User not found", { status: 404 });
    if (is_light_mode) existingUser.is_light_mode = is_light_mode;
    await existingUser.save();
    return new Response(JSON.stringify(existingUser), { status: 200 });
  } catch (err) {
    return new Response("failed to update the User", { status: 500 });
  }
};
