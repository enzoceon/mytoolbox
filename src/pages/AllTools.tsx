
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  FileImage, FileText, Video, Music, 
  File, Clock, Camera, Calendar, 
  Code, Search, Type, BarChart, 
  QrCode, Edit, Palette, Lock
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import AdPlacement from '@/components/AdPlacement';

// Define tool types
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
}

const AllTools = () => {
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

  // Define all tools
  const tools: Tool[] = [
    {
      id: 'image-to-pdf',
      name: 'Image to PDF',
      description: 'Convert JPG, PNG and other image formats to PDF',
      icon: <FileImage className="h-6 w-6 text-blue-500" />,
      path: '/converter',
      category: 'Image',
      popular: true,
    },
    {
      id: 'pdf-to-image',
      name: 'PDF to Image',
      description: 'Extract images from PDF files in high quality',
      icon: <FileImage className="h-6 w-6 text-blue-500" />,
      path: '/tools',
      category: 'Document',
    },
    {
      id: 'jpg-to-png',
      name: 'JPG to PNG',
      description: 'Convert JPG images to PNG format with transparency',
      icon: <FileImage className="h-6 w-6 text-blue-500" />,
      path: '/tools',
      category: 'Image',
    },
    {
      id: 'image-compressor',
      name: 'Image Compressor',
      description: 'Reduce image file size without losing quality',
      icon: <FileImage className="h-6 w-6 text-blue-500" />,
      path: '/tools',
      category: 'Image',
    },
    {
      id: 'video-compressor',
      name: 'Video Compressor',
      description: 'Reduce video file size while maintaining quality',
      icon: <Video className="h-6 w-6 text-purple-500" />,
      path: '/tools',
      category: 'Video',
      popular: true,
    },
    {
      id: 'video-converter',
      name: 'Video Converter',
      description: 'Convert videos between popular formats (MP4, AVI, etc.)',
      icon: <Video className="h-6 w-6 text-purple-500" />,
      path: '/tools',
      category: 'Video',
    },
    {
      id: 'audio-converter',
      name: 'Audio Converter',
      description: 'Convert audio files between various formats',
      icon: <Music className="h-6 w-6 text-red-500" />,
      path: '/tools',
      category: 'Audio',
    },
    {
      id: 'audio-compressor',
      name: 'Audio Compressor',
      description: 'Reduce audio file size with minimal quality loss',
      icon: <Music className="h-6 w-6 text-red-500" />,
      path: '/tools',
      category: 'Audio',
    },
    {
      id: 'audio-trimmer',
      name: 'Audio Trimmer',
      description: 'Cut and trim audio files to your desired length',
      icon: <Music className="h-6 w-6 text-red-500" />,
      path: '/tools',
      category: 'Audio',
    },
    {
      id: 'pdf-compressor',
      name: 'PDF Compressor',
      description: 'Reduce PDF file size without losing quality',
      icon: <FileText className="h-6 w-6 text-green-500" />,
      path: '/tools',
      category: 'Document',
    },
    {
      id: 'pdf-merger',
      name: 'PDF Merger',
      description: 'Combine multiple PDF files into a single document',
      icon: <FileText className="h-6 w-6 text-green-500" />,
      path: '/tools',
      category: 'Document',
      popular: true,
    },
    {
      id: 'pdf-splitter',
      name: 'PDF Splitter',
      description: 'Split PDF files into separate pages or sections',
      icon: <FileText className="h-6 w-6 text-green-500" />,
      path: '/tools',
      category: 'Document',
    },
    {
      id: 'html-to-pdf',
      name: 'HTML to PDF',
      description: 'Convert webpage or HTML code to PDF document',
      icon: <Code className="h-6 w-6 text-yellow-500" />,
      path: '/tools',
      category: 'Document',
    },
    {
      id: 'ocr-tool',
      name: 'OCR Tool',
      description: 'Extract text from images and scanned documents',
      icon: <Type className="h-6 w-6 text-orange-500" />,
      path: '/tools',
      category: 'Text',
    },
    {
      id: 'qr-generator',
      name: 'QR Code Generator',
      description: 'Create custom QR codes for URLs and text',
      icon: <QrCode className="h-6 w-6 text-gray-500" />,
      path: '/tools',
      category: 'Utility',
    },
    {
      id: 'text-editor',
      name: 'Text Editor',
      description: 'Simple text editor with formatting options',
      icon: <Edit className="h-6 w-6 text-blue-500" />,
      path: '/tools',
      category: 'Text',
    },
    {
      id: 'color-picker',
      name: 'Color Picker',
      description: 'Select and extract colors from images',
      icon: <Palette className="h-6 w-6 text-pink-500" />,
      path: '/tools',
      category: 'Utility',
    },
    {
      id: 'password-generator',
      name: 'Password Generator',
      description: 'Generate strong, secure passwords',
      icon: <Lock className="h-6 w-6 text-gray-500" />,
      path: '/tools',
      category: 'Utility',
      popular: true,
    },
    {
      id: 'countdown-timer',
      name: 'Countdown Timer',
      description: 'Create countdown timers for events and deadlines',
      icon: <Clock className="h-6 w-6 text-blue-500" />,
      path: '/tools',
      category: 'Utility',
    },
    {
      id: 'text-to-speech',
      name: 'Text to Speech',
      description: 'Convert text to natural-sounding speech',
      icon: <Music className="h-6 w-6 text-purple-500" />,
      path: '/tools',
      category: 'Text',
    },
  ];

  // Filter tools based on search query and active category
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories: ToolCategory[] = ['All', 'Image', 'Document', 'Video', 'Audio', 'Text', 'Utility'];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>All Tools - EveryTools | Browse Our Free Online Tools</title>
        <meta name="description" content="Browse our complete collection of free online tools. Converters, compressors, generators and more - all free and with no registration required." />
        <link rel="canonical" href="https://everytools.site/tools" />
      </Helmet>
      
      <BackgroundAnimation />
      <Header />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
        <section className="mb-10 text-center animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            All <span className="bg-gradient-primary bg-clip-text text-transparent">Tools</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our complete collection of free online tools to make your digital tasks easier.
          </p>
        </section>
        
        {/* Search and Filters */}
        <section className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <div className="w-full md:w-1/2">
              <Input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex flex-wrap gap-2 w-full md:w-1/2 justify-center md:justify-end">
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
        </section>
        
        {/* AdSense placement */}
        <AdPlacement 
          format="horizontal" 
          contentLoaded={hasUserInteracted} 
        />
        
        {/* Popular Tools */}
        {activeCategory === 'All' && searchQuery === '' && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Popular Tools</h2>
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent flex-grow mx-4"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.filter(tool => tool.popular).map(tool => (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="glass-card p-6 rounded-xl hover:shadow-lg transition-all hover:scale-105 flex flex-col h-full"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                      {tool.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{tool.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">{tool.description}</p>
                  <Button size="sm" className="self-start">Use Tool</Button>
                </Link>
              ))}
            </div>
          </section>
        )}
        
        {/* All Tools List */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {activeCategory !== 'All' ? `${activeCategory} Tools` : 'All Tools'}
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent flex-grow mx-4"></div>
          </div>
          
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.map(tool => (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="glass-card p-4 rounded-xl hover:shadow-lg transition-all hover:bg-background/90 flex items-start"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3 shrink-0">
                    {tool.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-1">{tool.name}</h3>
                    <p className="text-xs text-muted-foreground">{tool.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg text-muted-foreground">No tools found matching your search criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </section>
        
        {/* Bottom Ad */}
        <AdPlacement 
          format="rectangle" 
          className="mt-10" 
          contentLoaded={hasUserInteracted} 
        />
        
        {/* CTA Section */}
        <section className="mt-16 glass-card rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Can't find what you need?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            We're constantly adding new tools based on user feedback. Let us know what tool you'd like to see next!
          </p>
          <Link to="/contact">
            <Button className="bg-gradient-primary hover:shadow-lg transition-shadow">
              Suggest a Tool
            </Button>
          </Link>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AllTools;
