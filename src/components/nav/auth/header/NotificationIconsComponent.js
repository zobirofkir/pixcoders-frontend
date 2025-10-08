import { FaBell, FaComments } from "react-icons/fa";

const NotificationIconsComponent = () => (
  <div className="flex items-center gap-4">
    <button className="relative text-gray-600 hover:text-blue-600 transition-colors">
      <FaBell size={18} />
      <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center">
        3
      </span>
    </button>
    <button className="text-gray-600 hover:text-blue-600 transition-colors">
      <FaComments size={18} />
    </button>
  </div>
);

export default NotificationIconsComponent;
