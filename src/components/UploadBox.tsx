
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
      className="w-full max-w-3xl mx-auto"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="aspect-video rounded-3xl border-2 border-dashed border-purple-500/40 flex flex-col items-center justify-center p-8 bg-[#0b101e]">
        <div className="mb-6 w-20 h-20 rounded-full bg-[#131c33] flex items-center justify-center">
          <Upload className="h-10 w-10 text-purple-500" />
        </div>
        
        <h2 className="text-3xl font-semibold text-white mb-3">{title}</h2>
        <p className="text-xl text-gray-400 mb-8">{subtitle}</p>
        
        <div className="flex items-center space-x-4 mb-8">
          <hr className="w-20 border-gray-600" />
          <span className="text-lg text-gray-400">OR</span>
          <hr className="w-20 border-gray-600" />
        </div>
        
        <button
          onClick={handleBrowseClick}
          className="px-10 py-4 text-xl font-medium bg-purple-500 hover:bg-purple-600 text-white rounded-full transition-colors"
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
