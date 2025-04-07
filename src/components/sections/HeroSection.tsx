import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, Sparkles, Bot, Brain, Zap, MessageSquare } from 'lucide-react';
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
  | 'Utility'
  | 'AI';

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
  const categories: ToolCategory[] = ['All', 'Image', 'Document', 'Video', 'Audio', 'Text', 'Utility', 'AI'];

  const navigateToAITools = () => {
    navigate('/tools?category=AI');
  };

  return (
    <section className="py-12 md:py-20">
      <div className="container px-4 mx-auto">
        <div className="text-center mx-auto max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-foreground animate-fade-in">
            Free Online Tools For <span className="text-accent">Everyone</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            every tools in one place
          </p>
          
          {/* Search and Filters */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <div className="w-full md:w-1/2 relative">
                <div className="relative rounded-md overflow-hidden cosmic-search">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border-0 pl-10 bg-transparent focus-visible:ring-0 focus-visible:ring-transparent galaxy-input"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-white">
                Find Tools <Search className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
          
          {/* AI Section */}
          <div className="mb-10 animate-fade-in" style={{ animationDelay: "0.35s" }}>
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
          <div className="flex flex-wrap gap-2 w-full justify-center animate-fade-in mb-8" style={{ animationDelay: "0.4s" }}>
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
