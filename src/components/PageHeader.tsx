
import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  accentWord?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description,
  accentWord
}) => {
  // If accentWord is provided, split the title to highlight that word
  const renderTitle = () => {
    if (!accentWord) {
      return <span>{title}</span>;
    }
    
    const parts = title.split(accentWord);
    
    return (
      <>
        <span className="text-white">{parts[0]}</span>
        <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">{accentWord}</span>
        <span className="text-white">{parts[1]}</span>
      </>
    );
  };
  
  return (
    <div className="text-center mb-10 animate-fade-in">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
        {renderTitle()}
      </h1>
      {description && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
