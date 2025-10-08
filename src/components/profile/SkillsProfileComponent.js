import React from 'react';

const SkillsProfileComponent = ({ skills }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
      </div>
      
      <DisplaySkillsComponent skills={skills} />
    </div>
  );
};



const DisplaySkillsComponent = ({ skills }) => (
  skills.length > 0 ? (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span 
          key={index}
          className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 shadow-sm"
        >
          {skill}
        </span>
      ))}
    </div>
  ) : (
    <p className="text-gray-500 text-sm">No skills added yet</p>
  )
);

export default SkillsProfileComponent;