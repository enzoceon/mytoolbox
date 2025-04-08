
import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';
import { Helmet } from 'react-helmet-async';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { tools, categories, ToolType, CategoryType } from '@/data/tools';

const AllTools = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredTools, setFilteredTools] = useState<ToolType[]>(tools);
  
  // Apply filters whenever search query or selected categories change
  useEffect(() => {
    let filtered = tools;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(query) || 
        tool.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(tool => 
        selectedCategories.includes(tool.category)
      );
    }
    
    setFilteredTools(filtered);
  }, [searchQuery, selectedCategories]);
  
  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
  };

  return (
    <>
      <Helmet>
        <title>All Tools - EveryTools | Free Online Utilities</title>
        <meta name="description" content="Browse our complete collection of free, easy-to-use online tools for file conversion, image editing, text utilities, and more." />
      </Helmet>
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 tracking-tight animate-fade-in">
              <span className="bg-gradient-primary bg-clip-text text-transparent">Every</span>
              <span className="text-white">Tools</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Browse our complete collection of free online tools for all your digital needs.
              No downloads, no registration, just simple solutions.
            </p>
          </div>
          
          <div className="w-full max-w-5xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex flex-col md:flex-row gap-4 items-start">
              {/* Search bar */}
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search tools..."
                  className="pl-10 pr-10 bg-background/60 backdrop-blur-sm border-white/10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2" 
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </div>
              
              {/* Filter button (mobile) */}
              <div className="md:hidden w-full">
                <details className="w-full">
                  <summary className="flex items-center justify-between w-full p-3 cursor-pointer bg-card rounded-md border border-white/10">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <span>Filter by Category</span>
                    </div>
                    {selectedCategories.length > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {selectedCategories.length}
                      </Badge>
                    )}
                  </summary>
                  <div className="mt-2 p-4 bg-card rounded-md border border-white/10">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {categories.map((category) => (
                        <Badge
                          key={category.id}
                          variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleCategory(category.id)}
                        >
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                    {(selectedCategories.length > 0 || searchQuery) && (
                      <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
                        Clear Filters
                      </Button>
                    )}
                  </div>
                </details>
              </div>
              
              {/* Categories (desktop) */}
              <div className="hidden md:block flex-shrink-0 w-60">
                <div className="p-4 bg-card rounded-md border border-white/10">
                  <h3 className="font-medium mb-3 flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    Categories
                  </h3>
                  <div className="flex flex-col space-y-2">
                    {categories.map((category) => (
                      <Badge
                        key={category.id}
                        variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                        className="cursor-pointer justify-start"
                        onClick={() => toggleCategory(category.id)}
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                  {(selectedCategories.length > 0 || searchQuery) && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="mt-4 text-xs w-full">
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Results info */}
          <div className="w-full max-w-5xl mx-auto mb-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} found
              </p>
            </div>
          </div>
          
          {/* Tools grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mx-auto animate-fade-in" 
               style={{ animationDelay: "0.3s" }}>
            {filteredTools.length > 0 ? (
              filteredTools.map((tool) => (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="group flex flex-col h-full bg-card p-5 rounded-xl border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
                >
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4">
                    {tool.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-400 transition-colors">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground flex-grow">{tool.description}</p>
                  <div className="mt-4 flex items-center text-xs text-muted-foreground">
                    <Badge variant="secondary" className="text-xs">
                      {categories.find(cat => cat.id === tool.category)?.name}
                    </Badge>
                    {tool.isNew && (
                      <Badge variant="outline" className="ml-2 text-xs border-green-500/30 text-green-500">
                        New
                      </Badge>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <h3 className="text-xl font-medium mb-2">No tools found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
                <Button variant="outline" className="mt-4" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AllTools;
