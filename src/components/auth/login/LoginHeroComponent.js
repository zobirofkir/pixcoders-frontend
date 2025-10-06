import React from 'react';
import { motion } from 'framer-motion';

export const LoginHeroComponent = () => (
  <motion.div 
    className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 xl:p-16"
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
  >
    <div className="relative w-full max-w-2xl">
      <motion.div 
        className="relative z-10 text-center lg:text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
          Join the <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">world's leading</span> developers
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-lg mx-auto lg:mx-0">
          Connect with top talent, collaborate on innovative projects, and accelerate your career with PixCoders.
        </p>
      </motion.div>
    </div>
  </motion.div>
);
