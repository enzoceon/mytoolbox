
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Toggle } from '@/components/ui/toggle';

const ThemeToggle = () => {
  const { toggleTheme } = useTheme();
  
  // Theme toggle is permanently in dark mode
  return (
    <Toggle 
      aria-label="Dark mode toggle" 
      pressed={true}
      onPressedChange={toggleTheme}
      className="rounded-full p-2 hover:bg-muted hover:text-foreground transition-all duration-300 relative overflow-hidden"
      disabled={true}
    />
  );
};

export default ThemeToggle;
