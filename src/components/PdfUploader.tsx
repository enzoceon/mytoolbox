
import React, { useState, useRef, useCallback } from 'react';
import { FileText, Check, X, AlertCircle, EyeIcon } from 'lucide-react';
import { toast } from "sonner";
import UploadBox from './UploadBox';

interface PdfUploaderProps {
  onPdfSelect: (file: File) => void;
  selectedPdf: string | null;
  onRemovePdf: () => void;
  pageCount?: number;
}

const PdfUploader: React.FC<PdfUploaderProps> = ({ 
  onPdfSelect, 
  selectedPdf,
  onRemovePdf,
  pageCount = 0
}) => {
  const [isLargeFile, setIsLargeFile] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
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

  const handleFileSelect = useCallback((files: FileList) => {
    if (files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  }, [validateAndProcessFile]);

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  // Render PDF preview if file is selected
  if (selectedPdf) {
    return (
      <div className="w-full animate-scale-up">
        <div className="relative w-full max-w-md mx-auto">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-medium text-foreground">Selected PDF</h3>
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
              <div className="mb-4 w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                <FileText size={32} className="text-accent" />
              </div>
              <p className="text-base font-medium mb-1 text-foreground">
                PDF Ready for Conversion
                {pageCount > 0 && ` (${pageCount} pages)`}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Your PDF will be converted to high-quality images
              </p>
              
              <button
                onClick={togglePreview}
                className="px-4 py-2 bg-accent/10 text-accent rounded-md hover:bg-accent/20 flex items-center gap-2 mb-3"
              >
                <EyeIcon size={18} />
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button>
              
              {showPreview && (
                <div className="w-full h-72 border border-gray-200 dark:border-gray-700 rounded-md mt-2 overflow-hidden">
                  <iframe
                    src={selectedPdf}
                    title="PDF Preview"
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render new upload box if no PDF is selected
  return (
    <div className="w-full animate-fade-in">
      <UploadBox
        title="Drop your PDF here"
        subtitle="Select a PDF file to convert to images"
        acceptedFileTypes=".pdf,application/pdf"
        onFileSelect={handleFileSelect}
        multiple={false}
      />
    </div>
  );
};

export default PdfUploader;
