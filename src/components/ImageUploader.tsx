
import React, { useState, useRef, useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { toast } from "sonner";

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
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateAndProcessFiles = useCallback((files: File[]) => {
    // Check if we have specific file type restrictions
    if (acceptedFileTypes !== "image/*") {
      const acceptedTypes = acceptedFileTypes.split(',');
      const validFiles = Array.from(files).filter(file => 
        acceptedTypes.some(type => file.type === type)
      );
      
      if (validFiles.length === 0) {
        toast.error(restrictionMessage);
        return;
      }
      
      if (files.length !== validFiles.length) {
        toast.warning(`${files.length - validFiles.length} files were ignored due to invalid format`);
      }
      
      onImageSelect(validFiles);
      return;
    }
    
    // Default image file validation
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      toast.error(restrictionMessage);
      return;
    }
    
    if (files.length !== imageFiles.length) {
      toast.warning(`${files.length - imageFiles.length} non-image files were ignored`);
    }
    
    onImageSelect(imageFiles);
  }, [onImageSelect, acceptedFileTypes, restrictionMessage]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length) {
      validateAndProcessFiles(Array.from(files));
    }
  }, [validateAndProcessFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFiles(Array.from(e.target.files));
    }
    
    // Reset the file input value so the same file(s) can be selected again
    if (e.target.value) {
      e.target.value = '';
    }
  }, [validateAndProcessFiles]);

  const handleBrowseClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  // Render image previews if images are selected
  if (selectedImages && selectedImages.length > 0) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium text-foreground">Selected Images ({selectedImages.length})</h3>
          <button 
            onClick={onRemoveAllImages}
            className="text-xs px-2 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
          >
            Remove All
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {selectedImages.map((imgUrl, index) => (
            <div 
              key={index} 
              className="relative rounded-md overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <button 
                onClick={() => onRemoveImage(index)}
                className="absolute top-1 right-1 p-1 bg-white dark:bg-gray-800 rounded-full shadow-sm z-10"
                aria-label="Remove image"
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="aspect-w-3 aspect-h-2 bg-gray-100 dark:bg-gray-800">
                <img 
                  src={imgUrl} 
                  alt={`Preview ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
          
        <div className="text-center mt-4">
          <button
            className="px-4 py-2 text-sm bg-accent/10 text-accent rounded hover:bg-accent/20"
            onClick={handleBrowseClick}
          >
            Add More Images
          </button>
          <input
            type="file"
            className="hidden"
            accept={acceptedFileTypes}
            ref={fileInputRef}
            onChange={handleFileInput}
            multiple
          />
        </div>
      </div>
    );
  }

  // Render upload area if no image is selected
  return (
    <div className="w-full">
      <div 
        className={`drop-area w-full max-w-md mx-auto flex flex-col items-center justify-center ${isDragging ? 'drop-area-active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="mb-4 p-4 rounded-full bg-accent/10 text-accent">
          <Upload size={24} className="animate-bounce-soft" />
        </div>
        <h3 className="text-lg font-medium mb-2 text-foreground">Drop your images here</h3>
        <p className="text-sm text-muted-foreground mb-4 text-center">
          {acceptedFileTypes === "image/*" 
            ? "Select image files to convert" 
            : acceptedFileTypes.includes("jpeg") 
              ? "Select JPG/JPEG files to convert to PNG" 
              : "Select image files to convert"}
        </p>
        <div className="flex items-center space-x-2">
          <hr className="w-10 border-gray-200 dark:border-gray-700" />
          <span className="text-xs text-muted-foreground">OR</span>
          <hr className="w-10 border-gray-200 dark:border-gray-700" />
        </div>
        <button
          className="mt-4 px-6 py-2 rounded-md bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-all transform hover:scale-105 duration-200"
          onClick={handleBrowseClick}
        >
          Browse Files
        </button>
        <input
          type="file"
          className="hidden"
          accept={acceptedFileTypes}
          ref={fileInputRef}
          onChange={handleFileInput}
          multiple
        />
      </div>
    </div>
  );
};

export default ImageUploader;
