
import React, { useState, useCallback, useEffect } from 'react';
import { toast } from "sonner";
import { simulateConversion } from '@/utils/pdfConverter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageUploader from '@/components/ImageUploader';
import ConversionArea from '@/components/ConversionArea';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import HowToUse from '@/components/HowToUse';
import AdPlacement from '@/components/AdPlacement';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // Track user interaction
  useEffect(() => {
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

  const handleImageSelect = useCallback((files: File[]) => {
    try {
      // Create preview URLs for all files
      const urls = files.map(file => URL.createObjectURL(file));
      
      // Combine with existing files/urls if any
      setSelectedFiles(prev => [...prev, ...files]);
      setPreviewUrls(prev => [...prev, ...urls]);
      setPdfUrl(null); // Reset previous conversion
      
      // Mark that user has interacted
      setHasUserInteracted(true);
      
      // For very large files, warn the user
      const totalSize = files.reduce((sum, file) => sum + file.size, 0);
      if (totalSize > 10 * 1024 * 1024) { // Over 10MB
        console.log("Large files detected:", totalSize / (1024 * 1024), "MB");
      }
    } catch (error) {
      console.error("Error processing files:", error);
      toast.error("Failed to process the selected images");
    }
  }, []);

  const handleRemoveImage = useCallback((index: number) => {
    // Revoke the URL to prevent memory leaks
    if (previewUrls[index]) {
      URL.revokeObjectURL(previewUrls[index]);
    }
    
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    
    // Reset PDF if all images are removed
    if (selectedFiles.length === 1) {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
        setPdfUrl(null);
      }
    }
  }, [previewUrls, selectedFiles, pdfUrl]);

  const handleRemoveAllImages = useCallback(() => {
    // Revoke all preview URLs
    previewUrls.forEach(url => {
      URL.revokeObjectURL(url);
    });
    
    // Revoke PDF URL if it exists
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }
    
    setSelectedFiles([]);
    setPreviewUrls([]);
    setPdfUrl(null);
  }, [previewUrls, pdfUrl]);

  const handleConvert = useCallback(() => {
    if (previewUrls.length === 0) return;
    
    setIsConverting(true);
    toast.loading(`Converting ${previewUrls.length > 1 ? 'images' : 'image'}...`);
    
    simulateConversion(previewUrls)
      .then((url) => {
        setPdfUrl(url);
        toast.dismiss();
        toast.success(`${previewUrls.length > 1 ? 'Images' : 'Image'} successfully converted to PDF!`);
      })
      .catch((error) => {
        console.error("Conversion error:", error);
        toast.dismiss();
        toast.error("Error converting images. Please try again.");
      })
      .finally(() => {
        setIsConverting(false);
      });
  }, [previewUrls]);

  // Determine if we have substantial content to show ads
  const hasSubstantialContent = previewUrls.length > 0 || hasUserInteracted;

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Image2PDF - Free Online Image to PDF Converter Tool</title>
        <meta name="description" content="Convert JPG, PNG, and other image formats to PDF for free. No registration, no watermarks. Secure, fast, and easy-to-use online image to PDF converter." />
        <link rel="canonical" href="https://image2pdf.site/" />
      </Helmet>
      
      <BackgroundAnimation />
      <Header />
      
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-10">
        {/* Hero Section */}
        <section className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Transform Images to <span className="bg-gradient-primary bg-clip-text text-transparent">PDFs</span> in Seconds
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert single or multiple images to PDF while preserving exact dimensions and quality. Free, secure, and no registration required.
          </p>
        </section>
        
        {/* Converter Section - Main content for AdSense compliance */}
        <section className="mb-12 max-w-3xl mx-auto">
          <ImageUploader 
            onImageSelect={handleImageSelect}
            selectedImages={previewUrls.length > 0 ? previewUrls : null}
            onRemoveImage={handleRemoveImage}
            onRemoveAllImages={handleRemoveAllImages}
          />
          
          <ConversionArea 
            hasImages={previewUrls.length > 0}
            onConvert={handleConvert}
            downloadUrl={pdfUrl}
            isConverting={isConverting}
            imageCount={previewUrls.length}
          />
        </section>
        
        {/* AdSense placement - Only shown when there's content on the page and user has interacted */}
        <AdPlacement 
          format="horizontal" 
          contentLoaded={hasSubstantialContent && !isConverting} 
        />
        
        {/* How to Use Section - Additional valuable content */}
        <HowToUse />
        
        {/* More Valuable Content for SEO and AdSense compliance */}
        <section className="py-16 px-6 sm:px-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Choose Image2PDF?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">100% Free & No Watermarks</h3>
                <p className="text-muted-foreground">
                  Unlike many other conversion tools, Image2PDF is completely free to use with no hidden fees or watermarks on your documents. We believe essential digital tools should be accessible to everyone.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">Privacy First Approach</h3>
                <p className="text-muted-foreground">
                  Your images are processed entirely in your browser and never uploaded to any server. This ensures your sensitive documents remain private and secure throughout the conversion process.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">High-Quality Conversion</h3>
                <p className="text-muted-foreground">
                  Our tool preserves the original dimensions and quality of your images, resulting in professional-looking PDF documents suitable for both personal and business use.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">No Installation Required</h3>
                <p className="text-muted-foreground">
                  Image2PDF works directly in your web browser - no need to download or install any software. Access our tool anytime, from any device with an internet connection.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Bottom AdSense placement - Only shown when there's substantial content */}
        <AdPlacement 
          format="rectangle" 
          className="mt-8 mb-12" 
          contentLoaded={hasSubstantialContent && !isConverting}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
