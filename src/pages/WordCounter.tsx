
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import BackButton from '@/components/BackButton';
import HowToUse from '@/components/HowToUse';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileUp, 
  Copy, 
  Trash2, 
  CopyCheck, 
  Clock, 
  BarChart4
} from 'lucide-react';
import { toast } from "sonner";
import BackgroundAnimation from '@/components/BackgroundAnimation';

interface CountStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: string;
}

const WordCounter: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [stats, setStats] = useState<CountStats>({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: '0 min'
  });
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    calculateStats(text);
  }, [text]);

  const calculateStats = (text: string) => {
    // Character count
    const characters = text.length;
    
    // Character count without spaces
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    
    // Word count
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    
    // Sentence count (basic implementation)
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    
    // Paragraph count
    const paragraphs = text.trim() === '' ? 0 : text.trim().split(/\n+/).filter(Boolean).length;
    
    // Reading time (average adult reads 200-250 words per minute)
    const readingTimeMinutes = Math.ceil(words / 200);
    const readingTime = readingTimeMinutes === 0 ? 'Less than a minute' : `${readingTimeMinutes} min`;
    
    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setCopied(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (file.type !== 'text/plain') {
        toast.error("Please select a plain text (.txt) file");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setText(event.target.result as string);
        }
      };
      reader.onerror = () => {
        toast.error("Error reading file");
      };
      reader.readAsText(file);
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        toast.success("Text copied to clipboard");
        setTimeout(() => setCopied(false), 3000);
      })
      .catch(() => {
        toast.error("Failed to copy text");
      });
  };

  const handleClearText = () => {
    setText('');
  };

  // Function to generate word frequency data
  const getWordFrequency = () => {
    if (text.trim() === '') return [];
    
    const words = text.toLowerCase().match(/\w+/g) || [];
    const wordFreq: {[key: string]: number} = {};
    
    words.forEach(word => {
      if (wordFreq[word]) {
        wordFreq[word]++;
      } else {
        wordFreq[word] = 1;
      }
    });
    
    return Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  };

  return (
    <>
      <BackgroundAnimation />
      <Header />
      <PageContainer>
        <BackButton />
        <PageHeader 
          title="Word Counter" 
          description="Count words, characters, sentences, and analyze text"
          accentWord="Word"
        />
        
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="relative">
              <Textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Type or paste your text here to count words, characters, and more..."
                className="min-h-[300px] p-4 resize-y text-base"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <FileUp size={16} className="mr-2" />
                Upload Text File
              </Button>
              <input
                id="file-upload"
                type="file"
                accept=".txt"
                className="hidden"
                onChange={handleFileUpload}
              />
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyText}
                disabled={text.trim() === ''}
              >
                {copied ? (
                  <CopyCheck size={16} className="mr-2 text-green-500" />
                ) : (
                  <Copy size={16} className="mr-2" />
                )}
                {copied ? 'Copied!' : 'Copy Text'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearText}
                disabled={text.trim() === ''}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={16} className="mr-2" />
                Clear Text
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card rounded-lg border border-border p-4 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-2">
                <BarChart4 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">{stats.words}</p>
                <p className="text-sm text-muted-foreground">Words</p>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-4 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-2">
                <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">Aa</span>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">{stats.characters}</p>
                <p className="text-sm text-muted-foreground">Characters</p>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-4 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">{stats.readingTime}</p>
                <p className="text-sm text-muted-foreground">Reading Time</p>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="statistics" className="mb-8">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="statistics">Detailed Statistics</TabsTrigger>
              <TabsTrigger value="frequency">Word Frequency</TabsTrigger>
            </TabsList>
            
            <TabsContent value="statistics" className="bg-card rounded-lg border border-border p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Characters (with spaces)</p>
                    <p className="text-lg font-medium">{stats.characters}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Characters (no spaces)</p>
                    <p className="text-lg font-medium">{stats.charactersNoSpaces}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Words</p>
                    <p className="text-lg font-medium">{stats.words}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Sentences</p>
                    <p className="text-lg font-medium">{stats.sentences}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Paragraphs</p>
                    <p className="text-lg font-medium">{stats.paragraphs}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Reading Time</p>
                    <p className="text-lg font-medium">{stats.readingTime}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="frequency" className="bg-card rounded-lg border border-border p-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Top 10 Most Frequently Used Words</h3>
                {getWordFrequency().length > 0 ? (
                  <div className="space-y-2">
                    {getWordFrequency().map(([word, count], index) => (
                      <div key={index} className="flex items-center">
                        <div className="text-sm font-medium w-32 truncate">{word}</div>
                        <div className="flex-1">
                          <div className="relative w-full h-6 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="absolute h-full bg-primary/80 rounded-full"
                              style={{ width: `${(count / getWordFrequency()[0][1]) * 100}%` }}
                            ></div>
                            <div className="absolute inset-0 flex items-center px-3">
                              <span className="text-xs font-medium text-white">{count}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No words to analyze. Start typing or paste text to see word frequency.
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <HowToUse />
      </PageContainer>
      <Footer />
    </>
  );
};

export default WordCounter;
