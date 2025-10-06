import './globals.css';
import { metadata } from '../src/MetaData/Metadata';

export { metadata };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
