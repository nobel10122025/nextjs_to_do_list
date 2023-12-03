import { connectToDB } from "@utils/database";
import Task from "@model/task";

export const GET = async (req, res) => {
    try {
        await connectToDB()
        const tasks = await Task.find({})
        console.log("takss", tasks)
        const response = new Response(JSON.stringify(tasks), { status: 200 })
    } catch (error) {
        return new Response("no items found", { status: 500 })
    }
}