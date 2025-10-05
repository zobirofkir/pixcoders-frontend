import './globals.css';
import { metadata } from '../src/components/layout/Metadata';
import ThemeScript from '../src/components/layout/ThemeScript';
import Body from '../src/components/layout/Body';

export { metadata };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <Body>{children}</Body>
    </html>
  );
}
