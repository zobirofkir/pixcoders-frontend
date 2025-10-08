'use client';

import React, { Suspense, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/redux/slices/authSlice';
import LoadingComponent from '@/components/loading/LoadingComponent';

import HeroProfileComponent from '@/components/profile/HeroProfileComponent';
import AboutProfileComponent from '@/components/profile/AboutProfileComponent';
import SkillsProfileComponent from '@/components/profile/SkillsProfileComponent';
import MainProfileComponent from '@/components/profile/MainProfileComponent';
import ErrorProfileComponent from '@/components/profile/ErrorProfileComponent';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
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

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const handleEditProfile = () => {
    if (user?.id) {
      router.push(`/users/dashboard/profile/edit/${user.id}`);
    }
  };

  const memoizedUser = useMemo(() => user, [user]);

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
          <HeroProfileComponent
            user={memoizedUser}
            onEditToggle={handleEditProfile}
          />

          <div className="pt-6 px-6 pb-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 space-y-6">
                <AboutProfileComponent
                  user={memoizedUser}
                />

                <SkillsProfileComponent
                  skills={memoizedUser?.profile?.skills || []}
                />
              </div>

              <div className="md:w-2/3 space-y-6">
                <MainProfileComponent
                  user={memoizedUser}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default ProfilePage;