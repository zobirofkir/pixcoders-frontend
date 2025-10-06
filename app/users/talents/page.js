'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import TalentFiltersComponent from '@/src/components/users/talent/TalentFiltersComponent';
import TalentCardComponent from '@/src/components/users/talent/TalentCardComponent';
import { talentData } from '@/src/data/talentData';


/**
 * Animation variants
 */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

const page = () => {
  const [talents, setTalents] = useState(talentData);
  const [filters, setFilters] = useState({
    search: '',
    skills: [],
    availability: '',
    rate: { min: 0, max: 200 },
  });

  const filterTalents = () => {
    return talentData.filter((talent) => {
      const matchesSearch =
        talent.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        talent.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        talent.skills.some((skill) =>
          skill.toLowerCase().includes(filters.search.toLowerCase())
        );

      const matchesSkills =
        filters.skills.length === 0 ||
        filters.skills.every((skill) => talent.skills.includes(skill));

      const matchesAvailability =
        !filters.availability || talent.availability === filters.availability;

      const matchesRate =
        talent.rate >= filters.rate.min && talent.rate <= filters.rate.max;

      return (
        matchesSearch &&
        matchesSkills &&
        matchesAvailability &&
        matchesRate
      );
    });
  };

  /**
   * Update talents when filters change
   */
  useEffect(() => {
    setTalents(filterTalents());
  }, [filters]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      <Head>
        <title>Top Talents | Find Skilled Professionals</title>
        <meta
          name="description"
          content="Browse our network of top-tier professionals and find the perfect talent for your project."
        />
      </Head>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16"
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Top Tech Talent
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl">
            Connect with highly skilled developers, designers, and tech experts ready to work on your next project.
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Filters Sidebar - Hidden on mobile, shown on larger screens */}
          <div className="hidden lg:block lg:w-1/4">
            <TalentFiltersComponent onFilterChange={setFilters} />
          </div>

          {/* Mobile Filters Trigger - Only shown on small screens */}
          <div className="lg:hidden mb-4">
            <button 
              onClick={() => {
                // You might want to implement a mobile filter drawer here
                alert('Mobile filters would open here');
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              Filter & Sort
            </button>
          </div>

          {/* Talents Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-3/4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {talents.length} {talents.length === 1 ? 'Talent' : 'Talents'} Found
              </h2>
              <div className="flex items-center w-full sm:w-auto">
                <span className="text-sm sm:text-base text-gray-600 mr-2 whitespace-nowrap">Sort by:</span>
                <select className="w-full sm:w-auto text-sm sm:text-base border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  <option>Relevance</option>
                  <option>Rating: High to Low</option>
                  <option>Rate: Low to High</option>
                  <option>Most Reviews</option>
                </select>
              </div>
            </div>

            <AnimatePresence>
              {talents.length > 0 ? (
                <motion.div 
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-5"
                >
                  {talents.map((talent) => (
                    <motion.div key={talent.id} variants={item} layout>
                      <TalentCardComponent talent={talent} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-lg shadow p-8 text-center"
                >
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No talents found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter criteria to find what you're looking for.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {talents.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-3 py-1 rounded-md bg-indigo-600 text-white">
                    1
                  </button>
                  <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <span className="px-2 text-gray-500">...</span>
                  <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                    10
                  </button>
                  <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Call to Action */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-indigo-700 text-white py-12 mt-12"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-xl text-indigo-100 mb-6 max-w-2xl mx-auto">
            Let us help you find the perfect talent for your specific needs.
          </p>
          <button className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors">
            Post a Job Request
          </button>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default page;