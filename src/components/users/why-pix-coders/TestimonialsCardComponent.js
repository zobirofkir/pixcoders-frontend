import { motion } from 'framer-motion';


const TestimonialCardComponent = ({ testimonial, index }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="bg-white p-8 rounded-xl shadow-sm"
  >
    <div className="text-yellow-400 text-3xl mb-4">"</div>
    <p className="text-gray-700 italic mb-6">{testimonial.quote}</p>
    <div className="font-semibold">{testimonial.author}</div>
    <div className="text-blue-600 text-sm">{testimonial.role}</div>
  </motion.div>
);

export default TestimonialCardComponent;