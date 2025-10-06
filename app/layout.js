import './globals.css';
import { metadata } from '../src/MetaData/Metadata';
import HeaderComponent from '@/src/components/nav/HeaderComponent';
import FooterComponent from '@/src/components/nav/FooterComponent';

export { metadata };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>

        <HeaderComponent />

        {children}

        <FooterComponent />
        
      </body>
    </html>
  );
}
