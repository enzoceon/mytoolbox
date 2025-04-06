
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, FileImage, FileText, Video, Music, 
  Check, Shield, Clock, FileCheck, Search 
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

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  category: Exclude<ToolCategory, 'All'>;
  popular?: boolean;
  available?: boolean;
}

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('All');
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  
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

  // Define popular tools
  const popularTools: Tool[] = [
    {
      id: 'image-to-pdf',
      name: 'Image to PDF',
      description: 'Convert single or multiple images to PDF while preserving quality',
      icon: <FileImage className="h-8 w-8 text-blue-600" />,
      path: '/converter',
      category: 'Image',
      popular: true,
      available: true,
    },
    {
      id: 'pdf-to-image',
      name: 'PDF to Image',
      description: 'Extract images from PDF files in high quality',
      icon: <FileImage className="h-8 w-8 text-blue-500" />,
      path: '/pdf-to-image',
      category: 'Document',
      popular: true,
      available: true,
    },
    {
      id: 'video-compressor',
      name: 'Video Compressor',
      description: 'Reduce video file size while maintaining quality',
      icon: <Video className="h-8 w-8 text-purple-600" />,
      path: '/tools',
      category: 'Video',
      popular: true,
    },
    {
      id: 'pdf-merger',
      name: 'PDF Merger',
      description: 'Combine multiple PDF files into a single document',
      icon: <FileText className="h-8 w-8 text-green-600" />,
      path: '/tools',
      category: 'Document',
      popular: true,
    },
  ];

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
                <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                  <div className="w-full md:w-1/2">
                    <Input
                      type="text"
                      placeholder="Search tools..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Link to="/tools" className="w-full md:w-auto">
                    <Button size="lg" className="w-full md:w-auto bg-gradient-primary hover:shadow-lg transition-shadow">
                      See All Tools <Search className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
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
            </div>
          </div>
        </section>

        {/* AdSense placement */}
        <AdPlacement 
          format="horizontal" 
          contentLoaded={hasUserInteracted} 
        />
        
        {/* Popular Tools */}
        <section className="py-12">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Popular Tools</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover our most-used tools that users love.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularTools.map(tool => (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="glass-card p-6 rounded-xl text-center hover:shadow-lg transition-shadow hover:scale-105"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                    {tool.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {tool.description}
                  </p>
                  <Button size="sm" className={tool.available ? "bg-gradient-primary" : ""}>
                    {tool.available ? 'Use Tool' : 'Coming Soon'}
                  </Button>
                </Link>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/tools">
                <Button size="lg" className="bg-gradient-primary hover:shadow-lg transition-shadow">
                  See All Tools <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
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
                  <Check className="h-8 w-8 text-indigo-500" />
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
                  <FileImage className="h-8 w-8 text-indigo-500" />
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
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-primary text-white">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Simplify Your Digital Life?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Access our complete collection of free online tools now. No registration required!
            </p>
            <Link to="/tools">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Explore All Tools
              </Button>
            </Link>
          </div>
        </section>
        
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
