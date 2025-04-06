
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="text-center mb-8 animate-fade-in">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
        Transform Images to <span className="bg-gradient-primary bg-clip-text text-transparent">PDFs</span> in Seconds
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
        Convert single or multiple images to PDF while preserving exact dimensions and quality. Fast. Free. Fluid.
      </p>
      <div className="flex justify-center">
        <Link to="/converter">
          <Button size="lg" className="bg-gradient-primary hover:shadow-lg transition-shadow">
            Start Converting <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
