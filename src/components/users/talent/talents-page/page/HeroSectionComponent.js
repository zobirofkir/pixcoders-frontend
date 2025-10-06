import { motion } from 'framer-motion';

export const HeroSectionComponent = () => (
  <motion.div 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16"
  >
    <div className="container mx-auto px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Find Top Tech Talent
      </h1>
      <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl">
        Connect with highly skilled developers, designers, and tech experts ready to work on your next project.
      </p>
    </div>
  </motion.div>
);

export default HeroSectionComponent;
