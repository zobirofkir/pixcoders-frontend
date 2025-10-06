import Link from 'next/link';

export const CallToActionSectionComponent = () => (
  <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to work with the best?</h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
        Join thousands of companies that trust PixCoders for their software development needs.
      </p>
      <div className="space-y-4 sm:space-y-0 sm:space-x-4">
        <Link 
          href="/hire" 
          className="bg-white text-blue-900 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full text-lg transition duration-300 inline-block mx-2"
        >
          Hire Developers
        </Link>
        <Link 
          href="/contact" 
          className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold py-3 px-8 rounded-full text-lg transition duration-300 inline-block mx-2"
        >
          Contact Us
        </Link>
      </div>
    </div>
  </section>
);

export default CallToActionSectionComponent;
