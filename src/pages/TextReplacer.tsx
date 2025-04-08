
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Replace } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const TextReplacer = () => {
  const [text, setText] = useState('');
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [result, setResult] = useState('');
  const { toast } = useToast();

  const handleReplace = () => {
    if (!text) {
      toast({
        title: 'No text provided',
        description: 'Please enter some text to process',
        variant: 'destructive',
      });
      return;
    }

    if (!findText) {
      toast({
        title: 'Nothing to find',
        description: 'Please enter text to find',
        variant: 'destructive',
      });
      return;
    }

    // Create a new string with replacements
    const newText = text.split(findText).join(replaceText);
    setResult(newText);

    toast({
      title: 'Replacement complete',
      description: `Replaced all occurrences of "${findText}"`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Text Replacer - Find and Replace Text Online | EveryTools</title>
        <meta name="description" content="Quickly find and replace words or phrases in any text block using our free online text replacer tool." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Text Replacer</h1>
              <p className="text-muted-foreground">Quickly find and replace words or phrases in any text block</p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Replace className="h-6 w-6 text-primary" />
                  <CardTitle>Find and Replace</CardTitle>
                </div>
                <CardDescription>Enter your text and specify what to find and replace</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="input-text">Your Text</Label>
                    <Textarea
                      id="input-text"
                      placeholder="Enter your text here..."
                      className="min-h-[150px]"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="find-text">Find</Label>
                      <Input
                        id="find-text"
                        placeholder="Text to find..."
                        value={findText}
                        onChange={(e) => setFindText(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="replace-text">Replace With</Label>
                      <Input
                        id="replace-text"
                        placeholder="Text to replace with..."
                        value={replaceText}
                        onChange={(e) => setReplaceText(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button onClick={handleReplace} className="w-full">Replace All</Button>
                </div>
              </CardContent>
            </Card>

            {result && (
              <Card>
                <CardHeader>
                  <CardTitle>Result</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-muted rounded-md overflow-auto max-h-[300px]">
                    <pre className="whitespace-pre-wrap">{result}</pre>
                  </div>
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(result);
                      toast({
                        description: "Result copied to clipboard!",
                      });
                    }}
                    variant="outline"
                    className="mt-4"
                  >
                    Copy to Clipboard
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

export default TextReplacer;
