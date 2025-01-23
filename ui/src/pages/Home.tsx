import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import NewsletterSignup from '../components/NewsletterSignup'

const HomePage: React.FC = () => {
  const heroVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: 'easeOut' as const,
        staggerChildren: 0.3,
      },
    },
  }

  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Hero Section (FR-3) - 2-Column Layout */}
      <motion.section
        className="relative min-h-[80vh] bg-gradient-to-br from-gray-50 to-orange-50 flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              className="space-y-8"
              variants={heroVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={childVariants}>
                <h1 className="text-5xl lg:text-7xl font-serif font-bold text-gray-800 leading-tight">
                  Café <span className="text-orange-600">Fausse</span>
                </h1>
                <div className="w-24 h-1 bg-orange-600 mt-4"></div>
              </motion.div>

              <motion.p
                className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-lg"
                variants={childVariants}
              >
                Where culinary artistry meets warm hospitality. Experience
                unforgettable flavors in an atmosphere of refined elegance.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={childVariants}
              >
                <Link
                  to="/menu"
                  className="inline-flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-8 rounded-lg text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2"
                  >
                    View Our Menu
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </motion.span>
                </Link>

                <Link
                  to="/reservation"
                  className="inline-flex items-center justify-center border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300"
                >
                  Make Reservation
                </Link>
              </motion.div>

              <motion.div
                className="flex items-center gap-6 text-sm text-gray-500"
                variants={childVariants}
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-orange-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Washington, DC
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-orange-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  5:00 PM – 11:00 PM
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              className="relative lg:order-2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="relative">
                <motion.img
                  src="/home-cafe-fausse.webp"
                  alt="Café Fausse Restaurant Interior"
                  className="w-full h-[400px] lg:h-[450px] object-cover rounded-2xl shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Floating accent elements */}
                <motion.div
                  className="absolute -top-6 -left-6 w-24 h-24 bg-orange-600 rounded-full opacity-20"
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                <motion.div
                  className="absolute -bottom-8 -right-8 w-32 h-32 bg-orange-300 rounded-full opacity-15"
                  animate={{
                    y: [0, 15, 0],
                    scale: [1, 0.9, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                />

                {/* Award badge */}
                <motion.div
                  className="absolute top-4 right-4 bg-white bg-opacity-95 backdrop-blur-sm rounded-full p-4 shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <div className="text-center">
                    <div className="text-orange-600 font-bold text-sm">
                      ★★★★★
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      Award Winner
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Info Section (FR-2) */}
      <motion.section
        className="container mx-auto my-12 p-8 bg-white rounded-lg shadow-lg text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h2
          className="text-4xl font-serif text-gray-800 mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Visit Us
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-xl mb-2">
            <strong>Address:</strong> 1234 Culinary Ave, Suite 100, Washington,
            DC 20002
          </p>
          <p className="text-xl mb-2">
            <strong>Phone:</strong> (202) 555-4567
          </p>
          <p className="text-xl mb-2">
            <strong>Hours:</strong>
          </p>
          <p className="text-lg">Monday–Saturday: 5:00 PM – 11:00 PM</p>
          <p className="text-lg">Sunday: 5:00 PM – 9:00 PM</p>
        </motion.div>
      </motion.section>

      {/* Newsletter Signup Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <NewsletterSignup />
      </motion.div>
    </div>
  )
}

export default HomePage
