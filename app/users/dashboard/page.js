'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FiHome, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '@/redux/slices/authSlice';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(getCurrentUser())
        .unwrap()
        .catch(() => {
          router.push('/login');
        });
    }
  }, [dispatch, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // or a loading/redirect component
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-medium text-gray-900 mb-4">
                Welcome back, {user?.name || 'User'}! 👋
              </h2>
              <p className="text-gray-600">
                This is your dashboard. You can manage your account and view important information here.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;