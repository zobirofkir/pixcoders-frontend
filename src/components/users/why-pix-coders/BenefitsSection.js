import { motion } from 'framer-motion';

const benefits = [
  {
    title: 'Top 3% of Talent',
    description: 'We accept only the top 3% of developers who pass our rigorous screening process.',
    icon: '🎯',
  },
  {
    title: 'Fast Matching',
    description: 'Get matched with the perfect developer for your project in days, not weeks.',
    icon: '⚡',
  },
  {
    title: 'Risk-Free Trial',
    description: 'Start with a trial period to ensure the developer is the right fit.',
    icon: '🛡️',
  },
];

const BenefitCard = ({ benefit, index }) => (
  <motion.div
    key={benefit.title}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="p-8 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all"
  >
    <div className="text-4xl mb-4">{benefit.icon}</div>
    <h3 className="text-xl font-semibold mb-3 text-gray-900">{benefit.title}</h3>
    <p className="text-gray-600">{benefit.description}</p>
  </motion.div>
);

export const BenefitsSection = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Advantages</h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-10">
        {benefits.map((benefit, index) => (
          <BenefitCard key={benefit.title} benefit={benefit} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
