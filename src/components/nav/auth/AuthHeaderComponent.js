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
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <div 
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => setMenuOpen(false)}
        />
        <div className="relative w-64 h-full bg-white shadow-xl overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
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
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AuthHeaderComponent;
