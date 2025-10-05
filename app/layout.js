import { Inter } from "next/font/google";
import "./globals.css";

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
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
