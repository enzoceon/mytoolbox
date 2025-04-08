import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Upload, Copy, Download, FileText, Search, ImageIcon, Loader2 } from 'lucide-react';
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
import { toast } from 'sonner';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import AdPlacement from '@/components/AdPlacement';

const loadTesseract = async () => {
  const { createWorker } = await import('tesseract.js');
  return { createWorker };
};

const OcrTool = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [recognizedText, setRecognizedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [language, setLanguage] = useState('eng'); // Default: English
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
  
  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/tiff'];
    
    if (!validImageTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, GIF, BMP, WEBP, TIFF)');
      return;
    }
    
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
    
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
    setRecognizedText('');
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/tiff'];
      
      if (!validImageTypes.includes(file.type)) {
        toast.error('Please upload a valid image file (JPEG, PNG, GIF, BMP, WEBP, TIFF)');
        return;
      }
      
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
      
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
      setRecognizedText('');
    }
  };
  
  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const performOCR = async () => {
    if (!image || !imageUrl) {
      toast.error('Please upload an image first');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const { createWorker } = await loadTesseract();
      
      const worker = await createWorker();
      
      await worker.loadLanguage(language);
      await worker.initialize(language);
      
      const { data } = await worker.recognize(imageUrl);
      
      setRecognizedText(data.text);
      
      await worker.terminate();
      
      toast.success('Text recognition completed');
    } catch (error) {
      console.error('OCR Error:', error);
      toast.error('Error recognizing text. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const copyToClipboard = () => {
    if (!recognizedText) {
      toast.error('No text to copy');
      return;
    }
    
    navigator.clipboard.writeText(recognizedText)
      .then(() => toast.success('Text copied to clipboard'))
      .catch(() => toast.error('Failed to copy text'));
  };
  
  const downloadAsTextFile = () => {
    if (!recognizedText) {
      toast.error('No text to download');
      return;
    }
    
    const blob = new Blob([recognizedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'recognized_text.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('Text file downloaded');
  };
  
  const languages = [
    { code: 'eng', name: 'English' },
    { code: 'spa', name: 'Spanish' },
    { code: 'fra', name: 'French' },
    { code: 'deu', name: 'German' },
    { code: 'ita', name: 'Italian' },
    { code: 'por', name: 'Portuguese' },
    { code: 'rus', name: 'Russian' },
    { code: 'chi_sim', name: 'Chinese (Simplified)' },
    { code: 'jpn', name: 'Japanese' },
    { code: 'kor', name: 'Korean' },
    { code: 'ara', name: 'Arabic' },
    { code: 'hin', name: 'Hindi' },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Extract Text from Image - Free Online OCR Tool | EveryTools</title>
        <meta name="description" content="Extract text from images with our free online OCR (Optical Character Recognition) tool. Supports multiple languages and image formats." />
      </Helmet>
      
      <BackgroundAnimation />
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <BackButton />
        
        <div className="max-w-4xl mx-auto glass-card p-6 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Extract Text</span> from Image
          </h1>
          
          <p className="text-muted-foreground text-center mb-8">
            Extract text from images with our OCR (Optical Character Recognition) tool
          </p>
          
          <div className="grid gap-6">
            <div>
              <Label className="mb-2 block">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full sm:w-auto">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              
              <div 
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleBrowseClick}
              >
                {imageUrl ? (
                  <div className="space-y-4">
                    <img 
                      src={imageUrl} 
                      alt="Uploaded" 
                      className="max-h-64 mx-auto rounded-md" 
                    />
                    <p className="text-sm text-muted-foreground">
                      Click or drag to replace the image
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                      <ImageIcon className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-base font-medium">
                        Drag and drop or click to upload
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Supports JPEG, PNG, GIF, BMP, WEBP, TIFF
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {imageUrl && (
              <div className="flex justify-center">
                <Button 
                  variant="default" 
                  className="gap-2"
                  onClick={performOCR}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      Extract Text
                    </>
                  )}
                </Button>
              </div>
            )}
            
            {recognizedText && (
              <div className="space-y-4">
                <Label htmlFor="recognized-text">Extracted Text:</Label>
                <Textarea
                  id="recognized-text"
                  value={recognizedText}
                  readOnly
                  className="min-h-[200px] font-mono text-sm"
                />
                
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={copyToClipboard}
                  >
                    <Copy className="h-4 w-4" />
                    Copy to Clipboard
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={downloadAsTextFile}
                  >
                    <Download className="h-4 w-4" />
                    Download as Text File
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
          <h2 className="text-2xl font-semibold mb-4">How to Use the Extract Text from Image Tool</h2>
          <div className="glass-card p-6 rounded-xl">
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
              <li>Select the language of the text in your image</li>
              <li>Upload an image containing text by clicking or dragging and dropping</li>
              <li>Click "Extract Text" to process the image</li>
              <li>View the extracted text in the result area</li>
              <li>Copy the text to clipboard or download it as a text file</li>
            </ol>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OcrTool;
