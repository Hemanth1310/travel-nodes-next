"use server"
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/typechecker";
import { Prisma } from "@/generated/prisma/client";
import bcrypt from "bcryptjs";

export type RegisterActionErrors = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  serverError: string;
};

const emptyErrors: RegisterActionErrors = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  serverError: "",
};

export type RegisterActionState = {
  error: RegisterActionErrors;
  success: boolean;
};

export async function registerAction(
  _prevState: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> {
  const body = Object.fromEntries(formData.entries());
  const bodyParsed = registerSchema.safeParse(body);

  if (!bodyParsed.success) {
    const errors: RegisterActionErrors = { ...emptyErrors };

    for (const issue of bodyParsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && field in errors) {
        errors[field as keyof RegisterActionErrors] = issue.message;
      }
    }

    return { error: errors, success: false };
  }

  const { email, firstName, lastName, password } = bodyParsed.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
      },
    });

    return {
      error: emptyErrors,
      success: true,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          error: {
            ...emptyErrors,
            serverError: "A record with this email already exists.",
          },
          success: false,
        };
      }
    }
    return {
      error: {
        ...emptyErrors,
        serverError: "Unexpected error occured",
      },
      success: false,
    };
  }
}
