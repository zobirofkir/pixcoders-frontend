'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';

const page = () => {
  const pathname = usePathname();
  

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">        
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