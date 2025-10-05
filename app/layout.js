import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '../src/context/ThemeContext';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "PixCoders - Coming Soon",
  description: "Building smart digital solutions for your business",
  keywords: ["web development", "software solutions", "PixCoders", "digital transformation"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const darkMode = localStorage.getItem('darkMode');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (darkMode === 'true' || (!darkMode && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-black min-h-screen transition-colors duration-300`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
