'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';

const page = () => {
  const pathname = usePathname();
  
  const menuItems = [
    { name: 'Overview', href: '/users/dashboard', icon: <FiHome className="mr-2" /> },
    { name: 'Profile', href: '/users/dashboard/profile', icon: <FiUser className="mr-2" /> },
    { name: 'Settings', href: '/users/dashboard/settings', icon: <FiSettings className="mr-2" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-xl font-semibold text-gray-900">
              {menuItems.find((item) => item.href === pathname)?.name || 'Dashboard'}
            </h1>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Welcome back!</h2>
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

export default page;