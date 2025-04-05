
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
import { FileImage, Check, Clock, FileCheck } from 'lucide-react';

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
        <title>Image2PDF - Free Online Image to PDF Converter | No Registration Required</title>
        <meta name="description" content="Instantly convert JPG, PNG, GIF, BMP, WEBP, TIFF and other image formats to PDF for free. No registration, no watermarks, no file size limits. Privacy-focused browser-based conversion." />
        <link rel="canonical" href="https://image2pdf.site/" />
        <meta name="keywords" content="image to pdf converter, jpg to pdf, png to pdf, convert image to pdf online, free pdf converter, image conversion tool, browser-based pdf conversion, no watermarks, privacy-focused" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://image2pdf.site/" />
        <meta property="og:title" content="Image2PDF - Convert Images to PDF Instantly | 100% Free" />
        <meta property="og:description" content="Convert images to PDF with just a few clicks. Free, secure, browser-based conversion with no watermarks or registration." />
        <meta property="og:image" content="https://image2pdf.site/og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://image2pdf.site/" />
        <meta property="twitter:title" content="Image2PDF - Convert Images to PDF Instantly | 100% Free" />
        <meta property="twitter:description" content="Convert images to PDF with just a few clicks. Free, secure, browser-based conversion with no watermarks or registration." />
        <meta property="twitter:image" content="https://image2pdf.site/og-image.jpg" />
        
        {/* Structured Data for Rich Snippets */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Image2PDF",
            "url": "https://image2pdf.site/",
            "description": "Free online tool to convert images to PDF documents without watermarks or registration.",
            "applicationCategory": "Utility",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          }
        `}</script>
      </Helmet>
      
      <BackgroundAnimation />
      <Header />
      
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <section className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Transform Images to <span className="bg-gradient-primary bg-clip-text text-transparent">PDFs</span> in Seconds
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert single or multiple images to PDF while preserving exact dimensions and quality. Free, secure, and no registration required.
          </p>
        </section>
        
        {/* Converter Section - Main content for AdSense compliance */}
        <section className="mb-8 max-w-3xl mx-auto">
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
        
        {/* Key Features Section - Added for SEO and user value */}
        <section className="py-6 px-4 sm:px-8 my-2">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Key Features</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="glass-card p-4 rounded-xl flex flex-col items-center text-center">
                <Check className="h-10 w-10 text-green-500 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Privacy Focused</h3>
                <p className="text-sm text-muted-foreground">
                  All processing happens in your browser. Your files never leave your device.
                </p>
              </div>
              
              <div className="glass-card p-4 rounded-xl flex flex-col items-center text-center">
                <FileImage className="h-10 w-10 text-blue-500 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Multiple Formats</h3>
                <p className="text-sm text-muted-foreground">
                  Supports JPG, PNG, GIF, BMP, WEBP, TIFF and more image formats.
                </p>
              </div>
              
              <div className="glass-card p-4 rounded-xl flex flex-col items-center text-center">
                <Clock className="h-10 w-10 text-amber-500 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Convert your images to PDF in seconds with our optimized processing.
                </p>
              </div>
              
              <div className="glass-card p-4 rounded-xl flex flex-col items-center text-center">
                <FileCheck className="h-10 w-10 text-purple-500 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Quality Preserved</h3>
                <p className="text-sm text-muted-foreground">
                  Maintains original image quality and resolution in the PDF output.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* More Valuable Content for SEO and AdSense compliance */}
        <section className="py-6 px-4 sm:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Choose Image2PDF?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
        
        {/* FAQ Section - Great for SEO */}
        <section className="py-6 px-4 sm:px-8 mb-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-4 mt-6">
              <div className="glass-card p-5 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">How do I convert images to PDF?</h3>
                <p className="text-muted-foreground">
                  Simply drag and drop your images onto the upload area, or click to select files from your device. Once uploaded, click the "Convert to PDF" button and download your PDF when ready.
                </p>
              </div>
              
              <div className="glass-card p-5 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">What image formats are supported?</h3>
                <p className="text-muted-foreground">
                  Image2PDF supports all common image formats including JPG, JPEG, PNG, GIF, BMP, WEBP, and TIFF. If you have images in other formats, you may need to convert them first.
                </p>
              </div>
              
              <div className="glass-card p-5 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">Is there a limit to how many images I can convert?</h3>
                <p className="text-muted-foreground">
                  You can convert multiple images at once, but for optimal performance, we recommend keeping the total file size under 50MB. If you need to convert larger batches, you may want to process them in smaller groups.
                </p>
              </div>
              
              <div className="glass-card p-5 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">Are my images safe when using this tool?</h3>
                <p className="text-muted-foreground">
                  Absolutely! Your images are processed entirely in your browser and never uploaded to our servers. This ensures complete privacy and security for your sensitive documents.
                </p>
              </div>
            </div>
          </div>
        </section>
        
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
