'use client';

import { useState } from 'react';
import { HeroSectionComponent, FilterButtonsComponent, WorksGridComponent, CTASectionComponent } from '@/src/components/users/works';

// Sample work data - replace with your actual work data
const works = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce solution with payment integration and inventory management.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: '/images/works/ecommerce.jpg',
    link: '/works/ecommerce',
    featured: true
  },
  {
    id: 2,
    title: 'Mobile Banking App',
    description: 'Secure and user-friendly mobile banking application with biometric authentication.',
    tags: ['React Native', 'Node.js', 'PostgreSQL'],
    image: '/images/works/banking.jpg',
    link: '/works/banking'
  },
  {
    id: 3,
    title: 'Healthcare Management System',
    description: 'Comprehensive healthcare solution for patient records and appointment scheduling.',
    tags: ['Vue.js', 'Python', 'Django', 'MySQL'],
    image: '/images/works/healthcare.jpg',
    link: '/works/healthcare'
  },
  {
    id: 4,
    title: 'Real Estate Platform',
    description: 'Interactive property listing platform with virtual tours and mortgage calculator.',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'Mapbox'],
    image: '/images/works/realestate.jpg',
    link: '/works/real-estate'
  },
  {
    id: 5,
    title: 'E-learning Platform',
    description: 'Interactive online learning platform with video courses and progress tracking.',
    tags: ['React', 'Node.js', 'MongoDB', 'WebRTC'],
    image: '/images/works/elearning.jpg',
    link: '/works/elearning'
  },
  {
    id: 6,
    title: 'Food Delivery App',
    description: 'On-demand food delivery service with real-time order tracking.',
    tags: ['React Native', 'Node.js', 'MongoDB', 'Socket.io'],
    image: '/images/works/food.jpg',
    link: '/works/food-delivery'
  },
];

const WorksPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleWorks, setVisibleWorks] = useState(6);

  const filters = ['All', 'Web', 'Mobile', 'E-commerce', 'Enterprise'];

  const filteredWorks = activeFilter === 'All' 
    ? works 
    : works.filter(work => work.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase())));

  const loadMore = () => {
    setVisibleWorks(prev => Math.min(prev + 3, works.length));
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setVisibleWorks(6); 
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <HeroSectionComponent 
        title="Our Work Speaks for Itself"
        description="We've helped businesses of all sizes transform their ideas into successful digital products. Here are some of our recent projects."
      >
        <FilterButtonsComponent
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
      </HeroSectionComponent>

      <WorksGridComponent 
        works={filteredWorks} 
        visibleWorks={visibleWorks} 
        onLoadMore={loadMore} 
      />

      <CTASectionComponent />
    </div>
  );
};

export default WorksPage;