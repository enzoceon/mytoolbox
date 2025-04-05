
import React from 'react';
import ImageUploader from '@/components/ImageUploader';
import ConversionArea from '@/components/ConversionArea';
import AdPlacement from '@/components/AdPlacement';

interface ConverterSectionProps {
  selectedFiles: File[];
  previewUrls: string[];
  pdfUrl: string | null;
  isConverting: boolean;
  hasUserInteracted: boolean;
  onImageSelect: (files: File[]) => void;
  onRemoveImage: (index: number) => void;
  onRemoveAllImages: () => void;
  onConvert: () => void;
}

const ConverterSection: React.FC<ConverterSectionProps> = ({
  selectedFiles,
  previewUrls,
  pdfUrl,
  isConverting,
  hasUserInteracted,
  onImageSelect,
  onRemoveImage,
  onRemoveAllImages,
  onConvert
}) => {
  // Determine if we have substantial content to show ads
  const hasSubstantialContent = previewUrls.length > 0 || hasUserInteracted;
  
  return (
    <>
      <section className="mb-8 max-w-3xl mx-auto">
        <ImageUploader 
          onImageSelect={onImageSelect}
          selectedImages={previewUrls.length > 0 ? previewUrls : null}
          onRemoveImage={onRemoveImage}
          onRemoveAllImages={onRemoveAllImages}
        />
        
        <ConversionArea 
          hasImages={previewUrls.length > 0}
          onConvert={onConvert}
          downloadUrl={pdfUrl}
          isConverting={isConverting}
          imageCount={previewUrls.length}
        />
      </section>
      
      {/* AdSense placement - Only shown when there's content on the page and user has interacted */}
      <AdPlacement 
        format="horizontal" 
        contentLoaded={hasSubstantialContent && !isConverting} 
      />
    </>
  );
};

export default ConverterSection;
