'use client';

import React, { Suspense, useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, updateProfile } from '@/redux/slices/authSlice';
import Image from 'next/image';
import { 
  FiEdit2, 
  FiMail, 
  FiGlobe, 
  FiPhone, 
  FiMapPin, 
  FiBriefcase, 
  FiAward, 
  FiUser, 
  FiSave,
  FiX,
  FiPlus,
  FiCamera,
  FiCheck
} from 'react-icons/fi';
import LoadingComponent from '@/components/loading/LoadingComponent';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => {
    try {
      return {
        user: state.auth?.user || null,
        loading: state.auth?.loading || false,
        error: state.auth?.error || null
      };
    } catch (err) {
      console.error('Error accessing auth state:', err);
      return { user: null, loading: false, error: 'Failed to load user data' };
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    website: '',
    location: '',
    phone: '',
    description: '',
    username: '',
    first_name: '',
    last_name: '',
    skills: [],
    avatar: null,
    cover: null,
  });
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const initializeFormData = useCallback((userData) => {
    if (!userData) return;
    
    try {
      const { profile } = userData;
      let parsedSkills = [];
      
      if (profile?.skills) {
        try {
          parsedSkills = typeof profile.skills === 'string' 
            ? JSON.parse(profile.skills) 
            : Array.isArray(profile.skills) 
            ? profile.skills 
            : [];
        } catch (skillsError) {
          console.warn('Failed to parse skills:', skillsError);
          parsedSkills = [];
        }
      }
      
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        bio: profile?.bio || '',
        website: profile?.website || '',
        location: profile?.location || '',
        phone: profile?.phone || '',
        description: profile?.description || '',
        username: profile?.username || '',
        first_name: profile?.first_name || '',
        last_name: profile?.last_name || '',
        skills: parsedSkills,
      });
    } catch (error) {
      console.error('Error initializing form data:', error);
      toast.error('Failed to load profile data');
    }
  }, []);

  useEffect(() => {
    initializeFormData(user);
  }, [user, initializeFormData]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleFileChange = useCallback((e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
    }
  }, []);

  const handleAddSkill = useCallback((e) => {
    e.preventDefault();
    const trimmedSkill = newSkill.trim();
    
    if (!trimmedSkill) {
      toast.warning('Please enter a skill');
      return;
    }
    
    if (formData.skills.includes(trimmedSkill)) {
      toast.warning('Skill already exists');
      return;
    }
    
    if (formData.skills.length >= 20) {
      toast.warning('Maximum 20 skills allowed');
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, trimmedSkill]
    }));
    setNewSkill('');
  }, [newSkill, formData.skills]);

  const handleRemoveSkill = useCallback((skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const profileData = {
        ...formData,
        skills: JSON.stringify(formData.skills)
      };
      
      await dispatch(updateProfile(profileData)).unwrap();
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
      const errorMessage = error?.message || error?.data?.message || 'Failed to update profile';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }, [dispatch, formData]);

  const resetFormData = useCallback(() => {
    if (user) {
      initializeFormData(user);
      setIsEditing(false);
    }
  }, [user, initializeFormData]);

  const memoizedUser = useMemo(() => user, [user]);
  const { profile } = memoizedUser || {};
  const skills = formData.skills || [];

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <LoadingComponent />
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => dispatch(getCurrentUser())}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<LoadingComponent/>}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden backdrop-blur-sm">
              {/* Profile Header */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                {/* Cover Image */}
                {isEditing ? (
                  <div className="relative h-full group">
                    <input
                      type="file"
                      id="cover"
                      name="cover"
                      onChange={handleFileChange}
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
                          className="object-cover transition-all duration-300 group-hover:scale-105"
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
              <div className="absolute -bottom-16 left-6">
                <div className="relative h-32 w-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-2xl ring-4 ring-blue-50">
                  {isEditing ? (
                    <label className="w-full h-full cursor-pointer block">
                      <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        onChange={handleFileChange}
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
              <div className="absolute bottom-4 right-4 flex space-x-2">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={resetFormData}
                      className="bg-white text-red-600 hover:bg-red-50 px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 border border-red-200 hover:border-red-300"
                    >
                      <FiX className="w-4 h-4" />
                      Cancel
                    </button>
                    <button
                      type="submit"
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
                    onClick={() => setIsEditing(true)}
                    className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-200 hover:border-blue-300 transform hover:scale-105"
                  >
                    <FiEdit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Profile Content */}
            <div className="pt-20 px-6 pb-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column */}
                <div className="md:w-1/3 space-y-6">
                  <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <FiMail className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-500 mb-1">
                            Email
                          </label>
                          {isEditing ? (
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              placeholder="Your email"
                            />
                          ) : (
                            <p className="text-gray-900">{user?.email || 'Not provided'}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <FiMapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <label htmlFor="location" className="block text-sm font-medium text-gray-500 mb-1">
                            Location
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              id="location"
                              name="location"
                              value={formData.location}
                              onChange={handleInputChange}
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              placeholder="Your location"
                            />
                          ) : (
                            <p className="text-gray-900">{profile?.location || 'Not provided'}</p>
                          )}
                        </div>
                      </div>

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
                                  setFormData(prev => ({
                                    ...prev,
                                    website: e.target.value ? `https://${e.target.value.replace(/^https?:\/\//, '')}` : ''
                                  }));
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

                      <div className="flex items-start gap-3">
                        <FiPhone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-500 mb-1">
                            Phone
                          </label>
                          {isEditing ? (
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              placeholder="Your phone number"
                            />
                          ) : (
                            <p className="text-gray-900">{profile?.phone || 'Not provided'}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
                      {isEditing && (
                        <span className="text-sm text-gray-500">
                          {skills.length} {skills.length === 1 ? 'skill' : 'skills'}
                        </span>
                      )}
                    </div>
                    
                    {isEditing ? (
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill, index) => (
                            <span 
                              key={index}
                              onClick={() => handleRemoveSkill(skill)}
                              className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-red-100 text-red-800 cursor-pointer hover:bg-red-200 transition-all duration-200 transform hover:scale-105"
                            >
                              {skill}
                              <FiX className="ml-1.5 w-3.5 h-3.5" />
                            </span>
                          ))}
                        </div>
                        
                        <form onSubmit={handleAddSkill} className="flex gap-2">
                          <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            className="flex-1 min-w-0 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                            placeholder="Add a skill"
                          />
                          <button
                            type="submit"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
                          >
                            <FiPlus className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    ) : skills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 shadow-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No skills added yet</p>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="md:w-2/3 space-y-6">
                  <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-full">
                        {isEditing ? (
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
                                  onChange={handleInputChange}
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
                                  onChange={handleInputChange}
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
                                onChange={handleInputChange}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="username"
                              />
                            </div>
                          </div>
                        ) : (
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
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Bio</h3>
                      {isEditing ? (
                        <textarea
                          id="bio"
                          name="bio"
                          rows="3"
                          value={formData.bio}
                          onChange={handleInputChange}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Tell us about yourself..."
                        />
                      ) : (
                        <p className="text-gray-700">
                          {profile?.bio || 'No bio provided'}
                        </p>
                      )}
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">About Me</h3>
                        {isEditing ? (
                          <textarea
                            id="description"
                            name="description"
                            rows="5"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Tell us more about yourself..."
                          />
                        ) : (
                          <p className="text-gray-700 whitespace-pre-line">
                            {profile?.description || 'No information provided.'}
                          </p>
                        )}
                      </div>

                      {isEditing && (
                        <div className="pt-4 border-t border-gray-200">
                          <div className="flex justify-end space-x-3">
                            <button
                              type="button"
                              onClick={resetFormData}
                              className="px-6 py-2.5 border border-gray-300 rounded-lg shadow-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
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
                      )}

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
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Suspense>
  );
};

export default ProfilePage;