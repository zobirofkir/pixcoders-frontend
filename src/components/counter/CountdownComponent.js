'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * TimeUnit is a reusable component that displays a single time unit with its label.
 * @param {Object} props - Component props
 * @param {string} props.value - The numeric value to display
 * @param {string} props.label - The label for the time unit (e.g., 'Days', 'Hours')
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} A styled time unit component
 */
const TimeUnit = ({ value, label, className = '' }) => {
  const prevValue = usePrevious(value);
  const isNewValue = prevValue !== value;

  return (
    <div className={`flex flex-col items-center mx-1 sm:mx-2 ${className}`}>
      <div className="relative">
        <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-90"></div>
          <div className="absolute inset-0.5 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 opacity-80"></div>
          
          <AnimatePresence mode="wait">
            <motion.span
              key={value}
              initial={{ y: isNewValue ? -30 : 0, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative z-10 text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
            >
              {value}
            </motion.span>
          </AnimatePresence>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Subtle shadow */}
        <div className="absolute -bottom-1 left-1/2 w-3/4 h-3 bg-purple-100/50 dark:bg-purple-900/20 rounded-full blur-md -translate-x-1/2"></div>
      </div>
      
      <motion.span 
        className="mt-3 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 tracking-wider uppercase"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {label}
      </motion.span>
    </div>
  );
};

// Helper hook to track previous value
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

/**
 * CountdownComponent displays a countdown timer showing the time remaining until a target date.
 * The target date is stored in localStorage to persist across page refreshes.
 * If no target date exists, it defaults to 2 months from the current date.
 * 
 * @returns {JSX.Element} A countdown timer component with months, days, hours, minutes, and seconds
 */
const CountdownComponent = () => {
  const [timeLeft, setTimeLeft] = useState({
    months: '--',
    days: '--',
    hours: '--',
    minutes: '--',
    seconds: '--',
  });
  
  /**
   * Formats a numeric time value to ensure it has at least 2 digits with leading zeros.
   * @param {number} value - The numeric value to format
   * @returns {string} The formatted string with leading zeros
   */
  const formatTimeValue = (value) => {
    return value < 0 ? '00' : value.toString().padStart(2, '0');
  };

  useEffect(() => {
    const STORAGE_KEY = 'countdownTargetDate';
    let countDownDate;
    
    const storedDate = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    
    if (storedDate) {
      countDownDate = new Date(parseInt(storedDate));
    } else {
      countDownDate = new Date();
      countDownDate.setMonth(countDownDate.getMonth() + 2);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, countDownDate.getTime().toString());
      }
    }

    const updateCountdown = () => {
      const now = new Date().getTime();
      let distance = countDownDate - now;
      
      if (distance < 0) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem(STORAGE_KEY);
        }
        distance = 0;
      }

      const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30));
      const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        months: formatTimeValue(months),
        days: formatTimeValue(days),
        hours: formatTimeValue(hours),
        minutes: formatTimeValue(minutes),
        seconds: formatTimeValue(seconds),
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 -z-10"></div>
      
      {/* Animated dots */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-300 dark:bg-purple-900 blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-blue-300 dark:bg-blue-900 blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-36 h-36 rounded-full bg-indigo-300 dark:bg-indigo-900 blur-3xl animate-blob"></div>
      </div>
      
      <motion.div 
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
          Launching in
        </h2>
        <p className="text-gray-500 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          We're working hard to bring you something amazing. Stay tuned!
        </p>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, staggerChildren: 0.1 }}
        >
          <TimeUnit value={timeLeft.months} label="Months" className="group" />
          <div className="flex items-center justify-center text-2xl font-bold text-gray-300 dark:text-gray-600">:</div>
          <TimeUnit value={timeLeft.days} label="Days" className="group" />
          <div className="flex items-center justify-center text-2xl font-bold text-gray-300 dark:text-gray-600">:</div>
          <TimeUnit value={timeLeft.hours} label="Hours" className="group" />
          <div className="flex items-center justify-center text-2xl font-bold text-gray-300 dark:text-gray-600">:</div>
          <TimeUnit value={timeLeft.minutes} label="Minutes" className="group" />
          <div className="flex items-center justify-center text-2xl font-bold text-gray-300 dark:text-gray-600">:</div>
          <TimeUnit value={timeLeft.seconds} label="Seconds" className="group" />
        </motion.div>
        
      </motion.div>
    </div>
  );
};

export default CountdownComponent;
