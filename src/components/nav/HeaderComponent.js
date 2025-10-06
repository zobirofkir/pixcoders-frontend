'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

import LogoComponent from './header/LogoComponent';
import NavLinksComponent from './header/NavLinksComponent';
import AuthLinksComponent from './header/AuthLinksComponent';
import MobileMenuButtonComponent from './header/MobileMenuButtonComponent';
import { useHeader } from '@/src/hooks/useHeader';
import TopHeaderComponent from './header/TopHeaderComponent';

/**
 * HeaderComponent - A responsive header with mobile menu functionality
 * @returns {JSX.Element} The header component with navigation and mobile menu
 */
const HeaderComponent = () => {
  const {
    isMenuOpen,
    scrolled,
    menuRef,
    toggleMenu,
    closeMenu,
    handleLinkClick
  } = useHeader();

  return (
    <>
    
    {
      /**
       * Top header
       */
    }
    <TopHeaderComponent />

      {/* Main Header */}
      <header className={`sticky top-8 w-full z-40 transition-all duration-300 ease-in-out ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90 backdrop-blur-sm'
      } border-b border-gray-100`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex-shrink-0">
              <LogoComponent />
            </div>

            <div className="hidden md:flex items-center space-x-8 ml-10">
              <NavLinksComponent />
            </div>

            <div className="hidden md:flex items-center space-x-4 ml-auto">
              <div className="h-6 w-px bg-gray-200" />
              <AuthLinksComponent />
            </div>

            <div className="md:hidden flex items-center space-x-4">
              <MobileMenuButtonComponent isOpen={isMenuOpen} onClick={toggleMenu} />
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={closeMenu}
              role="presentation"
            />
            
            <motion.div
              ref={menuRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
              className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="flex items-center justify-between px-6 h-16 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                <LogoComponent />
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="px-6 py-6 space-y-8">
                <NavLinksComponent isMobile onLinkClick={handleLinkClick} />
                <div className="space-y-4">
                  <AuthLinksComponent isMobile onLinkClick={handleLinkClick} />
                </div>
                <div className="pt-4 border-t border-gray-100 text-center">
                  <p className="text-sm text-gray-500">© {new Date().getFullYear()} Pixcoders. All rights reserved.</p>
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