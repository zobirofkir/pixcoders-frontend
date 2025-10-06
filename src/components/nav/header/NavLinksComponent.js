import Link from 'next/link';

const navLinks = [
  { name: 'About Us', href: '/users/abouts' },
  { name: 'Find Talent', href: '/users/talents' },
  { name: 'Find Work', href: '/users/works' },
  { name: 'Blogs', href: '/users/blogs' },
  { name: 'Why Pix Coders', href: '/users/why-pix-coders' },
  { name: 'Contact', href: '/users/contacts' },
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
