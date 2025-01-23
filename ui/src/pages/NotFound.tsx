import { Link } from 'react-router-dom'

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-gray-100 flex items-center justify-center px-8">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-4xl font-serif text-gray-900 mb-6">
          Page Not Found
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist. Let's get you back
          to our delicious offerings.
        </p>
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors duration-200 shadow-lg"
          >
            Back to Home
          </Link>
          <div className="flex justify-center space-x-4 text-sm">
            <Link
              to="/menu"
              className="text-orange-600 hover:text-orange-800 transition-colors"
            >
              View Menu
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to="/reservations"
              className="text-orange-600 hover:text-orange-800 transition-colors"
            >
              Make Reservation
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to="/about"
              className="text-orange-600 hover:text-orange-800 transition-colors"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
