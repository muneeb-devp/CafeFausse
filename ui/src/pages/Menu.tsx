import { motion } from 'framer-motion'
import MenuItemCard from '../components/MenuItem'
import type { MenuItem } from '../types/menuItem'

const MenuPage: React.FC = () => {
  const menuItems: MenuItem[] = [
    {
      category: 'Starters',
      name: 'Bruschetta',
      description:
        'Fresh tomatoes, basil, olive oil, and toasted baguette slices',
      price: 8.5,
      image:
        'https://tse1.mm.bing.net/th/id/OIP.Pr_wAdwipfdEPzsaCuEjXwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    },
    {
      category: 'Starters',
      name: 'Caesar Salad',
      description: 'Crisp romaine with homemade Caesar dressing',
      price: 9.0,
      image:
        'https://tse2.mm.bing.net/th/id/OIP.cqxm6nPV6U1aiYhR5GX2vwHaJQ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    },
    {
      category: 'Main Courses',
      name: 'Grilled Salmon',
      description: 'Served with lemon butter sauce and seasonal vegetables',
      price: 22.0,
      image:
        'https://tse4.mm.bing.net/th/id/OIP.p7Yk32-sJzmE5keNbDXcgwHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    },
    {
      category: 'Main Courses',
      name: 'Ribeye Steak',
      description: '12 oz prime cut with garlic mashed potatoes',
      price: 28.0,
      image:
        'https://tse1.explicit.bing.net/th/id/OIP.VZAZtxLpdYqLi_F7XlpHkwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    },
    {
      category: 'Main Courses',
      name: 'Vegetable Risotto',
      description: 'Creamy Arborio rice with wild mushrooms',
      price: 18.0,
      image:
        'https://tse1.mm.bing.net/th/id/OIP.ebwaOXCEVb3WmAbBe6LSgQHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    },
    {
      category: 'Desserts',
      name: 'Tiramisu',
      description: 'Classic Italian dessert with mascarpone',
      price: 7.5,
      image:
        'https://www.flavoursholidays.co.uk/wp-content/uploads/2020/07/Tiramisu-930x620.jpg',
    },
    {
      category: 'Desserts',
      name: 'Cheesecake',
      description: 'Creamy cheesecake with berry compote',
      price: 7.0,
      image:
        'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/fbfe2bee-c646-4170-a145-bb5e7de8c8a1/Derivates/5527f290-3faa-4ae2-a1bc-7f9980d90251.jpg',
    },
    {
      category: 'Beverages',
      name: 'Red Wine (Glass)',
      description: 'A selection of Italian reds',
      price: 10.0,
      image:
        'https://static.vecteezy.com/system/resources/thumbnails/043/372/801/small_2x/red-wine-in-a-black-studio-background-free-photo.jpg',
    },
    {
      category: 'Beverages',
      name: 'White Wine (Glass)',
      description: 'Crisp and refreshing',
      price: 9.0,
      image:
        'https://tse4.mm.bing.net/th/id/OIP.SxtPDOCpKzqqWzamQZ1-lwHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    },
    {
      category: 'Beverages',
      name: 'Craft Beer',
      description: 'Local artisan brews',
      price: 6.0,
      image:
        'https://i.pinimg.com/originals/c8/2e/3b/c82e3bcb3742cf17b7cf83533f3dbb80.jpg',
    },
    {
      category: 'Beverages',
      name: 'Espresso',
      description: 'Strong and aromatic',
      price: 3.0,
      image:
        'https://tse4.mm.bing.net/th/id/OIP.zv07lmjM8Mon4HTv1nGsFgHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    },
  ]

  const categories = Array.from(new Set(menuItems.map((item) => item.category)))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 12,
      },
    },
  }

  const heroVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 20,
        duration: 0.8,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-gray-100 text-gray-800">
      {/* Hero Section */}
      <motion.div
        className="relative py-16 text-center"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-orange-400/10"></div>
        <div className="relative z-10 px-8">
          <motion.h1
            className="text-6xl font-serif text-gray-900 mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Our Menu
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Discover our carefully crafted selection of artisanal dishes, made
            with the finest ingredients and passion for culinary excellence.
          </motion.p>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mt-6 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          ></motion.div>
        </div>
      </motion.div>

      {/* Menu Content */}
      <div className="max-w-7xl mx-auto px-8 pb-16">
        {categories.map((category, categoryIndex) => (
          <motion.section
            key={category}
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '0px 0px -200px 0px' }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
          >
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -150px 0px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-4xl font-serif text-gray-900 mb-3">
                {category}
              </h2>
              <motion.div
                className="w-16 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '0px 0px -150px 0px' }}
                transition={{ duration: 0.6, delay: 0.2 }}
              ></motion.div>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            >
              {menuItems
                .filter((item) => item.category === category)
                .map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.05,
                      transition: {
                        type: 'spring' as const,
                        stiffness: 300,
                        damping: 20,
                      },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MenuItemCard item={item} />
                  </motion.div>
                ))}
            </motion.div>
          </motion.section>
        ))}
      </div>
    </div>
  )
}

export default MenuPage
