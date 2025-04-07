
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useJPGtoPNG } from '@/components/conversion/JPGtoPNGProvider';
import ImageUploader from '@/components/image-uploader';
import JPGtoPNGConversionArea from '@/components/JPGtoPNGConversionArea';
import SpaceBackground from '@/components/SpaceBackground';
import HowToUse from '@/components/HowToUse';
import { Helmet } from 'react-helmet-async';
import AdPlacement from '@/components/AdPlacement';

const JPGtoPNG = () => {
  const {
    selectedFiles,
    previewUrls,
    convertedImages,
    isConverting,
    hasUserInteracted,
    handleImageSelect,
    handleRemoveImage,
    handleRemoveAllImages,
    handleConvert
  } = useJPGtoPNG();

  return (
    <>
      <Helmet>
        <title>JPG to PNG Converter - Free Online Tool</title>
        <meta name="description" content="Convert JPG images to PNG format online for free. No registration or installation required. Process files securely in your browser." />
      </Helmet>
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 tracking-tight animate-fade-in">
              <span className="bg-gradient-primary bg-clip-text text-transparent">JPG</span>
              <span className="text-white"> to </span>
              <span className="bg-gradient-primary bg-clip-text text-transparent">PNG</span>
              <span className="text-white"> Converter</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Convert JPG/JPEG images to PNG format with transparency support. Free, secure, and browser-based.
            </p>
          </div>
          
          {/* Top ad placement */}
          <div className="mb-8">
            <AdPlacement format="horizontal" contentLoaded={hasUserInteracted} />
          </div>
          
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="w-full max-w-md">
              <ImageUploader
                onImageSelect={handleImageSelect}
                selectedImages={previewUrls}
                onRemoveImage={handleRemoveImage}
                onRemoveAllImages={handleRemoveAllImages}
                acceptedFileTypes="image/jpeg,image/jpg"
                restrictionMessage="Please select JPG/JPEG files only"
              />
            </div>
          </div>
          
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="w-full max-w-md">
              <JPGtoPNGConversionArea
                hasImages={previewUrls.length > 0}
                onConvert={handleConvert}
                isConverting={isConverting}
                imageCount={previewUrls.length}
                convertedImages={convertedImages}
              />
            </div>
          </div>
          
          {/* Bottom ad placement */}
          <div className="my-8">
            <AdPlacement format="rectangle" contentLoaded={hasUserInteracted} className="mx-auto" />
          </div>
          
          <div className="mt-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <HowToUse />
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default JPGtoPNG;
