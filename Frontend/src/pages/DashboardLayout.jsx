import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/components/Global/AuthProvider";
import Sidebar from "@/pages/Sidebar";

import API from "@/api/api";

export default function DashboardLayout({ children, title }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col ml-56">
        {/* Navbar */}
        <div className="fixed top-0 right-0 left-56 z-10 bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <NavbarRight />
        </div>

        {/* Content */}
        <div className="mt-16 p-8">{children}</div>
      </div>
    </div>
  );
}

function NavbarRight() {
  const { user, Logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post("/api/auth/logout");
    } catch (err) {}
    Logout();
    navigate("/login");
  };

  return (
    <div className="flex items-center gap-4">
      <p className="text-xs text-gray-400">
        Hi, <span className="text-gray-700 font-medium">{user?.name}</span> 👋
      </p>
      <button
        onClick={handleLogout}
        className="text-xs text-gray-400 hover:text-gray-600"
      >
        Logout
      </button>
    </div>
  );
}
