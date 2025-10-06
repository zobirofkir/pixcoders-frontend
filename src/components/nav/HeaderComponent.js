'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

import LogoComponent from './header/LogoComponent';
import NavLinksComponent from './header/NavLinksComponent';
import AuthLinksComponent from './header/AuthLinksComponent';
import MobileMenuButtonComponent from './header/MobileMenuButtonComponent';
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
      {/* Top Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0">
            <div className="flex items-center space-x-4">
              <a href="mailto:contact@pixcoders.dev" className="flex items-center hover:text-blue-200 transition-colors">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contact@pixcoders.dev
              </a>
              <a href="tel:+1234567890" className="flex items-center hover:text-blue-200 transition-colors">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +1 (234) 567-890
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://twitter.com/pixcoders" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://github.com/pixcoders" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://linkedin.com/company/pixcoders" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg mt-0' : 'bg-white/90 backdrop-blur-sm mt-8'
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