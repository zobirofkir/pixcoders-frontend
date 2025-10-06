'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FilterSection = ({ title, children, isOpen, onToggle }) => (
  <div className="mb-6">
    <button 
      onClick={onToggle}
      className="w-full flex justify-between items-center lg:cursor-default"
      aria-expanded={isOpen}
    >
      <h3 className="font-medium text-gray-700">{title}</h3>
      <span className="lg:hidden">
        {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
      </span>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="pt-4">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export const TalentFiltersComponent = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    skills: [],
    availability: '',
    rate: { min: 0, max: 200 },
  });
  
  const [isMobile, setIsMobile] = useState(false);
  const [openSections, setOpenSections] = useState({
    search: true,
    skills: true,
    rate: true,
    availability: true
  });

  const skills = [
    'React', 'Node.js', 'Python', 'UI/UX Design',
    'Mobile Development', 'DevOps', 'Machine Learning', 'Blockchain'
  ];

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleSection = (section) => {
    if (isMobile) {
      setOpenSections(prev => ({
        ...prev,
        [section]: !prev[section]
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleSkill = (skill) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    
    const newFilters = { ...filters, skills: newSkills };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4 lg:mb-6">Find Top Talent</h2>
      
      {/* Search Section */}
      <FilterSection 
        title="Search" 
        isOpen={openSections.search} 
        onToggle={() => toggleSection('search')}
      >
        <div className="relative">
          <input
            type="text"
            name="search"
            placeholder="Search by name, skills, or keywords"
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={filters.search}
            onChange={handleChange}
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </FilterSection>

      {/* Skills Section */}
      <FilterSection 
        title="Skills" 
        isOpen={openSections.skills} 
        onToggle={() => toggleSection('skills')}
      >
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <button
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filters.skills.includes(skill)
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Hourly Rate Section */}
      <FilterSection 
        title="Hourly Rate" 
        isOpen={openSections.rate} 
        onToggle={() => toggleSection('rate')}
      >
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-500 mb-1">Min</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <input
                type="number"
                name="rateMin"
                value={filters.rate.min}
                onChange={(e) => {
                  const newFilters = {
                    ...filters,
                    rate: { ...filters.rate, min: parseInt(e.target.value) || 0 },
                  };
                  setFilters(newFilters);
                  onFilterChange(newFilters);
                }}
                className="w-full pl-8 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                min="0"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-500 mb-1">Max</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <input
                type="number"
                name="rateMax"
                value={filters.rate.max}
                onChange={(e) => {
                  const newFilters = {
                    ...filters,
                    rate: { ...filters.rate, max: parseInt(e.target.value) || 200 },
                  };
                  setFilters(newFilters);
                  onFilterChange(newFilters);
                }}
                className="w-full pl-8 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                min={filters.rate.min}
              />
            </div>
          </div>
        </div>
      </FilterSection>

      {/* Availability Section */}
      <FilterSection 
        title="Availability" 
        isOpen={openSections.availability} 
        onToggle={() => toggleSection('availability')}
      >
        <select
          name="availability"
          value={filters.availability}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="">Any Availability</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="freelance">Freelance</option>
        </select>
      </FilterSection>
    </div>
  );
};

export default TalentFiltersComponent;
