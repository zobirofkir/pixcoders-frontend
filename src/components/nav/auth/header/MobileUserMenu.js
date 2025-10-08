import { FaUser, FaCog, FaSignOutAlt, FaBell, FaComments } from 'react-icons/fa';
import Link from 'next/link';

const MobileUserMenu = ({ onClose }) => (
  <div className="border-t border-gray-100 mt-4 pt-4">
    <div className="flex items-center gap-3 px-4 py-3 mb-2">
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
        <FaUser size={18} />
      </div>
      <div>
        <p className="font-medium text-gray-900">John Doe</p>
        <p className="text-sm text-gray-500">john@example.com</p>
      </div>
    </div>
    
    <Link
      href="/profile"
      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
      onClick={onClose}
    >
      <FaUser size={16} /> Profile
    </Link>
    <Link
      href="/settings"
      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
      onClick={onClose}
    >
      <FaCog size={16} /> Settings
    </Link>
    <button
      onClick={() => {
        onClose();
        alert("Logout");
      }}
      className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium text-left transition-colors"
    >
      <FaSignOutAlt size={16} /> Logout
    </button>
    
    <div className="flex items-center gap-4 px-4 py-3 mt-2">
      <button className="relative text-gray-600 hover:text-blue-600">
        <FaBell size={18} />
        <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center">
          3
        </span>
      </button>
      <button className="text-gray-600 hover:text-blue-600">
        <FaComments size={18} />
      </button>
    </div>
  </div>
);

export default MobileUserMenu;
