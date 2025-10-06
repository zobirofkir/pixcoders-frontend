export const PaginationComponent = () => (
  <div className="mt-8 flex justify-center">
    <nav className="flex items-center space-x-2">
      <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
        Previous
      </button>
      <button className="px-3 py-1 rounded-md bg-indigo-600 text-white">
        1
      </button>
      <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
        2
      </button>
      <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
        3
      </button>
      <span className="px-2 text-gray-500">...</span>
      <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
        10
      </button>
      <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
        Next
      </button>
    </nav>
  </div>
);

export default PaginationComponent;
