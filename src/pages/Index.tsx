
import React, { useState, useCallback } from 'react';
import { toast } from "sonner";
import { simulateConversion } from '@/utils/pdfConverter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageUploader from '@/components/ImageUploader';
import ConversionArea from '@/components/ConversionArea';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import HowToUse from '@/components/HowToUse';

const Index = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const handleImageSelect = useCallback((files: File[]) => {
    try {
      // Create preview URLs for all files
      const urls = files.map(file => URL.createObjectURL(file));
      
      // Combine with existing files/urls if any
      setSelectedFiles(prev => [...prev, ...files]);
      setPreviewUrls(prev => [...prev, ...urls]);
      setPdfUrl(null); // Reset previous conversion
      
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

  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundAnimation />
      <Header />
      
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-10">
        {/* Hero Section */}
        <section className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Transform Images to <span className="bg-gradient-primary bg-clip-text text-transparent">PDFs</span> in Seconds
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert single or multiple images to PDF while preserving exact dimensions and quality
          </p>
        </section>
        
        {/* Converter Section */}
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
        
        {/* How to Use Section */}
        <HowToUse />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
