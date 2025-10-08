'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import HeaderComponent from '@/src/components/nav/HeaderComponent';
import AuthHeaderComponent from '@/src/components/nav/auth/AuthHeaderComponent';
import { isAuthenticated } from '@/src/utils/cookies';

/**
 * AuthWrapper component that conditionally renders the appropriate header
 * based on authentication status
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} Rendered component with appropriate header
 */
export default function AuthWrapper({ children }) {
  const [isClient, setIsClient] = useState(false);
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setIsAuthenticatedState(isAuthenticated());
  }, []);

  if (!isClient) {
    return (
      <>
        <HeaderComponent />
        {children}
      </>
    );
  }

  return (
    <>
      {isAuthenticatedState ? <AuthHeaderComponent /> : <HeaderComponent />}
      {children}
    </>
  );
}
