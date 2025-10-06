import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const SliderCardComponent = ({ 
  profile, 
  isSelected, 
  onClick,
  isMobile 
}) => {
  return (
    <motion.div
      className={`flex-shrink-0 p-2 sm:p-4 w-full ${isMobile ? 'sm:w-full' : 'sm:w-1/2 lg:w-1/3'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: isMobile ? 0 : -5, transition: { duration: 0.2 } }}
    >
      <motion.div 
        className={`bg-gray-50 border-2 ${isSelected ? 'border-blue-200' : 'border-gray-100'} p-4 rounded-xl flex flex-col items-center text-center h-full cursor-pointer transition-all duration-300`}
        whileHover={{ 
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          y: -5,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        animate={{
          borderColor: isSelected ? '#93c5fd' : '#f3f4f6',
          transition: { duration: 0.3 }
        }}
      >
        <img
          className="h-28 w-28 rounded-full object-cover mb-4 border-4 border-white shadow-md"
          src={profile.image}
          alt={profile.name}
          loading="lazy"
        />
        
        <h4 className="text-xl font-semibold text-gray-900">{profile.name}</h4>
        <div className="flex items-center text-sm font-medium mt-1 text-gray-600">
          {profile.isVerified && (
            <FaCheckCircle className="h-4 w-4 text-green-500 mr-1" />
          )}
          Verified Expert
        </div>
        
        <p className="text-sm text-gray-500 mt-2">{profile.role}</p>

        <div className="mt-4 pt-4 border-t border-gray-200 w-full flex flex-col items-center">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            Previously at
          </p>
          <img
            className="h-6 object-contain mt-2"
            src={profile.companyLogo}
            alt={`${profile.company} Logo`}
            loading="lazy"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default React.memo(SliderCardComponent);
