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
import { CreditCard } from "lucide-react";
import toast from "react-hot-toast";
import FormSubmitBtn from "@/components/common/FormSubmitBtn";
import { useForgotPasswordMutation } from "@/hooks/password.hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  TForgotPasswordSchema,
} from "@/schemas/password.schema";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  //   const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const { mutateAsync, isPending } = useForgotPasswordMutation();

  function onSubmit(data: TForgotPasswordSchema) {
    mutateAsync(data)
      .then(async (res) => {
        navigate("/reset-password");
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
          <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
          <CardDescription>
            Enter your National ID to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="national-id">National ID</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  id="national-id"
                  type="text"
                  placeholder="Enter your National ID"
                  {...register("nationalId")}
                  className="pl-10"
                  required
                />
              </div>
              {errors.nationalId && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.nationalId.message}
                </p>
              )}
            </div>
            <FormSubmitBtn isLoading={isPending}>Submit</FormSubmitBtn>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
