import Link from 'next/link';

const navLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Projects", href: "/projects" },
  { name: "Messages", href: "/messages" },
  { name: "Notifications", href: "/notifications" },
  { name: "Support", href: "/support" },
];

const DesktopNav = () => (
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
);

export default DesktopNav;
