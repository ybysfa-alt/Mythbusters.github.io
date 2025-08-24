import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { BlogGrid } from './components/BlogGrid';
import { Sidebar } from './components/Sidebar';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { ArticlePage } from './components/ArticlePage';
import { AdminLogin } from './components/AdminLogin';
import { ContactModal } from './components/ContactModal';
import { AboutSection } from './components/AboutSection';

// Check if user is authenticated as admin
const isAdminAuthenticated = (): boolean => {
  const isAuth = sessionStorage.getItem('adminAuthenticated') === 'true';
  const loginTime = sessionStorage.getItem('adminLoginTime');
  
  if (!isAuth || !loginTime) return false;
  
  // Session expires after 2 hours
  const sessionDuration = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
  const isSessionValid = Date.now() - parseInt(loginTime) < sessionDuration;
  
  if (!isSessionValid) {
    sessionStorage.removeItem('adminAuthenticated');
    sessionStorage.removeItem('adminLoginTime');
    return false;
  }
  
  return true;
};

const HomePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [showContactModal, setShowContactModal] = useState(false);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    featured: searchParams.get('featured') === 'true'
  });

  // Update filters when URL changes
  React.useEffect(() => {
    const handlePopState = () => {
      const newSearchParams = new URLSearchParams(window.location.search);
      setFilters({
        search: newSearchParams.get('search') || '',
        category: newSearchParams.get('category') || '',
        featured: newSearchParams.get('featured') === 'true'
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  const handleSearch = (query: string) => {
    setFilters({
      search: query,
      category: '',
      featured: false
    });
  };

  const handleCategoryFilter = (category: string) => {
    setFilters({
      search: '',
      category: category,
      featured: false
    });
  };

  const handleShowContact = () => {
    setShowContactModal(true);
  };

  return (
    <>
      <Header 
        onSearch={handleSearch}
        onCategoryFilter={handleCategoryFilter}
        onShowContact={handleShowContact}
      />
      <Hero />
      {!filters.search && !filters.category && !filters.featured && (
        <CategoryGrid onCategorySelect={handleCategoryFilter} />
      )}
      {!filters.search && !filters.category && !filters.featured && <AboutSection />}
      
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <BlogGrid 
              searchQuery={filters.search}
              categoryFilter={filters.category}
              featuredOnly={filters.featured}
            />
          </div>
          
          {/* Sidebar */}
          <div className="mt-16 lg:mt-0 lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
      
      <Newsletter />
      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
    </>
  );
};

function App() {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Check admin authentication on component mount
  React.useEffect(() => {
    setIsAdminMode(isAdminAuthenticated());
  }, []);

  // Admin access shortcut (Ctrl+Shift+A) - Only for development
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only enable admin shortcut in development mode
      if (e.ctrlKey && e.shiftKey && e.key === 'A' && import.meta.env.DEV) {
        if (isAdminAuthenticated()) {
          setIsAdminMode(!isAdminMode);
        } else {
          setShowAdminLogin(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isAdminMode]);

  const handleAdminLogin = (success: boolean) => {
    if (success) {
      setIsAdminMode(true);
      setShowAdminLogin(false);
    }
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    sessionStorage.removeItem('adminLoginTime');
    setIsAdminMode(false);
  };

  // Show admin login screen
  if (showAdminLogin) {
    return (
      <Router>
        <AdminLogin onLogin={handleAdminLogin} />
      </Router>
    );
  }

  // Show admin dashboard
  if (isAdminMode) {
    return (
      <Router>
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setIsAdminMode(false)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
          >
            Back to Site
          </button>
          <button
            onClick={handleAdminLogout}
            className="ml-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
        <AdminDashboard />
      </Router>
    );
  }

  // Show main website
  return (
    <Router>
      <div className="min-h-screen bg-gray-800">
        <Header onSearch={(query) => {
          const newUrl = `/?search=${encodeURIComponent(query)}`;
          window.location.href = newUrl;
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
        </Routes>
        
        <Footer />
        
        {/* Admin Access Hint - Only show in development mode */}
        {import.meta.env.DEV && !isAdminAuthenticated() && (
          <div className="fixed bottom-4 right-4 text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
            Ctrl+Shift+A for admin
          </div>
        )}
        
        {/* Admin Mode Indicator - Only show in development mode */}
        {import.meta.env.DEV && isAdminAuthenticated() && (
          <div className="fixed bottom-4 right-4 text-xs text-cyan-400 bg-gray-800 px-2 py-1 rounded border border-cyan-400">
            Admin authenticated - Ctrl+Shift+A for dashboard
          </div>
        )}
        </div>
    </Router>
  );
}

export default App;