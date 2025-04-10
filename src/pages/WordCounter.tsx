
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { Helmet } from 'react-helmet-async';

const WordCounter = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
  });
  const [mostFrequentWords, setMostFrequentWords] = useState<{word: string, count: number}[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const calculateStats = () => {
      // Count characters
      const characters = text.length;
      const charactersNoSpaces = text.replace(/\s/g, '').length;
      
      // Count words
      const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
      
      // Count sentences (basic implementation)
      const sentences = text.split(/[.!?]+/).filter(Boolean).length;
      
      // Count paragraphs
      const paragraphs = text.split(/\n+/).filter(Boolean).length || 0;
      
      // Estimate reading time (average person reads ~200-250 words per minute)
      const readingTime = Math.ceil(words / 225);

      // Calculate word frequency
      if (words > 0) {
        const wordArray = text.toLowerCase().match(/\b\w+\b/g) || [];
        const wordFrequency: Record<string, number> = {};
        
        wordArray.forEach(word => {
          wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        });
        
        const sortedWords = Object.entries(wordFrequency)
          .map(([word, count]) => ({ word, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);
        
        setMostFrequentWords(sortedWords);
      } else {
        setMostFrequentWords([]);
      }
      
      setStats({
        characters,
        charactersNoSpaces,
        words,
        sentences,
        paragraphs,
        readingTime
      });
    };
    
    calculateStats();
  }, [text]);
  
  const handleClear = () => {
    setText('');
    toast({
      title: "Text cleared",
      description: "Your text has been cleared",
      variant: "default",
    });
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Text copied to clipboard successfully",
      variant: "default",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Word Counter | Free Online Word Count Tool</title>
        <meta name="description" content="Count words, characters, sentences, and paragraphs in your text with our free online word counter tool. Get reading time estimates and word frequency analysis." />
        <meta name="keywords" content="word counter, character count, word count, text analysis, reading time calculator" />
      </Helmet>

      <Header />
      
      <div className="container max-w-4xl mx-auto px-4 py-8 flex-grow">
        <BackButton />
        
        <h1 className="text-3xl font-bold mb-6">Word Counter</h1>
        <p className="mb-6 text-muted-foreground">
          Count words, characters, sentences, and paragraphs in your text. Get reading time estimates and analyze word frequency.
        </p>
        
        <Card className="mb-6 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Input Text</CardTitle>
            <CardDescription>Type or paste your text below</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter text here..."
              className="min-h-[200px] resize-y"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleClear}>
              Clear
            </Button>
            <Button onClick={handleCopy} disabled={!text}>
              Copy Text
            </Button>
          </CardFooter>
        </Card>
        
        <Tabs defaultValue="stats" className="mb-6">
          <TabsList className="grid grid-cols-2 w-full mb-4">
            <TabsTrigger value="stats">Text Statistics</TabsTrigger>
            <TabsTrigger value="analysis">Word Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Text Statistics</CardTitle>
                <CardDescription>Detailed metrics about your text</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Characters (with spaces):</span>
                    <span className="font-medium">{stats.characters}</span>
                  </div>
                  <Progress value={(stats.characters / 5000) * 100} max={100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Characters (without spaces):</span>
                    <span className="font-medium">{stats.charactersNoSpaces}</span>
                  </div>
                  <Progress value={(stats.charactersNoSpaces / 5000) * 100} max={100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Words:</span>
                    <span className="font-medium">{stats.words}</span>
                  </div>
                  <Progress value={(stats.words / 1000) * 100} max={100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Sentences:</span>
                    <span className="font-medium">{stats.sentences}</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Paragraphs:</span>
                    <span className="font-medium">{stats.paragraphs}</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Estimated Reading Time:</span>
                    <span className="font-medium">{stats.readingTime} min</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analysis">
            <Card>
              <CardHeader>
                <CardTitle>Word Analysis</CardTitle>
                <CardDescription>Frequency and distribution of words</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Most Frequent Words</h3>
                  
                  {mostFrequentWords.length > 0 ? (
                    <div className="space-y-3">
                      {mostFrequentWords.map((item, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between">
                            <span className="font-medium">{item.word}</span>
                            <span>{item.count} occurrences</span>
                          </div>
                          <Progress value={(item.count / mostFrequentWords[0].count) * 100} max={100} className="h-2" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Enter some text to see word frequency analysis</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default WordCounter;
