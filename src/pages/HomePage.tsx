
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useImageConversion } from '@/components/conversion/ImageConversionProvider';
import ImageUploader from '@/components/image-uploader';
import ConversionArea from '@/components/ConversionArea';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import HowToUse from '@/components/HowToUse';
import { Helmet } from 'react-helmet-async';
import AdPlacement from '@/components/AdPlacement';
import FaqSection from '@/components/sections/FaqSection';

const HomePage: React.FC = () => {
  const {
    previewUrls,
    pdfUrl,
    isConverting,
    hasUserInteracted,
    handleImageSelect,
    handleRemoveImage,
    handleRemoveAllImages,
    handleConvert
  } = useImageConversion();

  return (
    <>
      <Helmet>
        <title>Image to PDF - Free Online Converter | No Registration Required</title>
        <meta name="description" content="Convert JPG, PNG, GIF, BMP, WEBP, TIFF and other image formats to PDF for free. No registration, no watermarks, secure and easy to use." />
        <meta name="keywords" content="image to pdf, jpg to pdf, png to pdf, convert image to pdf, free image to pdf, online converter, image converter" />
        <meta property="og:title" content="Image to PDF - Free Online Converter | No Registration Required" />
        <meta property="og:description" content="Convert your images to PDF online with this free tool. No registration, no watermarks. Fast. Free. Fluid." />
      </Helmet>

      <BackgroundAnimation />
      
      <div className="min-h-[100dvh] flex flex-col">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="max-w-5xl mx-auto">
            {/* Title and description */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 glow-text">
                <span className="bg-gradient-primary bg-clip-text text-transparent">Image</span>
                <span className="text-foreground"> to </span>
                <span className="bg-gradient-primary bg-clip-text text-transparent">PDF</span>
                <span className="text-foreground"> Converter</span>
              </h1>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Convert JPG, PNG, GIF, and other image formats to PDF online.
                Free, secure with no watermarks.
              </p>
            </div>
            
            {/* Top ad placement */}
            <div className="mb-8">
              <AdPlacement format="horizontal" contentLoaded={hasUserInteracted} />
            </div>
            
            {/* Main converter card */}
            <div className="glass-card overflow-hidden rounded-xl shadow-lg mb-8">
              <div className="p-6">
                <ImageUploader
                  onImageSelect={handleImageSelect}
                  selectedImages={previewUrls}
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
              </div>
              
              {/* Features Section */}
              <div className="p-6 bg-muted/30">
                <h3 className="text-base font-medium text-center mb-4">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>
                    <p className="text-muted-foreground">100% free and no registration</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </div>
                    <p className="text-muted-foreground">Privacy-focused client-side processing</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
                        <line x1="18" y1="9" x2="12" y2="15" />
                        <line x1="12" y1="9" x2="18" y2="15" />
                      </svg>
                    </div>
                    <p className="text-muted-foreground">No watermarks in output PDF</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom ad placement */}
            <div className="my-8">
              <AdPlacement format="rectangle" contentLoaded={hasUserInteracted} className="mx-auto" />
            </div>
          </div>
          
          {/* How to use section */}
          <HowToUse />
          
          {/* FAQ section */}
          <FaqSection />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
