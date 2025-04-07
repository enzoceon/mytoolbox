
import React from 'react';
import { useImageConversion } from '@/components/conversion/ImageConversionProvider';
import ConversionArea from '@/components/ConversionArea';
import ImageUploader from '@/components/ImageUploader';
import { FileImage } from 'lucide-react';

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
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
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

        <div className="glass-card overflow-hidden rounded-xl">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center space-x-3 justify-center">
            <FileImage className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-medium text-foreground">Upload Images</h2>
          </div>
          
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
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
      </div>
    </section>
  );
};

export default ConverterSection;
