import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">

      {/* Navbarq */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <h1 className="text-lg font-medium text-gray-900">HireFlow</h1>
        <div className="flex items-center gap-3">
          <Link to="/jobs">
            <Button variant="ghost" className="text-sm text-gray-500">Browse Jobs</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="text-sm">Sign in</Button>
          </Link>
          <Link to="/register">
            <Button className="text-sm bg-gray-900 hover:bg-gray-700 text-white">Get started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-24 max-w-3xl mx-auto">
        <Badge className="mb-4 bg-gray-100 text-gray-600 hover:bg-gray-100">
          AI-Powered Hiring Platform
        </Badge>
        <h1 className="text-5xl font-medium text-gray-900 leading-tight mb-4">
          Find the right job.<br />Get hired faster.
        </h1>
        <p className="text-base text-gray-400 mb-8 max-w-xl">
          HireFlow uses AI to match your resume with the best job opportunities.
          Apply smarter, not harder.
        </p>
        <div className="flex items-center gap-3">
          <Link to="/register">
            <Button className="bg-gray-900 hover:bg-gray-700 text-white px-6">
              Get started free
            </Button>
          </Link>
          <Link to="/jobs">
            <Button variant="outline" className="px-6">
              Browse jobs
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-100 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center px-4">
          <div>
            <p className="text-3xl font-medium text-gray-900">500+</p>
            <p className="text-sm text-gray-400 mt-1">Jobs posted</p>
          </div>
          <div>
            <p className="text-3xl font-medium text-gray-900">1200+</p>
            <p className="text-sm text-gray-400 mt-1">Candidates hired</p>
          </div>
          <div>
            <p className="text-3xl font-medium text-gray-900">98%</p>
            <p className="text-sm text-gray-400 mt-1">Satisfaction rate</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-medium text-gray-900 text-center mb-12">
          Everything you need to hire or get hired
        </h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="border border-gray-100 rounded-xl p-6">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">AI Resume Scoring</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Our AI scores your resume against job descriptions and gives detailed feedback instantly.
            </p>
          </div>

          <div className="border border-gray-100 rounded-xl p-6">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Kanban Pipeline</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Admins can manage candidates visually — drag and drop across Applied, Interview, and Hired stages.
            </p>
          </div>

          <div className="border border-gray-100 rounded-xl p-6">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Fast Applications</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Upload your resume once and apply to multiple jobs in seconds. Track all applications in one place.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center border border-gray-100 rounded-2xl p-12 bg-gray-50">
          <h2 className="text-2xl font-medium text-gray-900 mb-3">
            Ready to find your next role?
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Join thousands of candidates and companies already using HireFlow.
          </p>
          <Link to="/register">
            <Button className="bg-gray-900 hover:bg-gray-700 text-white px-8">
              Get started free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6 px-8 flex items-center justify-between">
        <p className="text-xs text-gray-400">© 2026 HireFlow. All rights reserved.</p>
        <div className="flex gap-4">
          <Link to="/jobs" className="text-xs text-gray-400 hover:text-gray-600">Browse Jobs</Link>
          <Link to="/login" className="text-xs text-gray-400 hover:text-gray-600">Sign in</Link>
          <Link to="/register" className="text-xs text-gray-400 hover:text-gray-600">Register</Link>
        </div>
      </footer>

    </div>
  )
}