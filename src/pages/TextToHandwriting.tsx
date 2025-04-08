
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';
import BackButton from '@/components/BackButton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { HandMetal, Download, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const TextToHandwriting = () => {
  const [text, setText] = useState<string>('');
  const [fontSize, setFontSize] = useState<string>('24');
  const [fontStyle, setFontStyle] = useState<string>('cursive');
  const [color, setColor] = useState<string>('#0000FF');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);

  const handleConvert = () => {
    if (!text.trim()) {
      toast.error('Please enter some text to convert');
      return;
    }

    setLoading(true);
    
    // Simulate conversion
    setTimeout(() => {
      setLoading(false);
      setResult('https://via.placeholder.com/800x400?text=Handwritten+Text');
      toast.success('Text converted to handwriting!');
    }, 1500);
  };

  const handleDownload = () => {
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
        <meta name="description" content="Convert plain text into realistic handwritten text with various styles and colors." />
      </Helmet>
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container px-4 mx-auto py-8">
          <BackButton />
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Text to Handwriting</h1>
            <p className="text-muted-foreground">Convert typed text into realistic handwritten-style images</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HandMetal className="h-5 w-5 text-primary" />
                  <span>Enter Your Text</span>
                </CardTitle>
                <CardDescription>Type or paste text you want to convert to handwriting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Type or paste your text here..."
                    className="min-h-[200px]"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="font-size" className="text-sm font-medium">Font Size</label>
                      <Select value={fontSize} onValueChange={setFontSize}>
                        <SelectTrigger id="font-size">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="16">Small</SelectItem>
                          <SelectItem value="24">Medium</SelectItem>
                          <SelectItem value="32">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="font-style" className="text-sm font-medium">Handwriting Style</label>
                      <Select value={fontStyle} onValueChange={setFontStyle}>
                        <SelectTrigger id="font-style">
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cursive">Cursive</SelectItem>
                          <SelectItem value="print">Print</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="ink-color" className="text-sm font-medium">Ink Color</label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="color"
                        id="ink-color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <span className="text-sm">{color}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={handleConvert}
                    disabled={loading || !text.trim()}
                  >
                    {loading ? 'Converting...' : 'Convert to Handwriting'}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>Your handwritten text will appear here</CardDescription>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="space-y-4">
                    <div className="border rounded-md p-4 bg-white">
                      <img 
                        src={result} 
                        alt="Handwritten text" 
                        className="max-w-full"
                      />
                    </div>
                    
                    <Button 
                      className="w-full"
                      onClick={handleDownload}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Image
                    </Button>
                  </div>
                ) : (
                  <div className="border rounded-md p-8 flex flex-col items-center justify-center text-center h-[300px] bg-muted/30">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Enter text and click "Convert" to see the handwritten result</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8 p-6 border rounded-lg">
            <h2 className="text-xl font-bold mb-4">About Text to Handwriting Conversion</h2>
            <p className="mb-4">
              This tool converts plain text into images that look like handwritten notes. 
              It's perfect for creating personalized notes, adding a human touch to digital 
              content, or creating materials for educational purposes.
            </p>
            <p>
              You can customize the font size, handwriting style, and ink color to create 
              the perfect handwritten look for your needs.
            </p>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default TextToHandwriting;
