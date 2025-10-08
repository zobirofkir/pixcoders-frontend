'use client';

import './globals.css';
import dynamic from 'next/dynamic';
import FooterComponent from '@/src/components/nav/FooterComponent';
import ReduxProvider from '@/src/providers/ReduxProvider';
import AuthWrapper from '@/src/components/layout/AuthWrapper';

/**
 * Root layout component that wraps the entire application
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} The root layout of the application
 */
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
