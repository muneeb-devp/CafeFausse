import React from 'react'
import { motion } from 'framer-motion'
import type { MenuItem } from '../types/menuItem'

const MenuItemCard: React.FC<{ item: MenuItem }> = ({ item }) => (
  <motion.div
    className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer"
    whileHover={{
      y: -8,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
    }}
    whileTap={{ scale: 0.98 }}
    layout
  >
    {/* Image Container */}
    <div className="relative h-48 overflow-hidden">
      <motion.img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover"
        loading="lazy"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      ></motion.div>
      {/* Price Badge */}
      <motion.div
        className="absolute top-3 right-3 bg-orange-600 text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg"
        whileHover={{
          scale: 1.1,
          backgroundColor: '#ea580c',
          transition: { type: 'spring' as const, stiffness: 400, damping: 20 },
        }}
      >
        ${item.price.toFixed(2)}
      </motion.div>
      {/* Category Badge */}
      <motion.div
        className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-orange-600 px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
        whileHover={{
          backgroundColor: 'rgba(255, 237, 213, 0.95)',
          transition: { duration: 0.3 },
        }}
      >
        {item.category}
      </motion.div>
    </div>

    {/* Content Container */}
    <motion.div
      className="p-6"
      initial={{ opacity: 0.8 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.h3
        className="text-xl font-bold text-gray-900 mb-3"
        whileHover={{
          color: '#ea580c',
          transition: { duration: 0.2 },
        }}
      >
        {item.name}
      </motion.h3>

      <motion.p
        className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2"
        whileHover={{
          color: '#374151',
          transition: { duration: 0.2 },
        }}
      >
        {item.description}
      </motion.p>

      {/* Decorative Bottom Border */}
      <motion.div
        className="h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mx-auto"
        initial={{ width: '3rem' }}
        whileHover={{
          width: '5rem',
          transition: { type: 'spring' as const, stiffness: 300, damping: 25 },
        }}
      ></motion.div>
    </motion.div>
  </motion.div>
)

export default MenuItemCard
