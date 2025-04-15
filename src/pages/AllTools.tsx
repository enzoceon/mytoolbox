
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { tools, categories, getToolsByCategory } from '@/data/tools';
import type { ToolType, CategoryType } from '@/data/tools';
import SpaceBackground from '@/components/SpaceBackground';
import ToolCard from '@/components/ToolCard';

const AllTools = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';
  const categoryParam = queryParams.get('category') || '';
  
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>(searchQuery);
  const [filteredTools, setFilteredTools] = useState<ToolType[]>([]);
  
  // Initialize with URL params if present
  useEffect(() => {
    if (categoryParam) {
      const normalizedCategory = categoryParam.toLowerCase();
      const categoryExists = categories.some(cat => cat.id === normalizedCategory);
      if (categoryExists) {
        setActiveCategory(normalizedCategory);
        // Store the category in sessionStorage
        sessionStorage.setItem('lastToolCategory', normalizedCategory);
      }
    }
    
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [categoryParam, searchQuery]);
  
  // Filter tools based on search term and active category
  useEffect(() => {
    let filtered = [...tools];
    
    // Filter by category if not "all"
    if (activeCategory !== 'all') {
      filtered = filtered.filter(tool => tool.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        tool => 
          tool.name.toLowerCase().includes(searchLower) || 
          tool.description.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredTools(filtered);
  }, [activeCategory, searchTerm]);
  
  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    // Store the selected category in sessionStorage
    if (category !== 'all') {
      sessionStorage.setItem('lastToolCategory', category);
    } else {
      sessionStorage.removeItem('lastToolCategory');
    }
    
    // Update URL without refreshing page
    const params = new URLSearchParams(location.search);
    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    
    // Update the URL without refreshing the page
    const newUrl = `${location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    
    // Update URL without refreshing page
    const params = new URLSearchParams(location.search);
    if (e.target.value === '') {
      params.delete('search');
    } else {
      params.set('search', e.target.value);
    }
    
    const newUrl = `${location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };
  
  return (
    <>
      <Helmet>
        <title>All Tools - EveryTools</title>
        <meta name="description" content="Browse our complete collection of free online tools for various tasks. No registration required." />
      </Helmet>
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight animate-fade-in">
              <span className="text-white">The </span>
              <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">Digital Toolbox</span>
              <span className="text-white"> For Everyone</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Dozens of powerful online tools to make your digital life easier.
              Convert, edit, and transform files with no registration required.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <div className="rounded-full overflow-hidden p-[2px] bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500">
                <div className="relative rounded-full overflow-hidden bg-[#0c0d13] flex items-center">
                  <Search className="absolute left-5 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search tools..."
                    className="pl-12 pr-4 py-6 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Category Tabs */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="overflow-x-auto pb-2 flex justify-center">
              <div className="flex space-x-2 flex-wrap justify-center gap-2">
                <Button
                  variant={activeCategory === 'all' ? 'default' : 'outline'}
                  className={activeCategory === 'all' ? 'bg-purple-600 hover:bg-purple-700' : 'border-gray-700 bg-[#12131a]'}
                  onClick={() => handleCategoryChange('all')}
                >
                  All
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? 'default' : 'outline'}
                    className={activeCategory === category.id ? 'bg-purple-600 hover:bg-purple-700' : 'border-gray-700 bg-[#12131a]'}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {filteredTools.length > 0 ? (
              filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))
            ) : (
              <div className="col-span-3 text-center py-20">
                <h3 className="text-xl font-semibold mb-2">No tools found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or category filter.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('all');
                    sessionStorage.removeItem('lastToolCategory');
                  }}
                >
                  Reset Filters
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
