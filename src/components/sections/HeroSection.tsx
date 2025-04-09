
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroTitle from './hero/HeroTitle';
import SearchBar from './hero/SearchBar';
import CategoryFilter from './hero/CategoryFilter';
import ToolsCategorySection from './hero/ToolsCategorySection';
import { getToolsSectionsData, ToolCategoryData } from './hero/ToolSectionData';

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

  // Get all tool sections data
  const toolSections: ToolCategoryData[] = getToolsSectionsData();

  return (
    <section className="py-12 md:py-20">
      <div className="container px-4 mx-auto">
        {/* Hero Title and Description */}
        <HeroTitle />
        
        {/* Search Bar */}
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
        
        {/* Category Filter Pills */}
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Tool Category Sections */}
        {toolSections.map((section, index) => (
          <ToolsCategorySection
            key={index}
            title={section.title}
            tools={section.tools}
            navigateAction={() => navigate(`/tools?category=${section.category.toLowerCase()}`)}
            animationDelay={section.animationDelay}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
