'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiGlobe } from 'react-icons/fi';
import Image from 'next/image';

// Sample team data - replace with your actual team members
const teamMembers = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'CEO & Founder',
    image: '/images/team/alex.jpg', // Replace with actual image paths
    bio: 'Visionary leader with 10+ years of experience in tech entrepreneurship.',
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      website: 'https://example.com'
    }
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Lead Developer',
    image: '/images/team/sarah.jpg',
    bio: 'Full-stack developer specializing in modern web technologies and architecture.',
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  {
    id: 3,
    name: 'Michael Brown',
    role: 'UI/UX Designer',
    image: '/images/team/michael.jpg',
    bio: 'Passionate about creating intuitive and beautiful user experiences.',
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      website: 'https://example.com'
    }
  },
  {
    id: 4,
    name: 'Emily Davis',
    role: 'Marketing Director',
    image: '/images/team/emily.jpg',
    bio: 'Data-driven marketer with a passion for growth and community building.',
    social: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    id: 5,
    name: 'David Kim',
    role: 'DevOps Engineer',
    image: '/images/team/david.jpg',
    bio: 'Ensuring our infrastructure is scalable, reliable, and secure.',
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    id: 6,
    name: 'Join Our Team',
    role: 'Your Role Here',
    image: '',
    bio: 'We\'re always looking for talented individuals to join our growing team.',
    isJoinCard: true
  }
];

const TeamMemberCard = ({ member }) => {
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
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
          <p className="text-indigo-600 font-medium mb-4">{member.role}</p>
          <p className="text-gray-600 mb-6">{member.bio}</p>
        </div>
        <div className="flex space-x-3">
          {member.social?.twitter && (
            <a 
              href={member.social.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-500 transition-colors"
              aria-label={`${member.name}'s Twitter`}
            >
              <FiTwitter size={20} />
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
              <FiLinkedin size={20} />
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
              <FiGithub size={20} />
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
              <FiGlobe size={20} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Meet Our <span className="text-indigo-600">Team</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            The talented people behind our success. We're a diverse team of passionate individuals working together to create amazing experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Want to join our team?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals who are passionate about what they do. Check out our open positions and join our growing team.
          </p>
          <button className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
            View Open Positions
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;