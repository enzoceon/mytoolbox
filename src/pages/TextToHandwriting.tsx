
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HandMetal, Download, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const fontStyles = [
  { id: 'casual', name: 'Casual Handwriting' },
  { id: 'neat', name: 'Neat Handwriting' },
  { id: 'elegant', name: 'Elegant Script' },
  { id: 'messy', name: 'Messy Scribble' },
  { id: 'architect', name: 'Architect Print' },
];

const paperStyles = [
  { id: 'lined', name: 'Lined Paper' },
  { id: 'grid', name: 'Grid Paper' },
  { id: 'plain', name: 'Plain Paper' },
  { id: 'dotted', name: 'Dotted Paper' },
  { id: 'old', name: 'Vintage Paper' },
];

const TextToHandwriting = () => {
  const [text, setText] = useState('');
  const [fontStyle, setFontStyle] = useState('casual');
  const [paperStyle, setPaperStyle] = useState('lined');
  const [inkColor, setInkColor] = useState('#1e40af');
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConvert = () => {
    if (!text) {
      toast({
        title: 'No text provided',
        description: 'Please enter some text to convert',
        variant: 'destructive',
      });
      return;
    }

    // This would normally call an API or use a library to convert text to handwriting
    // For now, we're just showing a toast as a placeholder
    toast({
      title: 'Coming Soon',
      description: 'Text to handwriting conversion will be available soon!',
    });
    
    // Placeholder for demo purposes
    setResult('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJcULXR7AAAAABJRU5ErkJggg==');
  };

  const downloadImage = () => {
    if (result) {
      const link = document.createElement('a');
      link.href = result;
      link.download = 'handwriting.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <Helmet>
        <title>Text to Handwriting Converter | EveryTools</title>
        <meta name="description" content="Convert typed text into realistic handwritten-style images with customizable styles and paper backgrounds." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Text to Handwriting</h1>
              <p className="text-muted-foreground">Convert typed text into realistic handwritten-style images</p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <HandMetal className="h-6 w-6 text-primary" />
                  <CardTitle>Convert Text to Handwriting</CardTitle>
                </div>
                <CardDescription>Customize your handwriting style and paper type</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="input">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="input">Input</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="input" className="space-y-6">
                    <div>
                      <Label htmlFor="input-text">Your Text</Label>
                      <Textarea
                        id="input-text"
                        placeholder="Type your text here..."
                        className="min-h-[200px]"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      />
                    </div>

                    <Button onClick={handleConvert} className="w-full">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Convert to Handwriting
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="settings" className="space-y-6">
                    <div>
                      <Label htmlFor="font-style">Handwriting Style</Label>
                      <Select
                        value={fontStyle}
                        onValueChange={setFontStyle}
                      >
                        <SelectTrigger id="font-style">
                          <SelectValue placeholder="Select a style" />
                        </SelectTrigger>
                        <SelectContent>
                          {fontStyles.map(style => (
                            <SelectItem key={style.id} value={style.id}>{style.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="paper-style">Paper Type</Label>
                      <Select
                        value={paperStyle}
                        onValueChange={setPaperStyle}
                      >
                        <SelectTrigger id="paper-style">
                          <SelectValue placeholder="Select paper type" />
                        </SelectTrigger>
                        <SelectContent>
                          {paperStyles.map(style => (
                            <SelectItem key={style.id} value={style.id}>{style.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="ink-color">Ink Color</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="color"
                          id="ink-color"
                          value={inkColor}
                          onChange={(e) => setInkColor(e.target.value)}
                          className="w-12 h-12 p-1 cursor-pointer"
                        />
                        <span className="text-sm text-muted-foreground">
                          {inkColor}
                        </span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {result && (
              <Card>
                <CardHeader>
                  <CardTitle>Result</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mb-4 p-4 bg-white rounded-md">
                    {/* This would show the handwriting image */}
                    <div className="p-4 bg-gray-200 rounded flex items-center justify-center min-h-[200px] w-full">
                      <p className="text-center text-gray-500">
                        Handwriting preview will appear here when the feature is fully implemented.
                      </p>
                    </div>
                  </div>
                  <Button onClick={downloadImage} className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download as Image
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default TextToHandwriting;
