import { statsData } from '@/src/data/statsData';
import StatCardComponent from './StatsCardComponent';


export const StatsSectionComponent = () => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {statsData.map((stat, index) => (
          <StatCardComponent key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default StatsSectionComponent;
