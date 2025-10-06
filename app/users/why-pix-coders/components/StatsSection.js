import { motion } from 'framer-motion';

const stats = [
  { value: '99%', label: 'Success Rate' },
  { value: '24/7', label: 'Support' },
  { value: '4.9/5', label: 'Client Rating' },
  { value: '100+', label: 'Projects Delivered' },
];

const StatCard = ({ stat, index }) => (
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

export const StatsSection = () => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
