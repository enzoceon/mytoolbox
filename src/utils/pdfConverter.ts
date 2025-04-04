
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
        // Get the image dimensions
        const imgWidth = image.width;
        const imgHeight = image.height;
        
        // Calculate appropriate dimensions while keeping aspect ratio
        let pdfWidth = imgWidth;
        let pdfHeight = imgHeight;
        
        // If image is extremely large, scale it down to reasonable PDF size
        const MAX_PDF_DIMENSION = 2000; // Maximum dimension in points
        
        if (imgWidth > MAX_PDF_DIMENSION || imgHeight > MAX_PDF_DIMENSION) {
          const scaleFactor = Math.min(
            MAX_PDF_DIMENSION / imgWidth, 
            MAX_PDF_DIMENSION / imgHeight
          );
          pdfWidth = imgWidth * scaleFactor;
          pdfHeight = imgHeight * scaleFactor;
        }
        
        // Use standard page formats when possible
        let format: [number, number] | undefined;
        if (pdfWidth > pdfHeight) {
          format = [pdfWidth, pdfHeight];
        } else {
          format = [pdfWidth, pdfHeight];
        }
        
        // Create PDF with proper dimensions
        const pdf = new jsPDF({
          orientation: pdfWidth > pdfHeight ? "landscape" : "portrait",
          unit: "pt", // Use points for more precise sizing
          format: format,
          compress: true, // Enable compression
          hotfixes: ["px_scaling"], // Add hotfix for pixel scaling
        });
        
        // Add the image to the PDF at proper size
        pdf.addImage({
          imageData: image.src,
          format: determineImageFormat(image.src) as any, // Cast to 'any' to resolve type error
          x: 0,
          y: 0,
          width: pdfWidth,
          height: pdfHeight,
          compression: "MEDIUM" // Balance between quality and file size
        });
        
        // Set document properties
        pdf.setProperties({
          title: "Converted Image",
          subject: "Image converted to PDF using Image2PDF",
        });
        
        // Enable proper display settings for the PDF (requires jsPDF 2.4.0+)
        pdf.setDisplayMode("fullwidth", "continuous");
        
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
 * Determines the image format from the data URL
 * @param dataUrl Image data URL
 * @returns Image format string (JPEG, PNG, etc.)
 */
const determineImageFormat = (dataUrl: string): string => {
  if (dataUrl.indexOf("data:image/jpeg") === 0) return "JPEG";
  if (dataUrl.indexOf("data:image/jpg") === 0) return "JPEG";
  if (dataUrl.indexOf("data:image/png") === 0) return "PNG";
  if (dataUrl.indexOf("data:image/gif") === 0) return "GIF";
  if (dataUrl.indexOf("data:image/bmp") === 0) return "BMP";
  if (dataUrl.indexOf("data:image/webp") === 0) return "WEBP";
  return "JPEG"; // Default to JPEG
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
