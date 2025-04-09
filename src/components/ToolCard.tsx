
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ToolType } from '@/data/tools';

interface ToolCardProps {
  tool: ToolType;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const IconComponent = tool.icon;
  
  // For tools marked as non-functional, render a non-navigable card
  if (tool.path === "/ai-image-generator" || tool.isFunctional === false) {
    return (
      <div onClick={(e) => e.preventDefault()}>
        <Card className="h-full transition-transform hover:scale-105 hover:shadow-lg bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <IconComponent className="h-6 w-6 text-indigo-400" />
              </div>
              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                Coming Soon
              </Badge>
            </div>
            <CardTitle className="text-lg mt-2">{tool.name}</CardTitle>
            <CardDescription>{tool.description}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Existing behavior for other tools
  return (
    <Link to={tool.path}>
      <Card className="h-full transition-transform hover:scale-105 hover:shadow-lg bg-card border-border">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <IconComponent className="h-6 w-6 text-indigo-400" />
            </div>
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
              Available
            </Badge>
          </div>
          <CardTitle className="text-lg mt-2">{tool.name}</CardTitle>
          <CardDescription>{tool.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default ToolCard;
