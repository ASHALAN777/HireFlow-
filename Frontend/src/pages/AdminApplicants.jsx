// import { useState, useEffect } from "react"
// import DashboardLayout from "@/pages/DashboardLayout"
// import API from "@/api/api"

// export default function AdminApplicants() {
//   const [applications, setApplications] = useState([])

//   useEffect(() => {
//     API.get("/api/applications").then((res) => setApplications(res.data))
//   }, [])

//   return (
//     <DashboardLayout title="All Applicants">

//       <p className="text-2xl font-medium text-gray-900 mb-8">All Applicants</p>

//       <div className="bg-white border border-gray-100 rounded-xl divide-y divide-gray-100">
//         {applications.length === 0 ? (
//           <p className="text-xs text-gray-400 text-center py-12">No applications yet</p>
//         ) : applications.map((app) => (
//           <div key={app._id} className="px-5 py-4 flex items-center justify-between">
//             <div>
//               <p className="text-xs font-medium text-gray-900">{app.candidate?.name}</p>
//               <p className="text-xs text-gray-400 mt-0.5">{app.candidate?.email}</p>
//               <p className="text-xs text-gray-400 mt-0.5">{app.job?.title} · {app.job?.location}</p>
//             </div>
//             <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
//               {app.status}
//             </span>
//           </div>
//         ))}
//       </div>

//     </DashboardLayout>
//   )
// }


import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DashboardLayout from "@/pages/DashboardLayout"
import API from "@/api/api"
import { Button } from "@/components/ui/button"

export default function AdminApplicants() {
  const [applications, setApplications] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    API.get("/api/applications").then((res) => setApplications(res.data))
  }, [])

  return (
    <DashboardLayout title="All Applicants">

      <p className="text-2xl font-medium text-gray-900 mb-8">All Applicants</p>

      <div className="bg-white border border-gray-100 rounded-xl divide-y divide-gray-100">
        {applications.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-12">No applications yet</p>
        ) : applications.map((app) => (
          <div key={app._id} className="px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-900">{app.candidate?.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{app.candidate?.email}</p>
              <p className="text-xs text-gray-400 mt-0.5">{app.job?.title} · {app.job?.location}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                {app.status}
              </span>
              <Button
                variant="outline"
                className="text-xs"
                onClick={() => navigate(`/admin/applicants/${app._id}`)}
              >
                View
              </Button>
            </div>
          </div>
        ))}
      </div>

    </DashboardLayout>
  )
}
