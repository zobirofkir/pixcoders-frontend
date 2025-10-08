import Link from 'next/link';

const navLinks = [
  { name: "Dashboard", href: "/users/dashboard" },
];

const DesktopNavComponent = () => (
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

export default DesktopNavComponent;
