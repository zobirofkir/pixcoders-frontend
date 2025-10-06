'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { FaReact, FaNodeJs, FaCode, FaMobileAlt, FaServer } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiJavascript } from 'react-icons/si';

const icons = [
  { icon: <FaReact className="text-blue-500" />, name: 'React' },
  { icon: <SiNextdotjs className="text-black" />, name: 'Next.js' },
  { icon: <FaNodeJs className="text-green-600" />, name: 'Node.js' },
  { icon: <SiTailwindcss className="text-cyan-400" />, name: 'Tailwind' },
  { icon: <SiJavascript className="text-yellow-400" />, name: 'JavaScript' },
  { icon: <FaCode className="text-purple-500" />, name: 'Code' },
  { icon: <FaMobileAlt className="text-pink-500" />, name: 'Mobile' },
  { icon: <FaServer className="text-green-700" />, name: 'Server' },
];

const FloatingIcon = ({ icon, index }) => {
  const [position, setPosition] = useState({
    x: Math.random() * 90,
    y: Math.random() * 90,
  });
  const [velocity] = useState({
    x: (Math.random() - 0.5) * 0.5,
    y: (Math.random() - 0.5) * 0.5,
  });

  useEffect(() => {
    const moveIcon = () => {
      setPosition((prev) => ({
        x: (prev.x + velocity.x + 100) % 100,
        y: (prev.y + velocity.y + 100) % 100,
      }));
    };

    const interval = setInterval(moveIcon, 50);
    return () => clearInterval(interval);
  }, [velocity.x, velocity.y]);

  return (
    <motion.div
      className="absolute text-3xl md:text-4xl opacity-20"
      initial={{ opacity: 0 }}
      animate={{
        x: `${position.x}%`,
        y: `${position.y}%`,
        opacity: 0.2,
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 5 + Math.random() * 5,
        repeat: Infinity,
        repeatType: 'reverse',
        delay: index * 0.5,
      }}
    >
      {icon}
    </motion.div>
  );
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
        <title>PIX CODERS - Coming Soon</title>
        <meta name="description" content="PIX CODERS - Professional Web Development" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Animated Background Icons */}
      <div className="fixed inset-0 w-full h-full pointer-events-none">
        {icons.map((item, index) => (
          <FloatingIcon key={index} icon={item.icon} index={index} />
        ))}
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