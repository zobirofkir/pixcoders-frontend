import Link from 'next/link';

const CTASection = () => (
  <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your project?</h2>
      <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
        Let's work together to create something amazing. Get in touch with us today.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link 
          href="/contact" 
          className="px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 font-medium rounded-full transition-colors duration-300"
        >
          Contact Us
        </Link>
        <Link 
          href="/about" 
          className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium rounded-full transition-colors duration-300"
        >
          Learn More
        </Link>
      </div>
    </div>
  </section>
);

export default CTASection;
