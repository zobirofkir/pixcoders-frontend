'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import LogoComponent from './header/LogoComponent';
import NavLinksComponent from './header/NavLinksComponent';
import AuthLinksComponent from './header/AuthLinksComponent';
import MobileMenuButtonComponent from './header/MobileMenuButtonComponent';
import SearchButtonComponent from './header/SearchButtonComponent';

const HeaderComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed w-full z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <LogoComponent />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 ml-10">
            <NavLinksComponent />
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-6 ml-auto">
            <SearchButtonComponent />
            <AuthLinksComponent />
          </div>

          {/* Mobile menu button */}
          <MobileMenuButtonComponent isOpen={isMenuOpen} onClick={toggleMenu} />
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <NavLinksComponent isMobile onLinkClick={handleLinkClick} />
              <AuthLinksComponent isMobile onLinkClick={handleLinkClick} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderComponent;