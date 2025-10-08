import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DesktopNavComponent = () => {
  const pathname = usePathname();
  const isActive = pathname === '/users/dashboard';

  return (
    <nav className="hidden md:flex items-center">
      <Link
        href="/users/dashboard"
        className={`px-3 py-2 text-sm font-medium transition-colors ${
          isActive 
            ? 'text-blue-600 font-semibold' 
            : 'text-gray-700 hover:text-blue-600'
        }`}
      >
        Dashboard
      </Link>
    </nav>
  );
};

export default DesktopNavComponent;
