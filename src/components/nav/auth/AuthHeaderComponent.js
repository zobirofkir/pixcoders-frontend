"use client";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import NotificationIcons from "./NotificationIcons";
import UserDropdown from "./UserDropdown";
import MobileMenu from "./MobileMenu";

/**
 * AuthHeaderComponent - A responsive navigation header component for authenticated users.
 * 
 * Features:
 * - Responsive design with mobile menu
 * - Profile dropdown with user options
 * - Notification and messages indicators
 * - Clean, modern UI with smooth transitions
 * 
 * @returns {React.ReactElement} The rendered header component
 */
const AuthHeaderComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-3 flex items-center justify-between">
        <Logo />
        
        <DesktopNav />

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <NotificationIcons />
            <UserDropdown />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-blue-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};

export default AuthHeaderComponent;
