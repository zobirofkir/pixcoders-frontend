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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">

      <main className="max-w-4xl w-full text-center">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          
          <Countdown />
          
        </motion.div>
      </main>
      
    </div>
  );
}
