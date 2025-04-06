
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';
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
  | 'Utility';

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
  const categories: ToolCategory[] = ['All', 'Image', 'Document', 'Video', 'Audio', 'Text', 'Utility'];

  return (
    <section className="py-12 md:py-20">
      <div className="container px-4 mx-auto">
        <div className="text-center mx-auto max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-foreground animate-fade-in">
            Free Online Tools For <span className="text-accent">Everyone</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Convert, edit, and transform files online with no registration required. All processing happens in your browser.
          </p>
          
          {/* Search and Filters */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <div className="w-full md:w-1/2 relative">
                <div className="relative rounded-md overflow-hidden cosmic-search">
                  <Input
                    type="text"
                    placeholder="Search tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-transparent galaxy-input"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-white">
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
