'use client';
import { useState } from 'react';

export const TalentFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    skills: [],
    availability: '',
    rate: { min: 0, max: 200 },
  });

  const skills = [
    'React', 'Node.js', 'Python', 'UI/UX Design',
    'Mobile Development', 'DevOps', 'Machine Learning', 'Blockchain'
  ];

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
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Find Top Talent</h2>
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
      </div>

      <div className="mb-6">
        <h3 className="font-medium text-gray-700 mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <button
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={`px-3 py-1 rounded-full text-sm ${
                filters.skills.includes(skill)
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium text-gray-700 mb-3">Hourly Rate</h3>
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
                className="w-full pl-8 p-2 border border-gray-300 rounded-lg"
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
                className="w-full pl-8 p-2 border border-gray-300 rounded-lg"
                min={filters.rate.min}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-700 mb-3">Availability</h3>
        <select
          name="availability"
          value={filters.availability}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Any Availability</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="freelance">Freelance</option>
        </select>
      </div>
    </div>
  );
};

export default TalentFilters;
