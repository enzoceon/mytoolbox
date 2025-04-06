
import React, { useState } from 'react';
import { Download, ArrowDown, Check, Image, EyeIcon, X } from 'lucide-react';

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
  
  // Show conversion animation when user hits convert
  const handleConvertClick = () => {
    setShowAnimation(true);
    onConvert();
    
    // Reset animation state after conversion is done
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  };

  if (!hasPdf) {
    return null;
  }

  return (
    <div className="mt-10 flex flex-col items-center animate-fade-in">
      {!downloadUrl && !isConverting && (
        <button
          onClick={handleConvertClick}
          className="px-8 py-3 rounded-md pulse-btn font-medium shadow-md hover:shadow-lg transition-shadow flex items-center"
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
                      onClick={() => setPreviewIndex(idx)}
                      className="w-full aspect-[3/4] rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-accent transition-colors"
                    >
                      <img 
                        src={img} 
                        alt={`Page ${idx + 1}`} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <EyeIcon className="w-6 h-6 text-white" />
                      </div>
                    </button>
                    <p className="text-xs text-center mt-1 text-muted-foreground">Page {idx + 1}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Full-size preview modal */}
          {previewIndex !== null && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
              <div className="relative max-w-4xl max-h-[90vh] w-full">
                <button 
                  onClick={() => setPreviewIndex(null)}
                  className="absolute top-2 right-2 z-10 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white"
                >
                  <X size={24} />
                </button>
                <img 
                  src={convertedImages[previewIndex]} 
                  alt={`Page ${previewIndex + 1} Preview`}
                  className="w-full h-full object-contain max-h-[90vh]"
                />
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                  <button 
                    className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                    onClick={() => setPreviewIndex(Math.max(0, previewIndex - 1))}
                    disabled={previewIndex === 0}
                  >
                    &lt;
                  </button>
                  <span className="p-2 bg-black/50 text-white rounded-full">
                    {previewIndex + 1} / {convertedImages.length}
                  </span>
                  <button 
                    className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                    onClick={() => setPreviewIndex(Math.min(convertedImages.length - 1, previewIndex + 1))}
                    disabled={previewIndex === convertedImages.length - 1}
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <a
            href={downloadUrl}
            download="pdf-to-images.zip"
            className="px-8 py-3 rounded-md bg-accent text-white font-medium shadow-md hover:shadow-lg transition-shadow flex items-center"
          >
            <Download size={18} className="mr-2" />
            Download All Images
          </a>
          
          <div className="mt-4 flex gap-3">
            <a
              href="/tools"
              className="px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 text-sm text-muted-foreground hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Try Another Tool
            </a>
            <button
              onClick={onConvert}
              className="px-4 py-2 rounded-md bg-accent/10 text-accent text-sm hover:bg-accent/20"
            >
              Convert Again
            </button>
          </div>
          
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
