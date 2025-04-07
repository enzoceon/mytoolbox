import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  FileImage, FileText, Video, Music, 
  File, Clock, Camera, Calendar, 
  Code, Search, Type, BarChart, 
  QrCode, Edit, Palette, Lock,
  Check, Shield, ArrowRight, 
  Sparkles, Brain, MessageSquare, Bot
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect, useRef } from 'react';
import AdPlacement from '@/components/AdPlacement';
import FeaturesSection from '@/components/sections/FeaturesSection';
import WhyChooseSection from '@/components/sections/WhyChooseSection';
import FaqSection from '@/components/sections/FaqSection';

type ToolCategory = 
  | 'All'
  | 'Image'
  | 'Document'
  | 'Video'
  | 'Audio'
  | 'Text'
  | 'Utility'
  | 'AI';

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

const AllTools = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('All');
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      setHasUserInteracted(true);
    };

    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('keydown', handleInteraction, { once: true });
    document.addEventListener('scroll', handleInteraction, { once: true });
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };
  }, []);

  const tools: Tool[] = [
    {
      id: 'image-to-pdf',
      name: 'Image to PDF',
      description: 'Convert JPG, PNG and other image formats to PDF',
      icon: <FileImage className="h-6 w-6 text-blue-500" />,
      path: '/converter',
      category: 'Image',
      popular: true,
      available: true,
    },
    {
      id: 'pdf-to-image',
      name: 'PDF to Image',
      description: 'Extract images from PDF files in high quality',
      icon: <FileImage className="h-6 w-6 text-blue-500" />,
      path: '/pdf-to-image',
      category: 'Document',
      popular: true,
      available: true,
    },
    {
      id: 'jpg-to-png',
      name: 'JPG to PNG',
      description: 'Convert JPG images to PNG format with transparency',
      icon: <FileImage className="h-6 w-6 text-blue-500" />,
      path: '/jpg-to-png',
      category: 'Image',
      available: true,
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
      path: '/qr-code-generator',
      category: 'Utility',
      available: true,
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
    {
      id: 'ai-text-generator',
      name: 'AI Text Generator',
      description: 'Generate creative text content using advanced AI',
      icon: <Sparkles className="h-6 w-6 text-purple-500" />,
      path: '/tools',
      category: 'AI',
      popular: true,
    },
    {
      id: 'ai-image-generator',
      name: 'AI Image Generator',
      description: 'Create stunning images from text descriptions',
      icon: <Brain className="h-6 w-6 text-blue-500" />,
      path: '/tools',
      category: 'AI',
      popular: true,
    },
    {
      id: 'ai-chatbot',
      name: 'AI Chatbot Assistant',
      description: 'Get answers and assistance from an AI-powered chatbot',
      icon: <MessageSquare className="h-6 w-6 text-green-500" />,
      path: '/tools',
      category: 'AI',
      popular: true,
    },
    {
      id: 'ai-content-summarizer',
      name: 'AI Content Summarizer',
      description: 'Automatically summarize long articles and documents',
      icon: <Bot className="h-6 w-6 text-orange-500" />,
      path: '/tools',
      category: 'AI',
    },
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories: ToolCategory[] = ['All', 'Image', 'Document', 'Video', 'Audio', 'Text', 'Utility', 'AI'];

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
        <section className="py-16 md:py-24">
          <div className="container px-4 mx-auto">
            <div className="text-center mx-auto max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in glow-text">
                The <span className="bg-gradient-primary bg-clip-text text-transparent">Digital Toolbox</span> For Everyone
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Dozens of powerful online tools to make your digital life easier. Convert, edit, and transform files with no registration required.
              </p>
              
              <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                  <div className="w-full md:w-1/2 relative">
                    <div className="relative rounded-md overflow-hidden cosmic-search">
                      <Input
                        type="text"
                        placeholder="Search tools..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-transparent galaxy-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 w-full justify-center animate-fade-in mb-8" style={{ animationDelay: "0.4s" }}>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                    className={activeCategory === category ? "bg-gradient-primary cosmic-btn" : "cosmic-btn"}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <AdPlacement 
          format="horizontal" 
          contentLoaded={hasUserInteracted} 
        />
        
        <section className="py-12">
          <div className="container px-4 mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold mb-4 glow-text">
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
                    className="glass-card p-4 rounded-xl hover:shadow-lg transition-all hover:bg-background/90 flex items-start feature-card"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3 shrink-0 pulse-icon">
                      {tool.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold mb-1">{tool.name}</h3>
                      <p className="text-xs text-muted-foreground">{tool.description}</p>
                      {tool.available ? 
                        <span className="inline-block text-xs text-green-500 mt-1">Available</span> : 
                        <span className="inline-block text-xs text-orange-500 mt-1">Coming Soon</span>
                      }
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-lg text-muted-foreground">No tools found matching your search criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4 cosmic-btn"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        <FeaturesSection />
        
        <WhyChooseSection />
        
        <FaqSection />
        
        <AdPlacement 
          format="rectangle" 
          className="mt-10" 
          contentLoaded={hasUserInteracted} 
        />
        
        <section className="py-12">
          <div className="container px-4 mx-auto">
            <div className="glass-card rounded-xl p-8 text-center mx-auto max-w-4xl shadow-md">
              <h2 className="text-2xl font-bold mb-4 glow-text">Can't find what you need?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                We're constantly adding new tools based on user feedback. Let us know what tool you'd like to see next!
              </p>
              <Link to="/contact">
                <Button className="bg-gradient-primary hover:shadow-lg transition-shadow cosmic-btn">
                  Suggest a Tool
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AllTools;
