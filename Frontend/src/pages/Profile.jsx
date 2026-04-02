import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/pages/DashboardLayout";
import API from "@/api/api";
import { AuthContext } from "@/components/Global/AuthProvider";

const Field = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  editing,
  userValue,
}) => (
  <div className="flex justify-between items-center">
    <p className="text-xs text-gray-400 w-32 shrink-0">{label}</p>
    {editing ? (
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-200 rounded-lg px-3 py-1 text-xs outline-none flex-1"
      />
    ) : (
      <p className="text-xs text-gray-900">{userValue || "—"}</p>
    )}
  </div>
);

export default function Profile() {
  const { user, Login } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // resume upload state
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [resumeSuccess, setResumeSuccess] = useState("");
  const [resumeError, setResumeError] = useState("");

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    experience: user?.experience || "",
    bio: user?.bio || "",
    skills: user?.skills?.join(", ") || "",
    companyName: user?.companyName || "",
    companyWebsite: user?.companyWebsite || "",
    companySize: user?.companySize || "",
    jobRole: user?.jobRole || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setEditing(false);
    setError("");
    setSuccess("");
    setForm({
      name: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || "",
      experience: user?.experience || "",
      bio: user?.bio || "",
      skills: user?.skills?.join(", ") || "",
      companyName: user?.companyName || "",
      companyWebsite: user?.companyWebsite || "",
      companySize: user?.companySize || "",
      jobRole: user?.jobRole || "",
    });
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()),
      };
      const res = await API.put("/api/auth/update-profile", payload);
      Login(res.data.user);
      setSuccess("Profile updated");
      setEditing(false);
      setError("");
    } catch (err) {
      setError("Failed to update");
    }
  };

  // upload resume and save url to profile
  const handleResumeUpload = async () => {
    if (!resumeFile) return;
    setUploading(true);
    setResumeError("");
    setResumeSuccess("");
    try {
      // 1. upload file
      const formData = new FormData();
      formData.append("resume", resumeFile);
      const uploadRes = await API.post("/api/upload/resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // 2. save resumeUrl to profile
      const updateRes = await API.put("/api/auth/update-profile", {
        resumeUrl: uploadRes.data.resumeUrl,
      });

      // 3. update context so user.resumeUrl is fresh
      Login(updateRes.data.user);
      setResumeSuccess("Resume uploaded successfully!");
      setResumeFile(null);
    } catch (err) {
      setResumeError("Resume upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <DashboardLayout title="Profile">
      <p className="text-2xl font-medium text-gray-900 mb-8">Profile</p>

      {/* Basic Info */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-gray-400">Basic Info</p>
          <button
            onClick={editing ? handleCancel : () => setEditing(true)}
            className="text-xs text-blue-500 hover:text-blue-600"
          >
            {editing ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="space-y-3">
          <Field
            label="Name"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            editing={editing}
            userValue={user?.name}
          />

          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-400 w-32">Email</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-400 w-32">Role</p>
            <p className="text-xs text-gray-400">{user?.role}</p>
          </div>

          <Field
            label="Phone"
            name="phone"
            placeholder="Your phone"
            value={form.phone}
            onChange={handleChange}
            editing={editing}
            userValue={user?.phone}
          />
          <Field
            label="Address"
            name="address"
            placeholder="Your address"
            value={form.address}
            onChange={handleChange}
            editing={editing}
            userValue={user?.address}
          />
        </div>
      </div>

      {/* Candidate Fields */}
      {user?.role === "Candidate" && (
        <div className="bg-white border border-gray-100 rounded-xl p-6 mb-6">
          <p className="text-xs text-gray-400 mb-4">Career Info</p>
          <div className="space-y-3">
            <Field
              label="Experience"
              name="experience"
              placeholder="e.g. Fresher, 1-2 years"
              value={form.experience}
              onChange={handleChange}
              editing={editing}
              userValue={user?.experience}
            />
            <Field
              label="Skills"
              name="skills"
              placeholder="e.g. React, Node.js"
              value={form.skills}
              onChange={handleChange}
              editing={editing}
              userValue={user?.skills?.join(", ")}
            />
            <Field
              label="Bio"
              name="bio"
              placeholder="Short about you"
              value={form.bio}
              onChange={handleChange}
              editing={editing}
              userValue={user?.bio}
            />
          </div>
        </div>
      )}

      {/* Resume Upload — candidates only */}
      {user?.role === "Candidate" && (
        <div className="bg-white border border-gray-100 rounded-xl p-6 mb-6">
          <p className="text-xs text-gray-400 mb-4">Resume</p>

          {/* Current resume */}
          {user?.resumeUrl ? (
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-gray-700 font-medium">
                  Current Resume
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Uploaded ✓</p>
              </div>
              <a
                href={`${import.meta.env.VITE_API_URL}${user.resumeUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-500 hover:text-blue-600"
              >
                View Resume
              </a>
            </div>
          ) : (
            <p className="text-xs text-gray-400 mb-4">No resume uploaded yet</p>
          )}

          {/* Upload new resume */}
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => {
                setResumeFile(e.target.files[0]);
                setResumeSuccess("");
                setResumeError("");
              }}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-xs outline-none"
            />
            <button
              onClick={handleResumeUpload}
              disabled={!resumeFile || uploading}
              className="text-xs bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 shrink-0"
            >
              {uploading
                ? "Uploading..."
                : user?.resumeUrl
                  ? "Replace"
                  : "Upload"}
            </button>
          </div>

          {resumeSuccess && (
            <p className="text-xs text-green-500 mt-2">{resumeSuccess}</p>
          )}
          {resumeError && (
            <p className="text-xs text-red-500 mt-2">{resumeError}</p>
          )}
          <p className="text-xs text-gray-300 mt-2">PDF only · max 5MB</p>
        </div>
      )}

      {/* Admin Fields */}
      {user?.role === "Admin" && (
        <div className="bg-white border border-gray-100 rounded-xl p-6 mb-6">
          <p className="text-xs text-gray-400 mb-4">Company Info</p>
          <div className="space-y-3">
            <Field
              label="Company Name"
              name="companyName"
              placeholder="Your company"
              value={form.companyName}
              onChange={handleChange}
              editing={editing}
              userValue={user?.companyName}
            />
            <Field
              label="Website"
              name="companyWebsite"
              placeholder="https://..."
              value={form.companyWebsite}
              onChange={handleChange}
              editing={editing}
              userValue={user?.companyWebsite}
            />
            <Field
              label="Company Size"
              name="companySize"
              placeholder="e.g. 1-10, 50-100"
              value={form.companySize}
              onChange={handleChange}
              editing={editing}
              userValue={user?.companySize}
            />
            <Field
              label="Your Role"
              name="jobRole"
              placeholder="e.g. HR, CTO, Founder"
              value={form.jobRole}
              onChange={handleChange}
              editing={editing}
              userValue={user?.jobRole}
            />
          </div>
        </div>
      )}

      {/* Save */}
      {editing && (
        <div className="mb-6">
          {error && <p className="text-xs text-red-500 mb-2">{error}</p>}
          <button
            onClick={handleSave}
            className="text-xs bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            Save Changes
          </button>
        </div>
      )}

      {success && <p className="text-xs text-green-500 mb-6">{success}</p>}

      {/* Reset Password */}
      <div className="bg-white border border-gray-100 rounded-xl p-6">
        <p className="text-xs text-gray-400 mb-4">Password</p>
        <Link
          to="/forgot-password"
          className="text-xs bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Reset Password
        </Link>
      </div>
    </DashboardLayout>
  );
}
