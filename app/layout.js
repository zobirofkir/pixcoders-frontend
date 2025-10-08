import './globals.css';
import { metadata } from '../src/MetaData/Metadata';
import dynamic from 'next/dynamic';
import HeaderComponent from '@/src/components/nav/HeaderComponent';
import AuthHeaderComponent from '@/src/components/nav/auth/AuthHeaderComponent';
import FooterComponent from '@/src/components/nav/FooterComponent';
import ReduxProvider from '@/src/providers/ReduxProvider';
import { isAuthenticated } from '@/src/utils/cookies';

export { metadata };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <ReduxProvider>
          {isAuthenticated() ? <AuthHeaderComponent /> : <HeaderComponent />}
          {children}
          <FooterComponent />
        </ReduxProvider>
      </body>
    </html>
  );
}
