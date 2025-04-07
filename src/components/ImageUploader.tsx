
import React, { useState, useRef, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { toast } from "sonner";

interface ImageUploaderProps {
  onImageSelect: (files: File[]) => void;
  selectedImages: string[] | null;
  onRemoveImage: (index: number) => void;
  onRemoveAllImages: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageSelect, 
  selectedImages,
  onRemoveImage,
  onRemoveAllImages
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
    // Filter non-image files
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      toast.error("Please select image files only");
      return;
    }
    
    if (files.length !== imageFiles.length) {
      toast.warning(`${files.length - imageFiles.length} non-image files were ignored`);
    }
    
    onImageSelect(imageFiles);
  }, [onImageSelect]);

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
      <div className="w-full animate-scale-up">
        <div className="relative w-full max-w-md mx-auto">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-medium">Selected Images: {selectedImages.length}</h3>
            <button 
              onClick={onRemoveAllImages}
              className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-600 rounded-md transition-colors"
            >
              Remove All
            </button>
          </div>
          
          <div className="space-y-4">
            {selectedImages.map((imgUrl, index) => (
              <div 
                key={index} 
                className="relative rounded-xl overflow-hidden shadow-xl glass-card"
              >
                <button 
                  onClick={() => onRemoveImage(index)}
                  className="absolute top-3 right-3 p-1.5 bg-white/80 hover:bg-white rounded-full text-red-500 shadow-sm transition-colors z-10"
                  aria-label="Remove image"
                >
                  &times;
                </button>
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  <img 
                    src={imgUrl} 
                    alt={`Preview ${index + 1}`} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">Image {index + 1}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <button
              className="px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium hover:bg-blue-200 transition-colors"
              onClick={handleBrowseClick}
            >
              Add More Images
            </button>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileInput}
              multiple
            />
          </div>
        </div>
      </div>
    );
  }

  // Render upload area if no image is selected
  return (
    <div className="w-full animate-fade-in">
      <div 
        className={`drop-area w-full max-w-md mx-auto p-6 border-2 border-dashed border-blue-500 rounded-xl flex flex-col items-center justify-center bg-[#080e1a] ${isDragging ? 'border-blue-300 bg-[#0c1224]' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="mb-4 p-4 rounded-full bg-blue-50 text-blue-500">
          <Upload size={24} className="text-blue-500" />
        </div>
        <h3 className="text-xl font-medium mb-1 text-white">Drop your images here</h3>
        <p className="text-sm text-gray-400 mb-3 text-center">
          Supports JPG, PNG and other image formats
        </p>
        <div className="flex items-center my-2 w-full max-w-[200px]">
          <hr className="flex-grow border-gray-600" />
          <span className="px-4 text-xs text-gray-400">OR</span>
          <hr className="flex-grow border-gray-600" />
        </div>
        <button
          className="mt-3 px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all"
          onClick={handleBrowseClick}
        >
          Browse Files
        </button>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileInput}
          multiple
        />
      </div>
    </div>
  );
};

export default ImageUploader;
