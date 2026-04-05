import { useState } from "react"
import DashboardLayout from "@/pages/DashboardLayout"
import API from "@/api/api"
import { Button } from "@/components/ui/button"

export default function ResumeAdvisor() {
  const [resumeFile, setResumeFile] = useState(null)
  const [jobDescription, setJobDescription] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleScore = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      setError("Please upload your resume and provide a job description")
      return
    }
    try {
      setLoading(true)
      setError("")
      setResult(null)

      const formData = new FormData()
      formData.append("resume", resumeFile)
      formData.append("jobDescription", jobDescription)

      const res = await API.post("/api/ai/score", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      setResult(res.data)
    } catch (err) {
      if (err.response?.status === 429) {
        setError("AI is busy. Please try again in 1 minute.")
      } else if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError("AI scoring failed. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 75) return "text-green-600"
    if (score >= 50) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreBg = (score) => {
    if (score >= 75) return "bg-green-50 border-green-100"
    if (score >= 50) return "bg-yellow-50 border-yellow-100"
    return "bg-red-50 border-red-100"
  }

  const getScoreLabel = (score) => {
    if (score >= 75) return "Great Match! 🎉"
    if (score >= 50) return "Decent Match 👍"
    return "Low Match ⚠️"
  }

  return (
    <DashboardLayout title="AI Resume Advisor">

      <p className="text-2xl font-medium text-gray-900 mb-2">AI Resume Advisor</p>
      <p className="text-xs text-gray-400 mb-8">Upload your resume and paste the job description to get an AI-powered score and feedback</p>

      {!result ? (
        <div className="space-y-6">

          <div className="grid grid-cols-2 gap-6">

            {/* Resume Upload */}
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <p className="text-xs text-gray-400 mb-3">Your Resume</p>

              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition">
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => {
                    setResumeFile(e.target.files[0])
                    setError("")
                  }}
                />
                {resumeFile ? (
                  <div className="text-center">
                    <p className="text-xs text-gray-900 font-medium mb-1">📄 {resumeFile.name}</p>
                    <p className="text-xs text-gray-400">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    <p className="text-xs text-green-500 mt-2">✓ Ready to analyze</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-1">Click to upload PDF</p>
                    <p className="text-xs text-gray-300">PDF only · max 5MB</p>
                  </div>
                )}
              </label>

              {resumeFile && (
                <button
                  onClick={() => setResumeFile(null)}
                  className="text-xs text-gray-400 hover:text-gray-600 mt-2"
                >
                  × Remove file
                </button>
              )}
            </div>

            {/* Job Description */}
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <p className="text-xs text-gray-400 mb-3">Job Description</p>
              <textarea
                value={jobDescription}
                onChange={(e) => {
                  setJobDescription(e.target.value)
                  setError("")
                }}
                placeholder="Paste the job description here..."
                rows={10}
                className="w-full text-xs text-gray-700 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-gray-400 resize-none leading-relaxed"
              />
            </div>

          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <Button
            onClick={handleScore}
            disabled={loading || !resumeFile || !jobDescription.trim()}
            className="text-xs bg-gray-900 hover:bg-gray-700 text-white"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </Button>

        </div>
      ) : (
        <div className="space-y-6">

          {/* Score card */}
          <div className={`border rounded-xl p-6 ${getScoreBg(result.score)}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-400 mb-2">Match Score</p>
                <p className={`text-5xl font-medium mb-1 ${getScoreColor(result.score)}`}>
                  {result.score}<span className="text-lg text-gray-400">/100</span>
                </p>
                <p className={`text-xs font-medium mt-1 ${getScoreColor(result.score)}`}>
                  {getScoreLabel(result.score)}
                </p>
              </div>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${
                result.score >= 75 ? "border-green-400 bg-green-50" :
                result.score >= 50 ? "border-yellow-400 bg-yellow-50" :
                "border-red-400 bg-red-50"
              }`}>
                <p className={`text-sm font-medium ${getScoreColor(result.score)}`}>{result.score}</p>
              </div>
            </div>
            <div className="border-t border-gray-100 mt-4 pt-4">
              <p className="text-xs text-gray-400 mb-1">Overall Feedback</p>
              <p className="text-xs text-gray-700 leading-relaxed">{result.feedback}</p>
            </div>
          </div>

          {/* Strengths + Weaknesses */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <p className="text-xs text-gray-400 mb-4">Strengths ✅</p>
              <div className="space-y-2">
                {result.strengths?.map((strength, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-green-500 text-xs mt-0.5">•</span>
                    <p className="text-xs text-gray-700 leading-relaxed">{strength}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <p className="text-xs text-gray-400 mb-4">Areas to Improve ⚠️</p>
              <div className="space-y-2">
                {result.weaknesses?.map((weakness, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-yellow-500 text-xs mt-0.5">•</span>
                    <p className="text-xs text-gray-700 leading-relaxed">{weakness}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Missing Skills */}
          {result.missingSkills?.length > 0 && (
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <p className="text-xs text-gray-400 mb-4">Missing Skills 🎯</p>
              <div className="flex flex-wrap gap-2">
                {result.missingSkills.map((skill, i) => (
                  <span key={i} className="text-xs px-3 py-1 bg-red-50 text-red-500 rounded-full border border-red-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => {
              setResult(null)
              setResumeFile(null)
              setJobDescription("")
              setError("")
            }}
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            ← Analyze another resume
          </button>

        </div>
      )}

    </DashboardLayout>
  )
}