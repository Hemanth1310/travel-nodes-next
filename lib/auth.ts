import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { Prisma } from "@/generated/prisma/client";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

const JWT_secret = process.env.JWT_secret || "123456789";

export async function getAuthUser(){
    const cookieStore = await cookies()
    const token = cookieStore.get("session-token")?.value

    if(!token){
        return false
    }

    const {userId} = jwt.verify(token,JWT_secret) as {userId:string}

    try{
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
        console.log(error)
        return null
    }
}