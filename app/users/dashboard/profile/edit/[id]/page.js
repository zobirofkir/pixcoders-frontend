'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useParams } from 'next/navigation';
import { getCurrentUser, updateProfile } from '@/redux/slices/authSlice';
import { toast } from 'react-toastify';

const EditProfilePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();
  const { user, loading } = useSelector((state) => state.auth);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    bio: '',
    website: '',
    location: '',
    phone: '',
    description: '',
    username: '',
    first_name: '',
    last_name: '',
    role: '',
    stars: '',
    skills: [],
    avatar: null,
    cover: null,
    experience: [],
    education: [],
  });
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    if (!user || user.id !== parseInt(id)) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, user, id]);

  useEffect(() => {
    if (user) {
      const { profile } = user;
      let parsedSkills = [];
      
      if (profile?.skills) {
        try {
          parsedSkills = typeof profile.skills === 'string' 
            ? JSON.parse(profile.skills) 
            : Array.isArray(profile.skills) 
            ? profile.skills 
            : [];
        } catch (e) {
          parsedSkills = [];
        }
      }
      
      let parsedExperience = [];
      let parsedEducation = [];
      
      if (profile?.experience) {
        try {
          parsedExperience = typeof profile.experience === 'string' 
            ? JSON.parse(profile.experience) 
            : Array.isArray(profile.experience) 
            ? profile.experience 
            : [];
        } catch (e) {
          parsedExperience = [];
        }
      }
      
      if (profile?.education) {
        try {
          parsedEducation = typeof profile.education === 'string' 
            ? JSON.parse(profile.education) 
            : Array.isArray(profile.education) 
            ? profile.education 
            : [];
        } catch (e) {
          parsedEducation = [];
        }
      }
      
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        password_confirmation: '',
        bio: profile?.bio || '',
        website: profile?.website || '',
        location: profile?.location || '',
        phone: profile?.phone || '',
        description: profile?.description || '',
        username: profile?.username || '',
        first_name: profile?.first_name || '',
        last_name: profile?.last_name || '',
        role: user.role || '',
        stars: profile?.stars || '',
        skills: parsedSkills,
        experience: parsedExperience,
        education: parsedEducation,
        avatar: null,
        cover: null,
      });
    }
  }, [user]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleFileChange = useCallback((e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  }, []);

  const handleAddSkill = useCallback((e) => {
    e.preventDefault();
    const trimmedSkill = newSkill.trim();
    
    if (trimmedSkill && !formData.skills.includes(trimmedSkill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, trimmedSkill]
      }));
      setNewSkill('');
    }
  }, [newSkill, formData.skills]);

  const handleRemoveSkill = useCallback((skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (formData.password && formData.password !== formData.password_confirmation) {
      toast.error('Password confirmation does not match');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const submitData = { ...formData };
      if (!submitData.password) {
        delete submitData.password;
        delete submitData.password_confirmation;
      }
      
      await dispatch(updateProfile({
        userId: user.id,
        profileId: user.profile?.id,
        profileData: submitData
      })).unwrap();
      toast.success('Profile updated successfully!');
      router.push('/users/dashboard/profile');
    } catch (error) {
      toast.error(error?.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  }, [dispatch, formData, router, user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 text-center">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Profile</h1>
          <p className="text-gray-600">Update your professional information</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <h2 className="text-2xl font-semibold text-white">Profile Information</h2>
            <p className="text-blue-100 mt-1">Keep your profile up to date</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="Choose a username"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="First name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="Last name"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  >
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Rating (Stars)</label>
                  <input
                    type="number"
                    name="stars"
                    value={formData.stars}
                    onChange={handleInputChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="0.0"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">New Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="Leave blank to keep current password"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
                  <input
                    type="password"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="City, Country"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Professional Information</h3>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                  placeholder="Tell us about yourself in a few words..."
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                  placeholder="Provide a detailed description of your professional background..."
                />
              </div>
            </div>

            {/* Skills Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Skills & Expertise</h3>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill (e.g., JavaScript, Design, Marketing)"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill(e)}
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Add Skill
                  </button>
                </div>
                
                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {formData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 rounded-full text-sm font-medium border border-blue-200 hover:border-blue-300 transition-all duration-200"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-2 text-blue-600 hover:text-red-600 transition-colors duration-200 font-bold text-lg leading-none"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Experience & Education Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Experience & Education</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Experience</label>
                  <textarea
                    name="experience"
                    value={Array.isArray(formData.experience) ? formData.experience.join('\n') : formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value.split('\n').filter(item => item.trim()) }))}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                    placeholder="Enter each experience on a new line..."
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Education</label>
                  <textarea
                    name="education"
                    value={Array.isArray(formData.education) ? formData.education.join('\n') : formData.education}
                    onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value.split('\n').filter(item => item.trim()) }))}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                    placeholder="Enter each education on a new line..."
                  />
                </div>
              </div>
            </div>

            {/* Media Upload Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Profile Media</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Profile Avatar</label>
                  <div className="relative">
                    <input
                      type="file"
                      name="avatar"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Cover Image</label>
                  <div className="relative">
                    <input
                      type="file"
                      name="cover"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 sm:flex-none px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Updating Profile...
                  </span>
                ) : (
                  'Update Profile'
                )}
              </button>
              
              <button
                type="button"
                onClick={() => router.push('/users/dashboard/profile')}
                className="flex-1 sm:flex-none px-8 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold border border-gray-300 hover:border-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;