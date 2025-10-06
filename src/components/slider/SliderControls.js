import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const SliderControls = ({ 
  onPrev, 
  onNext, 
  current, 
  totalSlides,
  onDotClick 
}) => {
  return (
    <motion.div 
      className="flex justify-center mt-6 sm:mt-8 space-x-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <button
        onClick={onPrev}
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
            onClick={() => onDotClick(index)}
            className={`h-2 rounded-full ${current === index ? 'bg-blue-600' : 'bg-gray-300'}`}
            animate={current === index ? { width: 24 } : { width: 8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            aria-label={`Go to slide ${index + 1}`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
      
      <button
        onClick={onNext}
        className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        aria-label="Next slide"
        disabled={current === totalSlides - 1}
      >
        <FiChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
      </button>
    </motion.div>
  );
};

export default React.memo(SliderControls);
