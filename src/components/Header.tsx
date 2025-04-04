
import React from 'react';
import { FileImage } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="w-full py-4 px-6 sm:px-10 flex justify-between items-center animate-fade-in">
      <div className="flex items-center space-x-2">
        <FileImage className="h-8 w-8 text-indigo-500" />
        <div>
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Image2PDF
          </h1>
          <p className="text-xs text-muted-foreground">
            Fast. Free. Beautiful.
          </p>
        </div>
      </div>
      
      <nav className="flex items-center space-x-6">
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </a>
          <a href="#how-to-use" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            How to Use
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
        </div>
        
        <ThemeToggle />
        
        <button className="md:hidden text-muted-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </header>
  );
};

export default Header;
