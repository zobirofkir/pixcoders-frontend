import React from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiGlobe } from 'react-icons/fi';

const SocialLinksComponent = ({ member }) => (
  <div className="flex space-x-3">
    {member.social?.twitter && (
      <SocialLink 
        href={member.social.twitter}
        label={`${member.name}'s Twitter`}
        icon={<FiTwitter size={20} />}
      />
    )}
    {member.social?.linkedin && (
      <SocialLink 
        href={member.social.linkedin}
        label={`${member.name}'s LinkedIn`}
        icon={<FiLinkedin size={20} />}
      />
    )}
    {member.social?.github && (
      <SocialLink 
        href={member.social.github}
        label={`${member.name}'s GitHub`}
        icon={<FiGithub size={20} />}
      />
    )}
    {member.social?.website && (
      <SocialLink 
        href={member.social.website}
        label={`${member.name}'s Website`}
        icon={<FiGlobe size={20} />}
      />
    )}
  </div>
);

const SocialLink = ({ href, label, icon }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-indigo-500 transition-colors"
    aria-label={label}
  >
    {icon}
  </a>
);

export default SocialLinksComponent;
