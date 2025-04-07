import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  FileImage, FileText, Video, Music, 
  File, Clock, Camera, Calendar, 
  Code, Search, Type, BarChart, 
  QrCode, Edit, Palette, Lock,
  Check, Shield, ArrowRight, 
  Sparkles, Brain, MessageSquare, Bot,
  Scissors, Minimize2, FilePlus, Volume2,
  Video as VideoIcon, FileX, Trash, Download,
  Upload, Unlock, Eye, EyeOff, Share,
  Image, Plus, Headphones, Crop
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
  | 'AI'
  | 'QR Code';

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
      description: 'Convert JPG, PNG and other image formats to high-quality PDF documents in seconds.',
      icon: <FileImage className="h-6 w-6 text-blue-500" />,
      path: '/converter',
      category: 'Image',
      popular: true,
      available: true,
    },
    {
      id: 'pdf-to-image',
      name: 'PDF to Image',
      description: 'Extract high-resolution images from PDF files with precise quality control.',
      icon: <FileImage className="h-6 w-6 text-blue-500" />,
      path: '/pdf-to-image',
      category: 'Document',
      popular: true,
      available: true,
    },
    {
      id: 'jpg-to-png',
      name: 'JPG to PNG',
      description: 'Transform your JPG images to PNG format with transparency support and lossless quality.',
      icon: <FileImage className="h-6 w-6 text-blue-500" />,
      path: '/jpg-to-png',
      category: 'Image',
      available: true,
    },
    {
      id: 'image-compressor',
      name: 'Image Compressor',
      description: 'Optimize your images by reducing file size while maintaining visual quality.',
      icon: <FileImage className="h-6 w-6 text-blue-500" />,
      path: '/image-compressor',
      category: 'Image',
      available: true,
    },
    {
      id: 'video-compressor',
      name: 'Video Compressor',
      description: 'Compress videos for easier sharing while preserving quality and resolution.',
      icon: <Video className="h-6 w-6 text-purple-500" />,
      path: '/tools',
      category: 'Video',
      popular: true,
    },
    {
      id: 'audio-trimmer',
      name: 'Audio Trimmer',
      description: 'Precisely cut and edit audio files to your desired length with waveform visualization.',
      icon: <Scissors className="h-6 w-6 text-red-500" />,
      path: '/audio-trimmer',
      category: 'Audio',
      available: true,
    },
    {
      id: 'pdf-compressor',
      name: 'PDF Compressor',
      description: 'Reduce PDF file size significantly while maintaining document quality and formatting.',
      icon: <Minimize2 className="h-6 w-6 text-green-500" />,
      path: '/pdf-compressor',
      category: 'Document',
      available: true,
    },
    {
      id: 'pdf-merger',
      name: 'PDF Merger',
      description: 'Seamlessly combine multiple PDF files into a single organized document with custom ordering.',
      icon: <FilePlus className="h-6 w-6 text-green-500" />,
      path: '/pdf-merger',
      category: 'Document',
      popular: true,
      available: true,
    },
    {
      id: 'pdf-splitter',
      name: 'PDF Splitter',
      description: 'Extract specific pages or split PDF files into multiple documents with precise control.',
      icon: <Scissors className="h-6 w-6 text-green-500" />,
      path: '/pdf-splitter',
      category: 'Document',
      available: true,
    },
    {
      id: 'html-to-pdf',
      name: 'HTML to PDF',
      description: 'Convert HTML code or web pages to professionally formatted PDF documents with customizable options.',
      icon: <Code className="h-6 w-6 text-yellow-500" />,
      path: '/html-to-pdf',
      category: 'Document',
      available: true,
    },
    {
      id: 'ocr-tool',
      name: 'OCR Tool',
      description: 'Extract and digitize text from images and scanned documents with high accuracy recognition.',
      icon: <Type className="h-6 w-6 text-orange-500" />,
      path: '/ocr-tool',
      category: 'Text',
      available: true,
    },
    {
      id: 'qr-generator',
      name: 'QR Code Generator',
      description: 'Create customizable QR codes for websites, text, and contact info with color and size options.',
      icon: <QrCode className="h-6 w-6 text-gray-500" />,
      path: '/qr-code-generator',
      category: 'QR Code',
      available: true,
    },
    {
      id: 'text-editor',
      name: 'Text Editor',
      description: 'Edit and format text with rich formatting tools, spell-checking, and export capabilities.',
      icon: <Edit className="h-6 w-6 text-blue-500" />,
      path: '/text-editor',
      category: 'Text',
      available: true,
    },
    {
      id: 'color-picker',
      name: 'Color Picker',
      description: 'Extract precise color codes from images with eyedropper tool and color palette generation.',
      icon: <Palette className="h-6 w-6 text-pink-500" />,
      path: '/color-picker',
      category: 'Text',
      available: true,
    },
    {
      id: 'password-generator',
      name: 'Password Generator',
      description: 'Create strong, secure passwords with customizable length and character combinations.',
      icon: <Lock className="h-6 w-6 text-gray-500" />,
      path: '/password-generator',
      category: 'Text',
      popular: true,
      available: true,
    },
    {
      id: 'countdown-timer',
      name: 'Countdown Timer',
      description: 'Create customizable countdown timers for events with shareable links and notifications.',
      icon: <Clock className="h-6 w-6 text-blue-500" />,
      path: '/countdown-timer',
      category: 'Text',
      available: true,
    },
    {
      id: 'text-to-speech',
      name: 'Text to Speech',
      description: 'Convert text to natural-sounding speech with multiple voices, languages, and export options.',
      icon: <Volume2 className="h-6 w-6 text-purple-500" />,
      path: '/text-to-speech',
      category: 'Text',
      available: true,
    },
    {
      id: 'ai-text-generator',
      name: 'AI Text Generator',
      description: 'Create high-quality content, essays, and creative writing with advanced AI assistance.',
      icon: <Sparkles className="h-6 w-6 text-purple-500" />,
      path: '/tools',
      category: 'AI',
      popular: true,
    },
    {
      id: 'ai-image-generator',
      name: 'AI Image Generator',
      description: 'Transform text descriptions into unique, custom images with cutting-edge AI technology.',
      icon: <Brain className="h-6 w-6 text-blue-500" />,
      path: '/tools',
      category: 'AI',
      popular: true,
    },
    {
      id: 'ai-chatbot',
      name: 'AI Chatbot Assistant',
      description: 'Get instant answers and assistance for any question through an intelligent AI conversation.',
      icon: <MessageSquare className="h-6 w-6 text-green-500" />,
      path: '/tools',
      category: 'AI',
      popular: true,
    },
    {
      id: 'ai-content-summarizer',
      name: 'AI Content Summarizer',
      description: 'Automatically condense long articles and documents into concise, accurate summaries.',
      icon: <Bot className="h-6 w-6 text-orange-500" />,
      path: '/ai-content-summarizer',
      category: 'AI',
      available: true,
    },
    {
      id: 'image-to-qr-code-generator',
      name: 'Image to QR Code',
      description: 'Convert images into scannable QR codes for easy sharing and storing visual content.',
      icon: <QrCode className="h-6 w-6 text-blue-500" />,
      path: '/tools',
      category: 'QR Code',
      available: false,
    },
    {
      id: 'video-to-qr-code-generator',
      name: 'Video to QR Code',
      description: 'Generate QR codes that link to your video content for convenient mobile access.',
      icon: <QrCode className="h-6 w-6 text-purple-500" />,
      path: '/tools',
      category: 'QR Code',
      available: false,
    },
    {
      id: 'video-compressor',
      name: 'Video Compressor',
      description: 'Reduce video file size while maintaining optimal quality for easier sharing and storage.',
      icon: <Minimize2 className="h-6 w-6 text-blue-500" />,
      path: '/tools',
      category: 'Video',
      available: false,
    },
    {
      id: 'pdf-watermark',
      name: 'PDF Watermark',
      description: 'Add custom text or image watermarks to protect and brand your PDF documents.',
      icon: <FileText className="h-6 w-6 text-orange-500" />,
      path: '/tools',
      category: 'Document',
      available: false,
    },
    {
      id: 'pdf-locker',
      name: 'PDF Locker',
      description: 'Secure your PDF files with password protection to control access to sensitive information.',
      icon: <Lock className="h-6 w-6 text-red-500" />,
      path: '/tools',
      category: 'Document',
      available: false,
    },
    {
      id: 'audio-extractor',
      name: 'Audio Extractor',
      description: 'Extract audio tracks from video files in various formats with quality preservation.',
      icon: <Headphones className="h-6 w-6 text-green-500" />,
      path: '/tools',
      category: 'Audio',
      available: false,
    },
    {
      id: 'gif-to-video',
      name: 'GIF to Video',
      description: 'Convert animated GIFs to video formats for broader compatibility and playback options.',
      icon: <VideoIcon className="h-6 w-6 text-purple-500" />,
      path: '/tools',
      category: 'Video',
      available: false,
    },
    {
      id: 'video-audio-remover',
      name: 'Video Audio Remover',
      description: 'Remove audio tracks from videos to create silent videos for specific use cases.',
      icon: <VideoIcon className="h-6 w-6 text-gray-500" />,
      path: '/tools',
      category: 'Video',
      available: false,
    },
    {
      id: 'add-audio-to-video',
      name: 'Add Audio to Video',
      description: 'Merge audio files with videos to create customized audio-visual content.',
      icon: <Plus className="h-6 w-6 text-blue-500" />,
      path: '/tools',
      category: 'Video',
      available: false,
    },
    {
      id: 'image-background-remover',
      name: 'Background Remover',
      description: 'Automatically remove backgrounds from images with AI-powered precision.',
      icon: <Crop className="h-6 w-6 text-purple-500" />,
      path: '/tools',
      category: 'Image',
      available: false,
      popular: true,
    },
    {
      id: 'pdf-password-remover',
      name: 'PDF Password Remover',
      description: 'Remove passwords from PDF files you have authorized access to for easier handling.',
      icon: <Unlock className="h-6 w-6 text-green-500" />,
      path: '/tools',
      category: 'Document',
      available: false,
    },
    {
      id: 'pdf-to-qr-code',
      name: 'PDF to QR Code',
      description: 'Convert PDF documents into QR codes for quick document access and sharing.',
      icon: <QrCode className="h-6 w-6 text-orange-500" />,
      path: '/tools',
      category: 'QR Code',
      available: false,
    },
    {
      id: 'audio-to-qr-code',
      name: 'Audio to QR Code',
      description: 'Transform audio files into QR codes that link to your sound content.',
      icon: <QrCode className="h-6 w-6 text-yellow-500" />,
      path: '/tools',
      category: 'QR Code',
      available: false,
    },
    {
      id: 'qr-code-scanner',
      name: 'QR Code Scanner',
      description: 'Scan and decode QR codes directly from your browser using your device camera.',
      icon: <Search className="h-6 w-6 text-blue-500" />,
      path: '/tools',
      category: 'QR Code',
      available: false,
      popular: true,
    },
    {
      id: 'qr-code-styler',
      name: 'QR Code Styler',
      description: 'Create custom-designed QR codes with colors, logos, and shapes while maintaining scannability.',
      icon: <Palette className="h-6 w-6 text-pink-500" />,
      path: '/tools',
      category: 'QR Code',
      available: false,
    },
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories: ToolCategory[] = ['All', 'Image', 'Document', 'Video', 'Audio', 'Text', 'AI', 'QR Code'];

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
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        type="text"
                        placeholder="Search tools..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border-0 pl-11 bg-transparent focus-visible:ring-0 focus-visible:ring-transparent galaxy-input"
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
