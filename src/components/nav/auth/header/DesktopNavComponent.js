import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiChevronDown } from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';

const navLinks = [
  { 
    name: "Find Work", 
    href: "/find-work",
    submenu: [
      { name: "Jobs", href: "/find-work/jobs" },
      { name: "Projects", href: "/find-work/projects" },
      { name: "Saved Jobs", href: "/find-work/saved" },
    ]
  },
  { 
    name: "My Jobs", 
    href: "/my-jobs",
    submenu: [
      { name: "My Proposals", href: "/my-jobs/proposals" },
      { name: "My Contracts", href: "/my-jobs/contracts" },
      { name: "Work Diary", href: "/my-jobs/diary" },
    ]
  },
  { 
    name: "Reports", 
    href: "/reports" 
  },
  { 
    name: "Messages", 
    href: "/messages",
    badge: 3 // Example notification count
  }
];

const NavItem = ({ item, isActive, onMouseEnter, onMouseLeave, showSubmenu }) => {
  const hasSubmenu = item.submenu?.length > 0;
  
  return (
    <div 
      className="relative group"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link
        href={item.href}
        className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
          isActive 
            ? 'text-blue-600 font-semibold' 
            : 'text-gray-700 hover:text-blue-600'
        }`}
      >
        {item.name}
        {hasSubmenu && (
          <FiChevronDown className={`ml-1 h-4 w-4 transition-transform ${
            showSubmenu ? 'transform rotate-180' : ''
          }`} />
        )}
        {item.badge && (
          <span className="ml-1.5 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full">
            {item.badge}
          </span>
        )}
      </Link>

      {hasSubmenu && (
        <div 
          className={`absolute left-0 mt-0 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-50 transition-all duration-200 ${
            showSubmenu ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-1'
          }`}
        >
          {item.submenu.map((subItem) => (
            <Link
              key={subItem.name}
              href={subItem.href}
              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            >
              {subItem.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const DesktopNavComponent = () => {
  const pathname = usePathname();
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const navRef = useRef(null);

  // Close submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveSubmenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav 
      ref={navRef}
      className="hidden md:flex items-center space-x-1 relative"
    >
      {navLinks.map((link) => (
        <NavItem
          key={link.name}
          item={link}
          isActive={pathname.startsWith(link.href)}
          showSubmenu={activeSubmenu === link.name}
          onMouseEnter={() => link.submenu && setActiveSubmenu(link.name)}
          onMouseLeave={() => setActiveSubmenu(null)}
        />
      ))}
    </nav>
  );
};

export default DesktopNavComponent;
