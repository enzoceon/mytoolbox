
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

// Comprehensive emoji mapping for better conversion
const emojiMap: Record<string, string[]> = {
  // Transportation
  'car': ['🚗', '🚙', '🏎️', '🚓', '🚕', '🚘'],
  'bus': ['🚌', '🚎', '🚐'],
  'truck': ['🚚', '🚛', '🚒'],
  'train': ['🚂', '🚆', '🚄', '🚅', '🚈', '🚝', '🚞'],
  'airplane': ['✈️', '🛩️', '🛫', '🛬'],
  'boat': ['🚢', '⛴️', '🛥️', '🚤', '⛵'],
  'motorcycle': ['🏍️', '🛵'],
  'bicycle': ['🚲', '🛴'],
  
  // Animals
  'dog': ['🐕', '🐶', '🦮', '🐩', '🐕‍🦺'],
  'cat': ['🐈', '🐱', '😺', '😸', '😻'],
  'horse': ['🐎', '🐴', '🏇'],
  'bird': ['🐦', '🕊️', '🦅', '🦆', '🦉', '🐧'],
  'pig': ['🐖', '🐷', '🐽'],
  'cow': ['🐄', '🐮'],
  'monkey': ['🐒', '🙈', '🙉', '🙊', '🐵'],
  'fish': ['🐟', '🐠', '🐡', '🦈'],
  
  // Food
  'pizza': ['🍕', '🧀', '🍅'],
  'burger': ['🍔', '🥪', '🥓'],
  'fries': ['🍟', '🥔'],
  'hotdog': ['🌭', '🌶️'],
  'taco': ['🌮', '🫔'],
  'burrito': ['🌯', '🥙'],
  'sushi': ['🍣', '🍱', '🍙'],
  'apple': ['🍎', '🍏', '🧃'],
  'banana': ['🍌', '🍞'],
  'ice cream': ['🍦', '🍧', '🍨'],
  'cake': ['🍰', '🧁', '🎂'],
  'coffee': ['☕', '🍵', '♨️'],
  'food': ['🍔', '🍕', '🍗', '🍝', '🍜'],
  'drink': ['🥤', '🧃', '🍹', '🍺'],
  
  // Emotions
  'happy': ['😊', '😃', '😄', '😁', '🥳', '🙂'],
  'sad': ['😢', '😭', '😥', '😔', '😞', '😓'],
  'angry': ['😠', '😡', '🤬', '😤', '😾'],
  'laugh': ['😂', '🤣', '😆', '😅'],
  'love': ['❤️', '💕', '💘', '😍', '🥰', '💓'],
  'cool': ['😎', '🆒', '👍', '👌'],
  'thinking': ['🤔', '💭', '🧠', '🤨'],
  'sleep': ['😴', '💤', '🛌', '😪'],
  'sick': ['🤒', '🤢', '🤮', '🤧', '😷'],
  'scared': ['😱', '😨', '😰', '😧', '😮'],
  
  // Weather & Nature
  'sun': ['☀️', '🌞', '🔆', '🌅', '🌄'],
  'moon': ['🌙', '🌛', '🌜', '🌝', '🌚'],
  'star': ['⭐', '🌟', '✨', '💫', '🌠'],
  'cloud': ['☁️', '⛅', '🌥️', '🌤️', '🌦️'],
  'rain': ['🌧️', '☔', '⛈️', '💧', '💦'],
  'snow': ['❄️', '☃️', '⛄', '🌨️', '🥶'],
  'tree': ['🌲', '🌳', '🌴', '🎄', '🌱'],
  'flower': ['🌸', '🌼', '🌹', '🌷', '💐'],
  
  // Objects
  'house': ['🏠', '🏡', '🏘️', '🏚️', '🏢'],
  'book': ['📚', '📖', '📕', '📙', '📒'],
  'phone': ['📱', '📲', '☎️', '📞', '📟'],
  'computer': ['💻', '🖥️', '⌨️', '🖱️', '📀'],
  'music': ['🎵', '🎶', '🎼', '🎸', '🎹'],
  'movie': ['🎬', '🎞️', '📽️', '🎥', '📹'],
  'game': ['🎮', '🎯', '🎲', '🎰', '🎪'],
  'money': ['💰', '💵', '💸', '💲', '🤑'],
  'gift': ['🎁', '🎀', '🎊', '🎉', '🧨'],
  'clock': ['⏰', '⌚', '⏱️', '⏲️', '🕰️'],
  
  // Sports
  'football': ['⚽', '🏟️', '🥅'],
  'basketball': ['🏀', '🏆', '🧢'],
  'baseball': ['⚾', '🏏', '🧢'],
  'tennis': ['🎾', '🏸', '🥇'],
  'swimming': ['🏊‍♀️', '🏊‍♂️', '🩱', '🏄‍♂️'],
  'soccer': ['⚽', '🥅', '🏆'],
  
  // Common words
  'yes': ['✅', '👍', '🆗', '👌', '✔️'],
  'no': ['❌', '👎', '🚫', '⛔', '🙅‍♀️'],
  'ok': ['👌', '🆗', '✔️', '💯'],
  'hi': ['👋', '🙋‍♂️', '🙋‍♀️', '✌️'],
  'bye': ['👋', '✌️', '💨', '👣', '🚶‍♂️'],
  'thanks': ['🙏', '💕', '🎁', '👍'],
  'please': ['🙏', '🥺', '🔮', '❤️'],
  'sorry': ['😞', '😔', '🙏', '💔'],
  'good': ['👍', '✅', '👌', '🌟'],
  'bad': ['👎', '❌', '🚫', '⛔'],
  'fire': ['🔥', '🧯', '🚒', '💥'],
  'water': ['💧', '🌊', '🚿', '🚰'],
  'heart': ['❤️', '💙', '💚', '💛', '💜'],
  'world': ['🌎', '🌍', '🌏', '🌐', '🧭'],
  'hello': ['👋', '🙋‍♀️', '🙋‍♂️', '💬', '😊']
};

