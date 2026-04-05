import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "@/api/api";
import { Player } from "@lottiefiles/react-lottie-player";
import { AuthContext } from "@/components/Global/AuthProvider";
import applyAnimation from "@/assets/CheckboxAnimation.json";

export default function Apply() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user, Logout } = useContext(AuthContext);

  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [useProfileResume, setUseProfileResume] = useState(!!user?.resumeUrl);
  const [resume, setResume] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(user?.resumeUrl || "");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(7);

  const dashboardPath = "/candidate/dashboard";

  useEffect(() => {
    API.get(`/api/jobs/${jobId}`)
      .then((res) => setJob(res.data))
      .catch(console.error);
  }, [jobId]);

  useEffect(() => {
    if (!success) return;
    if (countdown === 0) {
      navigate(dashboardPath);
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [success, countdown, navigate]);

  const handleLogout = async () => {
    try {
      await API.post("/api/auth/logout");
    } catch {}
    Logout();
    navigate("/login");
  };

  const handleToggleResume = (useProfile) => {
    setUseProfileResume(useProfile);
    setError("");
    setResume(null);
    setResumeUrl(useProfile ? user?.resumeUrl || "" : "");
  };

  const handleUpload = async () => {
    if (!resume) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("resume", resume);
      const res = await API.post("/api/upload/resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResumeUrl(res.data.resumeUrl);
    } catch {
      setError("Resume upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeUrl) {
      setError(
        useProfileResume
          ? "No resume on profile. Please upload one."
          : "Please upload your resume first",
      );
      return;
    }
    setLoading(true);
    setError("");
    try {
      await API.post("/api/applications", { jobId, coverLetter, resumeUrl });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Application failed");
    } finally {
      setLoading(false);
    }
  };

  // Double navbar for public and candidate
  const Navbar = () => (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
      <img src="/Hireflow_logo.svg" alt="Logo" className="h-7 w-auto" />
      {user && (
        <div className="flex items-center gap-4">
          <Link
            to={dashboardPath}
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            Dashboard
          </Link>
          <p className="text-xs text-gray-700 font-medium">{user.name}</p>
          <button
            onClick={handleLogout}
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <Player
              autoplay
              loop
              src={applyAnimation} 
              style={{ height: "200px", width: "200px" }}
            />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Application submitted!
            </p>
            <p className="text-xs text-gray-400 mb-6">
              Redirecting to dashboard in{" "}
              <span className="font-medium text-gray-700">{countdown}s</span>
            </p>
            <button
              onClick={() => navigate(dashboardPath)}
              className="text-xs bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
            >
              Go to dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link
          to={`/jobs/${jobId}`}
          className="text-xs text-gray-400 hover:text-gray-600 mb-6 inline-block"
        >
          ← Back to job
        </Link>

        {job && (
          <div className="mb-8">
            <h1 className="text-2xl font-medium text-gray-900 mb-1">
              Apply for {job.title}
            </h1>
            <p className="text-xs text-gray-400">
              {job.postedBy?.name} · {job.location} · {job.salary}
            </p>
          </div>
        )}

        <div className="border-t border-gray-100 mb-8" />

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Resume */}
          <div>
            <p className="text-xs text-gray-400 mb-3">Resume</p>

            {user?.resumeUrl && (
              <div className="flex gap-2 mb-4">
                {[
                  { label: "Use profile resume", val: true },
                  { label: "Upload new resume", val: false },
                ].map(({ label, val }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => handleToggleResume(val)}
                    className={`text-xs px-4 py-2 rounded-lg border transition ${
                      useProfileResume === val
                        ? "bg-gray-900 text-white border-gray-900"
                        : "border-gray-200 text-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            {useProfileResume && user?.resumeUrl ? (
              <div className="border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between">
                <p className="text-xs text-gray-700">
                  Resume from your profile ✓
                </p>
                <a
                  href={`${import.meta.env.VITE_API_URL}${user.resumeUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-500 hover:text-blue-600"
                >
                  Preview
                </a>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      setResume(e.target.files[0]);
                      setResumeUrl("");
                    }}
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleUpload}
                    disabled={!resume || uploading}
                    className="text-xs border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 disabled:opacity-50 shrink-0"
                  >
                    {uploading ? "Uploading..." : "Upload"}
                  </button>
                </div>
                {resumeUrl && !useProfileResume && (
                  <p className="text-xs text-green-500 mt-1">
                    ✓ Resume uploaded
                  </p>
                )}
                <p className="text-xs text-gray-300 mt-1">PDF only · max 5MB</p>
              </div>
            )}

            {!user?.resumeUrl && (
              <p className="text-xs text-gray-400 mt-2">
                💡 Upload your resume on your{" "}
                <Link
                  to="/profile"
                  className="text-blue-500 hover:text-blue-600"
                >
                  profile
                </Link>{" "}
                to reuse it across applications
              </p>
            )}
          </div>

          {/* Cover Letter */}
          <div>
            <p className="text-xs text-gray-400 mb-2">
              Cover letter (optional)
            </p>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Tell us why you're a great fit..."
              rows={5}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none resize-none"
            />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading || !resumeUrl}
            className="w-full bg-gray-900 text-white py-2 rounded-lg text-xs font-medium hover:bg-gray-700 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit application"}
          </button>
        </form>
      </div>
    </div>
  );
}
