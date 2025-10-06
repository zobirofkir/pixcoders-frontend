'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

import LogoComponent from './header/LogoComponent';
import NavLinksComponent from './header/NavLinksComponent';
import AuthLinksComponent from './header/AuthLinksComponent';
import MobileMenuButtonComponent from './header/MobileMenuButtonComponent';
import SearchButtonComponent from './header/SearchButtonComponent';
import { useHeader } from '@/src/hooks/useHeader';

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
      <header className={`fixed w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'
      } border-b border-gray-100`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <LogoComponent />
            </div>

            <div className="hidden md:flex items-center space-x-8 ml-10">
              <NavLinksComponent />
            </div>

            <div className="hidden md:flex items-center space-x-6 ml-auto">
              <SearchButtonComponent />
              <AuthLinksComponent />
            </div>

            <div className="md:hidden">
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
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={closeMenu}
              role="presentation"
            />
            
            <motion.div
              ref={menuRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
              className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white shadow-xl z-50 overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
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