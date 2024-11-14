import { z } from "zod";

export const registerSchema = z.object({
  fullname: z
    .string()
    .min(1, { message: "Full name is required." })
    .max(50, { message: "Full name must be 50 characters or less" }),

  phone: z
    .string()
    .regex(/^\+?\d{10,15}$/, { message: "Invalid phone number format" }),

  email: z.string().email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must be 100 characters or less" }),

  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long" })
    .max(100, { message: "Address must be 100 characters or less" }),

  nationalId: z.string().regex(/^\d{6,12}$/, {
    message: "National ID must be between 6 and 12 digits",
  }),

  role: z.string().refine((value) => value === "voter" || value === "admin", {
    message: "Role must be either 'voter' or 'admin'",
  }),
});

export type TRegisterForm = z.infer<typeof registerSchema>;
