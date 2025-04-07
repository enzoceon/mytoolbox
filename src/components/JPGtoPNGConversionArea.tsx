
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Image as ImageIcon, Loader2 } from 'lucide-react';
import { toast } from "sonner";
import { downloadWithStandardFilename } from '@/utils/fileUtils';

interface JPGtoPNGConversionAreaProps {
  hasImages: boolean;
  onConvert: () => void;
  isConverting: boolean;
  imageCount: number;
  convertedImages: { original: string; converted: string }[];
}

const JPGtoPNGConversionArea: React.FC<JPGtoPNGConversionAreaProps> = ({
  hasImages,
  onConvert,
  isConverting,
  imageCount,
  convertedImages
}) => {
  
  const handleDownloadSingle = (url: string, index: number) => {
    downloadWithStandardFilename(url, 'png', `image-${index + 1}`);
    toast.success(`PNG image downloaded!`);
  };
  
  const handleDownloadAll = () => {
    if (convertedImages.length === 0) return;
    
    if (convertedImages.length === 1) {
      handleDownloadSingle(convertedImages[0].converted, 0);
      return;
    }
    
    // For multiple images, we'll download them one by one with a small delay
    convertedImages.forEach((image, index) => {
      setTimeout(() => {
        handleDownloadSingle(image.converted, index);
      }, index * 500); // Add a small delay between downloads
    });
    
    toast.success(`Downloading ${convertedImages.length} PNG images...`);
  };
  
  if (!hasImages) {
    return null;
  }
  
  return (
    <div className="mt-6 space-y-6 w-full max-w-md">
      {!isConverting && convertedImages.length === 0 && (
        <Button
          onClick={onConvert}
          className="w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 hover:opacity-90 text-white py-6 text-lg"
          disabled={isConverting}
        >
          <ImageIcon size={18} className="mr-2" />
          Convert {imageCount > 1 ? `${imageCount} JPGs` : 'JPG'} to PNG
        </Button>
      )}
      
      {isConverting && (
        <div className="flex justify-center py-6">
          <div className="flex flex-col items-center">
            <Loader2 size={40} className="animate-spin text-purple-500" />
            <p className="mt-3 text-sm text-muted-foreground">Converting your {imageCount > 1 ? 'images' : 'image'} to PNG...</p>
          </div>
        </div>
      )}
      
      {!isConverting && convertedImages.length > 0 && (
        <div className="space-y-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Converted Images</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {convertedImages.map((image, index) => (
                <div key={index} className="relative border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                  <img 
                    src={image.converted} 
                    alt={`PNG ${index + 1}`} 
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-0 right-0 p-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-background/80 backdrop-blur-sm"
                      onClick={() => handleDownloadSingle(image.converted, index)}
                    >
                      <Download size={14} className="mr-1" />
                      PNG
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Button
            onClick={handleDownloadAll}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
          >
            <Download size={18} className="mr-2" />
            Download {convertedImages.length > 1 ? 'All PNGs' : 'PNG'}
          </Button>
          
          <Button
            onClick={onConvert}
            variant="outline"
            className="w-full py-4"
          >
            <ImageIcon size={18} className="mr-2" />
            Convert Again
          </Button>
        </div>
      )}
    </div>
  );
};

export default JPGtoPNGConversionArea;
