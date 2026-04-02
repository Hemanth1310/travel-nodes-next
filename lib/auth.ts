import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { Prisma } from "@/generated/prisma/client";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

const JWT_secret = process.env.JWT_secret || "123456789";

export async function getAuthUser(){
    const cookieStore = await cookies()
    const token = cookieStore.get("session-token")?.value

    if(!token){
        return false
    }

    try{
        const {userId} = jwt.verify(token,JWT_secret) as {userId:string}
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            }, 
            select:{
                firstName:true,
                lastName:true,
                email:true,
                id:true,
                imagePath:true,
                isVerified:true
            }
        })

        if(!user){
            return null
        }
        
        return user
    }catch(error){
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                console.log("User not found." );
            }
        }
        console.log("Session Expired Please login")
        return null
    }
}