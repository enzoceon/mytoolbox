
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
    <section id="converter" className="my-8 glass-card p-8 rounded-xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Convert Images to PDF
      </h2>
      
      <div className="my-8">
        <div className="flex flex-col items-center">
          <ImageUploader
            onImageSelect={handleImageSelect}
            selectedImages={previewUrls}
            onRemoveImage={handleRemoveImage}
            onRemoveAll={handleRemoveAllImages}
          />
          
          <ConversionArea
            hasImages={previewUrls.length > 0}
            onConvert={handleConvert}
            downloadUrl={pdfUrl}
            isConverting={isConverting}
            imageCount={previewUrls.length}
          />
        </div>
      </div>
    </section>
  );
};

export default ConverterSection;
