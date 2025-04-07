
import React, { useState, useRef, useCallback } from 'react';
import UploadArea from './UploadArea';
import ImagePreviewGrid from './ImagePreviewGrid';
import { useImageValidation } from './useImageValidation';

interface ImageUploaderProps {
  onImageSelect: (files: File[]) => void;
  selectedImages: string[] | null;
  onRemoveImage: (index: number) => void;
  onRemoveAllImages: () => void;
  acceptedFileTypes?: string;
  restrictionMessage?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageSelect, 
  selectedImages,
  onRemoveImage,
  onRemoveAllImages,
  acceptedFileTypes = "image/*",
  restrictionMessage = "Please select image files only"
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { validateAndProcessFiles } = useImageValidation({
    onImageSelect,
    acceptedFileTypes,
    restrictionMessage
  });

  const handleBrowseClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFiles(Array.from(e.target.files));
    }
    
    // Reset the file input value so the same file(s) can be selected again
    if (e.target.value) {
      e.target.value = '';
    }
  }, [validateAndProcessFiles]);

  // Render image previews if images are selected
  if (selectedImages && selectedImages.length > 0) {
    return (
      <ImagePreviewGrid 
        selectedImages={selectedImages}
        onRemoveImage={onRemoveImage}
        onRemoveAllImages={onRemoveAllImages}
        onAddMoreImages={handleBrowseClick}
      />
    );
  }

  // Render upload area if no image is selected
  return (
    <>
      <UploadArea 
        onImageSelect={onImageSelect}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
        acceptedFileTypes={acceptedFileTypes}
        restrictionMessage={restrictionMessage}
        validateAndProcessFiles={validateAndProcessFiles}
      />
      <input
        type="file"
        className="hidden"
        accept={acceptedFileTypes}
        ref={fileInputRef}
        onChange={handleFileInput}
        multiple
      />
    </>
  );
};

export default ImageUploader;
