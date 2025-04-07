
import React from 'react';
import { useImageConversion } from '@/components/conversion/ImageConversionProvider';
import ImageUploader from '@/components/ImageUploader';
import ConversionArea from '@/components/ConversionArea';
import { FileImage } from 'lucide-react';
import HowToUse from '@/components/HowToUse';
import { Helmet } from 'react-helmet-async';
import SpaceBackground from '@/components/SpaceBackground';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ConverterSection = () => {
  const {
    selectedFiles,
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
        <title>Image to PDF Converter - Free Online Tool</title>
        <meta name="description" content="Convert JPG, PNG, GIF, and other image formats to PDF online. Free, secure with no watermarks." />
      </Helmet>
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 tracking-tight animate-fade-in">
              <span className="bg-gradient-primary bg-clip-text text-transparent">Image</span>
              <span className="text-white"> to </span>
              <span className="bg-gradient-primary bg-clip-text text-transparent">PDF</span>
              <span className="text-white"> Converter</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Convert JPG, PNG, GIF, and other image formats to PDF online.
              Free, secure with no watermarks.
            </p>
          </div>
          
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="w-full max-w-md">
              <ImageUploader
                onImageSelect={handleImageSelect}
                selectedImages={previewUrls}
                onRemoveImage={handleRemoveImage}
                onRemoveAllImages={handleRemoveAllImages}
              />
            </div>
          </div>
          
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <ConversionArea
              hasImages={previewUrls.length > 0}
              onConvert={handleConvert}
              downloadUrl={pdfUrl}
              isConverting={isConverting}
              imageCount={previewUrls.length}
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

export default ConverterSection;
