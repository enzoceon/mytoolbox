
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const MobileBackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Only show back button if we're not on the home page
  const shouldShow = location.pathname !== '/' && location.pathname !== '/tools';
  
  const handleBack = () => {
    // Navigate to the tools page directly
    navigate('/tools');
    // Ensure we're at the top of the page
    window.scrollTo(0, 0);
  };
  
  if (!shouldShow || !isMobile) return null;
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="mr-2 p-0 text-white hover:bg-transparent"
      onClick={handleBack}
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
};

export default MobileBackButton;
