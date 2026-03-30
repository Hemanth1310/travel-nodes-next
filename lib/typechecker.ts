// import { tag } from '@prisma/client';
import { z } from 'zod';

// Defining Email rules 
const emailRules = z.string().email("Invalid email format").trim().toLowerCase()

// Define password rules ONCE so they are identical everywhere
const passwordRules = z.string()
    .min(8, "Please enter at least 8 characters")
    .regex(/[!@#$%^&*]/, "At least one special character needed");

export const loginDetailSchema = z.object({
    email: emailRules,
    password: passwordRules,
})

export const registerSchema = z.object({
    email:emailRules,
    firstName: z.string().min(1,"Name cannot be empty"),
    lastName: z.string().min(1,"Name cannot be empty"),
    password: passwordRules,
})