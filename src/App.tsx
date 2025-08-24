import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { BlogGrid } from './components/BlogGrid';
import { Sidebar } from './components/Sidebar';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { ArticlePage } from './components/ArticlePage';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  // Secret admin access - in production, this would be behind proper authentication
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setShowAdmin(!showAdmin);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showAdmin]);

  if (showAdmin) {
    return (
      <Router>
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setShowAdmin(false)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
          >
            Back to Site
          </button>
        </div>
        <AdminDashboard />
      </Router>
    );
  }

  const HomePage = () => (
    <>
      <Hero />
      <CategoryGrid />
      
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <BlogGrid />
          </div>
          
          {/* Sidebar */}
          <div className="mt-16 lg:mt-0 lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
      
      <Newsletter />
    </>
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-800">
        <Header />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
        </Routes>
        
        <Footer />
        
        {/* Admin Access Hint */}
        <div className="fixed bottom-4 right-4 text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
          Ctrl+Shift+A for admin
        </div>
      </div>
    </Router>
  );
}

export default App;