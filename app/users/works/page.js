'use client';

import { Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSectionComponent, FilterButtonsComponent, WorksGridComponent, CTASectionComponent } from '@/components';
import { workData } from '@/data/workData';
import LoadingComponent from '@/components/loading/LoadingComponent';


const WorksPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleWorks, setVisibleWorks] = useState(6);

  const filters = ['All', 'Web', 'Mobile', 'E-commerce', 'Enterprise'];

  const filteredWorks = activeFilter === 'All' 
    ? workData 
    : workData.filter(work => work.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase())));

  const loadMore = () => {
    setVisibleWorks(prev => Math.min(prev + 3, workData.length));
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setVisibleWorks(6); 
  };

  /**
   * Animation variants for page transition
   */
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  /**
   * Animation for filter change
   */
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <Suspense fallback={<LoadingComponent/>}>

      <motion.div 
        className="min-h-screen bg-white dark:bg-gray-900"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <HeroSectionComponent 
          title="Our Work Speaks for Itself"
          description="We've helped businesses of all sizes transform their ideas into successful digital products. Here are some of our recent projects."
        >
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FilterButtonsComponent
              filters={filters}
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
            />
          </motion.div>
        </HeroSectionComponent>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="container mx-auto px-4 py-12"
          >
            <WorksGridComponent 
              works={filteredWorks} 
              visibleWorks={visibleWorks} 
              onLoadMore={loadMore} 
            />
          </motion.div>
        </AnimatePresence>

        <CTASectionComponent />
      </motion.div>

    </Suspense>
  );
};

export default WorksPage;