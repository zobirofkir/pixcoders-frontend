'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import TalentFilters from '@/src/components/users/talent/TalentFiltersComponent';
import TalentCard from '@/src/components/users/talent/TalentCardComponent';

// Mock data - in a real app, this would come from an API
const mockTalents = [
  {
    id: 1,
    name: 'Alex Johnson',
    title: 'Senior Full-Stack Developer',
    bio: 'Passionate about building scalable web applications with React, Node.js, and modern JavaScript.',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'GraphQL'],
    rating: 4.9,
    reviews: 42,
    rate: 120,
    availability: 'full-time',
    avatar: '/images/avatars/1.jpg',
  },
  {
    id: 2,
    name: 'Sarah Williams',
    title: 'UI/UX Designer & Frontend Developer',
    bio: 'Creating beautiful, intuitive user experiences with a focus on accessibility and performance.',
    skills: ['Figma', 'React', 'CSS/SCSS', 'UI/UX', 'Responsive Design'],
    rating: 4.8,
    reviews: 36,
    rate: 95,
    availability: 'freelance',
    avatar: '/images/avatars/2.jpg',
  },
  {
    id: 3,
    name: 'Michael Chen',
    title: 'DevOps Engineer',
    bio: 'Helping teams build, deploy, and scale applications efficiently with modern cloud technologies.',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'],
    rating: 4.7,
    reviews: 28,
    rate: 150,
    availability: 'part-time',
    avatar: '/images/avatars/3.jpg',
  },
  {
    id: 4,
    name: 'Emily Rodriguez',
    title: 'Mobile App Developer',
    bio: 'Building cross-platform mobile applications with React Native and Flutter.',
    skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase'],
    rating: 4.9,
    reviews: 31,
    rate: 110,
    availability: 'full-time',
    avatar: '/images/avatars/4.jpg',
  },
  {
    id: 5,
    name: 'David Kim',
    title: 'Machine Learning Engineer',
    bio: 'Transforming data into intelligent solutions with machine learning and AI.',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision'],
    rating: 4.8,
    reviews: 24,
    rate: 160,
    availability: 'freelance',
    avatar: '/images/avatars/5.jpg',
  },
  {
    id: 6,
    name: 'Priya Patel',
    title: 'Blockchain Developer',
    bio: 'Building decentralized applications and smart contracts on Ethereum and other blockchains.',
    skills: ['Solidity', 'Ethereum', 'Smart Contracts', 'Web3.js', 'DeFi'],
    rating: 4.7,
    reviews: 19,
    rate: 140,
    availability: 'part-time',
    avatar: '/images/avatars/6.jpg',
  },
];

const TalentsPage = () => {
  const [talents, setTalents] = useState(mockTalents);
  const [filters, setFilters] = useState({
    search: '',
    skills: [],
    availability: '',
    rate: { min: 0, max: 200 },
  });

  // Filter talents based on filters
  const filterTalents = () => {
    return mockTalents.filter((talent) => {
      // Search filter
      const matchesSearch =
        talent.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        talent.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        talent.skills.some((skill) =>
          skill.toLowerCase().includes(filters.search.toLowerCase())
        );

      // Skills filter
      const matchesSkills =
        filters.skills.length === 0 ||
        filters.skills.every((skill) => talent.skills.includes(skill));

      // Availability filter
      const matchesAvailability =
        !filters.availability || talent.availability === filters.availability;

      // Rate filter
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

  // Update talents when filters change
  useEffect(() => {
    setTalents(filterTalents());
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Top Talents | Find Skilled Professionals</title>
        <meta
          name="description"
          content="Browse our network of top-tier professionals and find the perfect talent for your project."
        />
      </Head>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Top Tech Talent
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl">
            Connect with highly skilled developers, designers, and tech experts ready to work on your next project.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <TalentFilters onFilterChange={setFilters} />
          </div>

          {/* Talents Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {talents.length} {talents.length === 1 ? 'Talent' : 'Talents'} Found
              </h2>
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Sort by:</span>
                <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm">
                  <option>Relevance</option>
                  <option>Rating: High to Low</option>
                  <option>Rate: Low to High</option>
                  <option>Most Reviews</option>
                </select>
              </div>
            </div>

            {talents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {talents.map((talent) => (
                  <TalentCard key={talent.id} talent={talent} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No talents found</h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
              </div>
            )}

            {/* Pagination */}
            {talents.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-3 py-1 rounded-md bg-indigo-600 text-white">
                    1
                  </button>
                  <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <span className="px-2 text-gray-500">...</span>
                  <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                    10
                  </button>
                  <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Call to Action */}
      <section className="bg-indigo-700 text-white py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-xl text-indigo-100 mb-6 max-w-2xl mx-auto">
            Let us help you find the perfect talent for your specific needs.
          </p>
          <button className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors">
            Post a Job Request
          </button>
        </div>
      </section>
    </div>
  );
};

export default TalentsPage;