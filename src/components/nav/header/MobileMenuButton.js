import { FiMenu, FiX } from 'react-icons/fi';

const MobileMenuButton = ({ isOpen, onClick }) => (
  <div className="-mr-2 flex md:hidden">
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
      aria-expanded="false"
    >
      <span className="sr-only">Open main menu</span>
      {isOpen ? (
        <FiX className="block h-6 w-6" />
      ) : (
        <FiMenu className="block h-6 w-6" />
      )}
    </button>
  </div>
);

export default MobileMenuButton;
