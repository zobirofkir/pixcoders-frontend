import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Logo from './LogoComponent';
import MobileUserMenu from './MobileUserMenuComponent';

const navLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Projects", href: "/projects" },
  { name: "Messages", href: "/messages" },
  { name: "Notifications", href: "/notifications" },
  { name: "Support", href: "/support" },
];

const MobileMenuComponent = ({ isOpen, onClose }) => {
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 transform transition-all duration-300 ease-in-out">
      <div 
        className="fixed inset-0 bg-black transition-opacity duration-300"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        onClick={onClose}
      />
      <div className="relative w-64 h-full bg-white shadow-xl overflow-y-auto transform transition-transform duration-300">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Logo />
          </Link>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>
        
        <nav className="flex flex-col py-3 px-4 space-y-2">
          {navLinks.map((link, index) => {
            const delay = (index + 1) * 75;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-all duration-300 transform hover:translate-x-1"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `opacity 0.3s ease ${delay}ms, transform 0.3s ease ${delay}ms`
                }}
                onClick={onClose}
              >
                {link.name}
              </Link>
            );
          })}
          
          <MobileUserMenu onClose={onClose} />
        </nav>
      </div>
    </div>
  );
};

export default MobileMenuComponent;
