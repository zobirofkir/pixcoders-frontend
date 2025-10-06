import { testimonialsData } from '@/src/data/testimonialsData';
import TestimonialCardComponent from './TestimonialsCardComponent';

export const TestimonialsSectionComponent = () => (
  <section className="py-20 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto mb-12"></div>
        
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCardComponent key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialsSectionComponent;
