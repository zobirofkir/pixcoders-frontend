import { Inter } from 'next/font/google';
import { ThemeProvider } from '../../context/ThemeContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function Body({ children }) {
  return (
    <body className={`${inter.className} bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-black min-h-screen transition-colors duration-300`}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </body>
  );
}
