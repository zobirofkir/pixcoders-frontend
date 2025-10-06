import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { container, fadeInUp, staggerContainer } from '../../../../../animations/variants';
import ImageLogo from '../../../../../../public/images/logo/logo.png';
import SkillsList from '../ui/SkillsListComponent';
import { FiAward, FiUsers, FiLayers, FiCode, FiChevronRight } from 'react-icons/fi';
import { ButtonComponent } from '../../../../ui/ButtonComponent';

const stats = [
  { 
    value: '8+', 
    label: 'Years Experience', 
    icon: <FiAward className="text-2xl" />,
    color: 'from-blue-500 to-blue-600',
    delay: 0.1
  },
  { 
    value: '200+', 
    label: 'Projects Delivered', 
    icon: <FiLayers className="text-2xl" />,
    color: 'from-purple-500 to-purple-600',
    delay: 0.2
  },
  { 
    value: '150+', 
    label: 'Happy Clients', 
    icon: <FiUsers className="text-2xl" />,
    color: 'from-pink-500 to-pink-600',
    delay: 0.3
  },
  { 
    value: '20+', 
    label: 'Team Members', 
    icon: <FiCode className="text-2xl" />,
    color: 'from-indigo-500 to-indigo-600',
    delay: 0.4
  },
];

const AboutSectionComponent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div className="relative" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">
        {/* Left Column - Image */}
        <motion.div 
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1]
              }
            }
          }}
          className="lg:col-span-5 relative group"
        >
          <div className="relative aspect-[3/4] xl:aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-blue-500/20 border-4 border-white dark:border-gray-800/50">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 mix-blend-overlay z-10" />
            <Image
              src={ImageLogo}
              alt="Pixcoders Team"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            
            {/* Experience Badge */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-xl rounded-full px-6 py-3 flex items-center justify-center border border-gray-100 dark:border-gray-700/50">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-full mr-3 text-white">
                <FiAward className="text-xl" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Since 2015</p>
                <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">8+ Years</p>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl -z-10 hidden lg:block" />
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-pink-500/20 rounded-2xl -z-10 blur-2xl hidden lg:block" />
        </motion.div>
        
        {/* Right Column - Content */}
        <motion.div 
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={staggerContainer}
          className="lg:col-span-7"
        >
          <motion.div variants={fadeInUp} className="mb-10">
            <motion.span 
              variants={fadeInUp}
              className="inline-flex items-center px-4 py-1.5 text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-900/30 rounded-full mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
              Our Story
            </motion.span>
            
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              Crafting Digital <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Excellence</span>
            </motion.h2>
            
            <div className="space-y-6 text-gray-600 dark:text-gray-300">
              <motion.p variants={fadeInUp} className="text-lg leading-relaxed">
                Founded in 2015, Pixcoders has evolved from a passionate team of developers into a full-service digital agency. We've empowered over 200 clients worldwide to transform their innovative ideas into successful digital realities.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-lg leading-relaxed">
                Our approach blends cutting-edge technology with creative problem-solving to deliver solutions that don't just meet expectations—they redefine them. We believe in building lasting relationships through transparency, innovation, and exceptional results.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="pt-4">
                <ButtonComponent 
                  variant="primary"
                  size="lg"
                  className="group inline-flex items-center px-8 py-3 text-base font-medium rounded-full transition-all duration-300"
                >
                  Learn More About Us
                  <FiChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </ButtonComponent>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Stats Grid */}
          <motion.div 
            variants={container}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-10"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.5,
                      delay: 0.1 * (index + 1),
                      ease: [0.16, 1, 0.3, 1]
                    }
                  }
                }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700/50 hover:-translate-y-1"
              >
                <div className="flex items-start">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color} text-white mr-4`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <SkillsList />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSectionComponent;
