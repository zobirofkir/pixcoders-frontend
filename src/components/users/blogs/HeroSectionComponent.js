import { FiSearch } from 'react-icons/fi';

export const HeroSectionComponent = ({ searchQuery, onSearchChange }) => (
  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
      <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto mb-10">
        Stay updated with the latest trends, tutorials, and insights in web development and design.
      </p>
      <div className="max-w-2xl mx-auto relative">
        <input
          type="text"
          placeholder="Search articles..."
          className="w-full px-6 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <FiSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
      </div>
    </div>
  </div>
);
