import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const accessExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
const refreshExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 day

// export const setCookie = (accessToken: string) => {
//   Cookies.set("token", accessToken, { expires: 1 / 1440 }); // Expires in 1 day
// };

// SERVER ACTION FOR GETTING SESSION ON SERVER SIDE
// export async function getSession() {
//   const accessToken = Cookies.get('token')
//   const refreshToken =
//   return { accessToken, refreshToken };
// }

// export const logoutUser = () => {
//   const navigate = useNavigate();
//   Cookies.set("token", "", { expires: new Date(0) });
//   navg;
// };
