'use client';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { FaReact, FaNodeJs, FaCode, FaMobileAlt, FaServer } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiJavascript } from 'react-icons/si';

const icons = [
  { 
    icon: <FaReact className="text-blue-500" />, 
    name: 'React',
    color: 'from-blue-400/20 to-blue-600/20',
    animation: 'animate-float-slow'
  },
  { 
    icon: <SiNextdotjs className="text-black dark:text-white" />, 
    name: 'Next.js',
    color: 'from-gray-700/20 to-black/20 dark:from-gray-300/20 dark:to-white/20',
    animation: 'animate-float-medium'
  },
  { 
    icon: <FaNodeJs className="text-green-600" />, 
    name: 'Node.js',
    color: 'from-green-400/20 to-green-700/20',
    animation: 'animate-float-slow'
  },
  { 
    icon: <SiTailwindcss className="text-cyan-500" />, 
    name: 'Tailwind',
    color: 'from-cyan-400/20 to-sky-600/20',
    animation: 'animate-float-fast'
  },
  { 
    icon: <SiJavascript className="text-yellow-400" />, 
    name: 'JavaScript',
    color: 'from-yellow-400/20 to-amber-600/20',
    animation: 'animate-float-medium'
  },
  { 
    icon: <FaCode className="text-purple-500" />, 
    name: 'Code',
    color: 'from-purple-400/20 to-indigo-600/20',
    animation: 'animate-float-slow'
  },
  { 
    icon: <FaMobileAlt className="text-pink-500" />, 
    name: 'Mobile',
    color: 'from-pink-400/20 to-rose-600/20',
    animation: 'animate-float-medium'
  },
  { 
    icon: <FaServer className="text-emerald-600" />, 
    name: 'Server',
    color: 'from-emerald-400/20 to-green-700/20',
    animation: 'animate-float-fast'
  },
];

const FloatingIcon = ({ icon, index, color, animation }) => {
  const [position, setPosition] = useState({
    x: Math.random() * 90,
    y: Math.random() * 90,
  });
  const [velocity] = useState({
    x: (Math.random() - 0.5) * 0.3,
    y: (Math.random() - 0.5) * 0.3,
  });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const moveIcon = () => {
      setPosition((prev) => {
        // Add some randomness to the movement
        const randomFactor = 0.01 * (Math.random() - 0.5);
        return {
          x: (prev.x + velocity.x + randomFactor + 100) % 100,
          y: (prev.y + velocity.y + randomFactor + 100) % 100,
        };
      });
    };

    const interval = setInterval(moveIcon, 50);
    return () => clearInterval(interval);
  }, [velocity.x, velocity.y]);

  return (
    <motion.div
      className={`absolute text-4xl md:text-5xl ${animation} group`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: isHovered ? 0.9 : 0.3,
        scale: isHovered ? 1.3 : 1,
        rotate: isHovered ? [0, 10, -10, 0] : 0,
      }}
      transition={{
        duration: 0.5,
        scale: { duration: 0.3 },
        rotate: { duration: 0.5 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className={`relative p-2 rounded-full bg-gradient-to-br ${color} backdrop-blur-sm`}>
        <div className="relative z-10">
          {icon}
        </div>
        {isHovered && (
          <motion.div 
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {icon.props['data-name']}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
};
const Home = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      <Head>
      </Head>

      {/* Animated Background Icons */}
      <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden">
        {icons.map((item, index) => (
          <FloatingIcon 
            key={index} 
            icon={React.cloneElement(item.icon, { 'data-name': item.name })} 
            index={index}
            color={item.color}
            animation={item.animation}
          />
        ))}
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:40px_40px] pointer-events-none"></div>
        
        {/* Animated gradient overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/20 dark:to-gray-900/20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        ></motion.div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.h1 
          className="text-5xl md:text-8xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          PIX <span className="text-blue-600">CODERS</span>
        </motion.h1>
        
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl md:text-2xl text-gray-600 mb-2">We&apos;re creating something amazing</p>
          
          <motion.div 
            className="inline-block mt-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1.05 }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatType: 'reverse' 
            }}
          >
            <span className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg md:text-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 inline-block">
              Coming Soon
            </span>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-16 text-gray-500 text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p>Stay tuned for our launch. Something amazing is coming your way!</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;