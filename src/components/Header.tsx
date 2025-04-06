
import React, { useState } from 'react';
import { FileImage, Menu, X, Moon, Sun, FileText, Lock, Unlock, Video, Music, Camera, Folder, File, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { scrollToElement } from '@/utils/scrollUtils';
import {
  Button,
} from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleHashLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    
    if (location.pathname === '/') {
      // If we're already on the home page, just scroll to the element
      scrollToElement(hash);
    } else {
      // If we're on another page, navigate to home page with hash
      window.location.href = `/#${hash}`;
    }
    
    // Close mobile menu if open
    setMobileMenuOpen(false);
  };

  // Menu categories based on the reference image
  const menuCategories = [
    {
      title: "Home",
      icon: <Home className="h-5 w-5" />,
      items: [
        { name: "Home", path: "/" },
      ]
    },
    {
      title: "Photo & Image",
      icon: <FileImage className="h-5 w-5" />,
      items: [
        { name: "Image to PDF", path: "/" },
        { name: "PDF to Image", path: "/" },
      ]
    },
    {
      title: "Video",
      icon: <Video className="h-5 w-5" />,
      items: [
        { name: "Video Converter", path: "/" },
        { name: "Video Compressor", path: "/" },
      ]
    },
    {
      title: "Audio",
      icon: <Music className="h-5 w-5" />,
      items: [
        { name: "Audio Converter", path: "/" },
        { name: "Audio Compressor", path: "/" },
      ]
    },
    {
      title: "PDF",
      icon: <FileText className="h-5 w-5" />,
      items: [
        { name: "Unlock PDF", path: "/" },
        { name: "Protect PDF", path: "/" },
        { name: "HTML to PDF", path: "/" },
      ]
    },
    {
      title: "Text",
      icon: <File className="h-5 w-5" />,
      items: [
        { name: "Text Editor", path: "/" },
        { name: "OCR", path: "/" },
      ]
    },
    {
      title: "Scanner & Camera",
      icon: <Camera className="h-5 w-5" />,
      items: [
        { name: "Scan Document", path: "/" },
        { name: "Camera to PDF", path: "/" },
      ]
    },
    {
      title: "File & Device",
      icon: <Folder className="h-5 w-5" />,
      items: [
        { name: "File Converter", path: "/" },
        { name: "File Compressor", path: "/" },
      ]
    },
  ];

  return (
    <header className="w-full py-4 px-6 sm:px-10 flex justify-between items-center animate-fade-in sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="flex items-center space-x-2">
        <Link to="/" className="flex items-center space-x-2">
          <FileImage className="h-8 w-8 text-indigo-500" />
          <div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Image to PDF
            </h1>
            <p className="text-xs text-muted-foreground">
              Fast. Free. Fluid.
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
        
        <div className="flex items-center space-x-4">
          {/* Moved menu button to the right corner */}
          <ThemeToggle />
          
          <Drawer>
            <DrawerTrigger asChild>
              <button 
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </DrawerTrigger>
            <DrawerContent className="h-[100dvh] p-0">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="font-semibold">Image to PDF</h2>
                  <DrawerClose className="rounded-full p-2 hover:bg-muted">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </DrawerClose>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <div className="py-4">
                    {menuCategories.map((category) => (
                      <div key={category.title} className="px-4 py-3 border-b border-border/40 last:border-0">
                        <div className="flex items-center py-2 text-base font-medium">
                          {category.icon}
                          <span className="ml-3">{category.title}</span>
                        </div>
                        <div className="mt-1 pl-8">
                          {category.items.map((item) => (
                            <DrawerClose asChild key={item.name}>
                              <Link 
                                to={item.path}
                                className="flex py-3 text-sm text-muted-foreground hover:text-foreground"
                              >
                                {item.name}
                              </Link>
                            </DrawerClose>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </header>
  );
};

export default Header;
