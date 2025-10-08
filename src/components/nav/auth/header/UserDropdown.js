import { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
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
          className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
          <Link
            href="/profile"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            <FaUser size={14} /> Profile
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            <FaCog size={14} /> Settings
          </Link>
          <hr className="my-1 border-gray-100" />
          <button
            onClick={() => {
              setIsOpen(false);
              alert("Logout");
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 text-left"
          >
            <FaSignOutAlt size={14} /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
