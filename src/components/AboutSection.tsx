import React from 'react';
import { Target, Users, Award, Zap, CheckCircle, TrendingUp } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const stats = [
    { icon: Target, label: 'Myths Busted', value: '500+', color: 'text-cyan-400' },
    { icon: Users, label: 'Monthly Readers', value: '1M+', color: 'text-green-400' },
    { icon: Award, label: 'Expert Contributors', value: '50+', color: 'text-blue-400' },
    { icon: TrendingUp, label: 'Accuracy Rate', value: '99%', color: 'text-purple-400' }
  ];

  const values = [
    {
      icon: Target,
      title: 'Scientific Rigor',
      description: 'Every claim is thoroughly researched using peer-reviewed sources and expert analysis.'
    },
    {
      icon: CheckCircle,
      title: 'Fact-Based Truth',
      description: 'We let evidence guide our conclusions, not popular opinion or bias.'
    },
    {
      icon: Users,
      title: 'Expert Network',
      description: 'Our team includes scientists, researchers, and subject matter experts from various fields.'
    },
    {
      icon: Zap,
      title: 'Clear Communication',
      description: 'Complex scientific concepts explained in accessible, engaging language for everyone.'
    }
  ];

  return (
    <div id="about-section" className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About YbyMythbust
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to separate fact from fiction through rigorous scientific analysis. 
            In an age of misinformation, we provide evidence-based truth you can trust.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-2xl p-8 md:p-12 border border-cyan-400/20 mb-16">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-6">Our Mission</h3>
            <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
              In a world where misinformation spreads faster than facts, YbyMythbust stands as a beacon of truth. 
              We combine scientific expertise with clear communication to help people make informed decisions based on 
              evidence, not myths. Every article we publish undergoes rigorous fact-checking and peer review to ensure 
              the highest standards of accuracy and reliability.
            </p>
          </div>
        </div>

        {/* Values */}
        <div>
          <h3 className="text-3xl font-bold text-white text-center mb-12">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-cyan-400 transition-all duration-300 group">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="h-6 w-6 text-cyan-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                      {value.title}
                    </h4>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-white mb-4">Join the Truth-Seeking Community</h3>
          <p className="text-gray-400 mb-8">
            Subscribe to our newsletter and never miss the latest myth-busting insights.
          </p>
          <button 
            onClick={() => {
              const newsletterSection = document.querySelector('[class*="from-cyan-600"]');
              if (newsletterSection) {
                newsletterSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-400 transform hover:scale-105 transition-all duration-200"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
};