"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import profileData, { CARDS_PER_SLIDE } from '../../data/profileData';

/**
 * A responsive slider component that displays professional profiles in a carousel.
 * Features smooth animations, auto-sliding, and responsive design.
 * @returns {JSX.Element} The rendered slider component
 */
const SliderComponent = () => {
  const [current, setCurrent] = useState(0);
  const [selectedUser, setSelectedUser] = useState(profileData[0]); // Default to first user
  const [isMobile, setIsMobile] = useState(false);
  
  // Calculate responsive values
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  const cardsToShow = isMobile ? 1 : CARDS_PER_SLIDE;
  const totalSlides = Math.ceil(profileData.length / cardsToShow);
  const transformOffset = current * (100 / cardsToShow);

  /**
   * Handles card click to update selected user
   * @param {Object} user - The user object that was clicked
   */
  const handleCardClick = (user) => {
    if (user.id !== selectedUser?.id) {
      setSelectedUser(null);
      // Small delay to allow exit animation to complete
      setTimeout(() => setSelectedUser(user), 200);
    }
  };

  /**
   * Advances to the next slide
   */
  const nextSlide = () => {
    setCurrent(current === totalSlides - 1 ? 0 : current + 1);
  };

  /**
   * Returns to the previous slide
   */
  const prevSlide = () => {
    setCurrent(current === 0 ? totalSlides - 1 : current - 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);
    return () => clearTimeout(timer);
  }, [current]);

  if (!Array.isArray(profileData) || profileData.length <= 0) {
    return null;
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-left mb-12 min-h-[300px] relative">
          <AnimatePresence mode="wait">
            {selectedUser && (
              <motion.div 
                key={selectedUser.id}
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
                      src={selectedUser.image} 
                      alt={selectedUser.name} 
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
                      {selectedUser.name}
                    </h2>
                    <p className="text-lg text-gray-600">
                      {selectedUser.role} at {selectedUser.company}
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
                  {selectedUser.name} is a {selectedUser.role} at {selectedUser.company} with extensive experience in
                  product research, ideation, roadmaps, user stories, execution, and
                  launch. {selectedUser.company} trusts {selectedUser.name.split(' ')[0]} for
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
                  Hire {selectedUser.name.split(' ')[0]}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative w-full max-w-6xl mx-auto mt-8 sm:mt-16 px-2 sm:px-4"
        >
          <div className="overflow-x-auto pb-4 -mx-2 sm:mx-0">
            <motion.div
              className="flex w-full"
              animate={{ 
                x: `-${transformOffset}%`,
                transition: { type: 'spring', stiffness: 300, damping: 30 }
              }}
            >
              {profileData.map((profile, index) => (
                <motion.div
                  key={profile.id}
                  className={`flex-shrink-0 p-2 sm:p-4 w-full ${isMobile ? 'sm:w-full' : `sm:w-1/${cardsToShow} lg:w-1/${cardsToShow}`}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index % cardsToShow) }}
                  whileHover={{ y: isMobile ? 0 : -5, transition: { duration: 0.2 } }}
                >
                  <motion.div 
                    className={`bg-gray-50 border-2 ${selectedUser?.id === profile.id ? 'border-blue-200' : 'border-gray-100'} p-4 rounded-xl flex flex-col items-center text-center h-full cursor-pointer transition-all duration-300`}
                    whileHover={{ 
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCardClick(profile)}
                    animate={{
                      borderColor: selectedUser?.id === profile.id ? '#93c5fd' : '#f3f4f6',
                      transition: { duration: 0.3 }
                    }}
                  >
                    <img
                      className="h-28 w-28 rounded-full object-cover mb-4 border-4 border-white shadow-md"
                      src={profile.image}
                      alt={profile.name}
                      loading="lazy"
                    />
                    
                    <h4 className="text-xl font-semibold text-gray-900">{profile.name}</h4>
                    <div className="flex items-center text-sm font-medium mt-1 text-gray-600">
                      {profile.isVerified && (
                        <FaCheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      )}
                      Verified Expert
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-2">{profile.role}</p>

                    <div className="mt-4 pt-4 border-t border-gray-200 w-full flex flex-col items-center">
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Previously at
                      </p>
                      <img
                        className="h-6 object-contain mt-2"
                        src={profile.companyLogo}
                        alt={`${profile.company} Logo`}
                        loading="lazy"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {totalSlides > 1 && (
            <motion.div 
              className="flex justify-center mt-6 sm:mt-8 space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                aria-label="Previous slide"
                disabled={current === 0}
              >
                <FiChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
              </button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-2 rounded-full ${current === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                    animate={current === index ? { width: 24 } : { width: 8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    aria-label={`Go to slide ${index + 1}`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                aria-label="Next slide"
                disabled={current === totalSlides - 1}
              >
                <FiChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SliderComponent;