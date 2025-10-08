import React from 'react';
import { FiCheck, FiBriefcase, FiAward } from 'react-icons/fi';

const MainProfileComponent = ({ 
  user, 
  formData, 
  isEditing, 
  isSubmitting, 
  onInputChange, 
  onCancel, 
  onSubmit 
}) => {
  const { profile } = user || {};

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start mb-6">
        <div className="w-full">
          {isEditing ? (
            <EditingFormComponent
              formData={formData}
              onInputChange={onInputChange}
            />
          ) : (
            <DisplayInfoComponent
              user={user}
              formData={formData}
              profile={profile}
            />
          )}
        </div>
      </div>

      <BioSectionComponent
        profile={profile}
        formData={formData}
        isEditing={isEditing}
        onInputChange={onInputChange}
      />

      <DescriptionSectionComponent
        profile={profile}
        formData={formData}
        isEditing={isEditing}
        onInputChange={onInputChange}
      />

      {isEditing && (
        <ActionButtonsSectionComponent
          isSubmitting={isSubmitting}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      )}

      <ExperienceEducationComponent profile={profile} />
    </div>
  );
};

const EditingFormComponent = ({ formData, onInputChange }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
          First Name
        </label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={onInputChange}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="First name"
        />
      </div>
      <div>
        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
          Last Name
        </label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={onInputChange}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Last name"
        />
      </div>
    </div>
    
    <div>
      <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
        Username
      </label>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={onInputChange}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        placeholder="username"
      />
    </div>
  </div>
);

const DisplayInfoComponent = ({ user, formData, profile }) => (
  <>
    <div className="flex items-center gap-3">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
        {user?.name || `${formData.first_name || ''} ${formData.last_name || ''}`.trim() || 'User'}
      </h1>
      {user?.verified && (
        <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full">
          <FiCheck className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
    <p className="text-blue-600 font-semibold text-lg">{profile?.role || 'Member'}</p>
    {profile?.username && (
      <p className="text-gray-500 text-sm mt-1 font-medium">@{profile.username}</p>
    )}
  </>
);

const BioSectionComponent = ({ profile, formData, isEditing, onInputChange }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-2">Bio</h3>
    {isEditing ? (
      <textarea
        id="bio"
        name="bio"
        rows="3"
        value={formData.bio}
        onChange={onInputChange}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        placeholder="Tell us about yourself..."
      />
    ) : (
      <p className="text-gray-700">
        {profile?.bio || 'No bio provided'}
      </p>
    )}
  </div>
);

const DescriptionSectionComponent = ({ profile, formData, isEditing, onInputChange }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">About Me</h3>
      {isEditing ? (
        <textarea
          id="description"
          name="description"
          rows="5"
          value={formData.description}
          onChange={onInputChange}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Tell us more about yourself..."
        />
      ) : (
        <p className="text-gray-700 whitespace-pre-line">
          {profile?.description || 'No information provided.'}
        </p>
      )}
    </div>
  </div>
);

const ActionButtonsSectionComponent = ({ isSubmitting, onCancel, onSubmit }) => (
  <div className="pt-4 border-t border-gray-200">
    <div className="flex justify-end space-x-3">
      <button
        type="button"
        onClick={onCancel}
        className="px-6 py-2.5 border border-gray-300 rounded-lg shadow-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
      >
        Cancel
      </button>
      <button
        type="submit"
        onClick={onSubmit}
        disabled={isSubmitting}
        className="px-6 py-2.5 border border-transparent rounded-lg shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Saving...
          </div>
        ) : (
          'Save Changes'
        )}
      </button>
    </div>
  </div>
);

const ExperienceEducationComponent = ({ profile }) => (
  <div className="space-y-6 mt-6">
    {profile?.experience && (
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600">
            <FiBriefcase className="w-5 h-5" />
          </div>
        </div>
        <div>
          <h4 className="font-medium text-gray-900">Experience</h4>
          <p className="text-gray-600">{profile.experience}</p>
        </div>
      </div>
    )}

    {profile?.education && (
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600">
            <FiAward className="w-5 h-5" />
          </div>
        </div>
        <div>
          <h4 className="font-medium text-gray-900">Education</h4>
          <p className="text-gray-600">{profile.education}</p>
        </div>
      </div>
    )}
  </div>
);

export default MainProfileComponent;