
import React from 'react';
import { useImageConversion } from '@/components/conversion/ImageConversionProvider';
import ImagePreviewGrid from '@/components/image-uploader/ImagePreviewGrid';
import ConversionArea from '@/components/ConversionArea';
import HowToUse from '@/components/HowToUse';
import { Helmet } from 'react-helmet-async';
import SpaceBackground from '@/components/SpaceBackground';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UploadBox from '@/components/UploadBox';
import BackButton from '@/components/BackButton';

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

  // Handler for the UploadBox component
  const handleFileSelect = (files: FileList) => {
    handleImageSelect(Array.from(files));
  };

  return (
    <>
      <Helmet>
        <title>Image to PDF Converter - Free Online Tool</title>
        <meta name="description" content="Convert JPG, PNG, GIF, and other image formats to PDF online. Free, secure with no watermarks." />
        <link rel="canonical" href="https://everytools.site/image-to-pdf" />
      </Helmet>
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
          <BackButton />
          
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
            {previewUrls.length > 0 ? (
              <div className="w-full max-w-md">
                <ImagePreviewGrid
                  selectedImages={previewUrls}
                  onRemoveImage={handleRemoveImage}
                  onRemoveAllImages={handleRemoveAllImages}
                  onAddMoreImages={() => document.getElementById('image-file-input')?.click()}
                />
                
                <input
                  id="image-file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files && handleImageSelect(Array.from(e.target.files))}
                  multiple
                  className="hidden"
                />
              </div>
            ) : (
              <UploadBox 
                title="Drop your images here"
                subtitle="Select images to convert to PDF"
                acceptedFileTypes="image/*"
                onFileSelect={handleFileSelect}
                multiple={true}
              />
            )}
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
