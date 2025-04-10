
import React, { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, FileText, Replace } from 'lucide-react';
import { toast } from 'sonner';
import BackButton from '@/components/BackButton';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TextReplacerSEO from '@/components/SEO/TextReplacerSEO';

const TextReplacer = () => {
  const [inputText, setInputText] = useState('');
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [replacementCount, setReplacementCount] = useState(0);
  const [caseSensitive, setCaseSensitive] = useState(false);

  const handleReplace = () => {
    if (!inputText || !findText) {
      toast.error('Please enter both text to search and text to find');
      return;
    }

    let result = inputText;
    let count = 0;
    
    if (caseSensitive) {
      // Case sensitive replacement
      const regex = new RegExp(escapeRegExp(findText), 'g');
      result = inputText.replace(regex, (match) => {
        count++;
        return replaceText;
      });
    } else {
      // Case insensitive replacement
      const regex = new RegExp(escapeRegExp(findText), 'gi');
      result = inputText.replace(regex, (match) => {
        count++;
        return replaceText;
      });
    }
    
    setOutputText(result);
    setReplacementCount(count);
    
    if (count > 0) {
      toast.success(`Replaced ${count} occurrences of "${findText}"`);
    } else {
      toast.info(`No occurrences of "${findText}" found`);
    }
  };

  // Escape special characters in the search string
  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  const handleCopyOutput = () => {
    if (!outputText) {
      toast.error('No text to copy');
      return;
    }
    
    navigator.clipboard.writeText(outputText)
      .then(() => toast.success('Text copied to clipboard!'))
      .catch(() => toast.error('Failed to copy text'));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TextReplacerSEO />
      <Header />
      
      <div className="container max-w-5xl py-8 space-y-6 flex-grow">
        <BackButton />
        
        <h1 className="text-3xl font-bold text-center mb-8">Text Replacer</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-medium">Input Text</h2>
            </div>
            
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your text here..."
              className="min-h-[200px] font-mono text-sm"
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Replace className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-medium">Output Text</h2>
              {outputText && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-auto hover:bg-accent hover:text-accent-foreground" 
                  onClick={handleCopyOutput}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              )}
            </div>
            
            <Textarea
              value={outputText}
              readOnly
              placeholder="Processed text will appear here..."
              className="min-h-[200px] font-mono text-sm"
            />
            
            {replacementCount > 0 && (
              <p className="text-sm text-muted-foreground">
                {replacementCount} occurrences replaced
              </p>
            )}
          </div>
        </div>
        
        <div className="bg-card border rounded-lg p-6 space-y-4 hover:border-input transition-colors">
          <h2 className="text-xl font-medium">Replace Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Find:</label>
              <Input
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
                placeholder="Text to find"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Replace with:</label>
              <Input
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
                placeholder="Text to replace with"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="caseSensitive"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="caseSensitive" className="text-sm">
              Case sensitive
            </label>
          </div>
          
          <Button 
            onClick={handleReplace} 
            className="w-full hover:bg-primary/90 transition-colors"
          >
            Replace Text
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TextReplacer;
