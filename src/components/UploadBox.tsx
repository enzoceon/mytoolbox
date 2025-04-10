
import React, { useRef, useCallback, forwardRef, ForwardedRef } from 'react';
import { Upload } from 'lucide-react';

export interface UploadBoxProps {
  title: string;
  subtitle: string;
  acceptedFileTypes?: string;
  onFileSelect: (files: FileList) => void;
  multiple?: boolean;
  children?: React.ReactNode;
}

const UploadBox = forwardRef<HTMLInputElement, UploadBoxProps>(({
  title,
  subtitle,
  acceptedFileTypes = "*",
  onFileSelect,
  multiple = false,
  children
}, ref) => {
  const localFileInputRef = useRef<HTMLInputElement>(null);
  
  // Use either the forwarded ref or local ref
  const fileInputRef = (ref || localFileInputRef) as React.RefObject<HTMLInputElement>;
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files);
    }
  }, [onFileSelect]);

  const handleBrowseClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [fileInputRef]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files);
    }
    
    // Reset input value to allow selecting the same file again
    if (e.target.value) {
      e.target.value = '';
    }
  }, [onFileSelect]);

  return (
    <div 
      className="w-full"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="rounded-2xl border-2 border-dashed border-indigo-400/30 flex flex-col items-center justify-center p-6 bg-[#0e1527]">
        <div className="mb-6 w-14 h-14 rounded-full bg-[#1a2035] flex items-center justify-center">
          {children || <Upload className="h-6 w-6 text-indigo-400" />}
        </div>
        
        <h2 className="text-2xl font-medium text-white mb-2">{title}</h2>
        <p className="text-sm text-gray-400 mb-6 text-center">{subtitle}</p>
        
        <div className="flex items-center space-x-3 mb-6">
          <hr className="w-16 border-gray-600" />
          <span className="text-sm text-gray-400">OR</span>
          <hr className="w-16 border-gray-600" />
        </div>
        
        <button
          onClick={handleBrowseClick}
          className="px-6 py-2 text-base font-medium bg-indigo-500 hover:bg-indigo-600 text-white rounded-full transition-colors"
        >
          Browse Files
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFileTypes}
          onChange={handleFileChange}
          multiple={multiple}
          className="hidden"
        />
      </div>
    </div>
  );
});

UploadBox.displayName = 'UploadBox';

export default UploadBox;
