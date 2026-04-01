"use server";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { loginDetailSchema } from "@/lib/typechecker";

const JWT_SECRET = process.env.JWT_secret || "123456789";

export type LoginActionState = {
  error: string | null;
  success: boolean;
};

export async function loginAction(
  _prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const authDetails = Object.fromEntries(formData.entries());
  const parsedAuthInputs = loginDetailSchema.safeParse(authDetails);

  if (!parsedAuthInputs.success) {
    return { error: parsedAuthInputs.error.issues[0].message, success: false };
  }

  const user = await prisma.user.findUnique({
    where: { email: parsedAuthInputs.data.email },
  });

  if (!user) {
    return { error: "User not found", success: false };
  }

  const isPasswordMatched = await bcrypt.compare(
    parsedAuthInputs.data.password,
    user.password
  );

  if (!isPasswordMatched) {
    return { error: "Invalid password", success: false };
  }

  const tokenPayload = {
    email: user.email,
    userId: user.id,
  };

  const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "1h" });
  const cookieStore = await cookies();

  cookieStore.set("session-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return { error: null, success: true };
}
