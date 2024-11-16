import { useAuthState } from "@/store/refreshToken";
import Cookies from "js-cookie";
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import PageLoader from "./PageLoader";
import { axiosInstance } from "@/libs/axios";

export default function ProtectedRoute({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const accessToken = useAuthState((state) => state.accessToken);

  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);

  useEffect(() => {
    const validateToken = async () => {
      try {
        // Make an API call to validate the token
        const res = await axiosInstance.get("/user/validate/accessToken", {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        });

        setIsValidToken(true); // Token is valid
      } catch (error) {
        setIsValidToken(false); // Token is invalid
        Cookies.remove("token"); // Clear invalid token
      }
    };

    validateToken();
  }, [accessToken]);

  if (!accessToken) {
    return <Navigate to={"/"} replace />;
  }
  if (isValidToken === null) {
    return <PageLoader />; // Or a spinner/loading component
  }
  if (!isValidToken) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
