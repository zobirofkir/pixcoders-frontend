'use client';

const skills = [
  'React', 'Node.js', 'Python', 'UI/UX Design',
  'Mobile Development', 'DevOps', 'Machine Learning', 'Blockchain'
];

const SkillsFilter = ({ selectedSkills, onSkillToggle }) => (
  <div className="flex flex-wrap gap-2">
    {skills.map((skill) => (
      <button
        key={skill}
        onClick={() => onSkillToggle(skill)}
        className={`px-3 py-1 rounded-full text-sm transition-colors ${
          selectedSkills.includes(skill)
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {skill}
      </button>
    ))}
  </div>
);

export default SkillsFilter;
