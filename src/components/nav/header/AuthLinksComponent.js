import Link from 'next/link';

const authLinks = [
  { name: 'Log In', href: '/users/auth/login' },
  { name: 'Pix Team Members', href: '/users/auth/pix-team-members', highlight: true },
];

const AuthLinksComponent = ({ isMobile = false, onLinkClick }) => {
  if (isMobile) {
    return (
      <div className="pt-2 space-y-1">
        {authLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`block px-3 py-2 text-base font-medium rounded-md ${
              link.highlight 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={onLinkClick}
          >
            {link.name}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      {authLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={`px-4 py-2 text-sm font-medium ${
            link.highlight 
              ? 'bg-green-500 hover:bg-green-600 text-white rounded-md' 
              : 'text-gray-700 hover:text-gray-900'
          }`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default AuthLinksComponent;
