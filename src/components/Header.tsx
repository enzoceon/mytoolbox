
import React from 'react';
import Logo from './header/Logo';
import MainNavLinks from './header/MainNavLinks';
import MobileMenu from './header/MobileMenu';
import { Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-4 px-6 sm:px-10 flex justify-between items-center animate-fade-in sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center space-x-2">
        <Logo />
      </div>
      
      <nav className="flex items-center space-x-6">
        <MainNavLinks />
        
        <div className="flex items-center space-x-4">
          <MobileMenu icon={<Menu className="h-5 w-5" />} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
