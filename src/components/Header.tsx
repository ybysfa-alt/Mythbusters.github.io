import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Zap } from 'lucide-react';
import { AdContainer } from './AdContainer';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery.trim());
      } else {
        // Navigate to search results or filter current page
        console.log('Searching for:', searchQuery.trim());
      }
    }
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/?category=${category}`);
  };

  return (
    <div className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      {/* Top Ad Banner */}
      <div className="flex justify-center py-2 border-b border-gray-800">
        <AdContainer size="leaderboard" position="header" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Zap className="h-8 w-8 text-cyan-400 animate-pulse group-hover:scale-110 transition-transform duration-200" />
              <div className="absolute inset-0 bg-cyan-400 blur-sm opacity-30 animate-pulse"></div>
            </div>
            <div className="text-2xl font-bold group-hover:text-cyan-300 transition-colors duration-200">
              <span className="text-white">Yby</span>
              <span className="text-cyan-400">Mythbust</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium">Home</Link>
            <button 
              onClick={() => handleCategoryClick('all')}
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium"
            >
              Categories
            </button>
            <button 
              onClick={() => navigate('/?featured=true')}
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium"
            >
              Featured
            </button>
            <button className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium">About</button>
            <button className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium">Contact</button>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search myths..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-200 w-64"
              />
            </form>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800 py-4 space-y-4">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search myths..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-200"
              />
            </form>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium py-2">Home</Link>
              <button 
                onClick={() => {handleCategoryClick('all'); setIsMenuOpen(false);}}
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium py-2 text-left"
              >
                Categories
              </button>
              <button 
                onClick={() => {navigate('/?featured=true'); setIsMenuOpen(false);}}
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium py-2 text-left"
              >
                Featured
              </button>
              <button className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium py-2 text-left">About</button>
              <button className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium py-2 text-left">Contact</button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};