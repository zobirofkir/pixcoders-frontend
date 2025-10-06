import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../../../../data/skillsData';
import { item } from '../animations/variants';

const SkillsListComponent = () => (
  <motion.div variants={item} className="mt-12">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Our Expertise</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          variants={item}
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <span className="text-2xl">{skill.icon}</span>
          <span className="font-medium text-gray-700 dark:text-gray-200">{skill.name}</span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default SkillsListComponent;
