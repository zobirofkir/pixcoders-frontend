export const CategoryFilterComponent = ({ categories, selectedCategory, onSelectCategory }) => (
  <div className="flex flex-wrap gap-2 mb-12 justify-center">
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => onSelectCategory(category)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedCategory === category
            ? 'bg-indigo-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        {category}
      </button>
    ))}
  </div>
);
