
import React, { useState } from 'react';
import { Download } from 'lucide-react';

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
    <div className="mt-8 flex flex-col items-center">
      {!downloadUrl && !isConverting && (
        <button
          onClick={onConvert}
          className="px-8 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all"
          disabled={isConverting}
        >
          {imageCount > 1 
            ? `Convert ${imageCount} Images to PDF` 
            : "Convert to PDF"
          }
        </button>
      )}
      
      {isConverting && (
        <div className="w-full max-w-md flex flex-col items-center">
          <div className="mb-4 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center mb-3">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-sm font-medium text-gray-300">
              {imageCount > 1 
                ? `Converting ${imageCount} images to PDF...` 
                : "Converting image to PDF..."
              }
            </p>
          </div>
          
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 animate-progress rounded-full" />
          </div>
        </div>
      )}
      
      {downloadUrl && (
        <div className="mt-6 flex flex-col items-center animate-slide-up">
          <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center mb-3">
            <svg className="text-green-500 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="mb-4 text-sm font-medium text-green-500">
            Conversion Complete!
          </p>
          <a
            href={downloadUrl}
            download="image-to-pdf.pdf"
            className="px-8 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all flex items-center"
          >
            <Download size={18} className="mr-2" />
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default ConversionArea;
