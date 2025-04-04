
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
      className="rounded-full p-2 hover:bg-muted hover:text-foreground"
    >
      {theme === 'dark' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Toggle>
  );
};

export default ThemeToggle;
