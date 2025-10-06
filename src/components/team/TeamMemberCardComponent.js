'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SocialLinks from './SocialLinksComponent';

const TeamMemberCardComponent = ({ member }) => {
  if (member.isJoinCard) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-lg border-2 border-dashed border-gray-200 hover:border-indigo-300 transition-all duration-300 h-full min-h-[300px]"
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-24 h-24 rounded-full bg-indigo-50 flex items-center justify-center mb-6">
          <span className="text-3xl text-indigo-500">+</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
        <p className="text-indigo-600 font-medium mb-4">{member.role}</p>
        <p className="text-gray-600 text-center mb-6">{member.bio}</p>
        <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          View Openings
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <TeamMemberImage member={member} />
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
          <p className="text-indigo-600 font-medium mb-4">{member.role}</p>
          <p className="text-gray-600 mb-6">{member.bio}</p>
        </div>
        <SocialLinks member={member} />
      </div>
    </motion.div>
  );
};

const TeamMemberImage = ({ member }) => (
  <div className="relative h-64 w-full bg-gray-100">
    {member.image ? (
      <Image
        src={member.image}
        alt={member.name}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-500 group-hover:scale-105"
      />
    ) : (
      <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
        <span className="text-4xl font-bold text-indigo-300">
          {member.name.split(' ').map(n => n[0]).join('')}
        </span>
      </div>
    )}
  </div>
);

export default TeamMemberCardComponent;
