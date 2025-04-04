
import React from 'react';
import { FileImage } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { scrollToElement } from '@/utils/scrollUtils';

const Header = () => {
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
    <header className="w-full py-4 px-6 sm:px-10 flex justify-between items-center animate-fade-in sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="flex items-center space-x-2">
        <Link to="/" className="flex items-center space-x-2">
          <FileImage className="h-8 w-8 text-indigo-500" />
          <div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Image2PDF
            </h1>
            <p className="text-xs text-muted-foreground">
              Fast. Free. Beautiful.
            </p>
          </div>
        </Link>
      </div>
      
      <nav className="flex items-center space-x-6">
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <a 
            href="/#how-to-use" 
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
        
        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Header;
