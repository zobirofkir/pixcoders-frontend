import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

/**
 * Profile card component that displays individual profile information
 * @param {Object} profile - The profile data to display
 * @param {string} profile.name - Full name of the professional
 * @param {string} profile.role - Professional role or position
 * @param {string} profile.company - Current or previous company name
 * @param {string} profile.image - URL to the profile image
 * @param {string} profile.companyLogo - URL to the company's logo
 * @param {boolean} profile.isVerified - Whether the profile is verified
 * @returns {JSX.Element} The rendered profile card
 */
const ProfileCardComponent = ({ profile }) => {
  return (
    <motion.div
      className="w-full flex-shrink-0 p-4 sm:w-1/3 lg:w-1/3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div 
        className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex flex-col items-center text-center h-full"
        whileHover={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
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
            <FaCheckCircle className="text-blue-500 mr-1" />
          )}
          {profile.role}
        </div>
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <span className="truncate">{profile.company}</span>
          {profile.companyLogo && (
            <img 
              src={profile.companyLogo} 
              alt={`${profile.company} logo`} 
              className="ml-2 h-5 w-auto"
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileCardComponent;
