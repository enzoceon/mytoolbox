
import React, { useState } from 'react';
import { Download, ArrowDown, Check } from 'lucide-react';
import { getStandardFilename } from '@/utils/fileUtils';

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
  imageCount,
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
          className="px-8 py-3 rounded-md pulse-btn font-medium shadow-md hover:shadow-lg transition-shadow flex items-center bg-accent text-white"
          disabled={isConverting}
        >
          Convert to PDF
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
        <div className="mt-6 flex flex-col items-center animate-slide-up w-full max-w-md">
          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3">
            <Check className="text-green-600 dark:text-green-400" />
          </div>
          <p className="mb-6 text-sm font-medium text-green-600 dark:text-green-400">
            Conversion Complete!
          </p>
          
          <a
            href={downloadUrl}
            download={getStandardFilename('pdf')}
            className="px-8 py-3 rounded-md bg-accent text-white font-medium shadow-md hover:shadow-lg transition-shadow flex items-center"
          >
            <Download size={18} className="mr-2" />
            Download PDF
          </a>
          
          <button
            onClick={onConvert}
            className="mt-4 px-6 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors font-medium text-sm"
          >
            Convert Again
          </button>
          
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
