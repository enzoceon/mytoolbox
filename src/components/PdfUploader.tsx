
import React, { useState, useRef, useCallback } from 'react';
import { Upload, FileText, Check, X, AlertCircle } from 'lucide-react';
import { toast } from "sonner";

interface PdfUploaderProps {
  onPdfSelect: (file: File) => void;
  selectedPdf: string | null;
  onRemovePdf: () => void;
}

const PdfUploader: React.FC<PdfUploaderProps> = ({ 
  onPdfSelect, 
  selectedPdf,
  onRemovePdf
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
    // Validate file is a PDF
    if (!file.type.includes('pdf')) {
      toast.error("Please select a PDF file");
      return;
    }
    
    // Check if file is large
    if (file.size > 50 * 1024 * 1024) {
      toast.warning("This PDF is very large and may take longer to process", {
        duration: 5000,
      });
      setIsLargeFile(true);
    } else {
      setIsLargeFile(false);
    }
    
    onPdfSelect(file);
  }, [onPdfSelect]);

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
    
    // Reset the file input value so the same file can be selected again
    if (e.target.value) {
      e.target.value = '';
    }
  }, [validateAndProcessFile]);

  const handleBrowseClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  // Render PDF preview if file is selected
  if (selectedPdf) {
    return (
      <div className="w-full animate-scale-up">
        <div className="relative w-full max-w-md mx-auto">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-medium">Selected PDF</h3>
            <button 
              onClick={onRemovePdf}
              className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-600 rounded-md transition-colors"
            >
              Remove
            </button>
          </div>
          
          <div className="relative rounded-xl overflow-hidden shadow-xl glass-card">
            <div className="absolute top-3 right-3 z-10">
              <button 
                onClick={onRemovePdf}
                className="p-1.5 bg-white/80 hover:bg-white rounded-full text-red-500 shadow-sm transition-colors"
                aria-label="Remove PDF"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-6 flex flex-col items-center">
              <div className="mb-4 w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                <FileText size={32} className="text-blue-500" />
              </div>
              <p className="text-base font-medium mb-1">PDF Ready for Conversion</p>
              <p className="text-sm text-muted-foreground">Your PDF will be converted to images</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render upload area if no PDF is selected
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
        <h3 className="text-lg font-medium mb-2">Drop your PDF here</h3>
        <p className="text-sm text-muted-foreground mb-4 text-center">
          Select a PDF file to convert to images
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
          accept=".pdf"
          ref={fileInputRef}
          onChange={handleFileInput}
        />
      </div>
    </div>
  );
};

export default PdfUploader;
