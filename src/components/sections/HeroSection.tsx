
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="text-center mb-8 animate-fade-in">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
        Transform Images to <span className="bg-gradient-primary bg-clip-text text-transparent">PDFs</span> in Seconds
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Convert single or multiple images to PDF while preserving exact dimensions and quality. Fast. Free. Fluid. Frequent.
      </p>
    </section>
  );
};

export default HeroSection;
