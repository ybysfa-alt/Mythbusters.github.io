import React from 'react';
import { BlogCard } from './BlogCard';
import { AdContainer } from './AdContainer';
import { samplePosts } from '../data/samplePosts';

export const BlogGrid: React.FC = () => {
  const featuredPosts = samplePosts.filter(post => post.featured);
  const regularPosts = samplePosts.filter(post => !post.featured);

  return (
    <div className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Mythbusts</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} featured={true} />
              ))}
            </div>
          </div>
        )}

        {/* Latest Posts Section */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Latest Mythbusts</h2>
          <button className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200">
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {regularPosts.map((post, index) => (
            <React.Fragment key={post.id}>
              <BlogCard post={post} />
              {/* Inject ads every 3 posts */}
              {(index + 1) % 3 === 0 && (
                <div className="flex items-center justify-center md:col-span-2 xl:col-span-1">
                  <AdContainer size="rectangle" position={`inline-${index + 1}`} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};