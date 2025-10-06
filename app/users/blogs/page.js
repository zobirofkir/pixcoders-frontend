'use client';

import React from 'react';
import { blogCategoryData } from '@/src/data/blogsCategoryData';
import useBlog from '@/src/hooks/useBlog';
import {
  HeroSection,
  CategoryFilter,
  FeaturedPosts,
  PostCard,
  Pagination,
  Newsletter
} from '@/src/components/blogs';

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

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryFilter 
          categories={blogCategoryData}
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => {
            setSelectedCategory(category);
            setCurrentPage(1);
          }}
        />

        {selectedCategory === 'All' && searchQuery === '' && featuredPosts.length > 0 && (
          <FeaturedPosts posts={featuredPosts} />
        )}

        <div>
          <h2 className="text-2xl font-bold mb-8 text-gray-900">
            {searchQuery ? 'Search Results' : selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
          </h2>
          
          {currentPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        </div>
      </div>

      <Newsletter />
    </div>
  );
}