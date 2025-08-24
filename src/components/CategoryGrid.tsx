import React from 'react';
import { categories } from '../data/categories';

interface CategoryGridProps {
  onCategorySelect?: (categoryId: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategorySelect }) => {
  const handleCategoryClick = (categoryId: string) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
    
    // Update URL
    const url = new URL(window.location.href);
    url.searchParams.set('category', categoryId);
    url.searchParams.delete('search');
    url.searchParams.delete('featured');
    window.history.pushState({}, '', url.toString());
    
    // Trigger page update
    window.dispatchEvent(new PopStateEvent('popstate'));
    
    // Scroll to blog section
    setTimeout(() => {
      const blogSection = document.getElementById('blog-section');
      if (blogSection) {
        blogSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div id="categories-section" className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Explore Myth Categories
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Dive deep into different areas of myth-busting, from science and health to urban legends and history.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="group relative bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-cyan-400 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {category.name}
                  </h3>
                </div>
                
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {category.description}
                </p>

                <div className="mt-4 text-sm text-cyan-400 group-hover:text-cyan-300 font-medium">
                  Explore Category →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};