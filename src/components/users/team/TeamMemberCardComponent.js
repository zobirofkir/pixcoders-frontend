'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiGithub, FiTwitter, FiLinkedin, FiGlobe } from 'react-icons/fi';

const TeamMemberCardComponent = ({ member }) => {
  if (member.isJoinCard) {
    return (
      <motion.div 
        className="group flex flex-col items-center justify-center p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border-2 border-dashed border-gray-200 hover:border-indigo-300 transition-all duration-300 h-full min-h-[350px] hover:shadow-xl hover:-translate-y-1"
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <span className="text-4xl font-bold text-indigo-500">+</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">{member.name}</h3>
        <p className="text-indigo-600 font-medium mb-4 text-center">{member.role}</p>
        <p className="text-gray-600 text-center mb-8 leading-relaxed">{member.bio}</p>
        <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg">
          View Openings
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="group bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <TeamMemberImage member={member} />
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
          <p className="text-indigo-600 font-medium mb-4">{member.role}</p>
          <p className="text-gray-600 mb-6 leading-relaxed">{member.bio}</p>
        </div>
        <div className="pt-4 border-t border-gray-100">
          <div className="flex space-x-3 justify-center">
            {member.social?.twitter && (
              <a 
                href={member.social.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-500 transition-colors"
                aria-label={`${member.name}'s Twitter`}
              >
                <FiTwitter className="w-5 h-5" />
              </a>
            )}
            {member.social?.linkedin && (
              <a 
                href={member.social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-500 transition-colors"
                aria-label={`${member.name}'s LinkedIn`}
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
            )}
            {member.social?.github && (
              <a 
                href={member.social.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-500 transition-colors"
                aria-label={`${member.name}'s GitHub`}
              >
                <FiGithub className="w-5 h-5" />
              </a>
            )}
            {member.social?.website && (
              <a 
                href={member.social.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-500 transition-colors"
                aria-label={`${member.name}'s Website`}
              >
                <FiGlobe className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TeamMemberImage = ({ member }) => (
  <div className="relative h-72 w-full bg-gradient-to-br from-indigo-50 to-purple-50 overflow-hidden group">
    {member.image ? (
      <Image
        src={member.image}
        alt={member.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-all duration-500 group-hover:scale-105"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
      />
    ) : (
      <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
        <span className="text-5xl font-bold text-indigo-300">
          {member.name.split(' ').map(n => n[0]).join('')}
        </span>
      </div>
    )}
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </div>
);

export default TeamMemberCardComponent;
