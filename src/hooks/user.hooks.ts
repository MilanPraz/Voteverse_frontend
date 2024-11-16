import { axiosInstance } from "@/libs/axios";
import { handleAxiosError } from "@/libs/error";
import { TLoginForm } from "@/schemas/login.schema";
import { TRegisterForm } from "@/schemas/register.schema";
import { useAuthState } from "@/store/refreshToken";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

//register useMutation
export function useRegisterMutation() {
  return useMutation({
    mutationFn: async (payload: TRegisterForm) => {
      return await axiosInstance.post("/user/register", payload);
    },
    onError: (err) => {
      const errMsg = handleAxiosError(err); //centralized error handling
      throw new Error(errMsg);
    },
  });
}

//login mutation
export function useLoginMutation() {
  const setAccessToken = useAuthState((state) => state.setAccessToken);

  return useMutation({
    mutationFn: async (payload: TLoginForm) => {
      return await axiosInstance.post("/user/login", payload);
    },
    onError: (err) => {
      const errMsg = handleAxiosError(err); //centralized error handling
      throw new Error(errMsg);
    },

    onSuccess: (res) => {
      // console.log("RESSSSSS:", res);
      const token = res?.data.token;
      if (token) {
        setAccessToken(token);
      }
    },
  });
}

export function useLogoutUser() {
  return useMutation({
    mutationFn: async () => {
      return await axiosInstance.post(
        "/user/logout",
        {},
        {
          withCredentials: true,
        }
      );
    },
    onError: (err) => {
      const errMsg = handleAxiosError(err); //centralized error handling
      throw new Error(errMsg);
    },
  });
}
