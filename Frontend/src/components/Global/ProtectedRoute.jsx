import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "@/components/Global/AuthProvider"

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useContext(AuthContext)

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-gray-400">Loading...</p>
    </div>
  )

  if (!user) return <Navigate to="/login" />

  if (role && user.role !== role) return <Navigate to="/login" />

  return children
}