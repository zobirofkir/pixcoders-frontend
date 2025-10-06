import { FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const HeroSectionComponent = ({ searchQuery, onSearchChange }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-24 px-4 sm:px-6 lg:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-full h-full bg-gradient-to-br from-white/5 to-transparent rounded-full mix-blend-soft-light"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-full h-full bg-gradient-to-tr from-white/5 to-transparent rounded-full mix-blend-soft-light"></div>
      </div>

      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        animate={mounted ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <motion.div className="text-center px-4 sm:px-6 lg:px-8" variants={fadeInUp}>
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-100"
            variants={fadeInUp}
          >
            Our Blog
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto mb-12 leading-relaxed"
            variants={fadeInUp}
          >
            Stay updated with the latest trends, tutorials, and insights in web development and design.
          </motion.p>
          <motion.div 
            className="max-w-2xl mx-auto relative shadow-xl rounded-xl overflow-hidden"
            variants={fadeInUp}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <input
              type="text"
              placeholder="Search articles, tutorials, and more..."
              className="w-full px-6 py-5 md:py-6 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <FiSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
          </motion.div>
          
          <motion.div 
            className="mt-8 flex flex-wrap justify-center gap-4"
            variants={fadeInUp}
          >
            {['React', 'JavaScript', 'CSS', 'Design', 'Tutorials'].map((tag) => (
              <span 
                key={tag}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/20 transition-colors cursor-pointer"
                onClick={() => onSearchChange(tag)}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
