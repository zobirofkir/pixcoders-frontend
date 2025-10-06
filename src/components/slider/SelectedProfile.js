import React from 'react';
import { motion } from 'framer-motion';

const SelectedProfile = ({ user }) => {
  if (!user) return null;

  return (
    <motion.div 
      key={user.id}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1]
        }
      }}
      exit={{ 
        opacity: 0, 
        y: -20, 
        scale: 0.98,
        transition: { 
          duration: 0.2,
          ease: [0.4, 0, 0.6, 1]
        }
      }}
      className="absolute w-full"
    >
      <div className="flex items-center mb-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            transition: { 
              delay: 0.1,
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1]
            }
          }}
        >
          <img 
            src={user.image} 
            alt={user.name} 
            className="w-16 h-16 rounded-full border-2 border-blue-100 mr-4"
          />
        </motion.div>
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ 
            x: 0, 
            opacity: 1,
            transition: { 
              delay: 0.15,
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1]
            }
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            {user.name}
          </h2>
          <p className="text-lg text-gray-600">
            {user.role} at {user.company}
          </p>
        </motion.div>
      </div>
      
      <motion.p 
        className="mt-6 max-w-3xl text-base sm:text-lg text-gray-700"
        initial={{ y: 10, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          transition: { 
            delay: 0.2,
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1]
          }
        }}
      >
        {user.name} is a {user.role} at {user.company} with extensive experience in
        product research, ideation, roadmaps, user stories, execution, and
        launch. {user.company} trusts {user.name.split(' ')[0]} for
        end-to-end product lifecycle success.
      </motion.p>
      
      <motion.button 
        className="mt-8 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        initial={{ y: 10, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          transition: { 
            delay: 0.25,
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1]
          }
        }}
      >
        Hire {user.name.split(' ')[0]}
      </motion.button>
    </motion.div>
  );
};

export default React.memo(SelectedProfile);
