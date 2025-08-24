import React from 'react';

interface AdContainerProps {
  size: 'banner' | 'rectangle' | 'leaderboard' | 'sidebar';
  position: string;
  className?: string;
}

export const AdContainer: React.FC<AdContainerProps> = ({ size, position, className = '' }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'banner':
        return 'w-full h-24 max-w-2xl';
      case 'rectangle':
        return 'w-80 h-64';
      case 'leaderboard':
        return 'w-full h-20 max-w-4xl';
      case 'sidebar':
        return 'w-full h-72 max-w-xs';
      default:
        return 'w-full h-24';
    }
  };

  return (
    <div className={`${getSizeClasses()} ${className} relative`}>
      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 flex items-center justify-center group hover:from-gray-700 hover:to-gray-800 transition-all duration-300">
        <div className="text-center text-gray-400 group-hover:text-gray-300">
          <div className="text-xs font-medium mb-1">Advertisement</div>
          <div className="text-2xl opacity-50">📢</div>
          <div className="text-xs opacity-75 mt-1">{size} - {position}</div>
        </div>
        {/* This is where Google AdSense code would go */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500/10 to-green-500/10 transition-opacity duration-300"></div>
      </div>
    </div>
  );
};