
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { saveScrollPosition } from '@/utils/scrollUtils';

const BackButton = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    saveScrollPosition();
    navigate('/tools');
  };
  
  return (
    <div className="mb-6 inline-block">
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
