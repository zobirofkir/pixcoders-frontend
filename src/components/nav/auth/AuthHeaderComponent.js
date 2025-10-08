"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaBell, FaComments, FaChevronDown, FaSignOutAlt, FaUser, FaCog } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../../public/images/logo/logo.png";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Projects", href: "/projects" },
    { name: "Messages", href: "/messages" },
    { name: "Notifications", href: "/notifications" },
    { name: "Support", href: "/support" },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src={Logo}
              alt="Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="font-semibold text-lg text-gray-900">PixCoders</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <button className="relative text-gray-600 hover:text-blue-600">
              <FaBell size={18} />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full text-[10px] px-1">
                3
              </span>
            </button>

            <button className="text-gray-600 hover:text-blue-600">
              <FaComments size={18} />
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1 rounded-lg transition"
              >
                <Image
                  src="/profile.jpg"
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
                <FaChevronDown
                  size={14}
                  className={`text-gray-500 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    <FaUser size={14} /> Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    <FaCog size={14} /> Settings
                  </Link>
                  <hr className="my-1 border-gray-100" />
                  <button
                    onClick={() => alert("Logout")}
                    className="flex w-full items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    <FaSignOutAlt size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-blue-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 transform transition-all duration-300 ease-in-out ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } md:hidden`}
      >
        <div 
          className="fixed inset-0 bg-black transition-opacity duration-300"
          style={{ backgroundColor: menuOpen ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)' }}
          onClick={() => setMenuOpen(false)}
        />
        <div 
          className={`relative w-64 h-full bg-white shadow-xl overflow-y-auto transform transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-100 transition-all duration-300 transform"
               style={{
                 opacity: menuOpen ? 1 : 0,
                 transform: menuOpen ? 'translateY(0)' : 'translateY(-10px)',
                 transition: 'opacity 0.3s ease, transform 0.3s ease'
               }}>
            <Link href="/dashboard" className="flex items-center gap-2">
              <Image
                src={Logo}
                alt="Logo"
                width={28}
                height={28}
                className="object-contain"
              />
              <span className="font-semibold text-gray-900">PixCoders</span>
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={20} />
            </button>
          </div>
          <nav className="flex flex-col py-3 px-4 space-y-2">
            {navLinks.map((link, index) => {
              const delay = (index + 1) * 75; // Staggered delay for each item
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-all duration-300 transform hover:translate-x-1"
                  style={{
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `opacity 0.3s ease ${delay}ms, transform 0.3s ease ${delay}ms`
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            
            {/* Mobile User Menu */}
            <div className="border-t border-gray-100 mt-4 pt-4">
              <div className="flex items-center gap-3 px-4 py-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  <FaUser size={18} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">John Doe</p>
                  <p className="text-sm text-gray-500">john@example.com</p>
                </div>
              </div>
              
              <Link
                href="/profile"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <FaUser size={16} /> Profile
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <FaCog size={16} /> Settings
              </Link>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  alert("Logout");
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium text-left transition-colors"
              >
                <FaSignOutAlt size={16} /> Logout
              </button>
              
              <div className="flex items-center gap-4 px-4 py-3 mt-2">
                <button className="relative text-gray-600 hover:text-blue-600">
                  <FaBell size={18} />
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center">
                    3
                  </span>
                </button>
                <button className="text-gray-600 hover:text-blue-600">
                  <FaComments size={18} />
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AuthHeaderComponent;
