
import React, { createContext, useState, useCallback, useContext, ReactNode } from 'react';
import { toast } from "sonner";

type JPGtoPNGContextType = {
  selectedFiles: File[];
  previewUrls: string[];
  convertedImages: { original: string; converted: string }[];
  isConverting: boolean;
  hasUserInteracted: boolean;
  handleImageSelect: (files: File[]) => void;
  handleRemoveImage: (index: number) => void;
  handleRemoveAllImages: () => void;
  handleConvert: () => void;
};

const JPGtoPNGContext = createContext<JPGtoPNGContextType | undefined>(undefined);

export const useJPGtoPNG = () => {
  const context = useContext(JPGtoPNGContext);
  if (!context) {
    throw new Error('useJPGtoPNG must be used within a JPGtoPNGProvider');
  }
  return context;
};

interface JPGtoPNGProviderProps {
  children: ReactNode;
}

export const JPGtoPNGProvider: React.FC<JPGtoPNGProviderProps> = ({ children }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [convertedImages, setConvertedImages] = useState<{ original: string; converted: string }[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // Track user interaction
  React.useEffect(() => {
    const handleInteraction = () => {
      setHasUserInteracted(true);
    };

    // Listen for user interaction events
    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('keydown', handleInteraction, { once: true });
    document.addEventListener('scroll', handleInteraction, { once: true });
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };
  }, []);

  const handleImageSelect = useCallback((files: File[]) => {
    try {
      // Filter only JPG/JPEG files
      const validFiles = files.filter(file => 
        file.type === 'image/jpeg' || file.type === 'image/jpg'
      );
      
      if (validFiles.length !== files.length) {
        toast.warning("Only JPG/JPEG files can be converted. Other file types were ignored.");
      }
      
      if (validFiles.length === 0) {
        toast.error("Please select JPG/JPEG files for conversion.");
        return;
      }
      
      // Create preview URLs for all files
      const urls = validFiles.map(file => URL.createObjectURL(file));
      
      // Combine with existing files/urls if any
      setSelectedFiles(prev => [...prev, ...validFiles]);
      setPreviewUrls(prev => [...prev, ...urls]);
      setConvertedImages([]); // Reset previous conversions
      
      // Mark that user has interacted
      setHasUserInteracted(true);
    } catch (error) {
      console.error("Error processing files:", error);
      toast.error("Failed to process the selected images");
    }
  }, []);

  const handleRemoveImage = useCallback((index: number) => {
    // Revoke the URL to prevent memory leaks
    if (previewUrls[index]) {
      URL.revokeObjectURL(previewUrls[index]);
    }
    
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    
    // Also remove from converted images if exists
    setConvertedImages(prev => prev.filter((_, i) => i !== index));
  }, [previewUrls]);

  const handleRemoveAllImages = useCallback(() => {
    // Revoke all preview URLs
    previewUrls.forEach(url => {
      URL.revokeObjectURL(url);
    });
    
    // Revoke all converted image URLs
    convertedImages.forEach(item => {
      URL.revokeObjectURL(item.converted);
    });
    
    setSelectedFiles([]);
    setPreviewUrls([]);
    setConvertedImages([]);
  }, [previewUrls, convertedImages]);

  const convertJPGtoPNG = useCallback(async (imageUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Failed to get canvas context"));
            return;
          }
          
          ctx.drawImage(img, 0, 0);
          
          const pngUrl = canvas.toDataURL("image/png");
          resolve(pngUrl);
        };
        
        img.onerror = () => {
          reject(new Error("Failed to load image"));
        };
        
        img.src = imageUrl;
      } catch (error) {
        reject(error);
      }
    });
  }, []);

  const handleConvert = useCallback(async () => {
    if (previewUrls.length === 0) {
      toast.error("Please upload at least one JPG image first");
      return;
    }
    
    setIsConverting(true);
    toast.loading(`Converting ${previewUrls.length > 1 ? 'images' : 'image'} to PNG...`);
    
    try {
      const convertedUrls = await Promise.all(
        previewUrls.map(async (url) => {
          const pngUrl = await convertJPGtoPNG(url);
          return { original: url, converted: pngUrl };
        })
      );
      
      setConvertedImages(convertedUrls);
      toast.dismiss();
      toast.success(`${previewUrls.length > 1 ? 'Images' : 'Image'} successfully converted to PNG!`);
    } catch (error) {
      console.error("Conversion error:", error);
      toast.dismiss();
      toast.error("Error converting images. Please try again.");
    } finally {
      setIsConverting(false);
    }
  }, [previewUrls, convertJPGtoPNG]);

  const value = {
    selectedFiles,
    previewUrls,
    convertedImages,
    isConverting,
    hasUserInteracted,
    handleImageSelect,
    handleRemoveImage,
    handleRemoveAllImages,
    handleConvert
  };

  return (
    <JPGtoPNGContext.Provider value={value}>
      {children}
    </JPGtoPNGContext.Provider>
  );
};
