"use client"
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import profileData, { SLIDER_CONFIG } from '../../data/profileData';
import { useSlider } from '../../hooks/useSlider';
import SliderCardComponent from './hero/SliderCardComponent';
import SelectedProfileComponent from './hero/SelectedProfileComponent';
import SliderControlsComponent from './hero/SliderControlsComponent';

/**
 * A responsive slider component that displays professional profiles in a carousel.
 * Features smooth animations, auto-sliding, and responsive design.
 * @returns {JSX.Element} The rendered slider component
 */
const SliderComponent = () => {
  const {
    current,
    isMobile,
    selectedUser,
    cardsToShow,
    totalSlides,
    transformOffset,
    nextSlide,
    prevSlide,
    goToSlide,
    handleCardClick,
  } = useSlider(profileData, SLIDER_CONFIG.CARDS_PER_SLIDE);

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
            <SelectedProfileComponent user={selectedUser} />
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
                <SliderCardComponent
                  key={profile.id}
                  profile={profile}
                  isSelected={selectedUser?.id === profile.id}
                  onClick={() => handleCardClick(profile)}
                  isMobile={isMobile}
                  index={index}
                  cardsToShow={cardsToShow}
                />
              ))}
            </motion.div>
          </div>
          
          {totalSlides > 1 && (
            <SliderControlsComponent
              onPrev={prevSlide}
              onNext={nextSlide}
              current={current}
              totalSlides={totalSlides}
              onDotClick={goToSlide}
            />
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SliderComponent;