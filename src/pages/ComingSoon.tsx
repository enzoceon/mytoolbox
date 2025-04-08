
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import SEOMetadata from '@/components/SEO/SEOMetadata';

const ComingSoon: React.FC = () => {
  return (
    <>
      <SEOMetadata />
      <BackgroundAnimation />
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center relative z-10">
        <div className="max-w-md mx-auto">
          <div className="mb-8 w-24 h-24 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
            <Clock className="w-12 h-12 text-accent" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4 text-foreground">Coming Soon</h1>
          
          <p className="text-muted-foreground mb-6">
            This exciting feature is currently under development. 
            We're working hard to bring you an amazing AI Image Generator tool 
            that will transform your creative process.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link to="/tools">
              <Button variant="outline" className="px-6 py-3">
                Back to Tools
              </Button>
            </Link>
            
            <Button 
              variant="default" 
              className="px-6 py-3"
              onClick={() => {
                window.open('https://discord.com/invite/mytoolbox', '_blank');
              }}
            >
              Join Discord for Updates
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;

