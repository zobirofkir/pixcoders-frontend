import { motion } from 'framer-motion';
import Link from 'next/link';

export const HeroSectionComponent = () => (
  <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 md:py-32">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Why Choose PixCoders?
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl mb-10 text-blue-100"
        >
          World-class software development talent, vetted and ready to join your team
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link 
            href="/contact" 
            className="bg-white text-blue-900 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full text-lg transition duration-300 inline-block"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSectionComponent;
