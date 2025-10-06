import Image from 'next/image';
import { FiCalendar, FiClock } from 'react-icons/fi';
import Link from 'next/link';

export const FeaturedPostsComponent = ({ posts }) => (
  <div className="mb-16">
    <h2 className="text-2xl font-bold mb-8 text-gray-900">Featured Posts</h2>
    <div className="grid md:grid-cols-2 gap-8">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="relative h-64">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="inline-block bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
                {post.category}
              </span>
              <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{post.title}</h3>
              <div className="flex items-center text-sm text-gray-200">
                <span className="flex items-center mr-4">
                  <FiCalendar className="mr-1" /> {post.date}
                </span>
                <span className="flex items-center">
                  <FiClock className="mr-1" /> {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
