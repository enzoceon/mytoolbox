
import React from 'react';
import { useJPGtoPNG } from '@/components/conversion/JPGtoPNGProvider';
import ImageUploader from '@/components/image-uploader';
import JPGtoPNGConversionArea from '@/components/JPGtoPNGConversionArea';
import { FileImage } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SpaceBackground from '@/components/SpaceBackground';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HowToUse from '@/components/HowToUse';

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
        <meta name="description" content="Convert JPG images to PNG format online. Free, secure with no watermarks. High-quality conversion directly in your browser." />
      </Helmet>
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 tracking-tight animate-fade-in">
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">JPG</span>
              <span className="text-white"> to </span>
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">PNG</span>
              <span className="text-white"> Converter</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Convert JPG/JPEG images to PNG format with ease. 
              Free, secure, and browser-based.
            </p>
          </div>
          
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="w-full max-w-md">
              <div className="drop-area border-2 border-dashed border-purple-500/30 rounded-xl p-10">
                <ImageUploader
                  onImageSelect={handleImageSelect}
                  selectedImages={previewUrls}
                  onRemoveImage={handleRemoveImage}
                  onRemoveAllImages={handleRemoveAllImages}
                  acceptedFileTypes="image/jpeg,image/jpg"
                  restrictionMessage="Please select JPG/JPEG files only"
                />
                {!previewUrls || previewUrls.length === 0 ? (
                  <div className="text-center mt-4">
                    <p className="text-xl font-semibold text-white">Drop your JPG here</p>
                    <p className="text-sm text-gray-400 mt-2">Select a JPG file to convert to PNG</p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <JPGtoPNGConversionArea
              hasImages={previewUrls.length > 0}
              onConvert={handleConvert}
              isConverting={isConverting}
              imageCount={previewUrls.length}
              convertedImages={convertedImages}
            />
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

export default JPGtoPNG;
