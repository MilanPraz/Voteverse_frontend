import { axiosInstance } from "@/libs/axios";
import { handleAxiosError } from "@/libs/error";
import { TChangePasswordSchema } from "@/schemas/password.schema";
import { useMutation } from "@tanstack/react-query";

export type TForgotPassword = {
  nationalId: string;
};

export type TResetPassword = {
  nationalId: string;
  newPassword: string;
  verificationCode: string;
};
export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: async (payload: TForgotPassword) => {
      return await axiosInstance.post("/user/forgot-password", payload);
    },
    onError: (err) => {
      const errMsg = handleAxiosError(err);
      throw new Error(errMsg);
    },
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: async (payload: TResetPassword) => {
      return await axiosInstance.post("/user/reset-password", payload);
    },
    onError: (err) => {
      const errMsg = handleAxiosError(err);
      throw new Error(errMsg);
    },
  });
}

export function useChangePasswordMutation() {
  return useMutation({
    mutationFn: async (payload: TChangePasswordSchema) => {
      return await axiosInstance.post("/user/change-password", payload);
    },
    onError: (err) => {
      const errMsg = handleAxiosError(err);
      throw new Error(errMsg);
    },
  });
}
