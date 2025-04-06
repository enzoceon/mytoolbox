
import React, { useState, useCallback, useEffect } from 'react';
import { toast } from "sonner";
import { simulateConversion } from '@/utils/pdfConverter';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import HowToUse from '@/components/HowToUse';
import AdPlacement from '@/components/AdPlacement';
import HeroSection from '@/components/sections/HeroSection';
import ConverterSection from '@/components/sections/ConverterSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import WhyChooseSection from '@/components/sections/WhyChooseSection';
import FaqSection from '@/components/sections/FaqSection';

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
        <title>Image to PDF - Free Online Image to PDF Converter | No Registration Required</title>
        <meta name="description" content="Instantly convert JPG, PNG, GIF, BMP, WEBP, TIFF and other image formats to PDF for free. No registration, no watermarks, no file size limits. Fast. Free. Fluid." />
        <meta name="keywords" content="image to pdf, jpg to pdf, png to pdf, image converter, pdf creator, free conversion, no watermarks, batch conversion, high quality, online tool" />
        <link rel="canonical" href="https://image2pdf.site/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://image2pdf.site/" />
        <meta property="og:title" content="Image to PDF - Convert Images to PDF Instantly | 100% Free" />
        <meta property="og:description" content="Convert images to PDF with just a few clicks. Free, secure, browser-based conversion with no watermarks or registration. Fast. Free. Fluid." />
        <meta property="og:image" content="https://image2pdf.site/og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://image2pdf.site/" />
        <meta property="twitter:title" content="Image to PDF - Convert Images to PDF Instantly | 100% Free" />
        <meta property="twitter:description" content="Convert images to PDF with just a few clicks. Free, secure, browser-based conversion with no watermarks or registration. Fast. Free. Fluid." />
        <meta property="twitter:image" content="https://image2pdf.site/og-image.jpg" />
        
        {/* Structured Data for Rich Snippets */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Image to PDF",
            "url": "https://image2pdf.site/",
            "description": "Free online tool to convert images to PDF documents without watermarks or registration. Fast. Free. Fluid.",
            "applicationCategory": "Utility",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Convert JPG, PNG, GIF, BMP, WEBP, TIFF to PDF",
              "No registration required",
              "No watermarks",
              "High quality conversion",
              "Multiple images to single PDF",
              "Browser-based processing for privacy",
              "Instant download"
            ]
          }
        `}</script>
      </Helmet>
      
      <BackgroundAnimation />
      <Header />
      
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Converter Section - Main content for AdSense compliance */}
        <ConverterSection 
          selectedFiles={selectedFiles}
          previewUrls={previewUrls}
          pdfUrl={pdfUrl}
          isConverting={isConverting}
          hasUserInteracted={hasUserInteracted}
          onImageSelect={handleImageSelect}
          onRemoveImage={handleRemoveImage}
          onRemoveAllImages={handleRemoveAllImages}
          onConvert={handleConvert}
        />
        
        {/* How to Use Section - Additional valuable content */}
        <HowToUse />
        
        {/* Key Features Section - Added for SEO and user value */}
        <FeaturesSection />
        
        {/* More Valuable Content for SEO and AdSense compliance */}
        <WhyChooseSection />
        
        {/* FAQ Section - Great for SEO */}
        <FaqSection />
        
        {/* Bottom AdSense placement - Only shown when there's substantial content */}
        <AdPlacement 
          format="rectangle" 
          className="mb-8" 
          contentLoaded={hasSubstantialContent && !isConverting}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
