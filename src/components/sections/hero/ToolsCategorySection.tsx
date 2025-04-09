
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface ToolItem {
  path: string;
  icon: React.ReactNode;
  name: string;
  comingSoon?: boolean;
}

interface ToolsCategorySectionProps {
  title: string;
  tools: ToolItem[];
  navigateAction: () => void;
  animationDelay: string;
}

const ToolsCategorySection: React.FC<ToolsCategorySectionProps> = ({
  title,
  tools,
  navigateAction,
  animationDelay
}) => {
  return (
    <div className="mb-10 animate-fade-in" style={{ animationDelay }}>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {tools.map((tool, index) => (
          <Link 
            key={index} 
            to={tool.path} 
            className="glass-card p-4 rounded-lg hover:scale-105 transition-transform"
            style={tool.comingSoon ? { opacity: '0.7' } : undefined}
          >
            {tool.icon}
            <p className="text-sm font-medium">{tool.name}</p>
            {tool.comingSoon && <span className="text-xs text-purple-500">Coming soon</span>}
          </Link>
        ))}
      </div>
      <Button 
        onClick={navigateAction} 
        variant="outline" 
        className="mt-4 pulse-btn w-full sm:w-auto"
      >
        <Sparkles className="mr-2 h-5 w-5 text-yellow-400" />
        Explore All {title}
      </Button>
    </div>
  );
};

export default ToolsCategorySection;
