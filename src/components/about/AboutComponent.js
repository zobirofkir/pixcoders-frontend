"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ImageLogo from '@/public/images/logo/logo.png';

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '200+', label: 'Projects Completed' },
  { value: '98%', label: 'Client Satisfaction' },
];

const skills = [
  'Web Development', 'UI/UX Design', 'Mobile Development',
  'Cloud Architecture', 'DevOps', 'AI/ML Solutions'
];

/**
 * Animation variants
 */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  },
};

const scaleUp = {
  hidden: { scale: 0.9, opacity: 0 },
  show: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  },
};

const AboutComponent = () => {
  return (
    <motion.section 
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
      className="relative py-20 overflow-hidden bg-white dark:bg-gray-900"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white dark:bg-grid-gray-800 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl" />
      
      <motion.div 
        variants={container}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div 
          variants={item}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-4">
            About Our Company
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            We Build Digital Experiences <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">That Matter</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We are a passionate team of developers, designers, and problem-solvers dedicated to creating exceptional digital experiences that drive real results for our clients.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <motion.div 
            variants={item}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 mix-blend-overlay" />
              <Image
                src={ImageLogo}
                alt="Our Team"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl -z-10" />
          </motion.div>
          
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Who We Are</h3>
            <div className="space-y-6 text-gray-600 dark:text-gray-300">
              <motion.p variants={item}>
                At Pixcoders, we believe in the power of technology to transform businesses and create meaningful connections. Our team of experts brings together diverse skills and perspectives to deliver innovative solutions.
              </motion.p>
              <motion.p variants={item}>
                With a focus on quality, performance, and user experience, we help startups and enterprises navigate the digital landscape and achieve their business goals.
              </motion.p>
              
              <motion.div variants={item} className="pt-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Our Expertise</h4>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <motion.span 
                      key={index}
                      variants={item}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          variants={container}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              variants={item}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
            >
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          variants={fadeIn}
          className="mt-20 text-center"
        >
          <motion.div 
            variants={scaleUp}
            className="max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800/50 p-8 rounded-2xl border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to start your project?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Let's work together to bring your ideas to life.</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:opacity-90 transition-opacity duration-300 shadow-lg hover:shadow-xl"
              >
                Get in Touch
                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default AboutComponent;