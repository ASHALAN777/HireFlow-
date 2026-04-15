import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "@/api/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/components/Global/AuthProvider";

export default function JobListings() {
  const { user, Logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    API.get("/api/jobs/public")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    try {
      await API.post("/api/auth/logout");
    } catch (err) {}
    Logout();
    navigate("/login");
  };

  const filtered = jobs.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || job.jobType === filter;
    return matchSearch && matchFilter;
  });

  const dashboardPath =
    user?.role === "Admin" ? "/admin/dashboard" : "/candidate/dashboard";

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
        <img src="/Hireflow_logo.svg" alt="Logo" className="h-7 w-auto" />

        {user ? (
          // logged in navbar
          <div className="flex items-center gap-4">
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
          // not logged in navbar
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline" className="text-xs">
                Sign in
              </Button>
            </Link>
            <Link to="/register">
              <Button className="text-xs bg-gray-900 hover:bg-gray-700 text-white">
                Get started
              </Button>
            </Link>
          </div>
        )}
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-gray-900 mb-1">
            Browse Jobs
          </h1>
          <p className="text-xs text-gray-600">Find your next opportunity</p>
        </div>

        {/* Search + Filter */}
        <div className="flex items-center gap-3 mb-8">
          <Input
            type="text"
            placeholder="Search by title or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-xs"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-gray-400 bg-white"
          >
            <option value="all">All types</option>
            <option value="fulltime">Full time</option>
            <option value="parttime">Part time</option>
            <option value="internship">Internship</option>
            <option value="remote">Remote</option>
          </select>
        </div>

        {/* Job List */}
        {loading ? (
          <p className="text-xs text-gray-600 text-center py-12">
            Loading jobs...
          </p>
        ) : filtered.length === 0 ? (
          <p className="text-xs text-gray-600 text-center py-12">
            No jobs found
          </p>
        ) : (
          <div className="divide-y divide-gray-100">
            {filtered.map((job) => (
              <div
                key={job._id}
                className="py-5 flex items-start justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-gray-900">
                      {job.title}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {job.jobType}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">
                    {job.postedBy?.name} · {job.location} · {job.salary}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {job.skills.slice(0, 3).map((skill, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="text-xs font-normal"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Link to={`/jobs/${job._id}`}>
                  <Button variant="outline" className="text-xs ml-4 shrink-0">
                    View
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
