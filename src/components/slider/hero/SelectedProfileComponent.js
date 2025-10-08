import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiMapPin, FiAward, FiStar } from 'react-icons/fi';

/**
 * Animation variants for smooth transitions
 */
const containerVariants = {
  hidden: { 
    opacity: 0, 
    y: 30, 
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    y: -30, 
    scale: 0.95,
    transition: { 
      duration: 0.3,
      ease: [0.4, 0, 0.6, 1]
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const SelectedProfileComponent = ({ user, onHire }) => {
  const [imageError, setImageError] = useState(false);
  const [isHiring, setIsHiring] = useState(false);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleHireClick = useCallback(async () => {
    if (!user || isHiring) return;
    
    setIsHiring(true);
    try {
      if (onHire) {
        await onHire(user);
      }
    } catch (error) {
      console.error('Error hiring user:', error);
    } finally {
      setIsHiring(false);
    }
  }, [user, onHire, isHiring]);

  if (!user) {
    return (
      <div className="absolute w-full flex items-center justify-center py-12">
        <div className="text-gray-500 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse" />
          <p className="text-sm">No profile selected</p>
        </div>
      </div>
    );
  }

  const firstName = user.name?.split(' ')[0] || 'User';
  const bio = user.bio || `${user.name} is a ${user.role} at ${user.company} with extensive experience in product research, ideation, roadmaps, user stories, execution, and launch. ${user.company} trusts ${firstName} for end-to-end product lifecycle success.`;

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={user.id}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="absolute w-full"
      >
        {/* Profile Header */}
        <motion.div 
          variants={itemVariants}
          className="flex items-start gap-6 mb-6"
        >
          <div className="relative flex-shrink-0">
            {!imageError ? (
              <img 
                src={user.image} 
                alt={user.name}
                onError={handleImageError}
                className="w-20 h-20 rounded-2xl border-3 border-white shadow-xl ring-4 ring-blue-50 object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl border-3 border-white shadow-xl ring-4 ring-blue-50 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xl">
                  {user.name?.charAt(0) || 'U'}
                </span>
              </div>
            )}
            
            {user.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                <FiCheck className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {user.name}
              </h2>
              {user.experience && (
                <div className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                  <FiStar className="w-3 h-3" />
                  {user.experience}y exp
                </div>
              )}
            </div>
            
            <p className="text-xl font-semibold text-blue-600 mb-1">
              {user.role}
            </p>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="font-medium">{user.company}</span>
              {user.location && (
                <div className="flex items-center gap-1">
                  <FiMapPin className="w-3 h-3" />
                  <span>{user.location}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Skills */}
        {user.skills && user.skills.length > 0 && (
          <motion.div 
            variants={itemVariants}
            className="mb-6"
          >
            <div className="flex flex-wrap gap-2">
              {user.skills.slice(0, 5).map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100"
                >
                  {skill}
                </span>
              ))}
              {user.skills.length > 5 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                  +{user.skills.length - 5} more
                </span>
              )}
            </div>
          </motion.div>
        )}
        
        {/* Bio */}
        <motion.div 
          variants={itemVariants}
          className="mb-8"
        >
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-3xl">
            {bio}
          </p>
        </motion.div>
        
        {/* Action Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap gap-4"
        >
          <motion.button 
            onClick={handleHireClick}
            disabled={isHiring}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isHiring ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </div>
            ) : (
              `Hire ${firstName}`
            )}
          </motion.button>
          
          <motion.button 
            className="px-6 py-4 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Profile
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default React.memo(SelectedProfileComponent);
