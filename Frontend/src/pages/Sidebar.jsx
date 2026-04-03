import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "@/components/Global/AuthProvider"

const adminMenu = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Job Manager", path: "/admin/jobs" },
  { label: "Status", path: "/admin/status" },
  { label: "All Applicants", path: "/admin/applicants" },
]

const candidateMenu = [
  { label: "Dashboard", path: "/candidate/dashboard" },
  { label: "Browse Jobs", path: "/jobs" },
  { label: "My Applications", path: "/candidate/applications" },
  { label: "Resume Advisor", path: "/candidate/resume-advisor" },
]

export default function Sidebar() {
  const { user } = useContext(AuthContext)
  const menu = user?.role === "Admin" ? adminMenu : candidateMenu

  return (
    <div className="fixed top-0 left-0 h-full w-56 bg-white border-r border-gray-100 flex flex-col z-20">

      {/* Logo */}
      <div className="px-6 py-4 border-b border-gray-100">
       <link rel="icon" type="image/svg+xml" href="/Group 38(1).svg" />
      </div>

      {/* Menu Items */}
      <div className="flex-1 px-3 py-4 flex flex-col gap-1">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="px-3 py-2 rounded-lg text-xs text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-gray-100">
        <Link
          to="/profile"
          className="px-3 py-2 rounded-lg text-xs text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition block"
        >
          Profile
        </Link>
      </div>

    </div>
  )
}