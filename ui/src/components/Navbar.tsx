import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const Navbar: React.FC = () => {
  const location = useLocation()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Reservations', path: '/reservations' },
    { name: 'About Us', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
  ]

  const navVariants = {
    hidden: { y: -100 },
    visible: {
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 20,
      },
    },
  }

  return (
    <motion.nav
      className="bg-gray-900 p-4 shadow-lg sticky top-0 z-50"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <motion.div
          className="text-white text-3xl font-bold font-serif mb-4 md:mb-0"
          variants={itemVariants}
        >
          <Link
            to="/"
            className="hover:text-orange-300 transition-colors duration-200"
          >
            Café Fausse
          </Link>
        </motion.div>
        <motion.ul
          className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-8"
          variants={navVariants}
        >
          {navItems.map((item) => (
            <motion.li key={item.path} variants={itemVariants}>
              <Link
                to={item.path}
                className={`text-lg font-medium rounded-md px-3 py-2 transition-colors duration-200 relative
                  ${
                    location.pathname === item.path
                      ? 'text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    className="absolute inset-0 bg-orange-600 rounded-md -z-10"
                    layoutId="activeTab"
                    transition={{
                      type: 'spring' as const,
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.nav>
  )
}

export default Navbar
