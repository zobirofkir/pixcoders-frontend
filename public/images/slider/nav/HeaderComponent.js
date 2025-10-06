'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX, FiChevronDown, FiSearch } from 'react-icons/fi';

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

  const navLinks = [
    { name: 'Find Talent', href: '/talent' },
    { name: 'Find Work', href: '/work' },
    { name: 'Why Toptal', href: '/why-toptal' },
    { name: 'Enterprise', href: '/enterprise' },
    { name: 'About Us', href: '/about' },
  ];

  const authLinks = [
    { name: 'Log In', href: '/login' },
    { name: 'Hire Top Talent', href: '/hire', highlight: true },
  ];

  return (
    <header className="fixed w-full z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/logo/logo.png" 
                alt="Pixcoders Logo" 
                width={120} 
                height={32}
                className="h-auto w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 ml-10">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link 
                  href={link.href}
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center"
                >
                  {link.name}
                  <FiChevronDown className="ml-1 h-4 w-4" />
                </Link>
                {/* Dropdown menu would go here */}
              </div>
            ))}
          </nav>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-6 ml-auto">
            <button className="text-gray-700 hover:text-gray-900">
              <FiSearch className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-4">
              {authLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium ${
                    link.highlight 
                      ? 'bg-green-500 hover:bg-green-600 text-white rounded-md' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {[...navLinks, ...authLinks].map((link) => (
                <Link
                  key={`${link.name}-mobile`}
                  href={link.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md ${
                    link.highlight 
                      ? 'bg-green-500 text-white hover:bg-green-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderComponent;