import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.15,
        ease: 'easeIn'
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1 rounded-lg transition-all"
      >
        <motion.div 
          className="rounded-full overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png"
            alt="User"
            className="rounded-full object-cover w-8 h-8"
          />
        </motion.div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaChevronDown
            size={14}
            className="text-gray-500"
          />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
          >
            <motion.div variants={itemVariants}>
              <Link
                href="/profile"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <FaUser size={14} /> Profile
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link
                href="/settings"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <FaCog size={14} /> Settings
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <hr className="my-1 border-gray-100" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <button
                onClick={() => {
                  setIsOpen(false);
                  alert("Logout");
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors text-left"
              >
                <FaSignOutAlt size={14} /> Logout
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;
