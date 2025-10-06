import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

/**
 * Slider navigation controls component
 * @param {Object} props - Component props
 * @param {Function} props.onPrev - Function to go to the previous slide
 * @param {Function} props.onNext - Function to go to the next slide
 * @param {number} props.current - Current slide index
 * @param {number} props.totalSlides - Total number of slides
 * @returns {JSX.Element} The slider navigation controls
 */
const SliderControlComponent = ({ onPrev, onNext, current, totalSlides }) => {
  return (
    <div className="flex justify-between items-center mt-8">
      <button
        onClick={onPrev}
        className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="w-6 h-6 text-gray-700" />
      </button>
      
      <div className="flex space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              // Optional: Add direct navigation to specific slide
              // You'll need to modify the parent component to handle this
            }}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === current ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <button
        onClick={onNext}
        className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        aria-label="Next slide"
      >
        <FiChevronRight className="w-6 h-6 text-gray-700" />
      </button>
    </div>
  );
};

export default SliderControlComponent;
