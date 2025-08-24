import React from 'react';
import { BlogCard } from './BlogCard';
import { AdContainer } from './AdContainer';
import { samplePosts } from '../data/samplePosts';

interface BlogGridProps {
  searchQuery?: string;
  categoryFilter?: string;
  featuredOnly?: boolean;
}

export const BlogGrid: React.FC<BlogGridProps> = ({ 
  searchQuery = '', 
  categoryFilter = '', 
  featuredOnly = false 
}) => {
  // Filter posts based on search and category
  const filteredPosts = samplePosts.filter(post => {
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !categoryFilter || categoryFilter === 'all' || post.category === categoryFilter;
    const matchesFeatured = !featuredOnly || post.featured;
    
    return matchesSearch && matchesCategory && matchesFeatured;
  });

  const featuredPosts = samplePosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div id="blog-section" className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Results Header */}
        {(searchQuery || categoryFilter || featuredOnly) && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              {searchQuery && `Search results for "${searchQuery}"`}
              {categoryFilter && !searchQuery && `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Articles`}
              {featuredOnly && !searchQuery && !categoryFilter && 'Featured Articles'}
            </h2>
            <p className="text-gray-400">
              Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && !searchQuery && !categoryFilter && !featuredOnly && (
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
          <h2 className="text-3xl font-bold text-white">
            {searchQuery || categoryFilter || featuredOnly ? 'Results' : 'Latest Mythbusts'}
          </h2>
          <button className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200">
            View All →
          </button>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No articles found</h3>
            <p className="text-gray-400">Try adjusting your search terms or browse our categories.</p>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};