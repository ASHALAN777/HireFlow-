import { useState } from "react";
import DashboardLayout from "@/pages/DashboardLayout";
import API from "@/api/api";
import { Button } from "@/components/ui/button";

export default function ResumeAdvisor() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleScore = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      setError("Please upload your resume and provide a job description");
      return;
    }
    try {
      setLoading(true);
      setError("");
      setResult(null);

      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("jobDescription", jobDescription);

      const res = await API.post("/api/ai/score", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
      if (err.response?.status === 429) {
        setError("AI is busy. Please try again in 1 minute.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("AI scoring failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 75) return "text-green-600";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreBg = (score) => {
    if (score >= 75) return "bg-green-50 border-green-100";
    if (score >= 50) return "bg-yellow-50 border-yellow-100";
    return "bg-red-50 border-red-100";
  };

  const getScoreLabel = (score) => {
    if (score >= 75) return "Great Match! 🎉";
    if (score >= 50) return "Decent Match 👍";
    return "Low Match ⚠️";
  };

  return (
    <DashboardLayout title="AI Resume Advisor">
      <div className="max-h-[calc(100vh-100px)] overflow-y-auto pr-2">
        <p className="text-xl font-medium text-gray-900 mb-1">
          AI Resume Advisor
        </p>
        <p className="text-[10px] text-gray-600 mb-6">
          Upload resume and paste description for AI feedback
        </p>

        {!result ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Resume Upload */}
              <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <p className="text-[10px] font-medium text-gray-600 mb-2 uppercase tracking-wider">
                  Your Resume
                </p>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition">
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => {
                      setResumeFile(e.target.files[0]);
                      setError("");
                    }}
                  />
                  {resumeFile ? (
                    <div className="text-center p-2">
                      <p className="text-xs text-gray-900 font-medium truncate max-w-37.5">
                        📄 {resumeFile.name}
                      </p>
                      <p className="text-[10px] text-green-500 mt-1">✓ Ready</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-[10px] text-gray-600">
                        Click to upload PDF
                      </p>
                    </div>
                  )}
                </label>
                {resumeFile && (
                  <button
                    onClick={() => setResumeFile(null)}
                    className="text-[10px] text-red-400 hover:text-red-600 mt-2"
                  >
                    × Remove
                  </button>
                )}
              </div>

              {/* Job Description */}
              <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <p className="text-[10px] font-medium text-gray-600 mb-2 uppercase tracking-wider">
                  Job Description
                </p>
                <textarea
                  value={jobDescription}
                  onChange={(e) => {
                    setJobDescription(e.target.value);
                    setError("");
                  }}
                  placeholder="Paste here..."
                  rows={6}
                  className="w-full text-xs text-gray-700 border border-gray-100 rounded-lg px-3 py-2 outline-none focus:border-gray-300 resize-none leading-relaxed bg-gray-50/50"
                />
              </div>
            </div>

            {error && <p className="text-[10px] text-red-500">{error}</p>}

            <Button
              onClick={handleScore}
              disabled={loading || !resumeFile || !jobDescription.trim()}
              className="text-xs bg-gray-900 hover:bg-gray-700 text-white px-8 h-9"
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 pb-10">
            <div
              className={`border rounded-xl p-5 ${getScoreBg(result.score)}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] text-gray-600 mb-1">Match Score</p>
                  <p
                    className={`text-4xl font-bold ${getScoreColor(result.score)}`}
                  >
                    {result.score}
                    <span className="text-sm text-gray-600">/100</span>
                  </p>
                  <p
                    className={`text-[10px] font-medium mt-1 ${getScoreColor(result.score)}`}
                  >
                    {getScoreLabel(result.score)}
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-200/50 mt-3 pt-3">
                <p className="text-[10px] text-gray-600 mb-1">Feedback</p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {result.feedback}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <p className="text-[10px] font-bold text-green-600 mb-3 uppercase">
                  Strengths
                </p>
                <div className="space-y-2">
                  {result.strengths?.map((s, i) => (
                    <p key={i} className="text-xs text-gray-600 flex gap-2">
                      <span>•</span>
                      {s}
                    </p>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <p className="text-[10px] font-bold text-yellow-600 mb-3 uppercase">
                  Improvements
                </p>
                <div className="space-y-2">
                  {result.weaknesses?.map((w, i) => (
                    <p key={i} className="text-xs text-gray-600 flex gap-2">
                      <span>•</span>
                      {w}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setResult(null);
                setResumeFile(null);
                setJobDescription("");
              }}
              className="text-xs text-gray-600 hover:text-gray-900 transition"
            >
              ← Analyze another
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
