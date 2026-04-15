import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/pages/DashboardLayout";
import API from "@/api/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Row = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <p className="text-xs text-gray-600 w-32 shrink-0">{label}</p>
    <p className="text-xs text-gray-900 flex-1">{value}</p>
  </div>
);

export default function CandidateProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/api/applications/${id}`)
      .then((res) => setApplication(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout title="Candidate Profile">
        <p className="text-xs text-gray-600 text-center py-12">Loading...</p>
      </DashboardLayout>
    );
  }

  if (!application) {
    return (
      <DashboardLayout title="Candidate Profile">
        <p className="text-xs text-gray-600 text-center py-12">
          Application not found
        </p>
      </DashboardLayout>
    );
  }

  const candidate = application.candidate;
  const job = application.job;

  return (
    <DashboardLayout title="Candidate Profile">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="text-xs text-gray-600 hover:text-gray-600 mb-6 flex items-center gap-1"
      >
        ← Back
      </button>

      <p className="text-2xl font-medium text-gray-900 mb-8">
        Candidate Profile
      </p>

      <div className="grid grid-cols-3 gap-6">
        {/* Left — candidate info */}
        <div className="col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <p className="text-xs text-gray-600 mb-4">Basic Info</p>
            <div className="space-y-3">
              <Row label="Name" value={candidate?.name || "—"} />
              <Row label="Email" value={candidate?.email || "—"} />
              <Row label="Phone" value={candidate?.phone || "—"} />
              <Row label="Address" value={candidate?.address || "—"} />
            </div>
          </div>

          {/* Career Info */}
          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <p className="text-xs text-gray-600 mb-4">Career Info</p>
            <div className="space-y-3">
              <Row label="Experience" value={candidate?.experience || "—"} />
              <Row label="Bio" value={candidate?.bio || "—"} />
              <div className="flex justify-between items-start">
                <p className="text-xs text-gray-600 w-32 shrink-0">Skills</p>
                <div className="flex flex-wrap gap-2 flex-1">
                  {candidate?.skills?.length > 0 ? (
                    candidate.skills.map((skill, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="text-xs font-normal"
                      >
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-xs text-gray-900">—</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Cover Letter */}
          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <p className="text-xs text-gray-600 mb-4">Cover Letter</p>
            {application.coverLetter ? (
              <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
                {application.coverLetter}
              </p>
            ) : (
              <p className="text-xs text-gray-600">No cover letter provided</p>
            )}
          </div>
        </div>

        {/* Right — application info */}
        <div className="space-y-6">
          {/* Application Status */}
          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <p className="text-xs text-gray-600 mb-4">Application</p>
            <div className="space-y-3">
              <Row label="Job" value={job?.title || "—"} />
              <Row label="Location" value={job?.location || "—"} />
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-600 w-32 shrink-0">Status</p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                  {application.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-600 w-32 shrink-0">Applied</p>
                <p className="text-xs text-gray-900">
                  {new Date(application.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Resume Download */}
          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <p className="text-xs text-gray-600 mb-4">Resume</p>
            {application.resumeUrl ? (
              <a
                href={`${import.meta.env.VITE_API_URL}${application.resumeUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <Button className="w-full text-xs bg-gray-900 hover:bg-gray-700 text-white">
                  Download Resume
                </Button>
              </a>
            ) : (
              <p className="text-xs text-gray-600">No resume uploaded</p>
            )}
          </div>

          {/* AI Score (if exists) */}
          {application.aiScore !== null && (
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <p className="text-xs text-gray-600 mb-4">AI Score</p>
              <p className="text-3xl font-medium text-gray-900 mb-2">
                {application.aiScore}
                <span className="text-sm text-gray-600">/100</span>
              </p>
              {application.aiFeedback && (
                <p className="text-xs text-gray-500 leading-relaxed">
                  {application.aiFeedback}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
