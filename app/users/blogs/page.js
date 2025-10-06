'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { blogCategoryData } from '@/src/data/blogsCategoryData';
import useBlog from '@/src/hooks/useBlog';
import {
  BlogHeroSectionComponent,
  CategoryFilterComponent,
  FeaturedPostsComponent,
  PostCardComponent,
  PaginationComponent,
  NewsletterComponent
} from '@/components';

export default function BlogPage() {
  const {
    searchQuery,
    selectedCategory,
    currentPage,
    postsPerPage,
    filteredPosts,
    featuredPosts,
    currentPosts,
    totalPages,
    setSearchQuery,
    setSelectedCategory,
    setCurrentPage
  } = useBlog();

  /**
   * Animation variants
   */
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      className="min-h-screen bg-gray-50 overflow-x-hidden"
    >
      <motion.div variants={fadeIn}>
        <BlogHeroSectionComponent 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
        />
      </motion.div>

      {/* Main Content */}
      <motion.div 
        variants={fadeIn}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <motion.div variants={item}>
          <CategoryFilterComponent 
            categories={blogCategoryData}
            selectedCategory={selectedCategory}
            onSelectCategory={(category) => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {selectedCategory === 'All' && searchQuery === '' && featuredPosts.length > 0 && (
            <motion.div
              key="featured-posts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <FeaturedPostsComponent posts={featuredPosts} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div variants={container}>
          <motion.h2 
            variants={item}
            className="text-2xl font-bold mb-8 text-gray-900"
          >
            {searchQuery ? 'Search Results' : selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
          </motion.h2>
          
          <AnimatePresence mode="wait">
            {currentPosts.length === 0 ? (
              <motion.div 
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <p className="text-gray-500 text-lg">No articles found. Try a different search or category.</p>
              </motion.div>
            ) : (
              <motion.div 
                variants={container}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence>
                  {currentPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      variants={item}
                      initial="hidden"
                      animate="show"
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <PostCardComponent post={post} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div variants={item}>
            <PaginationComponent 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div 
        variants={fadeIn}
        className="mt-16"
      >
        <NewsletterComponent />
      </motion.div>
    </motion.div>
  );
}