import { motion } from 'framer-motion';

const StatCardComponent = ({ stat, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="text-3xl font-bold text-blue-900 mb-2">{stat.value}</div>
      <div className="text-gray-600">{stat.label}</div>
    </motion.div>
  );
  
export default StatCardComponent;