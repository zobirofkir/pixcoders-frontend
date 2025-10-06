import React from 'react';
import { motion } from 'framer-motion';
import { container, item } from '../animations/variants';

const HeroSectionComponent = () => (
  <motion.div 
    variants={container}
    className="text-center mb-20"
  >
    <motion.span 
      variants={item}
      className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-900/30 backdrop-blur-sm rounded-full mb-6 border border-blue-100 dark:border-blue-900/50"
    >
      <span className="relative flex h-2 w-2 mr-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
      </span>
      Innovating Since 2015
    </motion.span>
    
    <motion.h1 
      variants={item}
      className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
    >
      Crafting Digital <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">Experiences</span>
    </motion.h1>
    
    <motion.p 
      variants={item}
      className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
    >
      We're a passionate team of innovators, designers, and developers dedicated to building exceptional digital products that make a real impact.
    </motion.p>
  </motion.div>
);

export default HeroSectionComponent;
