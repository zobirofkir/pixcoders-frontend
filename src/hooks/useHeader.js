import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for header component logic
 * @returns {Object} Header state and handlers
 */
export const useHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 10;
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled);
    }
  }, [scrolled]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleLinkClick = useCallback(() => {
    closeMenu();
  }, [closeMenu]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && 
          !menuRef.current.contains(event.target) && 
          !event.target.closest('button[aria-label="Toggle menu"]')) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen, closeMenu]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return {
    isMenuOpen,
    scrolled,
    menuRef,
    toggleMenu,
    closeMenu,
    handleLinkClick
  };
};
