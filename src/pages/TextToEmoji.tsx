import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Coffee, Clipboard, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

// Sample emoji mapping - this would be expanded in a real implementation
const emojiMap: Record<string, string> = {
  "coffee": "☕",
  "love": "❤️",
  "happy": "😊",
  "sad": "😢",
  "laugh": "😂",
  "thumbs up": "👍",
  "fire": "🔥",
  "star": "⭐",
  "music": "🎵",
  "book": "📚",
  "computer": "💻",
  "phone": "📱",
  "car": "🚗",
  "house": "🏠",
  "tree": "🌲",
  "sun": "☀️",
  "moon": "🌙",
  "rain": "🌧️",
  "snow": "❄️",
  "food": "🍔",
  "drink": "🥤",
  "sleep": "😴",
  "work": "💼",
  "money": "💰",
  "time": "⏰"
};

const TextToEmoji = () => {
  const [inputText, setInputText] = useState('');
  const [emojiResult, setEmojiResult] = useState('');
  const { toast } = useToast();

  const convertToEmoji = () => {
    if (!inputText.trim()) {
      toast({
        title: "No text entered",
        description: "Please enter some text to convert to emoji",
        variant: "destructive",
      });
      return;
    }

    const words = inputText.toLowerCase().split(/\s+/);
    let result = '';

    words.forEach(word => {
      // Check if the word exists in our emoji map
      if (emojiMap[word]) {
        result += emojiMap[word] + ' ';
      } else {
        // Check if any key in the map is part of the word
        const matchingKeys = Object.keys(emojiMap).filter(key => 
          word.includes(key) || key.includes(word)
        );
        
        if (matchingKeys.length > 0) {
          // Use the first matching key
          result += emojiMap[matchingKeys[0]] + ' ';
        } else {
          // If no match found, keep the original word
          result += word + ' ';
        }
      }
    });

    setEmojiResult(result.trim());
    
    toast({
      title: "Conversion complete",
      description: "Text has been converted to emoji",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(emojiResult);
    toast({
      description: "Emoji copied to clipboard!",
    });
  };

  return (
    <>
      <Helmet>
        <title>Text to Emoji Converter - Find the Perfect Emoji | EveryTools</title>
        <meta name="description" content="Convert words and phrases to relevant emojis with our free online text to emoji converter tool." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Text to Emoji Converter</h1>
              <p className="text-muted-foreground">Enter words or phrases and get matching emojis</p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Coffee className="h-6 w-6 text-primary" />
                  <CardTitle>Find the Perfect Emoji</CardTitle>
                </div>
                <CardDescription>Type a word or phrase to get matching emojis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="input-text">Your Text</Label>
                    <Input
                      id="input-text"
                      placeholder="Type something like 'coffee' or 'I love music'"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                    />
                  </div>

                  <Button 
                    onClick={convertToEmoji} 
                    className="w-full"
                    disabled={!inputText.trim()}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" /> Convert to Emoji
                  </Button>

                  {emojiResult && (
                    <div className="mt-6">
                      <Label>Emoji Result</Label>
                      <div className="flex mt-2">
                        <div className="flex-grow p-4 text-xl sm:text-3xl bg-muted rounded-l-md break-words">
                          {emojiResult}
                        </div>
                        <Button 
                          variant="outline" 
                          className="rounded-l-none"
                          onClick={handleCopy}
                        >
                          <Clipboard className="h-4 w-4" />
                          <span className="sr-only">Copy</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="bg-muted/30 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">About This Tool</h2>
              <p className="text-muted-foreground mb-4">
                The Text to Emoji converter helps you quickly find relevant emojis based on your text input.
                Simply type a word or phrase, and we'll show you the most relevant emoji or emoji combinations.
              </p>
              <h3 className="font-medium mb-2">Popular Conversions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-background p-3 rounded-md flex justify-between items-center">
                  <span>coffee</span>
                  <span>☕</span>
                </div>
                <div className="bg-background p-3 rounded-md flex justify-between items-center">
                  <span>happy</span>
                  <span>😊</span>
                </div>
                <div className="bg-background p-3 rounded-md flex justify-between items-center">
                  <span>love</span>
                  <span>❤️</span>
                </div>
                <div className="bg-background p-3 rounded-md flex justify-between items-center">
                  <span>thumbs up</span>
                  <span>👍</span>
                </div>
                <div className="bg-background p-3 rounded-md flex justify-between items-center">
                  <span>star</span>
                  <span>⭐</span>
                </div>
                <div className="bg-background p-3 rounded-md flex justify-between items-center">
                  <span>fire</span>
                  <span>🔥</span>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default TextToEmoji;
