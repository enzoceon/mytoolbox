import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Copy, Download, Sparkles, RefreshCw, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import AdPlacement from '@/components/AdPlacement';

type SummaryLength = 'short' | 'medium' | 'long';

const AiContentSummarizer = () => {
  const [text, setText] = useState('');
  const [summarizedText, setSummarizedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [summaryLength, setSummaryLength] = useState<SummaryLength>('medium');
  const [complexity, setComplexity] = useState(50);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  
  const inputTextareaRef = useRef<HTMLTextAreaElement>(null);
  const outputTextareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Detect user interaction
  useEffect(() => {
    const handleInteraction = () => {
      setHasUserInteracted(true);
    };
    
    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('keydown', handleInteraction, { once: true });
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, []);
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  
  const handleSummaryLengthChange = (value: string) => {
    setSummaryLength(value as SummaryLength);
  };
  
  const handleComplexityChange = (value: number[]) => {
    setComplexity(value[0]);
  };
  
  const summarizeText = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to summarize');
      return;
    }
    
    if (text.trim().split(/\s+/).length < 20) {
      toast.error('Please enter at least 20 words to summarize');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Since we don't have access to external APIs, we'll simulate an AI summarization
      // with a simplified algorithm
      const summary = basicSummarize(text, summaryLength, complexity);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSummarizedText(summary);
      toast.success('Summary generated successfully');
    } catch (error) {
      console.error('Summarization error:', error);
      toast.error('Error generating summary');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const copyToClipboard = () => {
    if (!summarizedText) {
      toast.error('No summary to copy');
      return;
    }
    
    navigator.clipboard.writeText(summarizedText)
      .then(() => toast.success('Summary copied to clipboard'))
      .catch(() => toast.error('Failed to copy summary'));
  };
  
  const downloadSummary = () => {
    if (!summarizedText) {
      toast.error('No summary to download');
      return;
    }
    
    const blob = new Blob([summarizedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'summary.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('Summary downloaded as text file');
  };
  
  // Basic summarization function (simplified)
  const basicSummarize = (
    text: string, 
    length: SummaryLength, 
    complexity: number
  ): string => {
    // Normalize text
    const cleanedText = text.trim()
      .replace(/\s+/g, ' ')
      .replace(/[\r\n]+/g, '. ');
    
    // Split into sentences
    const sentences = cleanedText.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    if (sentences.length === 0) return '';
    
    // Determine keywords based on frequency (basic approach)
    const words = cleanedText.toLowerCase().match(/\b\w+\b/g) || [];
    const wordFrequency: Record<string, number> = {};
    
    // Common words to exclude
    const stopWords = new Set([
      'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 
      'with', 'by', 'about', 'as', 'into', 'like', 'through', 'after', 'over', 
      'between', 'out', 'against', 'during', 'without', 'before', 'under', 
      'around', 'among', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 
      'have', 'has', 'had', 'do', 'does', 'did', 'of', 'that', 'this', 'these', 
      'those', 'it', 'its'
    ]);
    
    // Count word frequency
    for (const word of words) {
      if (word.length > 2 && !stopWords.has(word)) {
        wordFrequency[word] = (wordFrequency[word] || 0) + 1;
      }
    }
    
    // Score sentences based on keyword frequency
    const sentenceScores = sentences.map(sentence => {
      const sentenceWords = sentence.toLowerCase().match(/\b\w+\b/g) || [];
      let score = 0;
      
      for (const word of sentenceWords) {
        if (wordFrequency[word]) {
          score += wordFrequency[word];
        }
      }
      
      // Normalize score by sentence length to avoid bias toward longer sentences
      return {
        sentence,
        score: sentenceWords.length > 0 ? score / sentenceWords.length : 0
      };
    });
    
    // Sort sentences by score
    const rankedSentences = [...sentenceScores].sort((a, b) => b.score - a.score);
    
    // Determine how many sentences to include based on summary length
    let percentToKeep = 0.3; // medium (default)
    
    if (length === 'short') {
      percentToKeep = 0.15;
    } else if (length === 'long') {
      percentToKeep = 0.5;
    }
    
    // Adjust based on complexity
    // Lower complexity means simpler sentences are preferred
    if (complexity < 50) {
      // Re-rank sentences giving preference to shorter ones
      rankedSentences.sort((a, b) => {
        const aLength = a.sentence.split(/\s+/).length;
        const bLength = b.sentence.split(/\s+/).length;
        const complexityFactor = (50 - complexity) / 50; // 0 to 1
        
        // Blend original score with length preference
        const aAdjustedScore = a.score * (1 - complexityFactor) + 
                              (1 / Math.max(aLength, 1)) * complexityFactor;
        const bAdjustedScore = b.score * (1 - complexityFactor) + 
                              (1 / Math.max(bLength, 1)) * complexityFactor;
        
        return bAdjustedScore - aAdjustedScore;
      });
    } else if (complexity > 50) {
      // Re-rank sentences giving preference to longer, more complex ones
      rankedSentences.sort((a, b) => {
        const aLength = a.sentence.split(/\s+/).length;
        const bLength = b.sentence.split(/\s+/).length;
        const complexityFactor = (complexity - 50) / 50; // 0 to 1
        
        // Blend original score with complexity preference
        const aAdjustedScore = a.score * (1 - complexityFactor) + 
                              (Math.min(aLength / 10, 1)) * complexityFactor;
        const bAdjustedScore = b.score * (1 - complexityFactor) + 
                              (Math.min(bLength / 10, 1)) * complexityFactor;
        
        return bAdjustedScore - aAdjustedScore;
      });
    }
    
    // Calculate number of sentences to keep
    const numSentences = Math.max(
      1, 
      Math.min(
        Math.ceil(sentences.length * percentToKeep), 
        sentences.length
      )
    );
    
    // Get top N sentences
    const topSentences = rankedSentences.slice(0, numSentences);
    
    // Sort sentences back into original order for coherent reading
    const sentencePositions = topSentences.map(s => {
      return {
        sentence: s.sentence,
        position: sentences.indexOf(s.sentence)
      };
    });
    
    sentencePositions.sort((a, b) => a.position - b.position);
    
    // Join sentences back together
    return sentencePositions
      .map(s => s.sentence.trim())
      .join('. ') + '.';
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>AI Content Summarizer | EveryTools</title>
        <meta name="description" content="Automatically summarize long articles and documents with our free AI-powered content summarizer. No sign-up required." />
      </Helmet>
      
      <BackgroundAnimation />
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <BackButton />
        
        <div className="max-w-4xl mx-auto glass-card p-6 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">
            <span className="bg-gradient-primary bg-clip-text text-transparent">AI Content</span> Summarizer
          </h1>
          
          <p className="text-muted-foreground text-center mb-8">
            Automatically summarize long articles and documents in seconds
          </p>
          
          <div className="grid gap-6">
            <div>
              <Label htmlFor="input-text" className="mb-2 block">Enter Text to Summarize</Label>
              <Textarea 
                id="input-text"
                ref={inputTextareaRef}
                placeholder="Paste your article, document, or long text here (minimum 20 words)..."
                className="min-h-[200px]"
                value={text}
                onChange={handleTextChange}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="summary-length" className="mb-2 block">Summary Length</Label>
                <Select value={summaryLength} onValueChange={handleSummaryLengthChange}>
                  <SelectTrigger id="summary-length">
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="long">Long</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <Label htmlFor="complexity-slider">Complexity</Label>
                  <span className="text-sm text-muted-foreground">
                    {complexity < 40 ? 'Simpler' : 
                     complexity > 60 ? 'More complex' : 'Balanced'}
                  </span>
                </div>
                <Slider 
                  id="complexity-slider"
                  min={0}
                  max={100}
                  step={1}
                  value={[complexity]}
                  onValueChange={handleComplexityChange}
                />
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button 
                variant="default" 
                className="gap-2"
                onClick={summarizeText}
                disabled={isProcessing || text.trim().length === 0}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Summarizing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Summarize
                  </>
                )}
              </Button>
            </div>
            
            {summarizedText && (
              <div className="space-y-4 mt-4">
                <Label htmlFor="summary-text" className="mb-2 block">Summary</Label>
                <Textarea 
                  id="summary-text"
                  ref={outputTextareaRef}
                  value={summarizedText}
                  readOnly
                  className="min-h-[150px]"
                />
                
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={copyToClipboard}
                  >
                    <Copy className="h-4 w-4" />
                    Copy Summary
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={downloadSummary}
                  >
                    <Download className="h-4 w-4" />
                    Download Summary
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <AdPlacement 
          format="horizontal" 
          contentLoaded={hasUserInteracted} 
          className="my-8"
        />
        
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">How to Use the AI Content Summarizer</h2>
          <div className="glass-card p-6 rounded-xl">
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
              <li>Paste your article, document, or long text in the input area</li>
              <li>Choose your desired summary length: short, medium, or long</li>
              <li>Adjust the complexity slider to get simpler or more complex sentences</li>
              <li>Click "Summarize" to generate the summary</li>
              <li>Copy or download the generated summary</li>
            </ol>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AiContentSummarizer;
