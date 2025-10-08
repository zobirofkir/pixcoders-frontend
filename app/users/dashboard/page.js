'use client';

import React, { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '@/redux/slices/authSlice';
import LoadingComponent from '@/components/loading/LoadingComponent';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(getCurrentUser())
        .unwrap()
        .catch(() => {
          router.push('/login');
        });
    }
  }, [dispatch, isAuthenticated, router]);

  return (
    <Suspense fallback={<LoadingComponent/>} >
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
    </Suspense>
  );
};

export default DashboardPage;