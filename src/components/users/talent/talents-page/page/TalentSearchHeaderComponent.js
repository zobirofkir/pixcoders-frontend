export const TalentSearchHeaderComponent = ({ count }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
      {count} {count === 1 ? 'Talent' : 'Talents'} Found
    </h2>
    <div className="flex items-center w-full sm:w-auto">
      <span className="text-sm sm:text-base text-gray-600 mr-2 whitespace-nowrap">Sort by:</span>
      <select className="w-full sm:w-auto text-sm sm:text-base border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
        <option>Relevance</option>
        <option>Rating: High to Low</option>
        <option>Rate: Low to High</option>
        <option>Most Reviews</option>
      </select>
    </div>
  </div>
);

export default TalentSearchHeaderComponent;
