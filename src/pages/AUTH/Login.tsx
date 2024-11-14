import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LockIcon, UserIcon } from "lucide-react";
import { loginSchema, TLoginForm } from "@/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/hooks/user.hooks";
import toast from "react-hot-toast";
import { useAuthState } from "@/store/refreshToken";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { mutateAsync, isPending } = useLoginMutation();
  const navigate = useNavigate();
  const accessToken = useAuthState((state) => state.accessToken);
  console.log("refresh token xa?", accessToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TLoginForm) => {
    console.log("Login attempted with:", data);

    mutateAsync(data)
      .then(async (res) => {
        console.log("REs k xa LOGIN :", res);
        navigate("/home");
        toast.success("Login Successful");
      })
      .catch((err) => {
        console.log("LOGIN ERRORR:", err);
        toast.error(err.message);
      });

    // Here you would typically handle the login logic
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-400 via-emerald-400 to-cyan-400 p-4 overflow-hidden">
      {/* SVG GRID */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
          />
        </svg>
      </div>
      <Card className="relative w-full max-w-md bg-white/60 backdrop-blur-sm border border-white/20 shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center ">
            Welcome to E-Voting
          </CardTitle>
          <CardDescription className="text-center ">
            Please enter your credentials to access the voting system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nationalId" className="text-sm font-medium ">
                National ID
              </Label>
              <div className="relative">
                <UserIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-700"
                  size={18}
                />
                <Input
                  id="nationalId"
                  type="text"
                  placeholder="Enter your National ID"
                  {...register("nationalId", {
                    required: "National ID is required",
                  })}
                  className={`pl-10 bg-white/20 border-emerald-200/30  placeholder-emerald-200 ${
                    errors.nationalId
                      ? "border-red-400"
                      : "border-emerald-200/30"
                  }`}
                />
              </div>
              {errors.nationalId && (
                <p className="text-red-300 text-xs mt-1">
                  {errors.nationalId.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-neutral-500 "
              >
                Password
              </Label>
              <div className="relative">
                <LockIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-700"
                  size={18}
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className={`pl-10 bg-white/20 border-emerald-200/30  placeholder-emerald-200 ${
                    errors.password ? "border-red-400" : "border-emerald-200/30"
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-red-300 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              disabled={isPending}
              type="submit"
              className="w-full bg-emerald-500/80 hover:bg-emerald-600/80  font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg backdrop-blur-sm"
            >
              Log In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col text-sm">
          <p className="text-sm text-center ">
            If you don't have an account, please contact your local election
            office.
          </p>
          <Link to={"/forgot-password"} className=" hover:underline">
            Forgot Password?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
