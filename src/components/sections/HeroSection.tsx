import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, Sparkles, Bot, Brain, Zap, MessageSquare, Image, QrCode, DollarSign, Ruler, FileSearch, FileEdit, Archive, AlignJustify, BrainCircuit, Crop, Replace, HandMetal, CloudUpload, ImageOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Define tool categories
type ToolCategory = 
  | 'All'
  | 'Image'
  | 'Document'
  | 'Video'
  | 'Audio'
  | 'Text'
  | 'AI'
  | 'QR Code';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('All');
  const navigate = useNavigate();
  
  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tools?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Define tool categories
  const categories: ToolCategory[] = ['All', 'Image', 'Document', 'Video', 'Audio', 'Text', 'AI', 'QR Code'];

  const navigateToCategory = (category: string) => {
    navigate(`/tools?category=${category.toLowerCase()}`);
  };

  return (
    <section className="py-12 md:py-20">
      <div className="container px-4 mx-auto">
        <div className="text-center mx-auto max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-foreground animate-fade-in">
            The <span className="text-purple-500">Digital Toolbox</span> For <span className="text-white">Everyone</span>
          </h1>
          <p className="text-xl md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Dozens of powerful online tools to make your digital life easier.
            Convert, edit, and transform files with no registration required.
          </p>
          
          {/* Search bar with gradient border */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <div className="w-full relative">
                <div className="rounded-full overflow-hidden p-[2px] bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500">
                  <div className="relative rounded-full overflow-hidden bg-[#0c0d13] flex items-center">
                    <Search className="absolute left-5 text-gray-400 h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Search tools..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full border-0 pl-12 py-6 text-lg bg-transparent focus-visible:ring-0 focus-visible:ring-transparent"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 w-full justify-center animate-fade-in mb-8" style={{ animationDelay: "0.5s" }}>
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={(e) => {
                  setActiveCategory(category);
                  navigateToCategory(category);
                }}
                className={activeCategory === category 
                  ? "bg-purple-600 hover:bg-purple-700" 
                  : "border-gray-700 bg-[#12131a]"}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Converters Section */}
          <div className="mb-10 animate-fade-in" style={{ animationDelay: "0.35s" }}>
            <h2 className="text-xl font-semibold mb-4">Converter Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link to="/image-to-pdf" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform">
                <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Image to PDF</p>
              </Link>
              <Link to="/currency-converter" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform">
                <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Currency Converter</p>
              </Link>
              <Link to="/unit-converter" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform opacity-70">
                <Ruler className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Unit Converter</p>
                <span className="text-xs text-purple-500">Coming soon</span>
              </Link>
              <Link to="/jpg-to-png" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform">
                <Image className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium">JPG to PNG</p>
              </Link>
            </div>
            <Button 
              onClick={(e) => navigateToCategory('converter')} 
              variant="outline" 
              className="mt-4 pulse-btn w-full sm:w-auto"
            >
              <Sparkles className="mr-2 h-5 w-5 text-yellow-400" />
              Explore All Converters
            </Button>
          </div>
          
          {/* File Tools Section */}
          <div className="mb-10 animate-fade-in" style={{ animationDelay: "0.38s" }}>
            <h2 className="text-xl font-semibold mb-4">File Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link to="/file-metadata" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform opacity-70">
                <FileSearch className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-medium">File Metadata Viewer</p>
                <span className="text-xs text-purple-500">Coming soon</span>
              </Link>
              <Link to="/file-rename" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform opacity-70">
                <FileEdit className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <p className="text-sm font-medium">File Rename Tool</p>
                <span className="text-xs text-purple-500">Coming soon</span>
              </Link>
              <Link to="/zip-creator" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform opacity-70">
                <Archive className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                <p className="text-sm font-medium">ZIP File Creator</p>
                <span className="text-xs text-purple-500">Coming soon</span>
              </Link>
              <Link to="/pdf-to-image" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform">
                <Image className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-medium">PDF to Image</p>
              </Link>
            </div>
            <Button 
              onClick={(e) => navigateToCategory('file')} 
              variant="outline" 
              className="mt-4 pulse-btn w-full sm:w-auto"
            >
              <Sparkles className="mr-2 h-5 w-5 text-yellow-400" />
              Explore All File Tools
            </Button>
          </div>
          
          {/* AI Tools Section */}
          <div className="mb-10 animate-fade-in" style={{ animationDelay: "0.38s" }}>
            <h2 className="text-xl font-semibold mb-4">AI Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link to="/ai-text-generator" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform opacity-70">
                <Brain className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Text Generator</p>
                <span className="text-xs text-purple-500">Coming soon</span>
              </Link>
              <Link to="/ai-chatbot" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform opacity-70">
                <Bot className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Chatbot</p>
                <span className="text-xs text-purple-500">Coming soon</span>
              </Link>
              <Link to="/ai-image-generator" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform opacity-70">
                <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Image Generator</p>
                <span className="text-xs text-purple-500">Coming soon</span>
              </Link>
              <Link to="/ai-content-summarizer" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform opacity-70">
                <MessageSquare className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Summarizer</p>
                <span className="text-xs text-purple-500">Coming soon</span>
              </Link>
            </div>
            <Button 
              onClick={(e) => navigateToCategory('AI')} 
              variant="outline" 
              className="mt-4 pulse-btn w-full sm:w-auto"
            >
              <Sparkles className="mr-2 h-5 w-5 text-yellow-400" />
              Explore All AI Tools
            </Button>
          </div>
          
          {/* Text Tools Section */}
          <div className="mb-10 animate-fade-in" style={{ animationDelay: "0.40s" }}>
            <h2 className="text-xl font-semibold mb-4">Text Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link to="/word-counter" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform opacity-70">
                <AlignJustify className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Word Counter</p>
                <span className="text-xs text-purple-500">Coming soon</span>
              </Link>
              <Link to="/text-replacer" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform opacity-70">
                <Replace className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Text Replacer</p>
                <span className="text-xs text-purple-500">Coming soon</span>
              </Link>
              <Link to="/text-to-handwriting" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform opacity-70">
                <HandMetal className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Text to Handwriting</p>
                <span className="text-xs text-purple-500">Coming soon</span>
              </Link>
              <Link to="/text-editor" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform opacity-70">
                <FileEdit className="h-8 w-8 text-indigo-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Text Editor</p>
                <span className="text-xs text-purple-500">Coming soon</span>
              </Link>
            </div>
            <Button 
              onClick={(e) => navigateToCategory('text')} 
              variant="outline" 
              className="mt-4 pulse-btn w-full sm:w-auto"
            >
              <Sparkles className="mr-2 h-5 w-5 text-yellow-400" />
              Explore All Text Tools
            </Button>
          </div>
          
          {/* Image Tools Section */}
          <div className="mb-10 animate-fade-in" style={{ animationDelay: "0.42s" }}>
            <h2 className="text-xl font-semibold mb-4">Image Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link to="/image-cropper" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform opacity-70">
                <Crop className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Image Cropper</p>
                <span className="text-xs text-purple-500">Coming soon</span>
              </Link>
              <Link to="/image-compressor" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform">
                <CloudUpload className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Image Compressor</p>
              </Link>
              <Link to="/background-remover" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform opacity-70">
                <ImageOff className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Background Remover</p>
                <span className="text-xs text-purple-500">Coming soon</span>
              </Link>
              <Link to="/jpg-to-png" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform">
                <Image className="h-8 w-8 text-indigo-500 mx-auto mb-2" />
                <p className="text-sm font-medium">JPG to PNG</p>
              </Link>
            </div>
            <Button 
              onClick={(e) => navigateToCategory('image')} 
              variant="outline" 
              className="mt-4 pulse-btn w-full sm:w-auto"
            >
              <Sparkles className="mr-2 h-5 w-5 text-yellow-400" />
              Explore All Image Tools
            </Button>
          </div>
          
          {/* QR Code Section */}
          <div className="mb-10 animate-fade-in" style={{ animationDelay: "0.44s" }}>
            <h2 className="text-xl font-semibold mb-4">QR Code Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link to="/qr-code-generator" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform">
                <QrCode className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-medium">QR Generator</p>
              </Link>
              <Link to="/qr-code-scanner" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform opacity-70">
                <QrCode className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <p className="text-sm font-medium">QR Scanner</p>
                <span className="text-xs text-purple-500">Coming soon</span>
              </Link>
              <Link to="/qr-code-styler" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform opacity-70">
                <QrCode className="h-8 w-8 text-pink-500 mx-auto mb-2" />
                <p className="text-sm font-medium">QR Styler</p>
                <span className="text-xs text-purple-500">Coming soon</span>
              </Link>
              <Link to="/image-to-qr-code" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform opacity-70">
                <Image className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Image to QR</p>
                <span className="text-xs text-purple-500">Coming soon</span>
              </Link>
            </div>
            <Button 
              onClick={(e) => navigateToCategory('qrcode')} 
              variant="outline" 
              className="mt-4 pulse-btn w-full sm:w-auto"
            >
              <Sparkles className="mr-2 h-5 w-5 text-yellow-400" />
              Explore All QR Tools
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
