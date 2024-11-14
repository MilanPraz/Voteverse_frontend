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

  console.log("ACcess TOKENnnnnnnnnnnnnnnn:", accessToken);

  useEffect(() => {
    const validateToken = async () => {
      // if (!accessToken) {
      //   console.log("trigeerrrr");

      //   setIsValidToken(false);
      //   return;
      // }

      try {
        // Make an API call to validate the token
        const res = await axiosInstance.get("/user/validate/accessToken", {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        });
        console.log("res k xaaaa acccess token verify:", res);

        setIsValidToken(true); // Token is valid
      } catch (error) {
        console.log("errorrrrrr of access token verify:", error);

        setIsValidToken(false); // Token is invalid
        Cookies.remove("token"); // Clear invalid token
      }
    };

    validateToken();
  }, [accessToken]);
  console.log("VALID ACCESS TOKEN:", isValidToken);

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
