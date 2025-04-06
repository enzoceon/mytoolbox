
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
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
          <div className="mb-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
