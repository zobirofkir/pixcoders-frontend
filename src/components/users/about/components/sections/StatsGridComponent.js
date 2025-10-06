import React from 'react';
import { motion } from 'framer-motion';
import { container } from '../../../../../animations/variants';
import { skillsData } from '../../../../../data/skillsData';

const StatsGridComponent = ({ isInView }) => {
  // Color variants for the skill cards
  const colorVariants = [
    'from-blue-500 to-cyan-400',
    'from-purple-500 to-pink-500',
    'from-green-500 to-emerald-400',
    'from-amber-500 to-yellow-400',
    'from-rose-500 to-pink-400',
    'from-indigo-500 to-blue-400',
    'from-teal-500 to-cyan-400',
    'from-orange-500 to-amber-400',
    'from-fuchsia-500 to-purple-400',
    'from-lime-500 to-green-400'
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <motion.div
        variants={container}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mb-10"
      >
        {skillsData.map((skill, index) => {
          const colorClass = colorVariants[index % colorVariants.length];
          
          return (
            <motion.div
              key={index}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                show: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 100,
                    damping: 15,
                    delay: 0.05 * index,
                  },
                },
              }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="group relative"
            >
              <div className={`
                h-full bg-gradient-to-br ${colorClass} 
                rounded-2xl p-0.5 shadow-lg overflow-hidden
                transition-all duration-300 ease-in-out
                group-hover:shadow-xl group-hover:shadow-${colorClass.split(' ')[0].replace('from-', '')}/20
              `}>
                <div className="
                  h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm 
                  p-4 sm:p-5 rounded-xl
                  flex flex-col items-center justify-center
                  text-center
                  transition-all duration-300
                  group-hover:bg-white/90 dark:group-hover:bg-gray-900/90
                ">
                  <div className={`
                    w-14 h-14 rounded-2xl flex items-center justify-center 
                    text-3xl mb-3
                    bg-gradient-to-br ${colorClass} text-white
                    shadow-md
                    transition-transform duration-300
                    group-hover:scale-110
                  `}>
                    {skill.icon}
                  </div>
                  <h3 className="
                    text-sm sm:text-base font-semibold 
                    text-gray-800 dark:text-white 
                    mb-1
                    transition-colors duration-300
                  ">
                    {skill.name}
                  </h3>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default StatsGridComponent;