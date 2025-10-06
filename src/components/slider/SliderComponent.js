"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaCheckCircle } from 'react-icons/fa';

/**
 * @typedef {Object} Profile
 * @property {number} id - Unique identifier for the profile
 * @property {string} name - Full name of the professional
 * @property {string} role - Professional role or position
 * @property {string} company - Current or previous company name
 * @property {string} image - URL to the profile image
 * @property {string} companyLogo - URL to the company's logo
 * @property {boolean} isVerified - Whether the profile is verified
 */

/**
 * Array of professional profiles to display in the slider
 * @type {Profile[]}
 */
const profiles = [
  {
    id: 1,
    name: 'Anneto Montinari',
    role: 'Interim PM Director',
    company: 'J.P.Morgan',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    companyLogo: 'https://cdn.iconscout.com/icon/free/png-256/jpmorgan-chase-1-285191.png',
    isVerified: true
  },
  {
    id: 2,
    name: 'Ian Cornwall',
    role: 'Product Lead',
    company: 'Google',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png',
    isVerified: true
  },
  {
    id: 3,
    name: 'Paula Yliasasi',
    role: 'Product Manager',
    company: 'BBDO',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/07/BBDO_Logo.svg/1200px-BBDO_Logo.svg.png',
    isVerified: true
  },
  {
    id: 4,
    name: 'Carson Leung',
    role: 'Product Manager',
    company: 'Airlines Inc.',
    image: 'https://randomuser.me/api/portraits/men/5.jpg',
    companyLogo: 'https://img.icons8.com/color/48/000000/amex.png',
    isVerified: true
  },
  {
    id: 5,
    name: 'Savannah Enright',
    role: 'Sr. Product Manager',
    company: 'Accenture',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Accenture_logo.svg/1200px-Accenture_logo.svg.png',
    isVerified: true
  },
  {
    id: 6,
    name: 'David Lo',
    role: 'Product Manager',
    company: 'American Express',
    image: 'https://randomuser.me/api/portraits/men/6.jpg',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png',
    isVerified: true
  }
];

/** Number of profile cards to show per slide */
const CARDS_PER_SLIDE = 3;

/**
 * A responsive slider component that displays professional profiles in a carousel.
 * Features smooth animations, auto-sliding, and responsive design.
 * @returns {JSX.Element} The rendered slider component
 */
const SliderComponent = () => {
  const [current, setCurrent] = useState(0);
  const totalSlides = Math.ceil(profiles.length / CARDS_PER_SLIDE);
  const transformOffset = current * (100 / CARDS_PER_SLIDE);

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

  if (!Array.isArray(profiles) || profiles.length <= 0) {
    return null;
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-left mb-12"
        >
          <h2 className="text-5xl font-extrabold text-gray-900 leading-none">
            Hire the <span className="text-blue-600">Top 3%</span> of
            <br />
            Product Managers
          </h2>
          <p className="mt-6 max-w-4xl text-lg text-gray-700">
            Toptal is a marketplace for top product managers who are experts in
            product research, ideation, roadmaps, user stories, execution, and
            launch. Leading companies hire product managers from Toptal for
            end-to-end product lifecycle success.
          </p>
          <button className="mt-8 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300">
            Hire a Top Product Manager
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative max-w-6xl mx-auto mt-16"
        >
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ 
                x: `-${transformOffset}%`,
                transition: { type: 'spring', stiffness: 300, damping: 30 }
              }}
            >
              {profiles.map((profile, index) => (
                <motion.div
                  key={profile.id}
                  className={`w-full flex-shrink-0 p-4 sm:w-1/${CARDS_PER_SLIDE} lg:w-1/${CARDS_PER_SLIDE}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index % CARDS_PER_SLIDE) }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <motion.div 
                    className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex flex-col items-center text-center h-full"
                    whileHover={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
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
            <>
              <motion.button 
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-12 p-3 rounded-full bg-white shadow-xl text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all z-10"
                aria-label="Previous slide"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiChevronLeft className="h-6 w-6" />
              </motion.button>
              
              <motion.button 
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-12 p-3 rounded-full bg-white shadow-xl text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all z-10"
                aria-label="Next slide"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiChevronRight className="h-6 w-6" />
              </motion.button>
            </>
          )}

          {totalSlides > 1 && (
            <motion.div 
              className="flex justify-center mt-8 space-x-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {[...Array(totalSlides)].map((_, index) => (
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
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SliderComponent;