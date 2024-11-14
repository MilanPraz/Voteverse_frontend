import { useAuthState } from "@/store/refreshToken";
import { ReactNode, useEffect, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import PageLoader from "./PageLoader";
import { useUserInfo } from "@/store/userDetail";
import Logout from "./Logout";

const sidebarLinks = [
  { title: "Dashboard", href: "/admin" },
  { title: "Candidates", href: "/candidates" },
  // { title: "Settings", href: "/settings" },
];

export default function AdminRoute({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const accessToken = useAuthState((state) => state.accessToken);
  const userDetail = useUserInfo((state) => state.userInfo);

  const [isValidAdmin, setIsValidAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (!accessToken) {
      setIsValidAdmin(false);
    } else if (userDetail && userDetail.role) {
      // Check if the user's role is "admin" from Zustand state
      setIsValidAdmin(userDetail.role === "admin");
    } else {
      setIsValidAdmin(false);
    }
  }, [accessToken, userDetail]);

  // Handle redirects based on the validation status
  if (!accessToken) {
    return <Navigate to="/login" replace />; // Redirect if no token is present
  }

  if (isValidAdmin === null) {
    return <PageLoader />; // Show a loading indicator while validating
  }

  if (!isValidAdmin) {
    return <Navigate to="/home" replace />; // Redirect if user is not an admin
  }

  return (
    <div className=" flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white w-64 min-h-screen p-4 ${
          isMenuOpen ? "block" : "hidden"
        } md:block`}
      >
        <nav className=" flex flex-col justify-between  h-full">
          <ul className="space-y-2">
            {sidebarLinks.map((link) => (
              <li key={link.title}>
                <NavLink
                  to={link.href}
                  className={`block p-2 text-gray-600 hover:bg-gray-100 rounded ${
                    link.href === location.pathname ? "bg-gray-200" : ""
                  }`}
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
          <div>
            <Logout />
          </div>
        </nav>
      </aside>
      <div className="flex-1 p-4  overflow-auto">{children}</div>
    </div>
  ); // Render the children if user is an admin
}
