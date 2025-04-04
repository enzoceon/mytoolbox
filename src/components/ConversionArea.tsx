
import React, { useState } from 'react';
import { Download, ArrowDown, Check } from 'lucide-react';

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
  
  // Show conversion animation when user hits convert
  const handleConvertClick = () => {
    setShowAnimation(true);
    onConvert();
    
    // Reset animation state after conversion is done
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  };

  if (!hasImages) {
    return null;
  }

  return (
    <div className="mt-10 flex flex-col items-center animate-fade-in">
      {!downloadUrl && !isConverting && (
        <button
          onClick={handleConvertClick}
          className="px-8 py-3 rounded-full pulse-btn text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow flex items-center"
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
          <div className="mb-6 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin-normal" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              {imageCount > 1 
                ? `Converting ${imageCount} images to PDF...` 
                : "Converting image to PDF..."
              }
            </p>
          </div>
          
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-primary animate-progress rounded-full" />
          </div>
        </div>
      )}
      
      {showAnimation && !downloadUrl && (
        <div className="my-6 flex flex-col items-center">
          <ArrowDown 
            size={24} 
            className="text-blue-500 animate-bounce-soft"
          />
        </div>
      )}
      
      {downloadUrl && (
        <div className="mt-6 flex flex-col items-center animate-slide-up">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-3">
            <Check className="text-green-500" />
          </div>
          <p className="mb-4 text-sm font-medium text-green-600">
            Conversion Complete!
          </p>
          <a
            href={downloadUrl}
            download="image2pdf.site.pdf"
            className="shimmer-effect px-8 py-3 rounded-full bg-gradient-primary text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow flex items-center"
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
