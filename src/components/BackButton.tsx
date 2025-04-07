
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BackButton = () => {
  return (
    <Link to="/tools" className="mb-6 inline-block">
      <Button variant="outline" size="sm" className="gap-2 bg-background/80 backdrop-blur-sm border-border/40">
        <ArrowLeft className="h-4 w-4" />
        Back to Tools
      </Button>
    </Link>
  );
};

export default BackButton;
