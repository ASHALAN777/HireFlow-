import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "@/components/Global/AuthProvider"

export default function RoleRedirect({ children }) {
  const { user, loading } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user) {
      if (user.role === "Admin") {
        navigate("/admin/dashboard", { replace: true })
      } else {
        navigate("/candidate/dashboard", { replace: true })
      }
    }
  }, [user, loading, navigate])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xs text-gray-400">Loading...</p>
    </div>
  )

  if (user) return null

  return children
}