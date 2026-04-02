import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import DashboardLayout from "@/pages/DashboardLayout"
import API from "@/api/api"

export default function CandidateApplications() {
  const [applications, setApplications] = useState([])

  useEffect(() => {
    API.get("/api/applications/me").then((res) => setApplications(res.data))
  }, [])

  return (
    <DashboardLayout title="My Applications">

      <div className="flex items-center justify-between mb-8">
        <p className="text-2xl font-medium text-gray-900">My Applications</p>
        <Link to="/jobs" className="text-xs bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
          Browse Jobs
        </Link>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl divide-y divide-gray-100">
        {applications.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-12">No applications yet</p>
        ) : applications.map((app) => (
          <div key={app._id} className="px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-900">{app.job?.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{app.job?.location} · {app.job?.salary} · {app.job?.jobType}</p>
              {app.aiScore && (
                <p className="text-xs text-gray-400 mt-0.5">AI Score: {app.aiScore}/100</p>
              )}
              {app.aiFeedback && (
                <p className="text-xs text-gray-400 mt-0.5">{app.aiFeedback}</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                {app.status}
              </span>
              <Link to={`/jobs/${app.job?._id}`} className="text-xs border border-gray-200 px-3 py-1 rounded-lg hover:bg-gray-50">
                View Job
              </Link>
            </div>
          </div>
        ))}
      </div>

    </DashboardLayout>
  )
}