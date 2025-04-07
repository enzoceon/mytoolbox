
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
    <div className="w-full flex flex-col items-center justify-center py-16">
      <div 
        className={`w-full flex flex-col items-center justify-center ${isDragging ? 'scale-105 transition-transform' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="mb-6 w-16 h-16 bg-purple-900/30 rounded-full flex items-center justify-center">
          <Upload size={32} className="text-purple-400" />
        </div>
        
        <p className="text-2xl font-semibold text-white mb-2">Drop your JPG here</p>
        <p className="text-base text-gray-400 mb-6">Select a JPG file to convert to PNG</p>
        
        <div className="flex items-center space-x-4 mb-6">
          <hr className="w-16 border-gray-600" />
          <span className="text-sm text-gray-400">OR</span>
          <hr className="w-16 border-gray-600" />
        </div>
        
        <button
          className="px-8 py-3 rounded-full bg-purple-600 text-white text-lg font-medium hover:bg-purple-500 transition-colors"
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
