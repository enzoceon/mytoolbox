
import React from 'react';
import { Check, FileImage, Clock, FileCheck } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-6 px-4 sm:px-8 my-2">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Key Features</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="glass-card p-4 rounded-xl flex flex-col items-center text-center">
            <Check className="h-10 w-10 text-green-500 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Privacy Focused</h3>
            <p className="text-sm text-muted-foreground">
              All processing happens in your browser. Your files never leave your device.
            </p>
          </div>
          
          <div className="glass-card p-4 rounded-xl flex flex-col items-center text-center">
            <FileImage className="h-10 w-10 text-blue-500 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Multiple Formats</h3>
            <p className="text-sm text-muted-foreground">
              Supports JPG, PNG, GIF, BMP, WEBP, TIFF and more image formats.
            </p>
          </div>
          
          <div className="glass-card p-4 rounded-xl flex flex-col items-center text-center">
            <Clock className="h-10 w-10 text-amber-500 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              Convert your images to PDF in seconds with our optimized processing.
            </p>
          </div>
          
          <div className="glass-card p-4 rounded-xl flex flex-col items-center text-center">
            <FileCheck className="h-10 w-10 text-purple-500 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Quality Preserved</h3>
            <p className="text-sm text-muted-foreground">
              Maintains original image quality and resolution in the PDF output.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
