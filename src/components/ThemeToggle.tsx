
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Toggle 
      aria-label="Toggle theme" 
      pressed={theme === 'dark'}
      onPressedChange={toggleTheme}
      className="rounded-full p-2 hover:bg-muted hover:text-foreground transition-all duration-300 relative overflow-hidden"
    >
      <div className="relative">
        <Sun className={`h-5 w-5 transition-all duration-300 ${
          theme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
        }`} />
        <Moon className={`h-5 w-5 absolute top-0 left-0 transition-all duration-300 ${
          theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
        }`} />
      </div>
    </Toggle>
  );
};

export default ThemeToggle;
