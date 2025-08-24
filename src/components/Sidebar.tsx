import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Clock, Star, Users } from 'lucide-react';
import { AdContainer } from './AdContainer';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const trendingPosts = [
    { title: 'Does Lightning Never Strike Twice?', views: '125K', id: '3' },
    { title: 'The 10% Brain Usage Myth', views: '98K', id: '1' },
    { title: 'MSG Health Concerns Debunked', views: '87K', id: '4' },
    { title: 'Cold Weather and Common Colds', views: '76K', id: '2' }
  ];

  const recentPosts = [
    { title: 'Vaccines and Autism Link', date: '2 days ago', id: '5' },
    { title: 'Sugar Makes Kids Hyperactive?', date: '4 days ago', id: '6' },
    { title: 'Cracking Knuckles Causes Arthritis', date: '1 week ago', id: '7' }
  ];

  const handleNewsletterSignup = () => {
    // Scroll to newsletter section
    const newsletterSection = document.querySelector('[class*="from-cyan-600"]');
    if (newsletterSection) {
      newsletterSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="space-y-8">
      {/* Sidebar Ad */}
      <div className="sticky top-24">
        <AdContainer size="sidebar" position="sidebar-top" />
      </div>

      {/* Trending Posts */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="h-5 w-5 text-cyan-400" />
          <h3 className="text-xl font-semibold text-white">Trending</h3>
        </div>
        <ul className="space-y-3">
          {trendingPosts.map((post, index) => (
            <li 
              key={index} 
              onClick={() => navigate(`/article/${post.id}`)}
              className="group cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <h4 className="text-gray-300 group-hover:text-cyan-400 transition-colors duration-200 text-sm leading-5 flex-1 mr-2">
                  {post.title}
                </h4>
                <span className="text-gray-500 text-xs whitespace-nowrap">{post.views}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="h-5 w-5 text-green-400" />
          <h3 className="text-xl font-semibold text-white">Recent Posts</h3>
        </div>
        <ul className="space-y-3">
          {recentPosts.map((post, index) => (
            <li 
              key={index} 
              onClick={() => navigate(`/article/${post.id}`)}
              className="group cursor-pointer"
            >
              <h4 className="text-gray-300 group-hover:text-cyan-400 transition-colors duration-200 text-sm leading-5 mb-1">
                {post.title}
              </h4>
              <span className="text-gray-500 text-xs">{post.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl p-6">
        <div className="text-center">
          <Star className="h-8 w-8 text-white mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-white mb-2">Stay Updated</h3>
          <p className="text-cyan-100 text-sm mb-4">Get the latest myth-busting content delivered to your inbox.</p>
          <button 
            onClick={handleNewsletterSignup}
            className="w-full px-4 py-2 bg-white text-cyan-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Subscribe Now
          </button>
        </div>
      </div>

      {/* Bottom Sidebar Ad */}
      <div className="sticky top-96">
        <AdContainer size="sidebar" position="sidebar-bottom" />
      </div>
    </aside>
  );
};