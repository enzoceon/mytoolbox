
import React, { useState } from 'react';
import { Download, ArrowDown, Check, X, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface PdfConversionAreaProps {
  hasPdf: boolean;
  onConvert: () => void;
  downloadUrl: string | null;
  isConverting: boolean;
  pageCount: number;
  convertedImages?: string[];
}

const PdfConversionArea: React.FC<PdfConversionAreaProps> = ({
  hasPdf,
  onConvert,
  downloadUrl,
  isConverting,
  pageCount,
  convertedImages = []
}) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  
  // Show conversion animation when user hits convert
  const handleConvertClick = () => {
    setShowAnimation(true);
    onConvert();
    
    // Reset animation state after conversion is done
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  };

  const openPreview = (index: number) => {
    setPreviewIndex(index);
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  const goToNextImage = () => {
    if (previewIndex !== null && convertedImages) {
      setPreviewIndex(Math.min(convertedImages.length - 1, previewIndex + 1));
    }
  };

  const goToPrevImage = () => {
    if (previewIndex !== null) {
      setPreviewIndex(Math.max(0, previewIndex - 1));
    }
  };

  if (!hasPdf) {
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
          Convert PDF to Images
        </button>
      )}
      
      {isConverting && (
        <div className="w-full max-w-md flex flex-col items-center">
          <div className="mb-6 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-3">
              <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-sm font-medium text-foreground">
              Converting PDF to images...
              {pageCount > 0 && ` (${pageCount} pages)`}
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
          
          {/* Image Preview Section */}
          {convertedImages && convertedImages.length > 0 && (
            <div className="w-full mb-6">
              <h3 className="text-lg font-medium mb-3 text-foreground">Preview Converted Images</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {convertedImages.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <button 
                      onClick={() => openPreview(idx)}
                      className="w-full aspect-[3/4] rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-accent transition-colors"
                    >
                      <img 
                        src={img} 
                        alt={`Page ${idx + 1}`} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </div>
                    </button>
                    <p className="text-xs text-center mt-1 text-muted-foreground">Page {idx + 1}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Image Preview Dialog */}
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-black border-none">
              {previewIndex !== null && convertedImages[previewIndex] && (
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
                    <img 
                      src={convertedImages[previewIndex]} 
                      alt={`Page ${previewIndex + 1} Preview`}
                      className="max-h-[80vh] max-w-full object-contain"
                    />
                  </div>
                  
                  <div className="p-4 bg-black text-white flex items-center justify-between">
                    <button 
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={goToPrevImage}
                      disabled={previewIndex === 0}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    
                    <div className="text-center">
                      Page {previewIndex + 1} of {convertedImages.length}
                    </div>
                    
                    <button 
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={goToNextImage}
                      disabled={previewIndex === convertedImages.length - 1}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
          
          <a
            href={downloadUrl}
            download="pdf-to-images.zip"
            className="px-8 py-3 rounded-md bg-accent text-white font-medium shadow-md hover:shadow-lg transition-shadow flex items-center"
          >
            <Download size={18} className="mr-2" />
            Download All Images
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

export default PdfConversionArea;
