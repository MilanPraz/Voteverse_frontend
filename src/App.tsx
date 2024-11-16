import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/AUTH/Login";
import Register from "./pages/AUTH/Register";
import LandingPage from "./pages/LandingPage";
import Homee from "./pages/Home";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { useEffect, useState } from "react";
import { useAuthState } from "./store/refreshToken";
import { axiosInstance } from "./libs/axios";
import Cookies from "js-cookie";
import PageLoader from "./components/common/PageLoader";
import { useUserInfo } from "./store/userDetail";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/AUTH/ForgotPassword";
import ResetPassword from "./pages/AUTH/ResetPassword";
import Admin from "./pages/Admin/Admin";
import AdminRoute from "./components/common/AdminRoute";
import Candidates from "./pages/Admin/Candidates";

function App() {
  const accessToken = useAuthState((state) => state.accessToken);
  const setAccessToken = useAuthState((state) => state.setAccessToken);
  const setUserInfo = useUserInfo((state) => state.setUserInfo);

  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);

  useEffect(() => {
    const validateToken = async () => {
      // if (!accessToken) {
      //   setIsValidToken(false);
      //   return;
      // }

      try {
        // Make an API call to validate the token
        const res = await axiosInstance.post(
          "/user/refresh-token",
          {},
          {
            // headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true,
          }
        );
        if (res.data) {
          setAccessToken(res.data?.data?.token); // Update the state with new access token
        }
        setUserInfo(res.data?.data?.user);
        setIsValidToken(true); // Token is valid
      } catch (error) {
        setIsValidToken(false); // Token is invalid
        Cookies.remove("token"); // Clear invalid token
      }
    };

    validateToken();
  }, [accessToken]);
  if (isValidToken === null) {
    return <PageLoader />; // Or a spinner/loading component
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        {/* <Route path="/about" element={<Home />}></Route> */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Homee />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/candidates"
          element={
            <AdminRoute>
              <Candidates />
            </AdminRoute>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
}

export default App;
