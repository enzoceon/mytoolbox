
import React from 'react';
import { Download, FileImage } from 'lucide-react';

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
  if (!hasImages) {
    return null;
  }

  return (
    <div className="mt-6 flex flex-col items-center">
      {!downloadUrl && !isConverting && (
        <button
          onClick={onConvert}
          className="px-6 py-2.5 rounded-md bg-accent text-white hover:bg-accent/90 transition-colors flex items-center space-x-2"
          disabled={isConverting}
        >
          <FileImage className="h-4 w-4" />
          <span>
            {imageCount > 1 
              ? `Convert ${imageCount} Images to PDF` 
              : "Convert to PDF"
            }
          </span>
        </button>
      )}
      
      {isConverting && (
        <div className="w-full flex flex-col items-center py-2">
          <div className="flex items-center space-x-2 mb-2">
            <div className="h-5 w-5 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-muted-foreground">
              {imageCount > 1 
                ? `Converting ${imageCount} images...` 
                : "Converting image..."
              }
            </p>
          </div>
          
          <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-accent animate-progress rounded-full"></div>
          </div>
        </div>
      )}
      
      {downloadUrl && (
        <div className="w-full text-center">
          <div className="flex flex-col items-center mb-4">
            <div className="mb-2 rounded-full p-2 bg-green-100 dark:bg-green-900/30">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600 dark:text-green-400">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <p className="text-sm font-medium text-green-600 dark:text-green-400">
              Conversion Complete!
            </p>
          </div>
          
          <a
            href={downloadUrl}
            download="images-to-pdf.pdf"
            className="px-6 py-2.5 rounded-md bg-accent text-white hover:bg-accent/90 transition-colors flex items-center justify-center space-x-2 mx-auto w-full sm:w-auto"
          >
            <Download className="h-4 w-4" />
            <span>Download PDF</span>
          </a>
          
          <p className="text-xs text-muted-foreground mt-3">
            Your files are processed locally and never uploaded to any server
          </p>
        </div>
      )}
    </div>
  );
};

export default ConversionArea;
