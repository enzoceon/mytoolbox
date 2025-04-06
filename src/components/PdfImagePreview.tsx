
import React, { useState } from 'react';
import { EyeIcon, X } from 'lucide-react';

interface PdfImagePreviewProps {
  images: string[];
}

const PdfImagePreview: React.FC<PdfImagePreviewProps> = ({ images }) => {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  
  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <div className="w-full mb-6">
        <h3 className="text-lg font-medium mb-3 text-foreground">Preview Converted Images</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img, idx) => (
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
              src={images[previewIndex]} 
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
                {previewIndex + 1} / {images.length}
              </span>
              <button 
                className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                onClick={() => setPreviewIndex(Math.min(images.length - 1, previewIndex + 1))}
                disabled={previewIndex === images.length - 1}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PdfImagePreview;
