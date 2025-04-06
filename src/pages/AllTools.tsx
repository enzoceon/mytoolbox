
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import { Search, Image, FileText, Video, Music, File } from 'lucide-react';
import { Input } from '@/components/ui/input';
import AdPlacement from '@/components/AdPlacement';

// Tool type definition
interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  path: string;
  popular?: boolean;
}

// List of tools
const tools: Tool[] = [
  {
    id: 'image-to-pdf',
    name: 'Image to PDF',
    description: 'Convert JPG, PNG, and other image formats to PDF',
    icon: <Image className="h-6 w-6" />,
    category: 'Image',
    path: '/converter',
    popular: true
  },
  {
    id: 'pdf-to-image',
    name: 'PDF to Image',
    description: 'Extract images from PDF files or convert PDF pages to images',
    icon: <FileText className="h-6 w-6" />,
    category: 'PDF',
    path: '/pdf-to-image',
    popular: true
  },
  {
    id: 'video-to-mp4',
    name: 'Video Converter',
    description: 'Convert videos to MP4, AVI, MOV, and other formats',
    icon: <Video className="h-6 w-6" />,
    category: 'Video',
    path: '/tools',
  },
  {
    id: 'video-compressor',
    name: 'Video Compressor',
    description: 'Reduce video file size while maintaining quality',
    icon: <Video className="h-6 w-6" />,
    category: 'Video',
    path: '/tools',
  },
  {
    id: 'audio-converter',
    name: 'Audio Converter',
    description: 'Convert audio files between MP3, WAV, AAC and other formats',
    icon: <Music className="h-6 w-6" />,
    category: 'Audio',
    path: '/tools',
  },
  {
    id: 'audio-compressor',
    name: 'Audio Compressor',
    description: 'Compress audio files to reduce size',
    icon: <Music className="h-6 w-6" />,
    category: 'Audio',
    path: '/tools',
  },
  {
    id: 'text-editor',
    name: 'Text Editor',
    description: 'Edit and format text documents online',
    icon: <File className="h-6 w-6" />,
    category: 'Text',
    path: '/tools',
  },
  {
    id: 'ocr',
    name: 'OCR',
    description: 'Extract text from images and PDFs',
    icon: <File className="h-6 w-6" />,
    category: 'Text',
    path: '/tools',
  },
];

// Categories for filtering
const categories = ['All', 'Image', 'PDF', 'Video', 'Audio', 'Text', 'Utility'];

const AllTools = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [contentLoaded, setContentLoaded] = useState(false);
  
  // Mark content as loaded for ad display
  useEffect(() => {
    setContentLoaded(true);
  }, []);
  
  // Filter tools based on search query and active category
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Get popular tools
  const popularTools = tools.filter(tool => tool.popular);

  return (
    <>
      <Helmet>
        <title>All Tools - EveryTools | Free Online Conversion Tools</title>
        <meta name="description" content="Browse our complete collection of free online tools. Convert, compress, and edit files with no registration required." />
      </Helmet>
      
      <BackgroundAnimation />
      <Header />
      
      <main className="min-h-screen py-8 px-4 max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">All Tools</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our collection of free online tools to help with your everyday tasks.
            No registration required, no watermarks, completely free.
          </p>
        </section>
        
        {/* Search and Filter Section */}
        <section className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-1/2 relative">
              <Input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    activeCategory === category
                      ? 'bg-accent text-white'
                      : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Popular Tools Section */}
        <section className="mb-12 animate-fade-in">
          <h2 className="text-2xl font-bold mb-6">Popular Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.map((tool) => (
              <Link 
                to={tool.path} 
                key={tool.id} 
                className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mr-4">
                    {tool.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Ad Placement */}
        <AdPlacement format="horizontal" contentLoaded={contentLoaded} className="my-8" />
        
        {/* All Tools Section */}
        <section className="animate-fade-in">
          <h2 className="text-2xl font-bold mb-6">All Tools</h2>
          
          {filteredTools.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No tools found matching your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <Link 
                  to={tool.path} 
                  key={tool.id} 
                  className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mr-4">
                      {tool.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{tool.name}</h3>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default AllTools;
