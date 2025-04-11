
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BackButton = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    // Navigate to the tools page directly instead of using browser history
    navigate('/tools');
    // Ensure we're at the top of the page
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="mb-6 inline-block hidden sm:block">
      <Button 
        variant="outline" 
        size="sm" 
        className="gap-2 bg-background/80 backdrop-blur-sm border-border/40"
        onClick={handleBack}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Tools
      </Button>
    </div>
  );
};

export default BackButton;
