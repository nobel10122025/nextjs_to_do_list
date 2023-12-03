import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import User from "@model/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    async session({ session }) {
        const sessionUser = await User.findOne({
            email: session.user.name
        })
        session.user.id = sessionUser._id.toString()
        console.log("sesssssion", session)
        return session;
    },
    async signIn({ profile }) {
        try {
            await connectToDB()
            //check if a user already exits
            const userExist = await User.findOne({
                email: profile.email
            })

            // if not , create a new user
            if (!userExist) {
                await User.create({
                    email: profile.email,
                    username: profile.name.replace('', '').toLowerCase(),
                    image: profile.picture
                })
            }
        } catch (error) {
            console.log(error)
            return false;
        }

    }
})

export { handler as GET, handler as POST };