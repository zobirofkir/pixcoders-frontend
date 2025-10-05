'use client';

import { useEffect, useState } from 'react';

const CountdownComponent = () => {
  const [timeLeft, setTimeLeft] = useState({
    months: '--',
    days: '--',
    hours: '--',
    minutes: '--',
    seconds: '--',
  });
  
  // Function to format time values with leading zeros
  const formatTimeValue = (value) => {
    return value < 0 ? '00' : value.toString().padStart(2, '0');
  };

  useEffect(() => {
    // Check if we have a stored target date, otherwise create a new one 2 months from now
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
      
      // If countdown is finished, clear the stored date and reset
      if (distance < 0) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem(STORAGE_KEY);
        }
        distance = 0;
      }

      // Calculate time units
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

    // Update immediately
    updateCountdown();

    // Then update every second
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

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
