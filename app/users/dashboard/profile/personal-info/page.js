'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const PersonalInfoPage = () => {
  const router = useRouter();
  const [personalData, setPersonalData] = useState({
    dateOfBirth: '',
    gender: '',
    nationality: '',
    maritalStatus: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Updating personal info:', personalData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
      alert('Personal information updated successfully!');
    } catch (error) {
      console.error('Error updating personal info:', error);
      alert('Failed to update personal information');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
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
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">Personal Information</h1>
              <p className="text-gray-600 mt-1">Manage your personal details and emergency contacts</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm">👤</div>
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={personalData.dateOfBirth}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={personalData.gender}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Nationality</label>
                <input
                  type="text"
                  name="nationality"
                  value={personalData.nationality}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="Enter nationality"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Marital Status</label>
                <select
                  name="maritalStatus"
                  value={personalData.maritalStatus}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-sm">🏠</div>
              Address Information
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Street Address</label>
                <textarea
                  name="address"
                  value={personalData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed resize-none"
                  placeholder="Enter full address"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    value={personalData.city}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="City"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">State</label>
                  <input
                    type="text"
                    name="state"
                    value={personalData.state}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="State"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={personalData.zipCode}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="ZIP"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={personalData.country}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="Country"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center text-white text-sm">🚨</div>
              Emergency Contact
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Contact Name</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={personalData.emergencyContact}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="Emergency contact name"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Contact Phone</label>
                <input
                  type="tel"
                  name="emergencyPhone"
                  value={personalData.emergencyPhone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="Emergency contact phone"
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none min-w-[160px]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Saving...
                    </span>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PersonalInfoPage;