const TextToEmoji: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [results, setResults] = useState<{word: string, emojis: string[]}[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const convertTextToEmoji = () => {
    if (!text.trim()) {
      toast.error('Please enter some text to convert');
      return;
    }

    setLoading(true);
    
    // Process the text
    setTimeout(() => {
      const words = text.toLowerCase()
                      .replace(/[.,!?;:'"()]/g, '')
                      .split(/\s+/);
      
      // Create results array with word and corresponding emojis
      const emojiResults = words.map(word => {
        const cleanWord = word.trim();
        const matchedEmojis = emojiMap[cleanWord] || [];
        
        // If no direct match found, try to find partial matches
        if (matchedEmojis.length === 0) {
          // Try to find keys that contain the word
          for (const key of Object.keys(emojiMap)) {
            if (key.includes(cleanWord) || cleanWord.includes(key)) {
              return { word: cleanWord, emojis: emojiMap[key] };
            }
          }
          // If still no match, return empty array
          return { word: cleanWord, emojis: [] };
        }
        
        return { word: cleanWord, emojis: matchedEmojis };
      });
      
      setResults(emojiResults);
      setLoading(false);
    }, 800);
  };

  const handleCopy = (emoji: string, index: string) => {
    navigator.clipboard.writeText(emoji);
    setCopiedIndex(index);
    toast.success('Emoji copied to clipboard!');
    
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
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
                    placeholder="Type or paste your text here... (e.g., 'car dog happy hello')"
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
            
            {results.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Emoji Results</CardTitle>
                  <CardDescription>Click on any emoji to copy it to clipboard</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {results.map((result, idx) => (
                      <div key={idx} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <h3 className="text-lg font-medium mb-2 capitalize">{result.word}</h3>
                        {result.emojis.length > 0 ? (
                          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                            {result.emojis.map((emoji, emojiIdx) => (
                              <Button
                                key={`${idx}-${emojiIdx}`}
                                variant="outline"
                                className="text-2xl h-14 flex flex-col gap-1 items-center justify-center relative hover:bg-accent/20"
                                onClick={() => handleCopy(emoji, `${idx}-${emojiIdx}`)}
                              >
                                <span>{emoji}</span>
                                {copiedIndex === `${idx}-${emojiIdx}` ? (
                                  <Check className="h-3 w-3 absolute top-1 right-1 text-green-500" />
                                ) : (
                                  <Copy className="h-3 w-3 absolute top-1 right-1 opacity-50" />
                                )}
                              </Button>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-sm">No emojis found for this word</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            <div className="mt-8 p-6 border rounded-lg">
              <h2 className="text-xl font-bold mb-4">About Text to Emoji Conversion</h2>
              <p className="mb-4">
                This tool converts words in your text to corresponding emojis. It's perfect for making 
                your messages more expressive and fun. Simply enter your text, click the convert button, 
                and see each word transformed with multiple relevant emojis.
              </p>
              <p>
                Try using common words like "love," "happy," "cat," "food," or "star" to see how they 
                get converted to emojis. Click on any emoji to copy it to your clipboard.
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
