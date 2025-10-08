import { useState, useEffect, useCallback } from 'react';

export const useSlider = (profileData, cardsPerSlide) => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedUser, setSelectedUser] = useState(profileData[0]);
  
  const cardsToShow = isMobile ? 1 : cardsPerSlide;
  const totalSlides = Math.ceil(profileData.length / cardsToShow);
  const transformOffset = current * (100 / cardsToShow);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);
    return () => clearTimeout(timer);
  }, [current]);

  const nextSlide = useCallback(() => {
    setCurrent(prev => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrent(prev => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const goToSlide = useCallback((index) => {
    setCurrent(index);
  }, []);

  const handleCardClick = useCallback((user) => {
    if (user.id !== selectedUser?.id) {
      setSelectedUser(null);
      // Small delay to allow exit animation to complete
      setTimeout(() => setSelectedUser(user), 200);
    }
  }, [selectedUser]);

  return {
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
    setSelectedUser,
  };
};
