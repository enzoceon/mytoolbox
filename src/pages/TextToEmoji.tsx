
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';
import BackButton from '@/components/BackButton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Coffee, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

const TextToEmoji = () => {
  const [text, setText] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Simple emoji mapping for demo purposes
  const wordToEmojiMap: Record<string, string> = {
    'hello': '👋',
    'world': '🌎',
    'love': '❤️',
    'happy': '😊',
    'sad': '😢',
    'angry': '😠',
    'food': '🍔',
    'cat': '🐱',
    'dog': '🐶',
    'laugh': '😂',
    'yes': '👍',
    'no': '👎',
    'ok': '👌',
    'heart': '❤️',
    'star': '⭐',
    'sun': '☀️',
    'moon': '🌙',
    'rain': '🌧️',
    'snow': '❄️',
    'fire': '🔥',
    'water': '💧',
    'tree': '🌲',
    'flower': '🌸',
    'car': '🚗',
    'house': '🏠',
    'book': '📚',
    'music': '🎵',
    'movie': '🎬',
    'sleep': '😴',
    'work': '💼',
    'money': '💰'
  };

  const convertTextToEmoji = () => {
    if (!text.trim()) {
      toast.error('Please enter some text to convert');
      return;
    }

    setLoading(true);
    
    // Process the text
    setTimeout(() => {
      const words = text.toLowerCase().split(/\s+/);
      const emojiText = words.map(word => {
        // Remove punctuation for matching
        const cleanWord = word.replace(/[.,!?;:'"()]/g, '');
        return wordToEmojiMap[cleanWord] || word;
      }).join(' ');
      
      setResult(emojiText);
      setLoading(false);
    }, 800);
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      toast.success('Copied to clipboard!');
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <>
      <Helmet>
        <title>Text to Emoji Converter | EveryTools</title>
        <meta name="description" content="Convert text to emoji-filled messages. Perfect for making your messages more expressive." />
      </Helmet>
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container px-4 mx-auto py-8">
          <BackButton />
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Text to Emoji</h1>
            <p className="text-muted-foreground">Convert your text into emoji-filled messages</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coffee className="h-5 w-5 text-yellow-500" />
                  <span>Enter Your Text</span>
                </CardTitle>
                <CardDescription>Type or paste text you want to convert to emojis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Type or paste your text here... (e.g., 'I love happy cats')"
                    className="min-h-[150px]"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  
                  <Button 
                    className="w-full" 
                    onClick={convertTextToEmoji}
                    disabled={loading || !text.trim()}
                  >
                    {loading ? 'Converting...' : 'Convert to Emojis'}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {result && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Emoji Result</CardTitle>
                  <CardDescription>Your text converted to emojis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-primary/5 rounded-md min-h-[100px] text-lg break-words">
                    {result}
                  </div>
                  
                  <Button 
                    className="w-full mt-4"
                    onClick={handleCopy}
                    variant="outline"
                  >
                    {copied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy to Clipboard
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
            
            <div className="mt-8 p-6 border rounded-lg">
              <h2 className="text-xl font-bold mb-4">About Text to Emoji Conversion</h2>
              <p className="mb-4">
                This tool converts words in your text to corresponding emojis. It's perfect for making 
                your messages more expressive and fun. Simply enter your text, click the convert button, 
                and see your text transformed with emojis.
              </p>
              <p>
                Try using common words like "love," "happy," "cat," "food," or "star" to see how they 
                get converted to emojis!
              </p>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default TextToEmoji;
