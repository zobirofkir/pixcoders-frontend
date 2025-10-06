import React from 'react';

const TalentCardComponent = ({ talent }) => {
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-transparent active:scale-[0.98] active:shadow-lg md:active:scale-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
      {/* Header with Avatar - Stacked on mobile, side by side on larger screens */}
      <div className="md:flex">
        <div className="relative h-48 md:h-auto md:w-1/3 lg:w-1/4 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          {talent.avatar && (
            <img
              src={talent.avatar}
              alt={`${talent.name}'s profile`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Content */}
        <div className="p-4 md:p-5 md:w-2/3 lg:w-3/4">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {talent.name}
                </h3>
                <div className="flex items-center bg-indigo-50 px-2.5 py-1 rounded-full w-fit">
                  <span className="text-yellow-500 text-sm font-medium">
                    {Array(5).fill().map((_, i) => (
                      <span key={i} className="text-sm">{i < Math.floor(talent.rating) ? '★' : '☆'}</span>
                    ))}
                  </span>
                  <span className="ml-1 text-xs text-gray-600">
                    ({talent.reviews})
                  </span>
                </div>
              </div>
              
              <p className="text-indigo-600 font-medium text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-3">
                {talent.title}
              </p>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3 text-justify">
                {talent.bio}
              </p>
              
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                {talent.skills.slice(0, 3).map((skill, index) => (
                  <span 
                    key={index}
                    className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
                {talent.skills.length > 3 && (
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">
                    +{talent.skills.length - 3}
                  </span>
                )}
              </div>
            </div>
            
            <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-100">
              <button 
                className="w-full px-4 py-2 sm:py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-indigo-800 active:from-indigo-800 active:to-indigo-900 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 active:translate-y-0"
                aria-label={`View ${talent.name}'s full profile`}
              >
                View Profile
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentCardComponent;
