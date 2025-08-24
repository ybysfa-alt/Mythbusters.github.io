import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, TrendingUp, Users, Award } from 'lucide-react';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    // Scroll to blog section or navigate to articles
    const blogSection = document.getElementById('blog-section');
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmitMythClick = () => {
    // In a real app, this would open a form or navigate to a submission page
    alert('Myth submission feature coming soon! Email us at submit@ybymythbust.com');
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-cyan-900 py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-300"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 mb-8">
            <Target className="h-4 w-4 text-cyan-400 mr-2" />
            <span className="text-cyan-400 font-medium text-sm">Truth-Seeking Mission</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Busting Myths,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-green-400 to-blue-400 animate-pulse">
              Revealing Truth
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Your ultimate destination for science-backed myth-busting. We separate fact from fiction 
            with rigorous research and expert analysis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={handleExploreClick}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-400 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Explore Latest Myths
            </button>
            <button 
              onClick={handleSubmitMythClick}
              className="px-8 py-4 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 border border-gray-700 hover:border-gray-600 transition-all duration-200"
            >
              Submit a Myth
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-3xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors duration-200">500+</div>
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-200">Myths Busted</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-green-400 group-hover:text-green-300 transition-colors duration-200">1M+</div>
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-200">Monthly Readers</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors duration-200">50+</div>
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-200">Expert Contributors</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors duration-200">99%</div>
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-200">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};