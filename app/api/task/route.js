import { connectToDB } from "@utils/database";
import Task from "@model/task";

export const GET = async (req, res) => {
    try {
        await connectToDB()
        const tasks = await Task.find({}).populate('user_id')
        console.log("takss", tasks)
        const response = new Response(JSON.stringify(tasks), { status: 200 })
        return response
    } catch (error) {
        return new Response("no items found", { status: 500 })
    }
}