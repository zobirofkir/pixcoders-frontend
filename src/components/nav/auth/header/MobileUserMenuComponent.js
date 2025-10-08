import { FaUser, FaCog, FaSignOutAlt, FaBell, FaComments } from 'react-icons/fa';
import Link from 'next/link';

const MobileUserMenuComponent = ({ onClose }) => (
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
    
  </div>
);

export default MobileUserMenuComponent;
