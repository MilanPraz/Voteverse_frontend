import { z } from "zod";

export const forgotPasswordSchema = z.object({
  nationalId: z.string().regex(/^\d{6,12}$/, {
    message: "National ID must be between 6 and 12 digits",
  }),
});

export const ResetPasswordSchema = z.object({
  nationalId: z.string().regex(/^\d{6,12}$/, {
    message: "National ID must be between 6 and 12 digits",
  }),
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must be 100 characters or less" }),

  verificationCode: z
    .string()
    .min(6, { message: "Verification code must be of 6 digits." })
    .max(6, { message: "Verification code must be of 6 digits." }),
});

export const ChangePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(100, { message: "Password must be 100 characters or less" }),
    currentPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(100, { message: "Password must be 100 characters or less" }),
    repeatPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(100, { message: "Password must be 100 characters or less" }),
  })
  .refine((data) => data.newPassword === data.repeatPassword, {
    message: "Password do not match.",
    path: ["repeatPassword"],
  });

export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;
export type TChangePasswordSchema = z.infer<typeof ChangePasswordSchema>;
