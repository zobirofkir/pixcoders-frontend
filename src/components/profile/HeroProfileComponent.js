import React from 'react';
import Image from 'next/image';
import { FiEdit2, FiUser } from 'react-icons/fi';

const HeroProfileComponent = ({ 
  user, 
  onEditToggle
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden backdrop-blur-sm">
      <div className="relative">
        <div className="relative h-48 md:h-56 overflow-hidden">
          {user?.cover ? (
            <div className="absolute inset-0">
              <Image
                src={user.cover}
                alt="Cover"
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700" />
          )}
        </div>
        
        <AvatarProfileComponent user={user} />
        
        <ActionButtonsComponent onEditToggle={onEditToggle} />
      </div>
    </div>
  );
};

const AvatarProfileComponent = ({ user }) => (
  <div className="absolute -bottom-12 left-6 z-[999] ">
    <div className="relative h-24 w-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-2xl ring-4 ring-blue-50">
      {user?.avatar ? (
        <Image
          src={user.avatar}
          alt={user.name}
          fill
          className="object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <FiUser className="w-16 h-16 text-gray-400" />
        </div>
      )}
    </div>
  </div>
);

const ActionButtonsComponent = ({ onEditToggle }) => (
  <div className="absolute top-4 right-4 flex space-x-2 z-[999] ">
    <button
      type="button"
      onClick={onEditToggle}
      className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-200 hover:border-blue-300 transform hover:scale-105"
    >
      <FiEdit2 className="w-4 h-4" />
      Edit Profile
    </button>
  </div>
);

export default HeroProfileComponent;