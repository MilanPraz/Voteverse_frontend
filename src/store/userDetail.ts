import { create } from "zustand";

type TUser = {
  fullname: string;
  _id: string;
  email: string;
  nationalId: string;
  phone: string;
  role: string;
};

interface TUserDetail {
  userInfo: TUser;
  setUserInfo: (user: TUser) => void;
}

export const useUserInfo = create<TUserDetail>((set) => ({
  userInfo: {
    fullname: "",
    _id: "",
    email: "",
    nationalId: "",
    phone: "",
    role: "",
  },
  setUserInfo: (user: TUser) => set({ userInfo: user }),
}));
