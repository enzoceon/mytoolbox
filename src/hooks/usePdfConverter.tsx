
import { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';
import { toast } from "sonner";

export const usePdfConverter = () => {
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [convertedImages, setConvertedImages] = useState<string[]>([]);
  
  const handlePdfSelect = async (file: File) => {
    // Clear previous results
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }
    
    setSelectedPdf(file);
    const fileUrl = URL.createObjectURL(file);
    setPdfUrl(fileUrl);
    setDownloadUrl(null);
    setConvertedImages([]);
    
    try {
      // Load the PDF to get page count
      const loadingTask = pdfjsLib.getDocument(fileUrl);
      const pdf = await loadingTask.promise;
      setPageCount(pdf.numPages);
    } catch (error) {
      console.error("Error loading PDF:", error);
      toast.error("Error loading PDF. Please try another file.");
      handleRemovePdf();
    }
  };
  
  const handleRemovePdf = () => {
    if (selectedPdf) {
      setSelectedPdf(null);
      
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
        setPdfUrl(null);
      }
      
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
        setDownloadUrl(null);
      }
      
      // Clear converted images
      convertedImages.forEach(url => URL.revokeObjectURL(url));
      setConvertedImages([]);
      
      setPageCount(0);
    }
  };
  
  const convertPdfToImage = async () => {
    if (!pdfUrl) return;
    
    setIsConverting(true);
    toast.loading("Converting PDF to images...");
    
    try {
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      const imageUrls: string[] = [];
      
      // Create a zip file for multiple pages
      const zip = new JSZip();
      const imgFolder = zip.folder("images");
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        if (!context) {
          throw new Error("Could not get canvas context");
        }
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise;
        
        // Convert canvas to blob
        const imgBlob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else resolve(new Blob());
          }, 'image/png');
        });
        
        // Add to zip file
        if (imgFolder) {
          imgFolder.file(`page-${i}.png`, imgBlob);
        }
        
        // Create URL for preview
        const imgUrl = URL.createObjectURL(imgBlob);
        imageUrls.push(imgUrl);
      }
      
      // Generate zip file for download
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const zipUrl = URL.createObjectURL(zipBlob);
      
      setConvertedImages(imageUrls);
      setDownloadUrl(zipUrl);
      toast.dismiss();
      toast.success(`PDF successfully converted to ${imageUrls.length} images!`);
    } catch (error) {
      console.error("Error converting PDF to images:", error);
      toast.dismiss();
      toast.error("Error converting PDF. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  return {
    selectedPdf,
    pdfUrl,
    downloadUrl,
    isConverting,
    pageCount,
    convertedImages,
    handlePdfSelect,
    handleRemovePdf,
    convertPdfToImage
  };
};
