
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PdfUploader from '@/components/PdfUploader';
import PdfConversionArea from '@/components/PdfConversionArea';
import SpaceBackground from '@/components/SpaceBackground';
import HowToUse from '@/components/HowToUse';
import { Helmet } from 'react-helmet-async';
import PdfWorkerSetup from '@/components/PdfWorkerSetup';
import { usePdfConverter } from '@/hooks/usePdfConverter';
import PdfConversionResult from '@/components/PdfConversionResult';
import { ArrowDown } from 'lucide-react';

const PdfToImage = () => {
  const {
    selectedPdf,
    pdfUrl,
    downloadUrl,
    isConverting,
    pageCount,
    convertedImages,
    handlePdfSelect,
    handleRemovePdf,
    convertPdfToImage
  } = usePdfConverter();
  
  const [showAnimation, setShowAnimation] = useState(false);
  
  // Show conversion animation when user hits convert
  const handleConvertClick = () => {
    setShowAnimation(true);
    convertPdfToImage();
    
    // Reset animation state after conversion is done
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  };
  
  return (
    <>
      <Helmet>
        <title>PDF to Image Converter - Free Online Tool</title>
        <meta name="description" content="Convert PDF files to high-quality images (JPG, PNG) for free. No registration or installation required. Process files securely in your browser." />
      </Helmet>
      
      <PdfWorkerSetup />
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 tracking-tight bg-gradient-primary bg-clip-text text-transparent animate-fade-in">
              PDF to Image Converter
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Convert PDF files to high-quality images with ease. Free, secure, and browser-based.
            </p>
          </div>
          
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="w-full max-w-md">
              <PdfUploader
                onPdfSelect={handlePdfSelect}
                selectedPdf={pdfUrl}
                onRemovePdf={handleRemovePdf}
                pageCount={pageCount}
              />
            </div>
          </div>
          
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {selectedPdf && !downloadUrl && !isConverting && (
              <button
                onClick={handleConvertClick}
                className="px-8 py-3 rounded-md pulse-btn font-medium shadow-md hover:shadow-lg transition-shadow flex items-center mt-10"
                disabled={isConverting}
              >
                Convert PDF to Images
              </button>
            )}
            
            {isConverting && (
              <div className="w-full max-w-md flex flex-col items-center mt-10">
                <div className="mb-6 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                    <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    Converting PDF to images...
                    {pageCount > 0 && ` (${pageCount} pages)`}
                  </p>
                </div>
                
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-accent animate-progress rounded-full" />
                </div>
              </div>
            )}
            
            {showAnimation && !downloadUrl && (
              <div className="my-6 flex flex-col items-center">
                <ArrowDown 
                  size={24} 
                  className="text-accent animate-bounce-soft"
                />
              </div>
            )}
            
            {downloadUrl && (
              <PdfConversionResult 
                downloadUrl={downloadUrl}
                convertedImages={convertedImages}
                onConvert={convertPdfToImage}
              />
            )}
          </div>
          
          <div className="mt-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <HowToUse />
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default PdfToImage;
