import { useState } from "react"
import DashboardLayout from "@/pages/DashboardLayout"
import API from "@/api/api"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ResumeAdvisor() {
  const [resumeText, setResumeText] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleScore = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError("Please fill in both fields")
      return
    }
    try {
      setLoading(true)
      setError("")
      setResult(null)
      const res = await API.post("/api/ai/score", { resumeText, jobDescription })
      setResult(res.data)
    } catch (err) {
      setError("AI scoring failed. Please try again.")
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

  return (
    <DashboardLayout title="AI Resume Advisor">

      <p className="text-2xl font-medium text-gray-900 mb-2">AI Resume Advisor</p>
      <p className="text-xs text-gray-400 mb-8">Paste your resume and job description to get an AI-powered score and feedback</p>

      <div className="grid grid-cols-2 gap-6 mb-6">

        {/* Resume Input */}
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <p className="text-xs text-gray-400 mb-3">Your Resume</p>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume text here..."
            rows={12}
            className="w-full text-xs text-gray-700 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-gray-400 resize-none leading-relaxed"
          />
        </div>

        {/* Job Description Input */}
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <p className="text-xs text-gray-400 mb-3">Job Description</p>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            rows={12}
            className="w-full text-xs text-gray-700 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-gray-400 resize-none leading-relaxed"
          />
        </div>

      </div>

      {/* Error */}
      {error && <p className="text-xs text-red-500 mb-4">{error}</p>}

      {/* Submit Button */}
      <Button
        onClick={handleScore}
        disabled={loading}
        className="text-xs bg-gray-900 hover:bg-gray-700 text-white mb-8"
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </Button>

      {/* Results */}
      {result && (
        <div className="space-y-6">

          {/* Score */}
          <div className={`border rounded-xl p-6 ${getScoreBg(result.score)}`}>
            <p className="text-xs text-gray-400 mb-2">Match Score</p>
            <p className={`text-5xl font-medium mb-1 ${getScoreColor(result.score)}`}>
              {result.score}<span className="text-lg text-gray-400">/100</span>
            </p>
            <p className="text-xs text-gray-500 leading-relaxed mt-3">{result.feedback}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">

            {/* Strengths */}
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

            {/* Weaknesses */}
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

          {/* Try Again */}
          <button
            onClick={() => { setResult(null); setResumeText(""); setJobDescription("") }}
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            ← Try another resume
          </button>

        </div>
      )}

    </DashboardLayout>
  )
}
