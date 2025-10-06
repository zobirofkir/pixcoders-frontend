"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { container, fadeInUp, staggerContainer } from '../../../animations/variants';
import BackgroundElementsComponent from './components/ui/BackgroundElementsComponent';
import AboutHeroSectionComponent from './components/sections/HeroSectionComponent';
import AboutSectionComponent from './components/sections/AboutSectionComponent';
import StatsSectionComponent from './components/sections/StatsSectionComponent';

const AboutComponent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={staggerContainer}
      className="relative pt-16 pb-28 md:pt-24 md:pb-32 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 transition-colors duration-300"
    >
      {/* Animated Background Elements */}
      <BackgroundElementsComponent />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
      </div>
      
      {/* Main Content Container */}
      <div className="relative z-10">
        <motion.div 
          variants={container}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div variants={fadeInUp} className="mb-16 md:mb-24">
            <AboutHeroSectionComponent />
          </motion.div>
          
          <motion.div variants={fadeInUp} className="mb-16 md:mb-24">
            <AboutSectionComponent />
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <StatsSectionComponent />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Subtle bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-gray-950 to-transparent z-0" />
    </motion.section>
  );
};

export default AboutComponent;
