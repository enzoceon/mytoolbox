
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface TextInputAreaProps {
  text: string;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextInputArea: React.FC<TextInputAreaProps> = ({ text, handleTextChange }) => {
  return (
    <div>
      <Label htmlFor="text-input">Enter Text</Label>
      <Textarea
        id="text-input"
        placeholder="Type or paste your text here..."
        className="min-h-[150px]"
        value={text}
        onChange={handleTextChange}
      />
    </div>
  );
};

export default TextInputArea;
