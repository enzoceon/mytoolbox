
import React from 'react';
import { useImageConversion } from '@/components/conversion/ImageConversionProvider';
import ConversionArea from '@/components/ConversionArea';
import ImageUploader from '@/components/ImageUploader';

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
    <section id="converter" className="bg-[#020814] min-h-screen flex flex-col items-center pt-12 pb-16">
      <div className="max-w-2xl mx-auto text-center mb-8 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-primary bg-clip-text text-transparent">Image</span>
          <span className="text-white"> to </span>
          <span className="bg-gradient-primary bg-clip-text text-transparent">PDF</span>
          <span className="text-white"> Converter</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-xl mx-auto">
          Convert single or multiple images to PDF while preserving exact dimensions and quality. Free, secure, and no registration required.
        </p>
      </div>

      <div className="w-full max-w-md mx-auto px-4">
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
    </section>
  );
};

export default ConverterSection;
