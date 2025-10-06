'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import components
import Logo from './components/Logo';
import NavLinks from './components/NavLinks';
import AuthLinks from './components/AuthLinks';
import MobileMenuButton from './components/MobileMenuButton';
import SearchButton from './components/SearchButton';

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
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 ml-10">
            <NavLinks />
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-6 ml-auto">
            <SearchButton />
            <AuthLinks />
          </div>

          {/* Mobile menu button */}
          <MobileMenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <NavLinks isMobile onLinkClick={handleLinkClick} />
              <AuthLinks isMobile onLinkClick={handleLinkClick} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderComponent;