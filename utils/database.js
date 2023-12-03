import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_DB_URI, {
            dbName: "to_do_list",
        })
        isConnected = true
        console.log("MongoDB connected")
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}