import React from 'react';
import { FiMail, FiMapPin, FiGlobe, FiPhone } from 'react-icons/fi';

const AboutProfileComponent = ({ user, formData, isEditing, onInputChange }) => {
  const { profile } = user || {};

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
      <div className="space-y-4">
        <ContactFieldComponent
          icon={FiMail}
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          displayValue={user?.email}
          isEditing={isEditing}
          onChange={onInputChange}
          placeholder="Your email"
        />
        
        <ContactFieldComponent
          icon={FiMapPin}
          label="Location"
          name="location"
          value={formData.location}
          displayValue={profile?.location}
          isEditing={isEditing}
          onChange={onInputChange}
          placeholder="Your location"
        />

        <WebsiteFieldComponent
          profile={profile}
          formData={formData}
          isEditing={isEditing}
          onInputChange={onInputChange}
        />

        <ContactFieldComponent
          icon={FiPhone}
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          displayValue={profile?.phone}
          isEditing={isEditing}
          onChange={onInputChange}
          placeholder="Your phone number"
        />
      </div>
    </div>
  );
};

const ContactFieldComponent = ({ 
  icon: Icon, 
  label, 
  name, 
  type = "text", 
  value, 
  displayValue, 
  isEditing, 
  onChange, 
  placeholder 
}) => (
  <div className="flex items-start gap-3">
    <Icon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
    <div className="flex-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-500 mb-1">
        {label}
      </label>
      {isEditing ? (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder={placeholder}
        />
      ) : (
        <p className="text-gray-900">{displayValue || 'Not provided'}</p>
      )}
    </div>
  </div>
);

const WebsiteFieldComponent = ({ profile, formData, isEditing, onInputChange }) => (
  <div className="flex items-start gap-3">
    <FiGlobe className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
    <div className="flex-1">
      <label htmlFor="website" className="block text-sm font-medium text-gray-500 mb-1">
        Website
      </label>
      {isEditing ? (
        <div className="flex rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
            https://
          </span>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website.replace('https://', '')}
            onChange={(e) => {
              onInputChange({
                target: {
                  name: 'website',
                  value: e.target.value ? `https://${e.target.value.replace(/^https?:\/\//, '')}` : ''
                }
              });
            }}
            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="example.com"
          />
        </div>
      ) : profile?.website ? (
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