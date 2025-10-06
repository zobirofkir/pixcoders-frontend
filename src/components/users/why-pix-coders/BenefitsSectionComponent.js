import { benefitsData } from '@/src/data/benifitsData';
import { motion } from 'framer-motion';


const BenefitCard = ({benefitsData, index}) => (
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

export const BenefitsSectionComponent = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Advantages</h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-10">
        {benefitsData.map((benefit, index) => (
          <BenefitCard key={benefit.title} benefitsData={benefit} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSectionComponent;
