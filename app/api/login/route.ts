import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { loginDetailSchema } from "@/lib/typechecker";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

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
            }
        })

        if(!user){
            return NextResponse.json({error:"User not found"},{status:404})
        }

        const isPasswordMatched = bcrypt.compare(bodyParsed.data.password,user.password)

        if(!isPasswordMatched){
            return NextResponse.json({error:"Invalid Password"},{status:403})
        }

        return NextResponse.json({
            message:"Login Successful",
            payload:{...user}
        },{status:200})
        
    }catch(error){
        if(error instanceof Prisma.PrismaClientKnownRequestError){
             if(error.code === '2025'){
                return NextResponse.json({error:"User not found"},{status:404})
            }
        }

        return NextResponse.json({error:"Unexpected Error Occurred"},{status:500})
    }
}

