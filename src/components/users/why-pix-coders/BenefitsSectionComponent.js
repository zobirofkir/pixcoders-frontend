import { benefitsData } from '@/src/data/benifitsData';
import BenefitsCardComponent from './BenefitsCardComponent';

export const BenefitsSectionComponent = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Advantages</h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-10">
        {benefitsData.map((benefit, index) => (
          <BenefitsCardComponent key={benefit.title} benefitsData={benefit} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSectionComponent;
