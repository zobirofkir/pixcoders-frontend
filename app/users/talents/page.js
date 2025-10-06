'use client';
import { Suspense } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import TalentFiltersComponent from '@/components/users/talent/TalentFiltersComponent';
import MobileFilters from '@/components/users/talent/MobileFilters';
import { useTalents } from '@/hooks/useTalents';
import { HeroSectionComponent } from '@/components/users/talent/talents-page/page/HeroSectionComponent';
import TalentSearchHeaderComponent from '@/components/users/talent/talents-page/page/TalentSearchHeaderComponent';
import TalentGridComponent from '@/components/users/talent/talents-page/page/TalentGridComponent';
import PaginationComponent from '@/components/users/talent/talents-page/page/PaginationComponent';
import CallToActionComponent from '@/components/users/talent/talents-page/page/CallToActionComponent';
import LoadingComponent from '@/components/loading/LoadingComponent';

const TalentsPage = () => {
  const {
    talents,
    filters,
    setFilters,
    isMobileFiltersOpen,
    setIsMobileFiltersOpen
  } = useTalents();

  return (
    <Suspense fallback={<LoadingComponent />}>
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

      <HeroSectionComponent />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Filters Sidebar - Hidden on mobile, shown on larger screens */}
          <div className="hidden lg:block lg:w-1/4">
            <TalentFiltersComponent onFilterChange={setFilters} />
          </div>

          {/* Mobile Filter Trigger and Overlay */}
          <div className="lg:hidden mb-4">
            <button 
              onClick={() => setIsMobileFiltersOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors"
              aria-label="Open filters"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              Filter & Sort
            </button>
            
            <MobileFilters 
              isOpen={isMobileFiltersOpen}
              onClose={() => setIsMobileFiltersOpen(false)}
              onFilterChange={setFilters}
            />
          </div>

          {/* Main Content Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-3/4"
          >
            <TalentSearchHeaderComponent count={talents.length} />
            <TalentGridComponent talents={talents} />
            {talents.length > 0 && <PaginationComponent />}
          </motion.div>
        </div>
      </main>

        <CallToActionComponent />
      </motion.div>
    </Suspense>
  );
};

export default TalentsPage;