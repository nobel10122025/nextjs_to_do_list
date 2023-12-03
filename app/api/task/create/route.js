import { connectToDB } from "@utils/database";
import Task from "@model/task";

export const POST = async (req) => {
    const { userId, name, isCompleted, id } = await req.json()
    try {
        await connectToDB()
        const newTask = new Task({
            id: id,
            user_id: userId,
            is_completed: isCompleted,
            task_name: name
        })
        await newTask.save()
        return new Response(JSON.stringify(newTask), { status: 200 })
    } catch (err) {
        return new Response("failed to create a new item", { status: 500 })
    }
}