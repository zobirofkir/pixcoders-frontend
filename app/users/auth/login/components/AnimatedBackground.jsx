import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedBackground = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-indigo-100 to-purple-100"
          style={{
            width: `${Math.random() * 300 + 100}px`,
            height: `${Math.random() * 300 + 100}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.6,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export const DecorativeAccent = () => (
  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
);

export const AnimatedBlobs = () => {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-70"
          style={{
            width: `${120 + i * 40}px`,
            height: `${120 + i * 40}px`,
            left: i === 1 ? '5%' : i === 2 ? '60%' : '80%',
            top: i === 0 ? '10%' : i === 1 ? '60%' : '20%',
            background: i === 0 
              ? 'linear-gradient(45deg, #a78bfa, #8b5cf6)' 
              : i === 1 
                ? 'linear-gradient(45deg, #818cf8, #6366f1)' 
                : 'linear-gradient(45deg, #7dd3fc, #3b82f6)'
          }}
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  );
};
