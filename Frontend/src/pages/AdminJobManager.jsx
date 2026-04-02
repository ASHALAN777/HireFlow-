import { useState, useEffect } from "react"
import DashboardLayout from "@/pages/DashboardLayout"
import API from "@/api/api"

export default function AdminJobManager() {
  const [jobs, setJobs] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editJob, setEditJob] = useState(null)
  const [form, setForm] = useState({
    title: "", description: "", skills: "",
    location: "", salary: "", jobType: "fulltime"
  })
  

  useEffect(() => { fetchJobs() }, [])

  const fetchJobs = () => {
    API.get("/api/jobs").then((res) => setJobs(res.data))
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const resetForm = () => {
    setForm({ title: "", description: "", skills: "", location: "", salary: "", jobType: "fulltime" })
    setEditJob(null)
    setShowForm(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = { ...form, skills: form.skills.split(",").map(s => s.trim()) }
    if (editJob) {
      await API.put(`/api/jobs/${editJob._id}`, payload)
    } else {
      await API.post("/api/jobs", payload)
    }
    resetForm()
    fetchJobs()
  }

  const handleEdit = (job) => {
    setEditJob(job)
    setForm({
      title: job.title,
      description: job.description,
      skills: job.skills.join(", "),
      location: job.location,
      salary: job.salary,
      jobType: job.jobType
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return
    await API.delete(`/api/jobs/${id}`)
    fetchJobs()
  }

  return (
    <DashboardLayout title="Job Manager">

      <div className="flex items-center justify-between mb-8">
        <p className="text-2xl font-medium text-gray-900">Job Manager</p>
        <button
          onClick={() => showForm ? resetForm() : setShowForm(true)}
          className="text-xs bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          {showForm ? "Cancel" : "Post New Job"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-gray-100 rounded-xl p-6 mb-8">
          <p className="text-sm font-medium text-gray-900 mb-4">{editJob ? "Edit Job" : "Post New Job"}</p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input name="title" placeholder="Job Title" value={form.title} onChange={handleChange} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none" />
            <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none" />
            <input name="salary" placeholder="Salary e.g. 5-8 LPA" value={form.salary} onChange={handleChange} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none" />
            <input name="skills" placeholder="Skills e.g. React, Node.js" value={form.skills} onChange={handleChange} required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none" />
            <select name="jobType" value={form.jobType} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none bg-white">
              <option value="fulltime">Full time</option>
              <option value="parttime">Part time</option>
              <option value="internship">Internship</option>
              <option value="remote">Remote</option>
            </select>
            <textarea name="description" placeholder="Job description..." value={form.description} onChange={handleChange} required rows={4} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none resize-none" />
            <button type="submit" className="text-xs bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
              {editJob ? "Update Job" : "Post Job"}
            </button>
          </form>
        </div>
      )}

      {/* Jobs List */}
      <div className="bg-white border border-gray-100 rounded-xl divide-y divide-gray-100">
        {jobs.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-12">No jobs posted yet</p>
        ) : jobs.map((job) => (
          <div key={job._id} className="px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-900 mb-0.5">{job.title}</p>
              <p className="text-xs text-gray-400">{job.location} · {job.salary} · {job.jobType}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(job)} className="text-xs border border-gray-200 px-3 py-1 rounded-lg hover:bg-gray-50">
                Edit
              </button>
              <button onClick={() => handleDelete(job._id)} className="text-xs border border-red-100 text-red-400 px-3 py-1 rounded-lg hover:bg-red-50">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </DashboardLayout>
  )
}