import React from 'react';
import { FiUser } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { itemVariants } from '../animations';

export const LoginHeader = () => (
  <motion.div 
    className="text-center mb-10 pt-2"
    variants={itemVariants}
  >
    <div className="mb-4">
      <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
          <FiUser size={24} />
        </div>
      </div>
    </div>
    <h1 className="text-3xl font-bold text-gray-900 mb-2">
      Welcome Back
    </h1>
    <p className="text-gray-500">Sign in to access your PixCoders dashboard</p>
  </motion.div>
);
