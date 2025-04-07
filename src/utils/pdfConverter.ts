
import { toast } from "sonner";
import { jsPDF } from "jspdf";

// Function to convert images to PDF
export const convertImagesToPdf = async (imageUrls: string[]): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      // A4 dimensions in points (72 dpi)
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20; // Margin in px
      
      // Process each image
      const processImage = (index: number) => {
        if (index >= imageUrls.length) {
          // All images processed, return the PDF
          const pdfOutput = pdf.output('datauristring');
          resolve(pdfOutput);
          return;
        }
        
        const url = imageUrls[index];
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        
        img.onload = () => {
          // Calculate image dimensions to fit within page while maintaining aspect ratio
          let imgWidth = img.width;
          let imgHeight = img.height;
          
          const maxWidth = pageWidth - (margin * 2);
          const maxHeight = pageHeight - (margin * 2);
          
          if (imgWidth > maxWidth) {
            const ratio = maxWidth / imgWidth;
            imgWidth = maxWidth;
            imgHeight = imgHeight * ratio;
          }
          
          if (imgHeight > maxHeight) {
            const ratio = maxHeight / imgHeight;
            imgHeight = maxHeight;
            imgWidth = imgWidth * ratio;
          }
          
          // Center the image on the page
          const x = (pageWidth - imgWidth) / 2;
          const y = (pageHeight - imgHeight) / 2;
          
          // Add new page if it's not the first image
          if (index > 0) {
            pdf.addPage();
          }
          
          // Add image to PDF
          pdf.addImage(img, 'JPEG', x, y, imgWidth, imgHeight);
          
          // Process next image
          processImage(index + 1);
        };
        
        img.onerror = () => {
          // Skip failed image and continue with the next one
          console.error(`Failed to load image at ${url}`);
          toast.error(`Failed to process image ${index + 1}. Skipping...`);
          processImage(index + 1);
        };
        
        img.src = url;
      };
      
      // Start processing images
      processImage(0);
      
    } catch (error) {
      console.error("PDF conversion error:", error);
      reject(error);
    }
  });
};
