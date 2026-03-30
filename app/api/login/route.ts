import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { loginDetailSchema } from "@/lib/typechecker";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_secret = process.env.JWT_secret || "123456789";

export async function POST(req:NextRequest){
    const body = await req.json()
    const bodyParsed = loginDetailSchema.safeParse(body)

    if(!bodyParsed.success){
        return NextResponse.json({error:bodyParsed.error.issues[0].message},{status:400})
    }

    try{
        const user = await prisma.user.findUnique({
            where:{
                email:bodyParsed.data.email
            },
        })

        if(!user){
            return NextResponse.json({error:"User not found"},{status:404})
        }

        const isPasswordMatched = bcrypt.compare(bodyParsed.data.password,user.password)

        if(!isPasswordMatched){
            return NextResponse.json({error:"Invalid Password"},{status:403})
        }

        const {firstName,lastName,email,id,imagePath,isVerified} = user

        const tokenPayload = {
            email:user.email,
            userId: user.id
        }

        const token  = jwt.sign(tokenPayload,JWT_secret,{expiresIn:"1hr"})

        const cookieStore = await cookies()
        
        cookieStore.set('session-token',token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite:'lax',
            path:'/',
            maxAge: 60*60*24
        })
        return NextResponse.json({
            message:"Login Successful",
            payload:{firstName,lastName,email,id,imagePath,isVerified}
        },{status:200})
        
    }catch(error){
        if(error instanceof Prisma.PrismaClientKnownRequestError){
             if(error.code === '2025'){
                return NextResponse.json({error:"User not found"},{status:404})
            }
        }

        if(error instanceof JsonWebTokenError){
            if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
            return NextResponse.json({
                error: "User token has expired or is not valid",
                },{status:403});
            }
        }

        return NextResponse.json({error:"Unexpected Error Occurred"},{status:500})
    }
}

