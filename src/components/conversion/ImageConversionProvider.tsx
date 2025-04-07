
import React, { createContext, useState, useCallback, useContext, ReactNode } from 'react';
import { toast } from "sonner";
import { convertImagesToPdf } from '@/utils/pdfConverter';

type ImageConversionContextType = {
  selectedFiles: File[];
  previewUrls: string[];
  pdfUrl: string | null;
  isConverting: boolean;
  hasUserInteracted: boolean;
  handleImageSelect: (files: File[]) => void;
  handleRemoveImage: (index: number) => void;
  handleRemoveAllImages: () => void;
  handleConvert: () => void;
};

const ImageConversionContext = createContext<ImageConversionContextType | undefined>(undefined);

export const useImageConversion = () => {
  const context = useContext(ImageConversionContext);
  if (!context) {
    throw new Error('useImageConversion must be used within an ImageConversionProvider');
  }
  return context;
};

interface ImageConversionProviderProps {
  children: ReactNode;
}

export const ImageConversionProvider: React.FC<ImageConversionProviderProps> = ({ children }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
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
      // Create preview URLs for all files
      const urls = files.map(file => URL.createObjectURL(file));
      
      // Combine with existing files/urls if any
      setSelectedFiles(prev => [...prev, ...files]);
      setPreviewUrls(prev => [...prev, ...urls]);
      setPdfUrl(null); // Reset previous conversion
      
      // Mark that user has interacted
      setHasUserInteracted(true);
      
      // For very large files, warn the user
      const totalSize = files.reduce((sum, file) => sum + file.size, 0);
      if (totalSize > 10 * 1024 * 1024) { // Over 10MB
        console.log("Large files detected:", totalSize / (1024 * 1024), "MB");
      }
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
    
    // Reset PDF if all images are removed
    if (selectedFiles.length === 1) {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
        setPdfUrl(null);
      }
    }
  }, [previewUrls, selectedFiles, pdfUrl]);

  const handleRemoveAllImages = useCallback(() => {
    // Revoke all preview URLs
    previewUrls.forEach(url => {
      URL.revokeObjectURL(url);
    });
    
    // Revoke PDF URL if it exists
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }
    
    setSelectedFiles([]);
    setPreviewUrls([]);
    setPdfUrl(null);
  }, [previewUrls, pdfUrl]);

  const handleConvert = useCallback(async () => {
    if (previewUrls.length === 0) {
      toast.error("Please upload at least one image first");
      return;
    }
    
    setIsConverting(true);
    toast.loading(`Converting ${previewUrls.length > 1 ? 'images' : 'image'} to PDF...`);
    
    try {
      const pdf = await convertImagesToPdf(previewUrls);
      setPdfUrl(pdf);
      toast.dismiss();
      toast.success(`${previewUrls.length > 1 ? 'Images' : 'Image'} successfully converted to PDF!`);
    } catch (error) {
      console.error("Conversion error:", error);
      toast.dismiss();
      toast.error("Error converting images. Please try again.");
    } finally {
      setIsConverting(false);
    }
  }, [previewUrls]);

  const value = {
    selectedFiles,
    previewUrls,
    pdfUrl,
    isConverting,
    hasUserInteracted,
    handleImageSelect,
    handleRemoveImage,
    handleRemoveAllImages,
    handleConvert
  };

  return (
    <ImageConversionContext.Provider value={value}>
      {children}
    </ImageConversionContext.Provider>
  );
};
