import React, { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, this would send the email to your backend
      console.log('Subscribing email:', email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="bg-gradient-to-r from-cyan-600 to-blue-600 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
          <Mail className="h-8 w-8 text-white" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Never Miss a Mythbust!
        </h2>
        
        <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
          Join 50,000+ truth-seekers and get weekly myth-busting insights delivered straight to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <button
              type="submit"
              disabled={subscribed}
              className="px-6 py-3 bg-white text-cyan-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {subscribed ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  <span>Subscribed!</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Subscribe</span>
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-cyan-200 text-sm mt-4">
          No spam, unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </div>
  );
};