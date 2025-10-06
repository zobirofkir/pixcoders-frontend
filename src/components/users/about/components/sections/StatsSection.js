import React from 'react';
import { motion } from 'framer-motion';
import { stats } from './StatsComponent';
import { container, item } from '../animations/variants';

const StatsSection = () => (
  <motion.div 
    variants={container}
    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
  >
    {stats.map((stat, index) => (
      <motion.div
        key={stat.label}
        variants={item}
        className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-opacity-10 bg-gradient-to-br from-blue-500 to-purple-500">
            {stat.icon}
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
          </div>
        </div>
      </motion.div>
    ))}
  </motion.div>
);

export default StatsSection;
