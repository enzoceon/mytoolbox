
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

type ToolCategory = 
  | 'All'
  | 'Image'
  | 'Document'
  | 'Video'
  | 'Audio'
  | 'Text'
  | 'AI'
  | 'QR Code';

interface CategoryFilterProps {
  activeCategory: ToolCategory;
  setActiveCategory: (category: ToolCategory) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  activeCategory, 
  setActiveCategory 
}) => {
  const navigate = useNavigate();
  
  // Define tool categories
  const categories: ToolCategory[] = ['All', 'Image', 'Document', 'Video', 'Audio', 'Text', 'AI', 'QR Code'];

  const navigateToCategory = (category: string) => {
    // Store the selected category in sessionStorage (except 'All')
    if (category.toLowerCase() !== 'all') {
      sessionStorage.setItem('lastToolCategory', category.toLowerCase());
    } else {
      sessionStorage.removeItem('lastToolCategory');
    }
    
    navigate(`/tools?category=${category.toLowerCase()}`);
  };

  return (
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
  );
};

export default CategoryFilter;
