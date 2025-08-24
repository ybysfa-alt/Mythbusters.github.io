import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, Tag, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  const getMythStatusColor = (status: string) => {
    switch (status) {
      case 'busted':
        return 'bg-red-500 text-white';
      case 'confirmed':
        return 'bg-green-500 text-white';
      case 'plausible':
        return 'bg-yellow-500 text-gray-900';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getMythStatusIcon = (status: string) => {
    switch (status) {
      case 'busted':
        return '🚫';
      case 'confirmed':
        return '✅';
      case 'plausible':
        return '⚠️';
      default:
        return '❓';
    }
  };

  return (
    <article className={`group bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-400/20 ${featured ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
      <div className="relative overflow-hidden">
        <img
          src={post.imageUrl}
          alt={post.title}
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${featured ? 'h-64 lg:h-80' : 'h-48'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        
        {/* Myth Status Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${getMythStatusColor(post.mythStatus)} flex items-center space-x-1`}>
          <span>{getMythStatusIcon(post.mythStatus)}</span>
          <span>{post.mythStatus.toUpperCase()}</span>
        </div>

        {featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-cyan-500 text-white rounded-full text-xs font-bold">
            🔥 FEATURED
          </div>
        )}
      </div>

      <div className={`p-6 ${featured ? 'lg:p-8' : ''}`}>
        {/* Category Tag */}
        <div className="flex items-center space-x-2 mb-3">
          <Tag className="h-4 w-4 text-cyan-400" />
          <span className="text-cyan-400 text-sm font-medium capitalize">{post.category}</span>
        </div>

        <h2 className={`font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300 leading-tight ${featured ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
          {post.title}
        </h2>

        <p className={`text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed ${featured ? 'text-lg mb-6' : 'mb-4'}`}>
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md hover:bg-gray-700 transition-colors duration-200"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
          <span>{new Date(post.publishDate).toLocaleDateString()}</span>
        </div>

        {/* Read More Button */}
        <Link 
          to={`/article/${post.id}`}
          className="mt-4 inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200 group/btn"
        >
          <span>Read Full Analysis</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};