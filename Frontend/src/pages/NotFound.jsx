import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <p className="text-6xl font-medium text-gray-900 mb-2">404</p>
      <p className="text-sm text-gray-400 mb-6">Page not found</p>
      <Link
        to="/"
        className="text-xs bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
      >
        Go home
      </Link>
    </div>
  )
}