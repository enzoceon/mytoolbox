
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { tools, categories, getToolsByCategory } from '@/data/tools';
import type { ToolType, CategoryType } from '@/data/tools';
import SpaceBackground from '@/components/SpaceBackground';
import { Link } from 'react-router-dom';

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
            <h1 className="text-4xl font-bold mb-4 tracking-tight animate-fade-in">
              <span className="bg-gradient-primary bg-clip-text text-transparent">All</span>
              <span className="text-white"> Tools</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Browse our complete collection of free online utilities for every need.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search tools..."
                className="pl-10 pr-4 py-6 bg-card border-border"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          
          {/* Category Tabs */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Tabs defaultValue={activeCategory} value={activeCategory} onValueChange={handleCategoryChange}>
              <div className="overflow-x-auto pb-2">
                <TabsList className="inline-flex w-auto">
                  <TabsTrigger value="all">All</TabsTrigger>
                  {categories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </Tabs>
          </div>
          
          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {filteredTools.length > 0 ? (
              filteredTools.map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <Link to={tool.path} key={tool.id}>
                    <Card className="h-full transition-transform hover:scale-105 hover:shadow-lg bg-card border-border">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <IconComponent className="h-6 w-6 text-indigo-400" />
                          </div>
                          {tool.isNew && (
                            <Badge variant="default" className="bg-purple-600">
                              New
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg mt-2">{tool.name}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                );
              })
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
