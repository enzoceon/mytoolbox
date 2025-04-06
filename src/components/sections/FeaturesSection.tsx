
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
              Your data stays on your device with client-side processing. No uploads to external servers, ensuring complete privacy.
            </p>
          </div>
          
          <div className="glass-card p-4 rounded-xl flex flex-col items-center text-center">
            <FileImage className="h-10 w-10 text-blue-500 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Multiple Formats</h3>
            <p className="text-sm text-muted-foreground">
              Wide format compatibility including JPG, PNG, WebP, TIFF, GIF, and BMP with automatic format detection.
            </p>
          </div>
          
          <div className="glass-card p-4 rounded-xl flex flex-col items-center text-center">
            <Clock className="h-10 w-10 text-amber-500 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              Advanced algorithms process your files instantly, with batch conversion capabilities for multiple images.
            </p>
          </div>
          
          <div className="glass-card p-4 rounded-xl flex flex-col items-center text-center">
            <FileCheck className="h-10 w-10 text-purple-500 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Quality Preserved</h3>
            <p className="text-sm text-muted-foreground">
              Lossless conversion technology ensures your images maintain their original clarity, resolution and color accuracy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
