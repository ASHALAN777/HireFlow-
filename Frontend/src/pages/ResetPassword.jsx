import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import API from "@/api/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const otp = location.state?.otp || "";
  const [newpassword, setNewpassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newpassword !== confirm) {
      setError("Passwords don't match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await API.post("/api/auth/reset-password", { email, otp, newpassword });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <h1 className="text-xl font-medium text-gray-900 mb-1">
          Reset password
        </h1>
        <p className="text-xs text-gray-600 mb-6">Enter your new password</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs text-gray-600 block mb-1">
              New password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={newpassword}
              onChange={(e) => setNewpassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xs text-gray-600 block mb-1">
              Confirm password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 hover:bg-gray-700 text-white"
          >
            {loading ? "Resetting..." : "Reset password"}
          </Button>

          <p className="text-xs text-gray-600 text-center">
            <Link to="/login" className="text-blue-500">
              Back to login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
