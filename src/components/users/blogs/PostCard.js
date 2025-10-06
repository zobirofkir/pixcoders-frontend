import Image from 'next/image';
import Link from 'next/link';
import { FiClock, FiArrowRight } from 'react-icons/fi';

export const PostCard = ({ post }) => (
  <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
    <div className="relative h-48">
      <Image
        src={post.image}
        alt={post.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <div className="flex items-center mb-3">
        <span className="text-sm text-indigo-600 font-medium">{post.category}</span>
        <span className="mx-2 text-gray-300">•</span>
        <span className="text-sm text-gray-500">{post.date}</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
      <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
        <span className="text-sm text-gray-500 flex items-center">
          <FiClock className="mr-1" /> {post.readTime}
        </span>
        <Link 
          href={`/users/blogs/${post.id}`} 
          className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center group"
        >
          Read more
          <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  </article>
);
