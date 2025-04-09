
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Moon } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <Toggle 
      aria-label="Toggle theme" 
      pressed={isDark}
      onPressedChange={toggleTheme}
      className="rounded-full p-2 hover:bg-muted hover:text-foreground transition-all duration-300 relative overflow-hidden"
    >
      {/* Only show Moon icon regardless of theme */}
      <Moon className="h-5 w-5" />
    </Toggle>
  );
};

export default ThemeToggle;
