
import React, { useRef, useCallback } from 'react';
import { Upload } from 'lucide-react';

interface UploadAreaProps {
  onImageSelect: (files: File[]) => void;
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  acceptedFileTypes: string;
  restrictionMessage: string;
  validateAndProcessFiles: (files: File[]) => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({ 
  onImageSelect, 
  isDragging, 
  setIsDragging, 
  acceptedFileTypes,
  restrictionMessage,
  validateAndProcessFiles
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, [setIsDragging]);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, [setIsDragging]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length) {
      validateAndProcessFiles(Array.from(files));
    }
  }, [setIsDragging, validateAndProcessFiles]);

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

export default UploadArea;
