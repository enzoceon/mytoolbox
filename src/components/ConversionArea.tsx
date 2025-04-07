
import React, { useState } from 'react';
import { Download, ArrowDown, Check, X, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ConversionAreaProps {
  hasImages: boolean;
  onConvert: () => void;
  downloadUrl: string | null;
  isConverting: boolean;
  imageCount: number;
}

const ConversionArea: React.FC<ConversionAreaProps> = ({
  hasImages,
  onConvert,
  downloadUrl,
  isConverting,
  imageCount
}) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  
  // Show conversion animation when user hits convert
  const handleConvertClick = () => {
    setShowAnimation(true);
    onConvert();
    
    // Reset animation state after conversion is done
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  };

  const openPreview = () => {
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
  };

  if (!hasImages) {
    return null;
  }

  return (
    <div className="mt-10 flex flex-col items-center animate-fade-in">
      {!downloadUrl && !isConverting && (
        <button
          onClick={handleConvertClick}
          className="px-8 py-3 rounded-md pulse-btn font-medium shadow-md hover:shadow-lg transition-shadow flex items-center bg-accent text-white"
          disabled={isConverting}
        >
          Convert Images to PDF
        </button>
      )}
      
      {isConverting && (
        <div className="w-full max-w-md flex flex-col items-center">
          <div className="mb-6 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-3">
              <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-sm font-medium text-foreground">
              Converting {imageCount > 1 ? `${imageCount} images` : 'image'} to PDF...
            </p>
          </div>
          
          <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-accent animate-progress rounded-full" />
          </div>
        </div>
      )}
      
      {showAnimation && !downloadUrl && (
        <div className="my-6 flex flex-col items-center">
          <ArrowDown 
            size={24} 
            className="text-accent animate-bounce-soft"
          />
        </div>
      )}
      
      {downloadUrl && (
        <div className="mt-6 flex flex-col items-center animate-slide-up w-full max-w-4xl">
          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3">
            <Check className="text-green-600 dark:text-green-400" />
          </div>
          <p className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
            Conversion Complete!
          </p>
          
          {/* PDF Preview Section */}
          <div className="w-full mb-6">
            <h3 className="text-lg font-medium mb-3 text-foreground">Preview PDF</h3>
            <div className="w-full flex justify-center">
              <button 
                onClick={openPreview}
                className="w-full max-w-sm aspect-[3/4] rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-accent transition-colors flex items-center justify-center bg-black/5 dark:bg-white/5"
              >
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent mb-2">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  <span className="text-sm font-medium">Click to preview PDF</span>
                </div>
              </button>
            </div>
          </div>
          
          {/* PDF Preview Dialog */}
          <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-black border-none">
              <div className="relative w-full h-full flex flex-col">
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <button 
                    onClick={closePreview}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white flex items-center gap-1"
                  >
                    <ArrowLeft size={20} />
                    <span>Back</span>
                  </button>
                </div>
                
                <button 
                  onClick={closePreview}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white"
                >
                  <X size={20} />
                </button>
                
                <div className="flex-1 flex items-center justify-center p-4">
                  <iframe 
                    src={downloadUrl} 
                    title="PDF Preview"
                    className="w-full h-full border-0"
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <a
            href={downloadUrl}
            download="images-to-pdf.pdf"
            className="px-8 py-3 rounded-md bg-accent text-white font-medium shadow-md hover:shadow-lg transition-shadow flex items-center"
          >
            <Download size={18} className="mr-2" />
            Download PDF
          </a>
          
          <p className="mt-5 text-xs text-muted-foreground text-center max-w-md">
            Your privacy is important to us. All processing happens directly in your browser, 
            and your files are never uploaded to any server.
          </p>
        </div>
      )}
    </div>
  );
};

export default ConversionArea;
