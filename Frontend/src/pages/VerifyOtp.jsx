import { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import API from "@/api/api"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function VerifyOtp() {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || ""
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      await API.post("/api/auth/verify-otp", { email, otp: otp.trim() })
      navigate("/reset-password", { state: { email, otp } })
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <h1 className="text-xl font-medium text-gray-900 mb-1">Verify OTP</h1>
        <p className="text-xs text-gray-400 mb-1">OTP sent to <span className="text-gray-600">{email}</span></p>
        <p className="text-xs text-gray-400 mb-6">Valid for 10 minutes</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Enter OTP</label>
            <Input
              type="text"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              required
            />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full bg-gray-900 hover:bg-gray-700 text-white">
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>

          <p className="text-xs text-gray-400 text-center">
            Didn't get OTP?{" "}
            <Link to="/forgot-password" className="text-blue-500">Resend</Link>
          </p>
        </form>
      </div>
    </div>
  )
}