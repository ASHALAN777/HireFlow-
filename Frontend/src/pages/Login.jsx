import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "@/api/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/components/Global/AuthProvider";
import LoginAnimation from "@/assets/Login.json";

import { Player } from "@lottiefiles/react-lottie-player"

export default function Login() {
  const navigate = useNavigate();
  const { Login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/api/auth/login", form);
      Login(res.data);
      if (res.data.role === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/candidate/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="flex w-full max-w-3xl bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* Left — Form */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h1 className="text-xl font-medium text-gray-900 mb-1">
            Welcome back
          </h1>
          <p className="text-xs text-gray-400 mb-6">
            Sign in to your HireFlow account
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-1">
                Password
              </label>
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="text-right">
              <Link to="/forgot-password" className="text-xs text-blue-500">
                Forgot password?
              </Link>
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-2 rounded-lg text-xs font-medium hover:bg-gray-700 transition"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>

            <p className="text-xs text-gray-400 text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500">
                Register
              </Link>
            </p>
          </form>
        </div>

        {/* Right — Lottie */}
        <div className="flex-1 bg-gray-50 border-l border-gray-100 flex flex-col items-center justify-center gap-2">
        
          <Player
            autoplay
            loop
            src={LoginAnimation}
            style={{ height: "200px", width: "200px" }}
          />
        
        </div>
      </div>
    </div>
  );
}
