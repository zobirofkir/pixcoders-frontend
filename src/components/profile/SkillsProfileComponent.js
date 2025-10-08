import React from 'react';
import { FiX, FiPlus } from 'react-icons/fi';

const SkillsProfileComponent = ({ 
  skills, 
  newSkill, 
  isEditing, 
  onAddSkill, 
  onRemoveSkill, 
  onSkillInputChange 
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
        {isEditing && (
          <span className="text-sm text-gray-500">
            {skills.length} {skills.length === 1 ? 'skill' : 'skills'}
          </span>
        )}
      </div>
      
      {isEditing ? (
        <EditingSkillsComponent
          skills={skills}
          newSkill={newSkill}
          onAddSkill={onAddSkill}
          onRemoveSkill={onRemoveSkill}
          onSkillInputChange={onSkillInputChange}
        />
      ) : (
        <DisplaySkillsComponent skills={skills} />
      )}
    </div>
  );
};

const EditingSkillsComponent = ({ skills, newSkill, onAddSkill, onRemoveSkill, onSkillInputChange }) => (
  <div className="space-y-3">
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span 
          key={index}
          onClick={() => onRemoveSkill(skill)}
          className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-red-100 text-red-800 cursor-pointer hover:bg-red-200 transition-all duration-200 transform hover:scale-105"
        >
          {skill}
          <FiX className="ml-1.5 w-3.5 h-3.5" />
        </span>
      ))}
    </div>
    
    <form onSubmit={onAddSkill} className="flex gap-2">
      <input
        type="text"
        value={newSkill}
        onChange={onSkillInputChange}
        className="flex-1 min-w-0 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
        placeholder="Add a skill"
      />
      <button
        type="submit"
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
      >
        <FiPlus className="w-4 h-4" />
      </button>
    </form>
  </div>
);

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