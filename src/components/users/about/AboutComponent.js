"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { HeroSection, AboutSection, StatsSection, BackgroundElements } from './components';

const AboutComponent = () => {
  return (
    <motion.section 
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950"
    >
      <BackgroundElements />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <AboutSection />
        <StatsSection />
      </div>
    </motion.section>
  );
};

export default AboutComponent;
