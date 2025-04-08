
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { scrollToElement } from '@/utils/scrollUtils';

const MainNavLinks = () => {
  const location = useLocation();

  const handleHashLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    
    if (location.pathname === '/') {
      // If we're already on the home page, just scroll to the element
      scrollToElement(hash);
    } else {
      // If we're on another page, navigate to home page with hash
      window.location.href = `/#${hash}`;
    }
  };

  return (
    <div className="hidden md:flex items-center space-x-6">
      <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        Home
      </Link>
      <Link to="/tools" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        All Tools
      </Link>
      <a 
        href="#how-to-use" 
        onClick={(e) => handleHashLinkClick(e, 'how-to-use')} 
        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        How to Use
      </a>
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
