import React, { useState, useRef, useCallback } from 'react';
import { Upload, Image, Check, X, AlertCircle } from 'lucide-react';
import { toast } from "sonner";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  selectedImage: string | null;
  onRemoveImage: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageSelect, 
  selectedImage,
  onRemoveImage 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLargeFile, setIsLargeFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateAndProcessFile = useCallback((file: File) => {
    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }
    
    // Check file size but don't limit to 20MB
    if (file.size > 20 * 1024 * 1024) {
      toast.warning("This image is very large and might affect performance", {
        duration: 5000,
      });
      setIsLargeFile(true);
    } else {
      setIsLargeFile(false);
    }
    
    onImageSelect(file);
  }, [onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length) {
      validateAndProcessFile(files[0]);
    }
  }, [validateAndProcessFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  }, [validateAndProcessFile]);

  const handleBrowseClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  // Render image preview if image is selected
  if (selectedImage) {
    return (
      <div className="w-full animate-scale-up">
        <div className="relative w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-xl glass-card">
          <div className="absolute top-3 right-3 z-10 flex space-x-2">
            <button 
              onClick={onRemoveImage}
              className="p-1.5 bg-white/80 hover:bg-white rounded-full text-red-500 shadow-sm transition-colors"
              aria-label="Remove image"
            >
              <X size={16} />
            </button>
          </div>
          <div className="aspect-w-16 aspect-h-9 bg-gray-100 relative">
            <img 
              src={selectedImage} 
              alt="Preview" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Image ready for conversion</p>
            <div className="flex items-center justify-center">
              {isLargeFile ? (
                <div className="flex items-center text-amber-500">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span className="text-xs font-medium">Large file - PDF quality may vary</span>
                </div>
              ) : (
                <div className="flex items-center text-green-500">
                  <Check className="h-4 w-4 mr-1" />
                  <span className="text-xs font-medium">File selected</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render upload area if no image is selected
  return (
    <div className="w-full animate-fade-in">
      <div 
        className={`drop-area w-full max-w-md mx-auto flex flex-col items-center justify-center ${isDragging ? 'drop-area-active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="mb-4 p-4 rounded-full bg-blue-50 text-blue-500">
          <Upload size={24} className="animate-bounce-soft" />
        </div>
        <h3 className="text-lg font-medium mb-2">Drop your image here</h3>
        <p className="text-sm text-muted-foreground mb-4 text-center">
          Supports JPG, PNG and other image formats
        </p>
        <div className="flex items-center space-x-2">
          <hr className="w-10 border-gray-200" />
          <span className="text-xs text-muted-foreground">OR</span>
          <hr className="w-10 border-gray-200" />
        </div>
        <button
          className="mt-4 px-6 py-2 rounded-full bg-gradient-primary text-white text-sm font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-shadow transform hover:scale-105 duration-200"
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
        />
      </div>
    </div>
  );
};

export default ImageUploader;
