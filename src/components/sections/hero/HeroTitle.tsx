
import React from 'react';

const HeroTitle: React.FC = () => {
  return (
    <div className="text-center mx-auto max-w-3xl">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-foreground animate-fade-in">
        The <span className="text-purple-500">Digital Toolbox</span> For <span className="text-white">Everyone</span>
      </h1>
      <p className="text-xl md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
        Dozens of powerful online tools to make your digital life easier.
        Convert, edit, and transform files with no registration required.
      </p>
    </div>
  );
};

export default HeroTitle;
