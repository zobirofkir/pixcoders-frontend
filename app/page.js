'use client';

import { useContext } from 'react';
import { useTheme } from '../src/context/ThemeContext';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaRocket, FaSun, FaMoon } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Countdown = dynamic(
  () => import('../src/components/CountdownComponent'),
  { 
    loading: () => <div className="h-40"></div>
  }
);

export default function Home() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-black' : 'bg-gradient-to-br from-gray-50 to-gray-100'} transition-colors duration-300`}>
      <button 
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <FaSun className="text-yellow-400 text-xl" />
        ) : (
          <FaMoon className="text-gray-700 text-xl" />
        )}
      </button>

      <main className="max-w-4xl w-full text-center">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="relative w-40 h-40 mx-auto mb-8"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Image
              src="/images/logo/logo.png"
              alt="PixCoders Logo"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              PixCoders
            </span>
          </h1>
          
          <motion.h2 
            className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            We're Building Something Amazing
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            We're working hard to bring you an exceptional digital experience. 
            Our team is crafting smart solutions to help your business thrive in the digital world.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <a 
              href="mailto:zobirofkir19@gmail.com" 
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg shadow-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 transform"
            >
              <FaEnvelope className="text-xl" />
              Get in Touch
            </a>
            <a 
              className="px-8 py-4 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 transform"
            >
              <FaCode className="text-xl" />
              Learn More
            </a>
          </motion.div>
          
          <Countdown />
          
          <div id="about" className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16">
            <div className="text-center mb-10">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                <FaRocket className="text-4xl text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Zobir Dev</h3>
              <p className="text-gray-600 dark:text-gray-300">Full Stack Developer</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Our Mission</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  To deliver high-quality, scalable, and innovative solutions that help businesses thrive in the digital landscape.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Get in Touch</h4>
                <div className="flex justify-center space-x-4">
                  <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    <FaGithub className="text-2xl" />
                  </a>
                  <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                    <FaLinkedin className="text-2xl" />
                  </a>
                  <a href="mailto:zobirofkir19@gmail.com" className="text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400">
                    <FaEnvelope className="text-2xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      
      <footer className="w-full py-6 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} PixCoders. All rights reserved.</p>
          <p className="mt-2">Crafting digital excellence with passion and precision.</p>
        </div>
      </footer>
    </div>
  );
}
