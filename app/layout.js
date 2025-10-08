import './globals.css';
import dynamic from 'next/dynamic';
import FooterComponent from '@/src/components/nav/FooterComponent';
import ReduxProvider from '@/src/providers/ReduxProvider';
import AuthWrapperComponent from '@/components/layout/AuthWrapperComponent';

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
          <AuthWrapperComponent>
            {children}
          </AuthWrapperComponent>
          <FooterComponent />
        </ReduxProvider>
      </body>
    </html>
  );
}
