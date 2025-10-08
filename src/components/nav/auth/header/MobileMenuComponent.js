import { useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Logo from './LogoComponent';
import MobileUserMenu from './MobileUserMenuComponent';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Dashboard', href: '/users/dashboard' },
];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeInOut' }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeInOut' }
  }
};

const menuVariants = {
  hidden: { x: '-100%' },
  visible: { 
    x: 0,
    transition: { 
      type: 'spring',
      damping: 25,
      stiffness: 300,
      mass: 0.8
    }
  },
  exit: { 
    x: '-100%',
    transition: { 
      type: 'spring',
      damping: 25,
      stiffness: 300,
      mass: 0.8
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.05 * i,
      type: 'spring',
      stiffness: 300,
      damping: 24
    }
  }),
  exit: { opacity: 0, x: -20 }
};

const MobileMenuComponent = ({ isOpen, onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            onClick={onClose}
            aria-hidden="true"
          />
          
          {/* Menu */}
          <motion.div
            ref={menuRef}
            className="fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 focus:outline-none"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Logo />
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              
              {/* Navigation */}
              <nav className="flex-1 py-4 px-2 overflow-y-auto">
                <ul className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.name}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={itemVariants}
                    >
                      <Link
                        href={link.href}
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        onClick={onClose}
                      >
                        <span className="mr-3 text-lg">{link.icon}</span>
                        <span>{link.name}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                
                {/* User Menu */}
                <motion.div
                  custom={navLinks.length}
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                  className="mt-4 pt-4 border-t border-gray-100"
                >
                  <MobileUserMenu onClose={onClose} />
                </motion.div>
              </nav>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenuComponent;
