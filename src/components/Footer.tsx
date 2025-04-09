
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail, Instagram, Twitter, Youtube, Facebook } from 'lucide-react';
import TikTokIcon from './icons/TikTokIcon';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <footer className="w-full py-8 px-6 md:px-10 mt-10 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent">MyToolbox</h3>
            <p className="text-sm text-muted-foreground">
              Your one-stop destination for free, powerful online tools. 
              Fast. Free. Fluid.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <div 
                className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white hover:opacity-90 transition-opacity cursor-pointer"
                aria-label="YouTube"
              >
                <Youtube size={16} />
              </div>
              <div 
                className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white hover:opacity-90 transition-opacity cursor-pointer"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </div>
              <div 
                className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white hover:opacity-90 transition-opacity cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </div>
              <div 
                className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white hover:opacity-90 transition-opacity cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </div>
              <div 
                className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white hover:opacity-90 transition-opacity cursor-pointer"
                aria-label="TikTok"
              >
                <TikTokIcon size={16} />
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  All Tools
                </Link>
              </li>
              <li>
                <Link to="/how-to-use" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  How to Use
                </Link>
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
          
          {/* Legal section */}
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
              <li>
                <Link to="/refund" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Subscribe newsletter section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Subscribe</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter to receive updates and tips about our tools.
            </p>
            <form onSubmit={handleSubmit} className="mt-2 space-y-3">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="pr-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
                <Mail className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground pointer-events-none" />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-primary text-white hover:opacity-90 transition-opacity"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-200 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} MyToolbox. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
