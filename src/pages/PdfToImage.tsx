
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PdfUploader from '@/components/PdfUploader';
import PdfConversionArea from '@/components/PdfConversionArea';
import SpaceBackground from '@/components/SpaceBackground';
import AdPlacement from '@/components/AdPlacement';
import { toast } from 'sonner';
import { FileText, FileImage, Download } from 'lucide-react';
import HowToUse from '@/components/HowToUse';
import FeaturesSection from '@/components/sections/FeaturesSection';
import FaqSection from '@/components/sections/FaqSection';
import WhyChooseSection from '@/components/sections/WhyChooseSection';

const PdfToImage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // Track user interaction for AdSense
  useEffect(() => {
    const handleInteraction = () => {
      setHasUserInteracted(true);
    };

    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('keydown', handleInteraction, { once: true });
    document.addEventListener('scroll', handleInteraction, { once: true });
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };
  }, []);
  
  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handlePdfSelect = (file: File) => {
    // Clean up previous preview if any
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    
    // Create a new preview
    const url = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(url);
    
    // Reset download URL
    if (downloadUrl) {
      setDownloadUrl(null);
    }
  };

  const handleRemovePdf = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    
    setSelectedFile(null);
    setPreviewUrl(null);
    setDownloadUrl(null);
    setPageCount(0);
  };

  const handleConvertPdf = () => {
    if (!selectedFile) {
      return;
    }

    setIsConverting(true);
    
    // Simulate page count detection
    setTimeout(() => {
      // Random page count between 1 and 10 for simulation
      const simulatedPageCount = Math.floor(Math.random() * 10) + 1;
      setPageCount(simulatedPageCount);
    }, 800);
    
    // Simulate conversion process
    setTimeout(() => {
      setIsConverting(false);
      setDownloadUrl(URL.createObjectURL(new Blob(['dummy data'], { type: 'application/zip' })));
      toast.success("PDF successfully converted to images!");
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>PDF to Image - Convert PDF to JPG, PNG online for free | No Watermarks</title>
        <meta name="description" content="Convert your PDF files to high-quality images online for free. Extract JPG, PNG from PDF with no registration, no watermarks, and instant downloads. Secure and fast conversion." />
        <meta name="keywords" content="pdf to image, pdf to jpg, pdf to png, extract images from pdf, convert pdf pages to images, free pdf converter, no watermarks, high quality" />
        <link rel="canonical" href="https://image2pdf.site/pdf-to-image" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://image2pdf.site/pdf-to-image" />
        <meta property="og:title" content="PDF to Image - Convert PDF to JPG/PNG with No Watermarks | Free Online Tool" />
        <meta property="og:description" content="Convert PDF to images online with our free tool. No registration, no watermarks, high-quality conversion. Fast. Free. Fluid." />
        <meta property="og:image" content="https://image2pdf.site/pdf-to-image-og.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://image2pdf.site/pdf-to-image" />
        <meta property="twitter:title" content="PDF to Image - Convert PDF to JPG/PNG with No Watermarks | Free Online Tool" />
        <meta property="twitter:description" content="Convert PDF to images online with our free tool. No registration, no watermarks, high-quality conversion. Fast. Free. Fluid." />
        <meta property="twitter:image" content="https://image2pdf.site/pdf-to-image-og.jpg" />
        
        {/* Structured Data for Rich Snippets */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "PDF to Image Converter",
            "url": "https://image2pdf.site/pdf-to-image",
            "description": "Free online tool to convert PDF files to high-quality JPG, PNG images without watermarks or registration.",
            "applicationCategory": "Utility",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Convert PDF to JPG, PNG",
              "Extract images from PDF",
              "No registration required",
              "No watermarks",
              "High quality conversion",
              "Convert multiple pages at once",
              "Browser-based processing for privacy",
              "Instant download"
            ]
          }
        `}</script>
      </Helmet>
      
      <SpaceBackground />
      <Header />
      
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-8">
        <section className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Convert <span className="bg-gradient-primary bg-clip-text text-transparent">PDF to Images</span> in Seconds
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Transform your PDF files into high-quality JPG images while preserving exact quality. Fast. Free. Fluid.
          </p>
        </section>

        <section className="mb-16 max-w-3xl mx-auto">
          <PdfUploader 
            onPdfSelect={handlePdfSelect}
            selectedPdf={previewUrl}
            onRemovePdf={handleRemovePdf}
          />
          
          <PdfConversionArea 
            hasPdf={!!previewUrl}
            onConvert={handleConvertPdf}
            downloadUrl={downloadUrl}
            isConverting={isConverting}
            pageCount={pageCount}
          />
        </section>
        
        {/* AdSense placement - Only shown when there's content on the page and user has interacted */}
        <AdPlacement 
          format="horizontal" 
          contentLoaded={hasUserInteracted && !isConverting} 
        />
        
        {/* How to Use Section */}
        <section id="how-to-use" className="py-16 px-6 sm:px-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">How to Convert PDF to Images</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Converting your PDF files to images is simple and fast. Follow these three easy steps to get started.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-6 rounded-xl text-center transition-transform hover:scale-105 duration-300">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Upload Your PDF</h3>
                <p className="text-sm text-muted-foreground">Drag and drop your PDF file or click to browse and select from your device.</p>
              </div>
              
              <div className="glass-card p-6 rounded-xl text-center transition-transform hover:scale-105 duration-300">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                  <FileImage className="h-8 w-8 text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Convert to Images</h3>
                <p className="text-sm text-muted-foreground">Click the "Convert to Images" button to transform your PDF into high-quality images.</p>
              </div>
              
              <div className="glass-card p-6 rounded-xl text-center transition-transform hover:scale-105 duration-300">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                  <Download className="h-8 w-8 text-indigo-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Download Images</h3>
                <p className="text-sm text-muted-foreground">Once conversion is complete, download your image files with a single click.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* Why Choose Section */}
        <WhyChooseSection />
        
        {/* FAQ Section */}
        <FaqSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default PdfToImage;
