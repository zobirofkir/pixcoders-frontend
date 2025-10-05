'use client';

import { useEffect, useState } from 'react';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set the date we're counting down to (2 months from now)
    const countDownDate = new Date();
    countDownDate.setMonth(countDownDate.getMonth() + 2);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      // Calculate time units
      const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30));
      const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        months,
        days,
        hours,
        minutes,
        seconds,
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
          {value.toString().padStart(2, '0')}
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

export default Countdown;
