import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "@/api/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuthContext } from "@/components/Global/AuthProvider";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, Logout } = useContext(AuthContext);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/api/jobs/${id}`)
      .then((res) => setJob(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleLogout = async () => {
    try {
      await API.post("/api/auth/logout");
    } catch (err) {}
    Logout();
    navigate("/login");
  };

  const dashboardPath =
    user?.role === "Admin" ? "/admin/dashboard" : "/candidate/dashboard";

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xs text-gray-600">Loading...</p>
      </div>
    );

  if (!job)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xs text-gray-600">Job not found</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
        <img src="/Hireflow_logo.svg" alt="Logo" className="h-7 w-auto" />

        {user ? (
          <div className="flex items-center gap-4">
            <Link
              to="/jobs"
              className="text-xs text-gray-600 hover:text-gray-600"
            >
              Browse Jobs
            </Link>
            <Link
              to={dashboardPath}
              className="text-xs text-gray-600 hover:text-gray-600"
            >
              Dashboard
            </Link>
            <p className="text-xs text-gray-700 font-medium">{user.name}</p>
            <button
              onClick={handleLogout}
              className="text-xs text-gray-600 hover:text-gray-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/jobs">
              <Button variant="ghost" className="text-xs text-gray-600">
                Browse Jobs
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="text-xs">
                Sign in
              </Button>
            </Link>
          </div>
        )}
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link
          to="/jobs"
          className="text-xs text-gray-600 hover:text-gray-600 mb-6 inline-block"
        >
          ← Back to jobs
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-medium text-gray-900">{job.title}</h1>
            <Badge variant="secondary" className="text-xs">
              {job.jobType}
            </Badge>
          </div>
          <p className="text-xs text-gray-600">
            {job.postedBy?.name} · {job.location} · {job.salary}
          </p>
        </div>

        <div className="border-t border-gray-100 mb-8" />

        <div className="mb-8">
          <p className="text-xs text-gray-600 mb-3">Skills required</p>
          <div className="flex gap-2 flex-wrap">
            {job.skills.map((skill, i) => (
              <Badge key={i} variant="outline" className="text-xs font-normal">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <p className="text-xs text-gray-600 mb-3">About this role</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Candidate — apply */}
        {user?.role === "Candidate" && (
          <Button
            className="bg-gray-900 hover:bg-gray-700 text-white text-xs px-8"
            onClick={() => navigate(`/candidate/apply/${job._id}`)}
          >
            Apply now
          </Button>
        )}

        {/* Admin — no apply */}
        {user?.role === "Admin" && (
          <p className="text-xs text-gray-600">You are viewing as admin</p>
        )}

        {/* Not logged in */}
        {!user && (
          <div className="flex items-center gap-3">
            <Button
              className="bg-gray-900 hover:bg-gray-700 text-white text-xs px-8"
              onClick={() => navigate("/register")}
            >
              Sign up to apply
            </Button>
            <p className="text-xs text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">
                Sign in
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
