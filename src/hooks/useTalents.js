import { useState, useEffect } from 'react';
import { talentData } from '@/src/data/talentData';

export const useTalents = () => {
  const [talents, setTalents] = useState(talentData);
  const [filters, setFilters] = useState({
    search: '',
    skills: [],
    availability: '',
    rate: { min: 0, max: 200 },
  });
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

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

  return {
    talents,
    filters,
    setFilters,
    isMobileFiltersOpen,
    setIsMobileFiltersOpen
  };
};
