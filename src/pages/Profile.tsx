"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, CreditCard, UserCircle } from "lucide-react";
import { useUserInfo } from "@/store/userDetail";
import { useForm } from "react-hook-form";
import {
  ChangePasswordSchema,
  TChangePasswordSchema,
} from "@/schemas/password.schema";
import { useChangePasswordMutation } from "@/hooks/password.hooks";
import FormSubmitBtn from "@/components/common/FormSubmitBtn";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const userInfo = useUserInfo((state) => state.userInfo);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TChangePasswordSchema>({
    resolver: zodResolver(ChangePasswordSchema),
  });
  const { mutateAsync, isPending } = useChangePasswordMutation();

  async function onSubmit(data: TChangePasswordSchema) {
    mutateAsync(data)
      .then(() => {
        toast.success("Password has been Changed!");
        navigate("/home");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-emerald-400 to-cyan-400 p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Profile</CardTitle>
          <CardDescription>
            View and manage your profile information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info" className=" font-semibold">
                Profile Info
              </TabsTrigger>
              <TabsTrigger value="password" className=" font-semibold">
                Change Password
              </TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <div className="space-y-4 mt-4">
                <div className="flex items-center space-x-4">
                  <User className="w-6 h-6  text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Full Name
                    </p>
                    <p className="text-lg font-semibold">{userInfo.fullname}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-lg font-semibold">{userInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-lg font-semibold">{userInfo.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <CreditCard className="w-6 h-6 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      National ID
                    </p>
                    <p className="text-lg font-semibold">
                      {userInfo.nationalId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <UserCircle className="w-6 h-6 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Role</p>
                    <p className="text-lg font-semibold">{userInfo.role}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="password">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 mt-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    {...register("currentPassword")}
                  />
                  {errors.currentPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.currentPassword.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    {...register("newPassword")}
                  />
                  {errors.newPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="repeatPassword">Confirm New Password</Label>
                  <Input
                    id="repeatPassword"
                    type="password"
                    {...register("repeatPassword")}
                  />
                  {errors.repeatPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.repeatPassword.message}
                    </p>
                  )}
                </div>
                <FormSubmitBtn isLoading={isPending}>
                  Change Password
                </FormSubmitBtn>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
