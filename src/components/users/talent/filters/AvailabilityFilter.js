'use client';

const AvailabilityFilter = ({ value, onChange }) => (
  <select
    name="availability"
    value={value}
    onChange={onChange}
    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
  >
    <option value="">Any Availability</option>
    <option value="full-time">Full-time</option>
    <option value="part-time">Part-time</option>
    <option value="freelance">Freelance</option>
  </select>
);

export default AvailabilityFilter;
