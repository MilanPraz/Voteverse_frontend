import React from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { useAuthState } from "@/store/refreshToken";
import { useLogoutUser } from "@/hooks/user.hooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Logout() {
  const { mutateAsync } = useLogoutUser();
  const logout = useAuthState((state) => state.logout);
  async function handlelogout() {
    Cookies.set("refreshToken", "", { expires: new Date(0) });
    // Cookies.remove("refreshToken");
    mutateAsync()
      .then((res) => {
        console.log("LOGOUT RES:", res);
      })
      .catch((err) => {
        console.log("LOGOUT ERR:", err);
      });
    logout();
  }
  return (
    <Button
      className="
        relative group
        bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400
        hover:from-teal-500 hover:via-emerald-500 hover:to-cyan-500
        text-white font-medium
        px-6 py-2
        rounded-lg
        transition-all duration-300
        shadow-lg hover:shadow-xl
        border border-white/20 backdrop-blur-sm
        flex items-center gap-2
      "
    >
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className=" flex items-center gap-2">
            <span className="relative z-10 transition-transform group-hover:translate-x-[-4px]">
              Logout
            </span>
            <LogOut
              size={20}
              className="relative z-10 transition-all duration-300 group-hover:translate-x-[4px] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handlelogout()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Button>
  );
}
