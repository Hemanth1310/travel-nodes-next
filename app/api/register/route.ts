import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/typechecker";
import { Prisma } from "@/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
export async function POST(req: NextRequest) {
    const body = await req.json();
    const bodyParsed = registerSchema.safeParse(body);
    if (!bodyParsed.success) {
        return NextResponse.json(
            { error: bodyParsed.error.issues[0].message },
            { status: 400 }
        );
    }

    const {email,firstName,lastName,password} = bodyParsed.data
    const hashedPassword = await bcrypt.hash(password,10)

    try {
        const userDetails = await prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                password:hashedPassword
            }
        });

        return NextResponse.json(
            {
                message: "User registered successfully.",
                payload:{ userID:userDetails.id}
            },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return NextResponse.json(
                    { errorMessage: "A record with this email already exists." },
                    { status: 409 }
                );
            }
    }
        return NextResponse.json(
            { message: "Unexpected error occurred." },
            { status: 500 }
        );
    }
}