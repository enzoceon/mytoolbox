
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Search 
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FeaturesSection from '@/components/sections/FeaturesSection';
import WhyChooseSection from '@/components/sections/WhyChooseSection';
import FaqSection from '@/components/sections/FaqSection';
import AdPlacement from '@/components/AdPlacement';

// Define tool categories
type ToolCategory = 
  | 'All'
  | 'Image'
  | 'Document'
  | 'Video'
  | 'Audio'
  | 'Text'
  | 'Utility';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('All');
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const navigate = useNavigate();
  
  // Track user interaction for AdSense
  React.useEffect(() => {
    const handleInteraction = () => {
      setHasUserInteracted(true);
    };

    // Listen for user interaction events
    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('keydown', handleInteraction, { once: true });
    document.addEventListener('scroll', handleInteraction, { once: true });
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };
  }, []);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tools?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Define tool categories
  const categories: ToolCategory[] = ['All', 'Image', 'Document', 'Video', 'Audio', 'Text', 'Utility'];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>EveryTools - Free Online Tools For Everyone | No Registration Required</title>
        <meta name="description" content="Access free online tools for file conversion, editing, and much more. No registration, no watermarks, no file size limits. Fast. Free. Fluid." />
        <link rel="canonical" href="https://everytools.site/" />
      </Helmet>
      
      <BackgroundAnimation />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 mx-auto">
            <div className="text-center mx-auto max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
                The <span className="bg-gradient-primary bg-clip-text text-transparent">Digital Toolbox</span> For Everyone
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Dozens of powerful online tools to make your digital life easier. Convert, edit, and transform files with no registration required.
              </p>
              
              {/* Search and Filters */}
              <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-center justify-center">
                  <div className="w-full md:w-1/2 relative">
                    <div className="relative rounded-md overflow-hidden">
                      <Input
                        type="text"
                        placeholder="Search tools..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-transparent pl-10"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  <Button type="submit" size="lg" className="w-full md:w-auto bg-gradient-primary hover:shadow-lg transition-shadow">
                    Find Tools <Search className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </div>
              
              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2 w-full justify-center animate-fade-in mb-8" style={{ animationDelay: "0.4s" }}>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                    className={activeCategory === category ? "bg-gradient-primary" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              
              {/* Can't find what you need box */}
              <div className="max-w-lg mx-auto mt-12 p-6 glass-card animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <h3 className="text-xl font-semibold mb-3">Can't find what you need?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Check out our complete tools collection or contact us to suggest a new tool.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link to="/tools">
                    <Button variant="outline" size="sm">
                      Browse All Tools
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" size="sm">
                      Suggest a Tool
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AdSense placement */}
        <AdPlacement 
          format="horizontal" 
          contentLoaded={hasUserInteracted} 
        />
        
        {/* Key Features Section */}
        <FeaturesSection />
        
        {/* How It Works Section */}
        <section id="how-to-use" className="py-16 bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Using EveryTools is simple and straightforward. Follow these three easy steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-8 rounded-xl text-center relative hover:shadow-lg transition-shadow">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                  <ArrowRight className="h-8 w-8 text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Choose Your Tool</h3>
                <p className="text-sm text-muted-foreground">
                  Browse our collection of tools and select the one you need for your task.
                </p>
              </div>
              
              <div className="glass-card p-8 rounded-xl text-center relative hover:shadow-lg transition-shadow">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                  <ArrowRight className="h-8 w-8 text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Upload Your Files</h3>
                <p className="text-sm text-muted-foreground">
                  Drag and drop your files or click to browse and select from your device.
                </p>
              </div>
              
              <div className="glass-card p-8 rounded-xl text-center relative hover:shadow-lg transition-shadow">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                  <ArrowRight className="h-8 w-8 text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Get Results</h3>
                <p className="text-sm text-muted-foreground">
                  Process your files and download the results with a single click.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Choose Section */}
        <WhyChooseSection />
        
        {/* FAQ Section */}
        <FaqSection />
        
        {/* Bottom Ad */}
        <AdPlacement 
          format="rectangle" 
          className="mt-10" 
          contentLoaded={hasUserInteracted} 
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
