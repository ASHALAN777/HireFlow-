import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/pages/DashboardLayout";
import API from "@/api/api";

export default function AdminDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    API.get("/api/jobs").then((res) => setJobs(res.data));
    API.get("/api/applications").then((res) => setApplications(res.data));
  }, []);

  return (
    <DashboardLayout title="Dashboard">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-100 rounded-xl p-5 text-center">
          <p className="text-2xl font-medium text-gray-900">{jobs.length}</p>
          <p className="text-xs text-gray-600 mt-1">Jobs Posted</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5 text-center">
          <p className="text-2xl font-medium text-gray-900">
            {applications.length}
          </p>
          <p className="text-xs text-gray-600 mt-1">Total Applicants</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5 text-center">
          <p className="text-2xl font-medium text-gray-900">
            {applications.filter((a) => a.status === "interview").length}
          </p>
          <p className="text-xs text-gray-600 mt-1">Interviews</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5 text-center">
          <p className="text-2xl font-medium text-gray-900">
            {applications.filter((a) => a.status === "hired").length}
          </p>
          <p className="text-xs text-gray-600 mt-1">Hired</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 mb-8">
        <Link
          to="/admin/jobs"
          className="text-xs bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Post New Job
        </Link>
        <Link
          to="/admin/status"
          className="text-xs border border-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50"
        >
          View Status Board
        </Link>
      </div>

      <div className="border-t border-gray-100 mb-6" />

      {/* Recent Applications */}
      <p className="text-sm font-medium text-gray-900 mb-4">
        Recent Applications
      </p>
      <div className="bg-white border border-gray-100 rounded-xl divide-y divide-gray-100">
        {applications.slice(0, 5).map((app) => (
          <div
            key={app._id}
            className="px-5 py-4 flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-medium text-gray-900">
                {app.candidate?.name}
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                {app.job?.title} · {app.job?.location}
              </p>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
              {app.status}
            </span>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
