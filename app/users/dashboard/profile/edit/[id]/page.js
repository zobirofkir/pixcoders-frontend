'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useParams } from 'next/navigation';
import { getCurrentUser, updateCurrentUser } from '@/redux/slices/authSlice';
import { toast } from 'react-toastify';

const EditProfilePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();
  const { user, loading } = useSelector((state) => state.auth);
  
  const [activeTab, setActiveTab] = useState('profile');
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

  const tabs = [
    { id: 'profile', label: 'Profile Information', icon: '👤' },
    { id: 'personal', label: 'Personal Data', icon: '📋' }
  ];

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
      
      await dispatch(updateCurrentUser(submitData)).unwrap();
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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const renderProfileTab = () => (
    <div className="space-y-8 animate-fadeIn">
      {/* Detailed Personal Information */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm">📋</div>
          Detailed Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              maxLength={255}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
              placeholder="Your full name"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Email Address <span className="text-red-500">*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              maxLength={255}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
              placeholder="your.email@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              minLength={8}
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
              minLength={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
              placeholder="Confirm your password"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Avatar Image</label>
            <input
              type="file"
              name="avatar"
              onChange={handleFileChange}
              accept=".jpeg,.png,.jpg,.gif"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-xs text-gray-500">Max size: 2MB. Formats: JPEG, PNG, JPG, GIF</p>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Cover Image</label>
            <input
              type="file"
              name="cover"
              onChange={handleFileChange}
              accept=".jpeg,.png,.jpg,.gif"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-xs text-gray-500">Max size: 5MB. Formats: JPEG, PNG, JPG, GIF</p>
          </div>
          
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
        </div>
      </div>
    </div>
  );

  const renderPersonalTab = () => (
    <div className="space-y-8 animate-fadeIn">
      {/* Personal Information */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm">📋</div>
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
              placeholder="Your first name"
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
              placeholder="Your last name"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
              placeholder="your.email@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
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
      </div>


    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.push('/users/dashboard/profile')}
              className="p-2 hover:bg-white/80 rounded-xl transition-all duration-200 group"
            >
              <svg className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
              <p className="text-gray-600 mt-1">Update your profile information and personal details</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Tab Navigation */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-2">
            <div className="flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => tab.id === 'personal' ? router.push('/users/dashboard/profile/personal-info') : setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-[1.02]'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'personal' && renderPersonalTab()}
          </div>

          {/* Action Buttons */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={() => router.push('/users/dashboard/profile')}
                className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold border border-gray-300 hover:border-gray-400"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none min-w-[160px]"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Updating...
                  </span>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EditProfilePage;