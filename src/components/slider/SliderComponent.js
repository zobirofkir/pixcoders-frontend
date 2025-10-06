"use client"
import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaCheckCircle } from 'react-icons/fa'; // Used for the Verified Expert badge

// --- Mock Data Restyled to Match the Image Content ---
const profiles = [
  {
    id: 1,
    name: 'Anneto Montinari',
    role: 'Interim PM Director',
    company: 'J.P.Morgan',
    image: 'https://randomuser.me/api/portraits/men/3.jpg', // Placeholder image
    companyLogo: 'https://cdn.iconscout.com/icon/free/png-256/jpmorgan-chase-1-285191.png', // Placeholder for JPM logo
    isVerified: true
  },
  {
    id: 2,
    name: 'Ian Cornwall',
    role: 'Product Lead',
    company: 'Google',
    image: 'https://randomuser.me/api/portraits/men/4.jpg', // Placeholder image
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png', // Placeholder for Google logo
    isVerified: true
  },
  {
    id: 3,
    name: 'Paula Yliasasi',
    role: 'Product Manager',
    company: 'BBDO',
    image: 'https://randomuser.me/api/portraits/women/3.jpg', // Placeholder image
    companyLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/07/BBDO_Logo.svg/1200px-BBDO_Logo.svg.png', // Placeholder for BBDO logo
    isVerified: true
  },
  {
    id: 4,
    name: 'Carson Leung',
    role: 'Product Manager',
    company: 'Airlines Inc.',
    image: 'https://randomuser.me/api/portraits/men/5.jpg', // Placeholder image
    companyLogo: 'https://img.icons8.com/color/48/000000/amex.png', // Placeholder for a company logo
    isVerified: true
  },
  {
    id: 5,
    name: 'Savannah Enright',
    role: 'Sr. Product Manager',
    company: 'Accenture',
    image: 'https://randomuser.me/api/portraits/women/4.jpg', // Placeholder image
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Accenture_logo.svg/1200px-Accenture_logo.svg.png', // Placeholder for Accenture logo
    isVerified: true
  },
  {
    id: 6,
    name: 'David Lo',
    role: 'Product Manager',
    company: 'American Express',
    image: 'https://randomuser.me/api/portraits/men/6.jpg', // Placeholder image
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png', // Placeholder for Amex logo
    isVerified: true
  }
];

// Configuration for how many cards to show per slide
const CARDS_PER_SLIDE = 3;

const SliderComponent = () => {
  const [current, setCurrent] = useState(0);
  // Calculate the total number of "slides" based on the cards and how many we show at once
  const totalSlides = Math.ceil(profiles.length / CARDS_PER_SLIDE);

  const nextSlide = () => {
    setCurrent(current === totalSlides - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? totalSlides - 1 : current - 1);
  };

  // Auto-slide functionality (optional, can be removed if a static grid is preferred)
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);
    return () => clearTimeout(timer);
  }, [current]);

  if (!Array.isArray(profiles) || profiles.length <= 0) {
    return null;
  }

  // Calculate the offset for the slide transformation
  const transformOffset = current * (100 / CARDS_PER_SLIDE);

  return (
    <section className="relative bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Section Title and Subtitle (Matches the Toptal style) --- */}
        <div className="text-left mb-12">
          <h2 className="text-5xl font-extrabold text-gray-900 leading-none">
            Hire the <span className="text-blue-600">Top 3%</span> of
            <br />
            Product Managers
          </h2>
          <p className="mt-6 max-w-4xl text-lg text-gray-700">
            Toptal is a marketplace for top product managers who are experts in
            product research, ideation, roadmaps, user stories, execution, and
            launch. Leading companies hire product managers from Toptal for
            end-to-end product lifecycle success.
          </p>
          <button className="mt-8 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300">
            Hire a Top Product Manager
          </button>
        </div>

        {/* --- Profile Slider/Grid Container --- */}
        <div className="relative max-w-6xl mx-auto mt-16">
          <div className="overflow-hidden">
            <div
              className="transition-transform duration-700 ease-in-out flex"
              style={{ transform: `translateX(-${transformOffset}%)` }}
            >
              {profiles.map((profile) => (
                <div
                  key={profile.id}
                  // Each card takes up the full width when only 1 is shown, 1/3 when 3 are shown
                  className={`w-full flex-shrink-0 p-4 sm:w-1/${CARDS_PER_SLIDE} lg:w-1/${CARDS_PER_SLIDE}`} 
                >
                  {/* --- Profile Card (Based on Toptal Image) --- */}
                  <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex flex-col items-center text-center">
                    
                    {/* Profile Image */}
                    <img
                      className="h-28 w-28 rounded-full object-cover mb-4 border-4 border-white shadow-md"
                      src={profile.image}
                      alt={profile.name}
                    />
                    
                    {/* Name and Verification */}
                    <h4 className="text-xl font-semibold text-gray-900">{profile.name}</h4>
                    <div className="flex items-center text-sm font-medium mt-1 text-gray-600">
                      {profile.isVerified && (
                        <FaCheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      )}
                      Verified Expert
                    </div>
                    
                    {/* Role */}
                    <p className="text-sm text-gray-500 mt-2">{profile.role}</p>

                    {/* Previous Company */}
                    <div className="mt-4 pt-4 border-t border-gray-200 w-full flex flex-col items-center">
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Previously at
                      </p>
                      <img
                        className="h-6 object-contain mt-2"
                        src={profile.companyLogo}
                        alt={`${profile.company} Logo`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* --- Navigation Buttons --- */}
          {/* Only show navigation if there are more cards than fit on one slide */}
          {totalSlides > 1 && (
            <>
              <button 
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-12 p-3 rounded-full bg-white shadow-xl text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                aria-label="Previous slide"
              >
                <FiChevronLeft className="h-6 w-6" />
              </button>
              
              <button 
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-12 p-3 rounded-full bg-white shadow-xl text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                aria-label="Next slide"
              >
                <FiChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* --- Pagination Dots --- */}
          {totalSlides > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {[...Array(totalSlides)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${current === index ? 'bg-blue-600 w-6' : 'bg-gray-300 w-2'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SliderComponent;