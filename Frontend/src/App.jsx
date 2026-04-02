import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// public
import Landing from "@/pages/LandingPage";
import JobListings from "@/pages/JobListings";
import JobDetails from "@/pages/JobDetails";

// auth
import RoleRedirect from "@/components/Global/RoleRedirect";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import VerifyOtp from "@/pages/VerifyOtp";
import ResetPassword from "@/pages/ResetPassword";

// admin
import AdminDashboard from "@/pages/AdminDashboard";
import AdminJobManager from "@/pages/AdminJobManager";
import AdminApplicants from "@/pages/AdminApplicants";
import AdminStatus from "@/pages/AdminStatus";
import CandidateProfile from "./pages/CandidateProfile";


// candidate
import CandidateDashboard from "@/pages/CandidateDashboard";
import CandidateApplications from "@/pages/CandidateApplications";
import Apply from "@/pages/Apply";
import ResumeAdvisor from "./pages/ResumeAdvisor";


// shared
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/Global/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/jobs" element={<JobListings />} />
        <Route path="/jobs/:id" element={<JobDetails />} />

        {/* Auth */}
        <Route
          path="/login"
          element={
            <RoleRedirect>
              <Login />
            </RoleRedirect>
          }
        />
        <Route
          path="/register"
          element={
            <RoleRedirect>
              <Register />
            </RoleRedirect>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Admin redirects */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute role="Admin">
              <AdminJobManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/applicants"
          element={
            <ProtectedRoute role="Admin">
              <AdminApplicants />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/applicants/:id"
          element={
            <ProtectedRoute role="Admin">
              <CandidateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/status"
          element={
            <ProtectedRoute role="Admin">
              <AdminStatus />
            </ProtectedRoute>
          }
        />

        {/* Candidate redirects */}
        <Route
          path="/candidate"
          element={<Navigate to="/candidate/dashboard" />}
        />

        {/* Candidate */}
        <Route
          path="/candidate/dashboard"
          element={
            <ProtectedRoute role="Candidate">
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidate/resume-advisor"
          element={
            <ProtectedRoute role="Candidate">
              <ResumeAdvisor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidate/applications"
          element={
            <ProtectedRoute role="Candidate">
              <CandidateApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidate/apply/:jobId"
          element={
            <ProtectedRoute role="Candidate">
              <Apply />
            </ProtectedRoute>
          }
        />

        {/* Shared */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* 404 — always last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
