'use client';

import { useEffect, useState } from 'react';

/**
 * TimeUnit is a reusable component that displays a single time unit with its label.
 * @param {Object} props - Component props
 * @param {string} props.value - The numeric value to display
 * @param {string} props.label - The label for the time unit (e.g., 'Days', 'Hours')
 * @returns {JSX.Element} A styled time unit component
 */
const TimeUnit = ({ value, label }) => (
  <div className="flex flex-col items-center mx-2">
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white rounded-xl shadow-md">
      <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {value}
      </span>
    </div>
    <span className="mt-2 text-sm sm:text-base text-gray-500 font-medium">{label}</span>
  </div>
);

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
    <div className="my-8">
      <h3 className="text-xl font-semibold text-gray-700 mb-6">Launching in</h3>
      <div className="flex justify-center flex-wrap gap-2 sm:gap-4">
        <TimeUnit value={timeLeft.months} label="Months" />
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  );
};

export default CountdownComponent;
