'use client';
import { useState, useEffect } from 'react';
import { 
  FilterSectionComponent, 
  SearchFilterComponent, 
  SkillsFilterComponent, 
  RateFilterComponent, 
  AvailabilityFilterComponent 
} from './filters';

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

  /**
   * Check if mobile on mount and on resize
   */
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024); 
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

  const handleRateChange = (newRate) => {
    const newFilters = { ...filters, rate: newRate };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 lg:p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4 lg:mb-6">Find Top Talent</h2>
      
      {/* Search Section */}
      <FilterSectionComponent
        title="Search" 
        isOpen={openSections.search} 
        onToggle={() => toggleSection('search')}
        isMobile={isMobile}
      >
        <SearchFilterComponent
          search={filters.search} 
          onChange={handleChange} 
        />
      </FilterSectionComponent>

      {/* Skills Section */}
      <FilterSectionComponent 
        title="Skills" 
        isOpen={openSections.skills} 
        onToggle={() => toggleSection('skills')}
        isMobile={isMobile}
      >
        <SkillsFilterComponent 
          selectedSkills={filters.skills} 
          onSkillToggle={toggleSkill} 
        />
      </FilterSectionComponent>

      {/* Hourly Rate Section */}
      <FilterSectionComponent 
        title="Hourly Rate" 
        isOpen={openSections.rate} 
        onToggle={() => toggleSection('rate')}
        isMobile={isMobile}
      >
        <RateFilterComponent
          rate={filters.rate} 
          onRateChange={handleRateChange} 
        />
      </FilterSectionComponent>

      {/* Availability Section */}
      <FilterSectionComponent 
        title="Availability" 
        isOpen={openSections.availability} 
        onToggle={() => toggleSection('availability')}
        isMobile={isMobile}
      >
        <AvailabilityFilterComponent
          value={filters.availability} 
          onChange={handleChange} 
        />
      </FilterSectionComponent>
    </div>
  );
};

export default TalentFiltersComponent;
