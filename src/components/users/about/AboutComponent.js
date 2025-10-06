"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ImageLogo from '../../../../public/images/logo/logo.png';

// Animation Variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut"
    }
  }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Data
const stats = [
  { 
    value: '10+', 
    label: 'Years Experience',
    icon: (
      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )
  },
  { 
    value: '200+', 
    label: 'Projects Delivered',
    icon: (
      <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  { 
    value: '98%', 
    label: 'Client Satisfaction',
    icon: (
      <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
];

const skills = [
  { name: 'Web Development', icon: '🌐' },
  { name: 'UI/UX Design', icon: '🎨' },
  { name: 'Mobile Development', icon: '📱' },
  { name: 'Cloud Architecture', icon: '☁️' },
  { name: 'DevOps', icon: '🔄' },
  { name: 'AI/ML Solutions', icon: '🤖' },
  { name: 'Blockchain', icon: '⛓️' },
  { name: 'Data Analytics', icon: '📊' },
];


const AboutComponent = () => {
  return (
    <motion.section 
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/50 dark:bg-grid-gray-800/30 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-radial from-blue-500/5 via-transparent to-transparent" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 dark:opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 dark:opacity-30 animate-blob animation-delay-4000" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div 
          variants={container}
          className="text-center mb-20"
        >
          <motion.span 
            variants={item}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-900/30 backdrop-blur-sm rounded-full mb-6 border border-blue-100 dark:border-blue-900/50"
          >
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Innovating Since 2015
          </motion.span>
          
          <motion.h1 
            variants={item}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
          >
            Crafting Digital <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">Experiences</span>
          </motion.h1>
          
          <motion.p 
            variants={item}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            We're a passionate team of innovators, designers, and developers dedicated to building exceptional digital products that make a real impact.
          </motion.p>
        </motion.div>

        {/* About Section */}
        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24"
        >
          <motion.div 
            variants={item}
            className="relative group"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 mix-blend-overlay" />
              <Image
                src={ImageLogo}
                alt="Pixcoders Team"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-pink-500/20 rounded-2xl -z-10 blur-xl" />
          </motion.div>
          
          <motion.div variants={container}>
            <motion.div variants={item} className="mb-8">
              <span className="text-sm font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">Our Story</span>
              <motion.h2 
                variants={item}
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-6"
              >
                More Than Just a Digital Agency
              </motion.h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-300">
                <motion.p variants={item} className="leading-relaxed">
                  Founded in 2015, Pixcoders has grown from a small team of passionate developers to a full-service digital agency. We've helped over 200 clients transform their ideas into successful digital products.
                </motion.p>
                <motion.p variants={item} className="leading-relaxed">
                  Our approach combines technical excellence with creative thinking to deliver solutions that not only meet but exceed our clients' expectations.
                </motion.p>
              </div>
            </motion.div>
            
            <motion.div variants={item} className="mt-12">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Our Expertise</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    variants={item}
                    whileHover={{ 
                      y: -4,
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
                    }}
                    className="flex items-center p-4 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-800 transition-all duration-300"
                  >
                    <span className="text-2xl mr-3">{skill.icon}</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          variants={container}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              variants={item}
              whileHover={{ 
                y: -8,
                transition: { type: 'spring', stiffness: 300, damping: 15 }
              }}
              className="group relative p-8 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full -z-10 group-hover:scale-150 transition-transform duration-700" />
              <div className="mb-4 text-blue-500 dark:text-blue-400">
                {stat.icon}
              </div>
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </p>
              <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          variants={fadeIn}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-0.5 mb-24"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative bg-white dark:bg-gray-900 rounded-[calc(1.5rem-1px)] p-8 md:p-12">
            <div className="text-center max-w-3xl mx-auto">
              <motion.h2 
                variants={scaleUp}
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
              >
                Ready to Bring Your Vision to Life?
              </motion.h2>
              <motion.p 
                variants={fadeIn}
                className="text-xl text-gray-600 dark:text-gray-300 mb-8"
              >
                Let's collaborate to create something extraordinary. Our team is ready to turn your ideas into reality.
              </motion.p>
              <motion.div 
                variants={scaleUp}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
                  <Link
                    href="/users/contacts"
                    className="relative flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                  >
                    Start Your Project
                    <svg className="w-5 h-5 ml-2 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </motion.div>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 text-lg font-medium text-center text-gray-900 dark:text-white bg-transparent border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-300"
                >
                  Learn More
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
    );
  };

export default AboutComponent;