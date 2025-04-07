
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, Sparkles, Bot, Brain, Zap, MessageSquare, Image, QrCode } from 'lucide-react';
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

  const navigateToAITools = () => {
    navigate('/tools?category=AI');
  };

  const navigateToImageTools = () => {
    navigate('/tools?category=Image');
  };

  const navigateToQRTools = () => {
    navigate('/tools?category=QR Code');
  };

  return (
    <section className="py-12 md:py-20">
      <div className="container px-4 mx-auto">
        <div className="text-center mx-auto max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-foreground animate-fade-in">
            Free Online Tools <br />
            For <span className="text-purple-500">Everyone</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            every tools in one place
          </p>
          
          {/* Search bar with gradient border */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <div className="w-full relative">
                <div className="rounded-full overflow-hidden p-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500">
                  <div className="relative rounded-full overflow-hidden bg-[#0c0d13] flex items-center">
                    <Search className="absolute left-5 text-gray-400 h-6 w-6" />
                    <Input
                      type="text"
                      placeholder="Search tools..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full border-0 pl-14 py-6 text-lg bg-transparent focus-visible:ring-0 focus-visible:ring-transparent"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          
          {/* Image Tools Section */}
          <div className="mb-10 animate-fade-in" style={{ animationDelay: "0.35s" }}>
            <h2 className="text-xl font-semibold mb-4">Image Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link to="/converter" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform">
                <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Image to PDF</p>
              </Link>
              <Link to="/pdf-to-image" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform">
                <Image className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-medium">PDF to Image</p>
              </Link>
              <Link to="/jpg-to-png" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform">
                <Image className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium">JPG to PNG</p>
              </Link>
              <div className="glass-card p-4 rounded-lg hover:scale-105 transition-transform opacity-70">
                <Image className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Background Remover</p>
                <span className="text-xs text-purple-500">Coming soon</span>
              </div>
            </div>
            <Button 
              onClick={navigateToImageTools} 
              variant="outline" 
              className="mt-4 pulse-btn w-full sm:w-auto"
            >
              <Sparkles className="mr-2 h-5 w-5 text-yellow-400" />
              Explore All Image Tools
            </Button>
          </div>
          
          {/* QR Code Section - New Addition */}
          <div className="mb-10 animate-fade-in" style={{ animationDelay: "0.40s" }}>
            <h2 className="text-xl font-semibold mb-4">QR Code Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link to="/qr-code-generator" className="glass-card p-4 rounded-lg hover:scale-105 transition-transform">
                <QrCode className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-medium">QR Generator</p>
              </Link>
              <div className="glass-card p-4 rounded-lg hover:scale-105 transition-transform opacity-70">
                <QrCode className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <p className="text-sm font-medium">QR Scanner</p>
                <span className="text-xs text-purple-500">Coming soon</span>
              </div>
              <div className="glass-card p-4 rounded-lg hover:scale-105 transition-transform opacity-70">
                <QrCode className="h-8 w-8 text-pink-500 mx-auto mb-2" />
                <p className="text-sm font-medium">QR Styler</p>
                <span className="text-xs text-purple-500">Coming soon</span>
              </div>
              <div className="glass-card p-4 rounded-lg hover:scale-105 transition-transform opacity-70">
                <Image className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Image to QR</p>
                <span className="text-xs text-purple-500">Coming soon</span>
              </div>
            </div>
            <Button 
              onClick={navigateToQRTools} 
              variant="outline" 
              className="mt-4 pulse-btn w-full sm:w-auto"
            >
              <Sparkles className="mr-2 h-5 w-5 text-yellow-400" />
              Explore All QR Tools
            </Button>
          </div>
          
          {/* AI Section */}
          <div className="mb-10 animate-fade-in" style={{ animationDelay: "0.45s" }}>
            <h2 className="text-xl font-semibold mb-4">AI Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="glass-card p-4 rounded-lg hover:scale-105 transition-transform">
                <Brain className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Text Generator</p>
              </div>
              <div className="glass-card p-4 rounded-lg hover:scale-105 transition-transform">
                <Bot className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Chatbot</p>
              </div>
              <div className="glass-card p-4 rounded-lg hover:scale-105 transition-transform">
                <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Image Generator</p>
              </div>
              <div className="glass-card p-4 rounded-lg hover:scale-105 transition-transform">
                <MessageSquare className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium">Summarizer</p>
              </div>
            </div>
            <Button 
              onClick={navigateToAITools} 
              variant="outline" 
              className="mt-4 pulse-btn w-full sm:w-auto"
            >
              <Sparkles className="mr-2 h-5 w-5 text-yellow-400" />
              Explore All AI Tools
            </Button>
          </div>
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 w-full justify-center animate-fade-in mb-8" style={{ animationDelay: "0.5s" }}>
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category ? "bg-accent text-white hover:bg-accent/90" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
