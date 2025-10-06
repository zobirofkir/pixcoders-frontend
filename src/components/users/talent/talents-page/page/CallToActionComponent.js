import { motion } from 'framer-motion';

export const CallToActionComponent = () => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="bg-indigo-700 text-white py-12 mt-12"
  >
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
      <p className="text-xl text-indigo-100 mb-6 max-w-2xl mx-auto">
        Let us help you find the perfect talent for your specific needs.
      </p>
      <button className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors">
        Post a Job Request
      </button>
    </div>
  </motion.section>
);

export default CallToActionComponent;
