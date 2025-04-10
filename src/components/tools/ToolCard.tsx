
import React from 'react';
import { Link } from 'react-router-dom';
import { saveScrollPosition } from '@/utils/scrollUtils';

export interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  path: string;
  status?: 'new' | 'popular' | 'available' | 'coming-soon';
}

const ToolCard = ({
  icon,
  title,
  description,
  path,
  status = 'available',
}: ToolCardProps) => {
  const handleClick = () => {
    // Save scroll position when navigating from tools page
    saveScrollPosition();
  };

  // Get the appropriate status badge based on the status prop
  const getStatusBadge = () => {
    switch (status) {
      case 'new':
        return (
          <div className="absolute top-4 right-4 bg-green-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
            New
          </div>
        );
      case 'popular':
        return (
          <div className="absolute top-4 right-4 bg-orange-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Popular
          </div>
        );
      case 'coming-soon':
        return (
          <div className="absolute top-4 right-4 bg-blue-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Coming Soon
          </div>
        );
      case 'available':
        return (
          <div className="absolute top-4 right-4 bg-teal-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Available
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Link
      to={path}
      className="relative group h-full"
      onClick={handleClick}
    >
      <div className="p-6 h-full rounded-xl border border-white/10 bg-card hover:bg-accent/5 hover:border-accent/30 transition-colors flex flex-col justify-between shadow-md">
        {getStatusBadge()}
        
        <div className="mb-4">
          <div className="w-12 h-12 bg-[#0c1224] rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
            {icon}
          </div>
          <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-accent transition-colors">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ToolCard;
