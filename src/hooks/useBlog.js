import { useState, useMemo } from 'react';
import { blogsData } from '@/data/blogsData';

export const useBlog = (initialCategory = 'All', postsPerPage = 6) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter posts based on search query and selected category
  const filteredPosts = useMemo(() => {
    return blogsData.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Get featured posts
  const featuredPosts = useMemo(() => {
    return blogsData.filter(post => post.featured);
  }, []);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Optional: Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    // State
    searchQuery,
    selectedCategory,
    currentPage,
    postsPerPage,
    
    // Computed values
    filteredPosts,
    featuredPosts,
    currentPosts,
    totalPages,
    
    // Handlers
    setSearchQuery,
    setSelectedCategory: handleCategoryChange,
    setCurrentPage: handlePageChange
  };
};

export default useBlog;
