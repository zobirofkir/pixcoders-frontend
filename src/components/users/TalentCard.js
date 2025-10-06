import React from 'react';
import Image from 'next/image';

const TalentCard = ({ talent }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-48 bg-gray-100">
        {talent.avatar && (
          <Image
            src={talent.avatar}
            alt={`${talent.name}'s profile`}
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-300 hover:opacity-90"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{talent.name}</h3>
        <p className="text-indigo-600 font-medium">{talent.title}</p>
        <p className="text-gray-600 mt-2 text-sm">{talent.bio}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {talent.skills.map((skill, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-sm text-gray-700">
              {talent.rating} ({talent.reviews} reviews)
            </span>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalentCard;
