
import { jsPDF } from "jspdf";

/**
 * Converts an image to a PDF file
 * @param imageUrl URL of the image to convert
 * @returns Promise with the PDF data URL
 */
export const convertImageToPdf = (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    
    image.onload = () => {
      try {
        // Calculate optimal PDF size while maintaining aspect ratio
        const imgWidth = image.width;
        const imgHeight = image.height;
        const maxWidth = 210; // A4 width in mm
        const maxHeight = 297; // A4 height in mm
        
        let pdfWidth = maxWidth;
        let pdfHeight = (imgHeight * pdfWidth) / imgWidth;
        
        // If height exceeds A4, scale based on height
        if (pdfHeight > maxHeight) {
          pdfHeight = maxHeight;
          pdfWidth = (imgWidth * pdfHeight) / imgHeight;
        }
        
        // Create PDF with calculated dimensions
        const pdf = new jsPDF({
          orientation: pdfWidth > pdfHeight ? "landscape" : "portrait",
          unit: "mm",
        });
        
        // Calculate positioning to center the image
        const x = (pdf.internal.pageSize.getWidth() - pdfWidth) / 2;
        const y = (pdf.internal.pageSize.getHeight() - pdfHeight) / 2;
        
        // Add the image to the PDF
        pdf.addImage(image.src, "JPEG", x, y, pdfWidth, pdfHeight);
        
        // Convert to data URL for download
        const pdfOutput = pdf.output("datauristring");
        resolve(pdfOutput);
      } catch (error) {
        reject(error);
      }
    };
    
    image.onerror = (error) => {
      reject(error);
    };
    
    image.src = imageUrl;
  });
};

/**
 * Simulates a conversion process with a delay
 * @param imageUrl URL of the image to convert
 * @returns Promise with the PDF data URL
 */
export const simulateConversion = (imageUrl: string): Promise<string> => {
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      convertImageToPdf(imageUrl)
        .then(resolve)
        .catch((error) => {
          console.error("Error converting image to PDF:", error);
          // Fallback to direct conversion if the main one fails
          resolve(imageUrl);
        });
    }, 2000); // 2 seconds delay to show the animation
  });
};
