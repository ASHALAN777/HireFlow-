import { useState, useEffect } from "react";
import DashboardLayout from "@/pages/DashboardLayout";
import API from "@/api/api";

const columns = ["applied", "interview", "hired", "rejected"];

export default function AdminStatus() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    API.get("/api/applications").then((res) => setApplications(res.data));
  }, []);

  const handleStatusChange = async (appId, newStatus) => {
    await API.put(`/api/applications/${appId}/status`, { status: newStatus });
    setApplications(
      applications.map((app) =>
        app._id === appId ? { ...app, status: newStatus } : app,
      ),
    );
  };

  const getByStatus = (status) =>
    applications.filter((a) => a.status === status);

  return (
    <DashboardLayout title="Status Board">
      <p className="text-2xl font-medium text-gray-900 mb-8">Status Board</p>

      <div className="grid grid-cols-4 gap-4">
        {columns.map((col) => (
          <div
            key={col}
            className="bg-white border border-gray-100 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-medium text-gray-700 capitalize">
                {col}
              </p>
              <p className="text-xs text-gray-600">{getByStatus(col).length}</p>
            </div>

            <div className="flex flex-col gap-3">
              {getByStatus(col).length === 0 ? (
                <p className="text-xs text-gray-300 text-center py-4">Empty</p>
              ) : (
                getByStatus(col).map((app) => (
                  <div
                    key={app._id}
                    className="border border-gray-100 rounded-lg p-3"
                  >
                    <p className="text-xs font-medium text-gray-900 mb-1">
                      {app.candidate?.name}
                    </p>
                    <p className="text-xs text-gray-600 mb-2">
                      {app.job?.title}
                    </p>
                    <select
                      value={app.status}
                      onChange={(e) =>
                        handleStatusChange(app._id, e.target.value)
                      }
                      className="w-full border border-gray-200 rounded-lg px-2 py-1 text-xs outline-none bg-white"
                    >
                      <option value="applied">Applied</option>
                      <option value="interview">Interview</option>
                      <option value="hired">Hired</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
