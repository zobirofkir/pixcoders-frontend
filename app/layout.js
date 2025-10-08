'use client';

import './globals.css';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import HeaderComponent from '@/src/components/nav/HeaderComponent';
import AuthHeaderComponent from '@/src/components/nav/auth/AuthHeaderComponent';
import FooterComponent from '@/src/components/nav/FooterComponent';
import ReduxProvider from '@/src/providers/ReduxProvider';
import { isAuthenticated } from '@/src/utils/cookies';

function AuthWrapper({ children }) {
  const [isClient, setIsClient] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setAuthenticated(isAuthenticated());
  }, []);

  if (!isClient) {
    // Show a loading state or the default header while checking auth
    return (
      <>
        <HeaderComponent />
        {children}
      </>
    );
  }

  return (
    <>
      {authenticated ? <AuthHeaderComponent /> : <HeaderComponent />}
      {children}
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <ReduxProvider>
          <AuthWrapper>
            {children}
          </AuthWrapper>
          <FooterComponent />
        </ReduxProvider>
      </body>
    </html>
  );
}
