import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { container, item } from '../animations/variants';
import ImageLogo from '../../../../../../public/images/logo/logo.png';
import SkillsList from '../ui/SkillsListComponent';

const AboutSection = () => (
  <motion.div 
    variants={container}
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
      
      <SkillsList />
    </motion.div>
  </motion.div>
);

export default AboutSection;
