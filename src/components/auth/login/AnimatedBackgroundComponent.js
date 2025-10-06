import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const generateBlobData = (index) => {
  
  const seed = index * 1000 + 42;
  const random = (min, max) => {
    const x = Math.sin(seed + index * 100) * 10000;
    return (x - Math.floor(x)) * (max - min) + min;
  };

  const width = Math.floor(random(100, 400));
  const height = Math.floor(random(100, 400));
  const top = random(0, 100);
  const left = random(0, 100);
  const y = random(-50, 50);
  const x = random(-50, 50);
  const duration = random(20, 40);

  return { width, height, top, left, y, x, duration };
};

export const AnimatedBackgroundComponent = () => {
  const [blobs, setBlobs] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setBlobs(Array(5).fill(0).map((_, i) => generateBlobData(i)));
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-indigo-100 to-purple-100"
          style={{
            width: `${blob.width}px`,
            height: `${blob.height}px`,
            top: `${blob.top}%`,
            left: `${blob.left}%`,
            opacity: 0.6,
          }}
          animate={{
            y: [0, blob.y],
            x: [0, blob.x],
          }}
          transition={{
            duration: blob.duration,
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
