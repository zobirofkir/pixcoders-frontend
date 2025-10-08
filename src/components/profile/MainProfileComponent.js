import React from 'react';
import { FiCheck, FiBriefcase, FiAward } from 'react-icons/fi';

const MainProfileComponent = ({ user }) => {
  const { profile } = user || {};

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start mb-6">
        <div className="w-full">
          <DisplayInfoComponent
            user={user}
            profile={profile}
          />
        </div>
      </div>

      <BioSectionComponent profile={profile} />

      <DescriptionSectionComponent profile={profile} />

      <ExperienceEducationComponent profile={profile} />
    </div>
  );
};



const DisplayInfoComponent = ({ user, profile }) => (
  <>
    <div className="flex items-center gap-3">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
        {user?.name || 'User'}
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

const BioSectionComponent = ({ profile }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-2">Bio</h3>
    <p className="text-gray-700">
      {profile?.bio || 'No bio provided'}
    </p>
  </div>
);

const DescriptionSectionComponent = ({ profile }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">About Me</h3>
      <p className="text-gray-700 whitespace-pre-line">
        {profile?.description || 'No information provided.'}
      </p>
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