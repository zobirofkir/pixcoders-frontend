import Link from 'next/link';

const navLinks = [
  { name: 'Find Talent', href: '/talent' },
  { name: 'Find Work', href: '/work' },
  { name: 'Why Pix Coders', href: '/why-pix-coders' },
  { name: 'Enterprise', href: '/enterprise' },
  { name: 'About Us', href: '/about' },
];

const NavLinksComponent = ({ isMobile = false, onLinkClick }) => {
  if (isMobile) {
    return (
      <div className="space-y-1">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            onClick={onLinkClick}
          >
            {link.name}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <nav className="flex items-center space-x-6">
      {navLinks.map((link) => (
        <div key={link.name} className="relative group">
          <Link 
            href={link.href}
            className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center"
          >
            {link.name}
          </Link>
          {/* Dropdown menu would go here */}
        </div>
      ))}
    </nav>
  );
};

export default NavLinksComponent;
