'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Our Work Speaks for Itself
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              We've helped businesses of all sizes transform their ideas into successful digital products. 
              Here are some of our recent projects.
            </p>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Works Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorks.slice(0, visibleWorks).map((work) => (
              <div 
                key={work.id}
                className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-xl font-bold mb-2">{work.title}</h3>
                      <p className="text-gray-200 text-sm mb-4">{work.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {work.tags.map((tag, index) => (
                          <span key={index} className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{work.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{work.description}</p>
                  <Link 
                    href={work.link}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    View Project
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {visibleWorks < filteredWorks.length && (
            <div className="text-center mt-12">
              <button
                onClick={loadMore}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Load More Projects
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your project?</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Let's work together to create something amazing. Get in touch with us today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 font-medium rounded-full transition-colors duration-300"
            >
              Contact Us
            </Link>
            <Link 
              href="/about" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium rounded-full transition-colors duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorksPage;