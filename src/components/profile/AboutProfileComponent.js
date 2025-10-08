import React from 'react';
import { FiMail, FiMapPin, FiGlobe, FiPhone } from 'react-icons/fi';

const AboutProfileComponent = ({ user }) => {
  const { profile } = user || {};

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
      <div className="space-y-4">
        <ContactFieldComponent
          icon={FiMail}
          label="Email"
          displayValue={user?.email}
        />
        
        <ContactFieldComponent
          icon={FiMapPin}
          label="Location"
          displayValue={profile?.location}
        />

        <WebsiteFieldComponent profile={profile} />

        <ContactFieldComponent
          icon={FiPhone}
          label="Phone"
          displayValue={profile?.phone}
        />
      </div>
    </div>
  );
};

const ContactFieldComponent = ({ 
  icon: Icon, 
  label, 
  displayValue
}) => (
  <div className="flex items-start gap-3">
    <Icon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-500 mb-1">
        {label}
      </label>
      <p className="text-gray-900">{displayValue || 'Not provided'}</p>
    </div>
  </div>
);

const WebsiteFieldComponent = ({ profile }) => (
  <div className="flex items-start gap-3">
    <FiGlobe className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-500 mb-1">
        Website
      </label>
      {profile?.website ? (
        <a 
          href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {profile.website}
        </a>
      ) : (
        <p className="text-gray-900">Not provided</p>
      )}
    </div>
  </div>
);

export default AboutProfileComponent;