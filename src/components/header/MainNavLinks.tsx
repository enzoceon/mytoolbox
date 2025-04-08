
import React from 'react';
import { Link } from 'react-router-dom';

const MainNavLinks = () => {
  return (
    <div className="hidden md:flex items-center space-x-6">
      <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        Home
      </Link>
      <Link to="/tools" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        All Tools
      </Link>
      <Link to="/how-to-use" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        How to Use
      </Link>
      <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        About
      </Link>
      <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        Contact
      </Link>
    </div>
  );
};

export default MainNavLinks;
