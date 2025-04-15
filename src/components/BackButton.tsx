
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleBack = () => {
    // Check if there's a category in sessionStorage
    const lastCategory = sessionStorage.getItem('lastToolCategory');
    
    if (lastCategory) {
      // Navigate back to the tools page with the last category
      navigate(`/tools?category=${lastCategory}`);
    } else {
      // Fallback to the general tools page
      navigate('/tools');
    }
    
    // Ensure we're at the top of the page
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="mb-6 inline-block hidden sm:block md:block lg:block xl:block">
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
