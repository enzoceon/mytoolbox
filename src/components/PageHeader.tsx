
import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">{title}</h1>
      {description && (
        <p className="text-muted-foreground max-w-3xl">{description}</p>
      )}
    </div>
  );
};

export default PageHeader;
