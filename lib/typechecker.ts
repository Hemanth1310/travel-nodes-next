import { z } from 'zod';
import { tag as PrismaTag } from '@/generated/prisma/enums';
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
    firstName: z.string().min(1,"First Name cannot be empty"),
    lastName: z.string().min(1,"Last Name cannot be empty"),
    password: passwordRules,
})


export const tagSchema = z.enum(PrismaTag)
export type Tag = z.infer<typeof tagSchema>
export const NodeSchema = z.object({
  title: z.string().min(3, "Title is too short").max(100),
  coordinates: z.string().min(3,"Please enter valid coordinates"),
  content: z.string().min(10, "Content must be more descriptive"),
  
  // Coerce converts the form string "2024-10-01" into a JS Date object
  visitDate: z.coerce.date(),
  
  // Handling arrays from FormData can be tricky; see step 2
  tags:z.array(tagSchema).min(1,"Select atleast one tag"),
  
  // Image is handled as a File object in the browser
  image: z.instanceof(File).refine((file) => file.size < 5000000, "Max size is 5MB")
});
