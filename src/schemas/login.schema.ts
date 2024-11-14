import { z } from "zod";

export const loginSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must be 100 characters or less" }),

  nationalId: z.string().regex(/^\d{6,12}$/, {
    message: "National ID must be between 6 and 12 digits",
  }),
});

export type TLoginForm = z.infer<typeof loginSchema>;
