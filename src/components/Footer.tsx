
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { scrollToElement } from '@/utils/scrollUtils';

const Footer = () => {
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
    <footer className="w-full py-8 px-6 md:px-10 mt-20 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent">Image2PDF</h3>
            <p className="text-sm text-muted-foreground">
              Convert your images to PDF quickly and easily with our free online tool.
              No installation required. Fast. Free. Beautiful.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a 
                  href="/#how-to-use" 
                  onClick={(e) => handleHashLinkClick(e, 'how-to-use')} 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  How to Use
                </a>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-200 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Image2PDF. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
