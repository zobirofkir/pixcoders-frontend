'use client';

import React, { Suspense, useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, updateProfile } from '@/redux/slices/authSlice';
import LoadingComponent from '@/components/loading/LoadingComponent';
import { toast } from 'react-toastify';

import HeroProfileComponent from '@/components/profile/HeroProfileComponent';
import AboutProfileComponent from '@/components/profile/AboutProfileComponent';
import SkillsProfileComponent from '@/components/profile/SkillsProfileComponent';
import MainProfileComponent from '@/components/profile/MainProfileComponent';
import ErrorProfileComponent from '@/components/profile/ErrorProfileComponent';

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
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      
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
  const skills = formData.skills || [];

  if (loading && !user || error && !user) {
    return (
      <ErrorProfileComponent 
        error={error}
        loading={loading && !user}
        onRetry={() => dispatch(getCurrentUser())}
      />
    );
  }

  return (
    <Suspense fallback={<LoadingComponent/>}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <form onSubmit={handleSubmit}>
            <HeroProfileComponent
              user={memoizedUser}
              formData={formData}
              isEditing={isEditing}
              isSubmitting={isSubmitting}
              onFileChange={handleFileChange}
              onEditToggle={() => setIsEditing(true)}
              onCancel={resetFormData}
              onSubmit={handleSubmit}
            />

            <div className="pt-20 px-6 pb-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 space-y-6">
                  <AboutProfileComponent
                    user={memoizedUser}
                    formData={formData}
                    isEditing={isEditing}
                    onInputChange={handleInputChange}
                  />

                  <SkillsProfileComponent
                    skills={skills}
                    newSkill={newSkill}
                    isEditing={isEditing}
                    onAddSkill={handleAddSkill}
                    onRemoveSkill={handleRemoveSkill}
                    onSkillInputChange={(e) => setNewSkill(e.target.value)}
                  />
                </div>

                <div className="md:w-2/3 space-y-6">
                  <MainProfileComponent
                    user={memoizedUser}
                    formData={formData}
                    isEditing={isEditing}
                    isSubmitting={isSubmitting}
                    onInputChange={handleInputChange}
                    onCancel={resetFormData}
                    onSubmit={handleSubmit}
                  />
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