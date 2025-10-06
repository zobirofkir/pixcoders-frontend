'use client';

import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaRocket } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Countdown = dynamic(
  () => import('../src/components/counter/CountdownComponent'),
  { 
    loading: () => <div className="h-40"></div>
  }
);

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-indigo-100/50 [mask-image:linear-gradient(0deg,white,transparent)]"></div>
      </div>

      <main className="max-w-4xl w-full text-center relative z-10">
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 sm:p-10 shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="space-y-3 mb-10">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Coming Soon
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We're working on something amazing. Stay tuned!
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Countdown />
          </div>
          
          <div className="mt-12 flex justify-center space-x-8">
            <a href="https://github.com/zobirofkir" className="text-gray-500 hover:text-indigo-600 transition-colors duration-200" aria-label="GitHub">
              <FaGithub className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/in/zobirofkir" className="text-gray-500 hover:text-blue-600 transition-colors duration-200" aria-label="LinkedIn">
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a href="mailto:zobirofkir19@gmail.com" className="text-gray-500 hover:text-red-500 transition-colors duration-200" aria-label="Email">
              <FaEnvelope className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      </main>
      
    </div>
  );
}
