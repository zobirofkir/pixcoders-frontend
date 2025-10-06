export const NewsletterComponent = () => (
  <div className="bg-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscribe to our newsletter</h2>
      <p className="text-gray-600 mb-8">Get the latest articles and resources sent straight to your inbox.</p>
      <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-grow"
        />
        <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
          Subscribe
        </button>
      </div>
    </div>
  </div>
);
