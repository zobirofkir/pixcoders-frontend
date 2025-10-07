'use client';

import { useEffect, useState } from 'react';
import HeaderComponent from '@/src/components/nav/HeaderComponent';
import AuthHeaderComponent from '@/src/components/nav/auth/AuthHeaderComponent';
import FooterComponent from '@/src/components/nav/FooterComponent';
import ReduxProvider from '@/src/providers/ReduxProvider';
import { getAuthToken } from '@/src/utils/cookies';

export default function ClientLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getAuthToken();
    setIsAuthenticated(!!token);
  }, []);

  return (
    <ReduxProvider>
      {isAuthenticated ? <AuthHeaderComponent /> : <HeaderComponent />}
      {children}
      <FooterComponent />
    </ReduxProvider>
  );
}
