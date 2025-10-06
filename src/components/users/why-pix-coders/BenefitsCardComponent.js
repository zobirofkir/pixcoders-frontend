import React from 'react'
import { motion } from 'framer-motion';


const BenefitsCardComponent = ({benefitsData, index}) => (
  <motion.div
    key={benefitsData.title}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="p-8 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all"
  >
    <div className="text-4xl mb-4">{benefitsData.icon}</div>
    <h3 className="text-xl font-semibold mb-3 text-gray-900">{benefitsData.title}</h3>
    <p className="text-gray-600">{benefitsData.description}</p>
  </motion.div>
);

export default BenefitsCardComponent