
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useJPGtoPNG } from '@/components/conversion/JPGtoPNGProvider';
import JPGtoPNGConversionArea from '@/components/JPGtoPNGConversionArea';
import HowToUse from '@/components/HowToUse';
import SpaceBackground from '@/components/SpaceBackground';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImagePreviewGrid from '@/components/image-uploader/ImagePreviewGrid';
import UploadBox from '@/components/UploadBox';
import BackButton from '@/components/BackButton'; // Added BackButton import

const JPGtoPNG = () => {
  const {
    selectedFiles,
    previewUrls,
    convertedImages,
    isConverting,
    handleImageSelect,
    handleRemoveImage,
    handleRemoveAllImages,
    handleConvert
  } = useJPGtoPNG();

  // Handler for the UploadBox component
  const handleFileSelect = (files: FileList) => {
    handleImageSelect(Array.from(files));
  };

  return (
    <>
      <Helmet>
        <title>JPG to PNG Converter - Free Online Tool</title>
        <meta name="description" content="Convert JPG and JPEG images to transparent PNG online. Free, secure with no watermarks." />
      </Helmet>
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
          <BackButton /> {/* Added BackButton component */}
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 tracking-tight animate-fade-in">
              <span className="bg-gradient-primary bg-clip-text text-transparent">JPG</span>
              <span className="text-white"> to </span>
              <span className="bg-gradient-primary bg-clip-text text-transparent">PNG</span>
              <span className="text-white"> Converter</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Convert JPG images to transparent PNG format online.
              Free, secure with no watermarks.
            </p>
          </div>
          
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {previewUrls.length > 0 ? (
              <div className="w-full max-w-md">
                <ImagePreviewGrid
                  selectedImages={previewUrls}
                  onRemoveImage={handleRemoveImage}
                  onRemoveAllImages={handleRemoveAllImages}
                  onAddMoreImages={() => document.getElementById('jpg-file-input')?.click()}
                />
                
                <input
                  id="jpg-file-input"
                  type="file"
                  accept="image/jpeg,image/jpg"
                  onChange={(e) => e.target.files && handleImageSelect(Array.from(e.target.files))}
                  multiple
                  className="hidden"
                />
              </div>
            ) : (
              <UploadBox 
                title="Drop your JPG here"
                subtitle="Select a JPG file to convert to PNG"
                acceptedFileTypes="image/jpeg,image/jpg"
                onFileSelect={handleFileSelect}
                multiple={true}
              />
            )}
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
