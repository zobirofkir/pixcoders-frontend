import React from 'react';
import Image from 'next/image';
import { FiCamera, FiEdit2, FiSave, FiX, FiUser } from 'react-icons/fi';

const HeroProfileComponent = ({ 
  user, 
  formData, 
  isEditing, 
  isSubmitting, 
  onFileChange, 
  onEditToggle, 
  onCancel, 
  onSubmit 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden backdrop-blur-sm">
      <div className="relative h-48 md:h-56 overflow-hidden">
        {isEditing ? (
          <div className="relative h-full group">
            <input
              type="file"
              id="cover"
              name="cover"
              onChange={onFileChange}
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            {formData.cover ? (
              <div className="absolute inset-0">
                <Image
                  src={URL.createObjectURL(formData.cover)}
                  alt="Cover preview"
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-105"
                />
              </div>
            ) : user?.cover ? (
              <div className="absolute inset-0">
                <Image
                  src={user.cover}
                  alt="Cover"
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-105 z-[999] "
                />
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 flex items-center justify-center">
                <div className="text-center text-white">
                  <FiCamera className="w-8 h-8 mx-auto mb-2" />
                  <span className="text-sm font-medium">Click to upload cover photo</span>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-white text-center">
                <FiCamera className="w-6 h-6 mx-auto mb-1" />
                <span className="text-sm">Change Cover</span>
              </div>
            </div>
          </div>
        ) : user?.cover ? (
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
      
      <AvatarProfileComponent 
        user={user}
        formData={formData}
        isEditing={isEditing}
        onFileChange={onFileChange}
      />
      
      <ActionButtonsComponent 
        isEditing={isEditing}
        isSubmitting={isSubmitting}
        onEditToggle={onEditToggle}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </div>
  );
};

const AvatarProfileComponent = ({ user, formData, isEditing, onFileChange }) => (
  <div className="absolute -bottom-16 left-6">
    <div className="relative h-32 w-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-2xl ring-4 ring-blue-50">
      {isEditing ? (
        <label className="w-full h-full cursor-pointer block">
          <input
            type="file"
            id="avatar"
            name="avatar"
            onChange={onFileChange}
            accept="image/*"
            className="hidden"
          />
          <div className="w-full h-full relative group">
            {formData.avatar ? (
              <Image
                src={URL.createObjectURL(formData.avatar)}
                alt="Avatar preview"
                fill
                className="object-cover"
              />
            ) : user?.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                fill
                className="object-cover group-hover:opacity-80 transition-opacity"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300">
                <FiUser className="w-16 h-16 text-gray-400" />
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="text-center text-white">
                <FiCamera className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs font-medium">Change</span>
              </div>
            </div>
          </div>
        </label>
      ) : user?.avatar ? (
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

const ActionButtonsComponent = ({ isEditing, isSubmitting, onEditToggle, onCancel, onSubmit }) => (
  <div className="absolute bottom-4 right-4 flex space-x-2">
    {isEditing ? (
      <>
        <button
          type="button"
          onClick={onCancel}
          className="bg-white text-red-600 hover:bg-red-50 px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 border border-red-200 hover:border-red-300"
        >
          <FiX className="w-4 h-4" />
          Cancel
        </button>
        <button
          type="submit"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <FiSave className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
      </>
    ) : (
      <button
        type="button"
        onClick={onEditToggle}
        className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-200 hover:border-blue-300 transform hover:scale-105"
      >
        <FiEdit2 className="w-4 h-4" />
        Edit Profile
      </button>
    )}
  </div>
);

export default HeroProfileComponent;