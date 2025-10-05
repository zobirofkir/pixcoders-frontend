import './globals.css';
import { metadata } from '../src/MetaData/Metadata';
import ThemeScript from '../src/components/layout/ThemeScriptComponent';
import Body from '../src/components/layout/BodyComponent';

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
