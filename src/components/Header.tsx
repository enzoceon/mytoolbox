
import React, { useState } from 'react';
import { FileImage, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full py-4 px-6 sm:px-10 flex justify-between items-center animate-fade-in">
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
          <a href="/#how-to-use" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
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
        
        <button 
          className="md:hidden text-muted-foreground hover:text-foreground transition-colors relative z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 transition-transform duration-300 ease-out animate-scale-in" />
          ) : (
            <Menu className="h-6 w-6 transition-transform duration-300 ease-out" />
          )}
        </button>
      </nav>

      {/* Mobile menu with improved animation */}
      <div 
        className={`fixed top-0 right-0 w-full h-screen bg-background/95 backdrop-blur-md z-40 transform transition-all duration-300 ease-in-out md:hidden ${
          mobileMenuOpen 
            ? 'translate-x-0 opacity-100' 
            : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 p-6">
          <Link 
            to="/" 
            className="text-xl font-medium hover:text-primary transition-colors transform hover:scale-105 duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <a 
            href="/#how-to-use" 
            className="text-xl font-medium hover:text-primary transition-colors transform hover:scale-105 duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            How to Use
          </a>
          <Link 
            to="/about" 
            className="text-xl font-medium hover:text-primary transition-colors transform hover:scale-105 duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="text-xl font-medium hover:text-primary transition-colors transform hover:scale-105 duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
