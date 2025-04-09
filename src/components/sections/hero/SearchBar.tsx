
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  handleSearch 
}) => {
  return (
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
  );
};

export default SearchBar;
