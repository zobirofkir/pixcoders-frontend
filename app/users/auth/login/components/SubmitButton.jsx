import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useLogin } from '../context/LoginContext';
import { buttonHover, buttonTap } from '../animations';

export const SubmitButton = ({ children }) => {
  const { isLoading } = useLogin();

  return (
    <motion.button
      type="submit"
      disabled={isLoading}
      className={`w-full flex justify-center items-center py-3.5 px-6 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md ${
        isLoading ? 'opacity-80 cursor-not-allowed' : ''
      }`}
      whileHover={!isLoading ? buttonHover : {}}
      whileTap={!isLoading ? buttonTap : {}}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Signing in...
        </>
      ) : (
        <>
          {children} <FiArrowRight className="ml-2" size={18} />
        </>
      )}
    </motion.button>
  );
};
