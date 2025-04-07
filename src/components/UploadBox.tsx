
import React, { useRef, useCallback } from 'react';
import { Upload } from 'lucide-react';

interface UploadBoxProps {
  title: string;
  subtitle: string;
  acceptedFileTypes?: string;
  onFileSelect: (files: FileList) => void;
  multiple?: boolean;
}

const UploadBox: React.FC<UploadBoxProps> = ({
  title,
  subtitle,
  acceptedFileTypes = "*",
  onFileSelect,
  multiple = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
  }, []);

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
      <div className="rounded-2xl border-2 border-dashed border-indigo-400/30 flex flex-col items-center justify-center p-10 bg-[#0e1527]">
        <div className="mb-8 w-16 h-16 rounded-full bg-[#1a2035] flex items-center justify-center">
          <Upload className="h-8 w-8 text-indigo-400" />
        </div>
        
        <h2 className="text-3xl font-medium text-white mb-2">{title}</h2>
        <p className="text-lg text-gray-400 mb-10 text-center">{subtitle}</p>
        
        <div className="flex items-center space-x-4 mb-8">
          <hr className="w-20 border-gray-600" />
          <span className="text-lg text-gray-400">OR</span>
          <hr className="w-20 border-gray-600" />
        </div>
        
        <button
          onClick={handleBrowseClick}
          className="px-10 py-4 text-xl font-medium bg-indigo-500 hover:bg-indigo-600 text-white rounded-full transition-colors"
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
};

export default UploadBox;
