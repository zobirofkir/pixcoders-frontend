import React from 'react'
import { motion } from 'framer-motion';
import { container } from '../../../../../animations/variants';

const StatsGridComponent = ( {stats, isInView} ) => {
  return (
    <div>
        {/* Stats Grid */}
        <motion.div 
            variants={container}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-10"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.5,
                      delay: 0.1 * (index + 1),
                      ease: [0.16, 1, 0.3, 1]
                    }
                  }
                }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700/50 hover:-translate-y-1"
              >
                <div className="flex items-start">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color} text-white mr-4`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

    </div>
  )
}

export default StatsGridComponent