
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const handleImageSelect = useCallback((file: File) => {
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File too large. Please select an image under 10MB.");
      return;
    }

    // Create preview URL
    const url = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(url);
    setPdfUrl(null); // Reset previous conversion
  }, []);

  const handleRemoveImage = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setPdfUrl(null);
  }, [previewUrl]);

  const handleConvert = useCallback(() => {
    if (!previewUrl) return;
    
    setIsConverting(true);
    simulateConversion(previewUrl)
      .then((url) => {
        setPdfUrl(url);
        toast.success("Image successfully converted to PDF!");
      })
      .catch((error) => {
        console.error("Conversion error:", error);
        toast.error("Error converting image. Please try again.");
      })
      .finally(() => {
        setIsConverting(false);
      });
  }, [previewUrl]);

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
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Our free online tool quickly converts your images to PDF documents.
            No registration required.
          </p>
        </section>
        
        {/* Converter Section */}
        <section className="mb-12 max-w-3xl mx-auto">
          <ImageUploader 
            onImageSelect={handleImageSelect}
            selectedImage={previewUrl}
            onRemoveImage={handleRemoveImage}
          />
          
          <ConversionArea 
            hasImage={!!previewUrl}
            onConvert={handleConvert}
            downloadUrl={pdfUrl}
            isConverting={isConverting}
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
