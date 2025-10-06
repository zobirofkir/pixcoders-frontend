'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LoginProvider } from './context/LoginContext';
import { containerVariants } from './animations';
import { LoginHeader } from './components/LoginHeader';
import { LoginForm } from './components/LoginForm';
import { LoginHero } from './components/LoginHero';
import { AnimatedBackground, DecorativeAccent, AnimatedBlobs } from './components/AnimatedBackground';

const LoginPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <LoginProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 relative overflow-hidden">
        <AnimatedBackground />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-center min-h-[calc(100vh-4rem)]">
            {/* Left side - Form */}
            <motion.div 
              className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 relative overflow-hidden"
              initial="hidden"
              animate={isMounted ? "visible" : "hidden"}
              variants={containerVariants}
            >
              <DecorativeAccent />
              <LoginHeader />
              <LoginForm />
            </motion.div>

            {/* Right side - Hero */}
            <LoginHero />
          </div>
        </div>
      </div>
    </LoginProvider>
  );
};

export default LoginPage;