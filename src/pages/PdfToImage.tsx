
import React, { useState, useCallback } from 'react';
import { toast } from "sonner";
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import AdPlacement from '@/components/AdPlacement';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import WhyChooseSection from '@/components/sections/WhyChooseSection';
import FaqSection from '@/components/sections/FaqSection';
import { convertPdfToImages } from '@/utils/pdfToImageConverter';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';

const PdfToImage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // Track user interaction
  React.useEffect(() => {
    const handleInteraction = () => {
      setHasUserInteracted(true);
    };

    // Listen for user interaction events
    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('keydown', handleInteraction, { once: true });
    document.addEventListener('scroll', handleInteraction, { once: true });
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Check if file is a PDF
    if (file.type !== 'application/pdf') {
      toast.error('Please select a PDF file');
      return;
    }
    
    setSelectedFile(file);
    setImageUrls([]);
    setHasUserInteracted(true);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Check if file is a PDF
    if (file.type !== 'application/pdf') {
      toast.error('Please select a PDF file');
      return;
    }
    
    setSelectedFile(file);
    setImageUrls([]);
    setHasUserInteracted(true);
  }, []);

  const handleConvert = useCallback(() => {
    if (!selectedFile) return;
    
    setIsConverting(true);
    toast.loading(`Converting PDF to images...`);
    
    convertPdfToImages(selectedFile)
      .then((urls) => {
        setImageUrls(urls);
        toast.dismiss();
        toast.success(`PDF converted to ${urls.length} ${urls.length === 1 ? 'image' : 'images'}!`);
      })
      .catch((error) => {
        console.error("PDF to image conversion error:", error);
        toast.dismiss();
        toast.error("Error converting PDF. Please try again.");
      })
      .finally(() => {
        setIsConverting(false);
      });
  }, [selectedFile]);

  const handleDownloadImage = useCallback((url: string, index: number) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `pdf-page-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleDownloadAll = useCallback(() => {
    imageUrls.forEach((url, index) => {
      // Add a small delay between downloads to prevent browser throttling
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = url;
        link.download = `pdf-page-${index + 1}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, index * 100);
    });
    toast.success(`Downloading ${imageUrls.length} images`);
  }, [imageUrls]);

  // Determine if we have substantial content to show ads
  const hasSubstantialContent = selectedFile !== null || hasUserInteracted || imageUrls.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>PDF to Image - Free Online PDF to Image Converter | No Registration Required</title>
        <meta name="description" content="Extract high-quality images from PDF files for free. No registration, no watermarks, completely browser-based. Fast. Free. Fluid." />
        <link rel="canonical" href="https://everytools.site/pdf-to-image" />
      </Helmet>
      
      <BackgroundAnimation />
      <Header />
      
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            PDF to <span className="bg-gradient-primary bg-clip-text text-transparent">Image</span> Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert your PDF files to high-quality images with just a few clicks. No registration required, no watermarks, completely browser-based.
          </p>
        </section>
        
        {/* Converter Section */}
        <section className="mb-8 max-w-3xl mx-auto">
          {/* File Uploader */}
          <div className="glass-card p-8 rounded-xl text-center mb-8">
            {!selectedFile ? (
              <div
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-10 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById('pdf-input')?.click()}
              >
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="mb-2 font-medium">Drag & drop your PDF file here</p>
                <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                <Button variant="outline" size="sm">
                  Select PDF
                </Button>
                <input 
                  type="file" 
                  id="pdf-input" 
                  accept="application/pdf" 
                  className="hidden" 
                  onChange={handleFileSelect}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-muted/50 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <p className="font-medium mb-1">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground mb-4">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <div className="flex space-x-2">
                  <Button 
                    variant="default" 
                    className="bg-gradient-primary"
                    onClick={handleConvert}
                    disabled={isConverting}
                  >
                    {isConverting ? 'Converting...' : 'Convert to Images'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedFile(null);
                      setImageUrls([]);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Conversion Progress */}
          {isConverting && (
            <div className="w-full max-w-md mx-auto flex flex-col items-center my-8">
              <div className="mb-6 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin-normal" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  Converting PDF to images...
                </p>
              </div>
              
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-primary animate-progress rounded-full" />
              </div>
            </div>
          )}
          
          {/* Results Section */}
          {imageUrls.length > 0 && (
            <div className="mt-10 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Results</h2>
                {imageUrls.length > 1 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleDownloadAll}
                    className="flex items-center gap-2"
                  >
                    <Download size={16} />
                    Download All
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {imageUrls.map((url, index) => (
                  <div key={index} className="glass-card p-4 rounded-xl">
                    <div className="relative aspect-[3/4] mb-3">
                      <img 
                        src={url} 
                        alt={`PDF Page ${index + 1}`}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Page {index + 1}</span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex items-center gap-1"
                        onClick={() => handleDownloadImage(url, index)}
                      >
                        <Download size={14} />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
        
        {/* AdSense placement */}
        <AdPlacement 
          format="horizontal" 
          contentLoaded={hasSubstantialContent} 
        />
        
        {/* Popular Tools Section - Added above Features */}
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Tools</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Try our other popular conversion tools to enhance your productivity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Image to PDF</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Convert single or multiple images to PDF while preserving quality.
              </p>
              <Button variant="outline" size="sm" className="rounded-full" asChild>
                <a href="/converter">Use Tool</a>
              </Button>
            </div>
            
            <div className="glass-card p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">PDF Merger</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Combine multiple PDF files into a single document easily.
              </p>
              <Button variant="outline" size="sm" className="rounded-full" asChild>
                <a href="/tools">Use Tool</a>
              </Button>
            </div>
            
            <div className="glass-card p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-50 flex items-center justify-center">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">PDF Compressor</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Reduce PDF file size while maintaining quality.
              </p>
              <Button variant="outline" size="sm" className="rounded-full" asChild>
                <a href="/tools">Use Tool</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <FeaturesSection />
        
        {/* Why Choose Section */}
        <WhyChooseSection />
        
        {/* FAQ Section */}
        <FaqSection />
        
        {/* Bottom AdSense placement */}
        <AdPlacement 
          format="rectangle" 
          className="mb-8" 
          contentLoaded={hasSubstantialContent}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default PdfToImage;
