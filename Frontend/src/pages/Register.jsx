import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "@/api/api"

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Candidate"
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      await API.post("/api/auth/signup", form)
      navigate("/login")
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="flex w-full max-w-3xl bg-white border border-gray-200 rounded-xl overflow-hidden">

        {/* Left — Form */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h1 className="text-xl font-medium text-gray-900 mb-1">Create account</h1>
          <p className="text-xs text-gray-400 mb-6">Join HireFlow today</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Full name</label>
              <input
                type="text"
                name="name"
                placeholder="Alan Ricky"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-gray-400"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-gray-400"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-gray-400"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-1">I am a</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-gray-400"
              >
                <option value="Candidate">Candidate</option>
                <option value="Admin">Admin (Company)</option>
              </select>
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-2 rounded-lg text-xs font-medium hover:bg-gray-700 transition"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>

            <p className="text-xs text-gray-400 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">Sign in</Link>
            </p>
          </form>
        </div>

        {/* Right — Lottie */}
        <div className="flex-1 bg-gray-50 border-l border-gray-100 flex flex-col items-center justify-center gap-2">
          {/* paste your lottie component here */}
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-xs">Lottie</span>
          </div>
          <p className="text-xs text-gray-300">HireFlow</p>
        </div>

      </div>
    </div>
  )
}