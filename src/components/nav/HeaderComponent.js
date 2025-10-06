'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';

import LogoComponent from './header/LogoComponent';
import NavLinksComponent from './header/NavLinksComponent';
import AuthLinksComponent from './header/AuthLinksComponent';
import MobileMenuButtonComponent from './header/MobileMenuButtonComponent';
import SearchButtonComponent from './header/SearchButtonComponent';
import { FiX } from 'react-icons/fi';

const HeaderComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          !event.target.closest('button[aria-label="Toggle menu"]')) {
        setIsMenuOpen(false);
      }
    };

    // Disable body scroll when menu is open
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
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLinkClick = () => {
    closeMenu();
  };

  return (
    <>
      <header className={`fixed w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'
      } border-b border-gray-100`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <LogoComponent />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 ml-10">
              <NavLinksComponent />
            </div>

            {/* Right side items */}
            <div className="hidden md:flex items-center space-x-6 ml-auto">
              <SearchButtonComponent />
              <AuthLinksComponent />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <MobileMenuButtonComponent isOpen={isMenuOpen} onClick={toggleMenu} />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay and sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={closeMenu}
            />
            
            {/* Sidebar */}
            <motion.div
              ref={menuRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
              className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white shadow-xl z-50 overflow-y-auto"
            >
              <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100">
                <LogoComponent />
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label="Close menu"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="px-6 py-4 space-y-6">
                <NavLinksComponent isMobile onLinkClick={handleLinkClick} />
                <div className="pt-4 border-t border-gray-100">
                  <AuthLinksComponent isMobile onLinkClick={handleLinkClick} />
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <SearchButtonComponent isMobile onLinkClick={handleLinkClick} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderComponent;