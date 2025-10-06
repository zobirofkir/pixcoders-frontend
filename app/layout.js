import './globals.css';
import { metadata } from '../src/MetaData/Metadata';
import HeaderComponent from '@/public/images/slider/nav/HeaderComponent';
import FooterComponent from '@/public/images/slider/nav/FooterComponent';

export { metadata };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
        
        <HeaderComponent />
      
      <body>{children}</body>

      <footer>
        <FooterComponent />
      </footer>
    </html>
  );
}
