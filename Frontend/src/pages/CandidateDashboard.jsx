import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/pages/DashboardLayout";
import API from "@/api/api";

export default function CandidateDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    API.get("/api/applications/me").then((res) => setApplications(res.data));
  }, []);

  return (
    <DashboardLayout title="Dashboard">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-100 rounded-xl p-5 text-center">
          <p className="text-2xl font-medium text-gray-900">
            {applications.length}
          </p>
          <p className="text-xs text-gray-600 mt-1">Total</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5 text-center">
          <p className="text-2xl font-medium text-gray-900">
            {applications.filter((a) => a.status === "applied").length}
          </p>
          <p className="text-xs text-gray-600 mt-1">Applied</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5 text-center">
          <p className="text-2xl font-medium text-gray-900">
            {applications.filter((a) => a.status === "interview").length}
          </p>
          <p className="text-xs text-gray-600 mt-1">Interview</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5 text-center">
          <p className="text-2xl font-medium text-gray-900">
            {applications.filter((a) => a.status === "hired").length}
          </p>
          <p className="text-xs text-gray-600 mt-1">Hired</p>
        </div>
      </div>

      <div className="mb-6">
        <Link
          to="/jobs"
          className="text-xs bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Browse Jobs
        </Link>
      </div>

      <div className="border-t border-gray-100 mb-6" />

      <p className="text-sm font-medium text-gray-900 mb-4">My Applications</p>

      <div className="bg-white border border-gray-100 rounded-xl divide-y divide-gray-100">
        {applications.length === 0 ? (
          <p className="text-xs text-gray-600 text-center py-12">
            No applications yet
          </p>
        ) : (
          applications.map((app) => (
            <div
              key={app._id}
              className="px-5 py-4 flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-medium text-gray-900">
                  {app.job?.title}
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  {app.job?.location} · {app.job?.salary}
                </p>
                {app.aiScore && (
                  <p className="text-xs text-gray-600 mt-0.5">
                    AI Score: {app.aiScore}/100
                  </p>
                )}
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                {app.status}
              </span>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
