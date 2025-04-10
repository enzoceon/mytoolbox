
import React from 'react';
import { Input } from '@/components/ui/input';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  className?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ 
  color,
  onChange, 
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div 
        className="w-8 h-8 rounded-md border" 
        style={{ backgroundColor: color }} 
      />
      <Input 
        type="color" 
        value={color} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-9" 
      />
    </div>
  );
};
