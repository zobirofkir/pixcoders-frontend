import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "PixCoders transformed our development process. Their developers are exceptional.",
    author: "Sarah Johnson",
    role: "CTO at TechCorp"
  },
  {
    quote: "The quality of talent at PixCoders is unmatched. Will definitely work with them again.",
    author: "Michael Chen",
    role: "Product Manager at InnovateX"
  }
];

const TestimonialCard = ({ testimonial, index }) => (
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

export const TestimonialsSection = () => (
  <section className="py-20 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto mb-12"></div>
        
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
