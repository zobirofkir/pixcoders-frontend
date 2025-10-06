'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FilterSectionComponent = ({ title, children, isOpen, onToggle, isMobile }) => (
  <div className="mb-6">
    <button 
      onClick={onToggle}
      className="w-full flex justify-between items-center lg:cursor-default"
      aria-expanded={isOpen}
    >
      <h3 className="font-medium text-gray-700">{title}</h3>
      {isMobile && (
        <span>
          {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </span>
      )}
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="pt-4">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default FilterSectionComponent;
