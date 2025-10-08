/**
 * Professional profiles data for the slider component
 * @typedef {Object} ProfileData
 * @property {number} id - Unique identifier
 * @property {string} name - Full name
 * @property {string} role - Job title/role
 * @property {string} company - Company name
 * @property {string} image - Profile image URL
 * @property {string} companyLogo - Company logo URL
 * @property {boolean} isVerified - Verification status
 * @property {string} bio - Short biography
 * @property {number} experience - Years of experience
 * @property {string[]} skills - Array of skills
 * @property {string} location - Location
 */

/**
 * Array of professional profiles to display in the slider
 * @type {ProfileData[]}
 */
const profileData = [
  {
    id: 1,
    name: 'Anneto Montinari',
    role: 'Interim PM Director',
    company: 'J.P.Morgan',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    companyLogo: 'https://logos-world.net/wp-content/uploads/2021/02/JP-Morgan-Chase-Logo.png',
    isVerified: true,
    bio: 'Strategic product leader with 12+ years driving digital transformation in financial services.',
    experience: 12,
    skills: ['Product Strategy', 'Team Leadership', 'Digital Transformation', 'Agile', 'Fintech'],
    location: 'New York, NY'
  },
  {
    id: 2,
    name: 'Ian Cornwall',
    role: 'Senior Product Lead',
    company: 'Google',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    companyLogo: 'https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png',
    isVerified: true,
    bio: 'Product innovator specializing in AI/ML products and user experience optimization.',
    experience: 8,
    skills: ['AI/ML', 'Product Design', 'Data Analytics', 'User Research', 'Growth'],
    location: 'Mountain View, CA'
  },
  {
    id: 3,
    name: 'Paula Yliasasi',
    role: 'Creative Product Manager',
    company: 'BBDO',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    companyLogo: 'https://logos-world.net/wp-content/uploads/2020/12/BBDO-Logo.png',
    isVerified: true,
    bio: 'Creative strategist bridging brand storytelling with digital product experiences.',
    experience: 6,
    skills: ['Brand Strategy', 'Creative Direction', 'Digital Marketing', 'Campaign Management'],
    location: 'New York, NY'
  },
  {
    id: 4,
    name: 'Carson Leung',
    role: 'Product Manager',
    company: 'American Express',
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
    companyLogo: 'https://logos-world.net/wp-content/uploads/2020/04/American-Express-Logo.png',
    isVerified: true,
    bio: 'Fintech product expert focused on payment solutions and customer experience.',
    experience: 7,
    skills: ['Fintech', 'Payment Systems', 'Customer Experience', 'Mobile Apps', 'Security'],
    location: 'Phoenix, AZ'
  },
  {
    id: 5,
    name: 'Savannah Enright',
    role: 'Sr. Product Manager',
    company: 'Accenture',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    companyLogo: 'https://logos-world.net/wp-content/uploads/2020/06/Accenture-Logo.png',
    isVerified: true,
    bio: 'Enterprise product leader driving digital transformation for Fortune 500 clients.',
    experience: 10,
    skills: ['Enterprise Software', 'Digital Transformation', 'Consulting', 'Strategy', 'B2B'],
    location: 'Chicago, IL'
  },
  {
    id: 6,
    name: 'David Lo',
    role: 'Product Manager',
    company: 'Microsoft',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    companyLogo: 'https://logos-world.net/wp-content/uploads/2020/09/Microsoft-Logo.png',
    isVerified: true,
    bio: 'Cloud platform product manager specializing in developer tools and enterprise solutions.',
    experience: 9,
    skills: ['Cloud Computing', 'Developer Tools', 'Azure', 'Enterprise Solutions', 'APIs'],
    location: 'Seattle, WA'
  }
];

/**
 * Configuration constants for the profile slider
 */
export const SLIDER_CONFIG = {
  CARDS_PER_SLIDE: 3,
  AUTO_PLAY_INTERVAL: 5000,
  ANIMATION_DURATION: 300
};

/**
 * Get a profile by ID
 * @param {number} id - Profile ID
 * @returns {ProfileData|undefined} Profile data or undefined if not found
 */
export const getProfileById = (id) => {
  return profileData.find(profile => profile.id === id);
};

/**
 * Get profiles by company
 * @param {string} company - Company name
 * @returns {ProfileData[]} Array of profiles from the company
 */
export const getProfilesByCompany = (company) => {
  return profileData.filter(profile => 
    profile.company.toLowerCase().includes(company.toLowerCase())
  );
};

/**
 * Get verified profiles only
 * @returns {ProfileData[]} Array of verified profiles
 */
export const getVerifiedProfiles = () => {
  return profileData.filter(profile => profile.isVerified);
};

export default profileData;
