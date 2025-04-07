
import React from 'react';

interface ImagePreviewGridProps {
  selectedImages: string[];
  onRemoveImage: (index: number) => void;
  onRemoveAllImages: () => void;
  onAddMoreImages: () => void;
}

const ImagePreviewGrid: React.FC<ImagePreviewGridProps> = ({
  selectedImages,
  onRemoveImage,
  onRemoveAllImages,
  onAddMoreImages
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-foreground">Selected Images ({selectedImages.length})</h3>
        <button 
          onClick={onRemoveAllImages}
          className="text-xs px-2 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
        >
          Remove All
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        {selectedImages.map((imgUrl, index) => (
          <div 
            key={index} 
            className="relative rounded-md overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <button 
              onClick={() => onRemoveImage(index)}
              className="absolute top-1 right-1 p-1 bg-white dark:bg-gray-800 rounded-full shadow-sm z-10"
              aria-label="Remove image"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-w-3 aspect-h-2 bg-gray-100 dark:bg-gray-800">
              <img 
                src={imgUrl} 
                alt={`Preview ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
        
      <div className="text-center mt-4">
        <button
          className="px-4 py-2 text-sm bg-accent/10 text-accent rounded hover:bg-accent/20"
          onClick={onAddMoreImages}
        >
          Add More Images
        </button>
      </div>
    </div>
  );
};

export default ImagePreviewGrid;
