'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '@/redux/slices/authSlice';
import Image from 'next/image';
import { FiEdit2, FiMail, FiGlobe, FiPhone, FiMapPin, FiBriefcase, FiAward, FiUser } from 'react-icons/fi';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const { profile } = user;
  const skills = profile?.skills ? JSON.parse(profile.skills) : [];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 h-48 md:h-56">
            <div className="absolute -bottom-16 left-6">
              <div className="relative h-32 w-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <FiUser className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>
            </div>
            <div className="absolute bottom-4 right-4">
              <button className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-sm">
                <FiEdit2 className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 px-6 pb-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Column */}
              <div className="md:w-1/3 space-y-6">
                <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <FiMail className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-gray-900">{user.email}</p>
                      </div>
                    </div>
                    
                    {profile?.location && (
                      <div className="flex items-start gap-3">
                        <FiMapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="text-gray-900">{profile.location}</p>
                        </div>
                      </div>
                    )}

                    {profile?.website && (
                      <div className="flex items-start gap-3">
                        <FiGlobe className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Website</p>
                          <a 
                            href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {profile.website}
                          </a>
                        </div>
                      </div>
                    )}

                    {profile?.phone && (
                      <div className="flex items-start gap-3">
                        <FiPhone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="text-gray-900">{profile.phone}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {skills.length > 0 && (
                  <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="md:w-2/3 space-y-6">
                <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                      <p className="text-blue-600 font-medium">{profile?.role || 'Member'}</p>
                    </div>
                  </div>

                  {profile?.bio && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Bio</h3>
                      <p className="text-gray-700">{profile.bio}</p>
                    </div>
                  )}

                  <div className="space-y-6">
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
                </div>

                {profile?.description && (
                  <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">About Me</h3>
                    <p className="text-gray-700 whitespace-pre-line">{profile.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;