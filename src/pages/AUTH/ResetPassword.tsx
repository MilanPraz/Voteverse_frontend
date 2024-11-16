"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock, KeyRound } from "lucide-react";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  ResetPasswordSchema,
  TResetPasswordSchema,
} from "@/schemas/password.schema";
import { useResetPasswordMutation } from "@/hooks/password.hooks";
import FormSubmitBtn from "@/components/common/FormSubmitBtn";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ResetPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
  });
  const { mutateAsync, isPending } = useResetPasswordMutation();

  async function onSubmit(data: TResetPasswordSchema) {
    mutateAsync(data)
      .then((res) => {
        navigate("/login");
        toast.success(
          res?.data.message || "Check your mail for verification code"
        );
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-emerald-400 to-cyan-400 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription>
            Enter your details to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nationalId">National ID</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  {...register("nationalId")}
                  id="nationalId"
                  type="text"
                  placeholder="Enter your National ID"
                  className="pl-10"
                  required
                />
              </div>
              {errors.nationalId && (
                <p className="text-red-300 text-xs mt-1">
                  {errors.nationalId.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="verificationCode">Verification Code</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  id="verificationCode"
                  placeholder="Enter the verification code"
                  {...register("verificationCode")}
                  className="pl-10"
                  required
                />
              </div>
              {errors.verificationCode && (
                <p className="text-red-300 text-xs mt-1">
                  {errors.verificationCode.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  {...register("newPassword")}
                  className="pl-10"
                  required
                />
              </div>
              {errors.newPassword && (
                <p className="text-red-300 text-xs mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <FormSubmitBtn isLoading={isPending}>Reset Password</FormSubmitBtn>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
