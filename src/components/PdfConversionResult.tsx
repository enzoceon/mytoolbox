
import React from 'react';
import { Download } from 'lucide-react';
import PdfImagePreview from './PdfImagePreview';

interface PdfConversionResultProps {
  downloadUrl: string;
  convertedImages: string[];
  onConvert: () => void;
}

const PdfConversionResult: React.FC<PdfConversionResultProps> = ({ 
  downloadUrl, 
  convertedImages,
  onConvert
}) => {
  return (
    <div className="mt-6 flex flex-col items-center animate-slide-up w-full max-w-4xl">
      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3">
        <svg className="text-green-600 dark:text-green-400" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <p className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
        Conversion Complete!
      </p>
      
      {/* Image Preview Section */}
      <PdfImagePreview images={convertedImages} />
      
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
  );
};

export default PdfConversionResult;
