import './globals.css';
import { metadata } from '../src/MetaData/Metadata';
import ClientLayout from './ClientLayout';

export { metadata };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
