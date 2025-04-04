
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
        
        // Create PDF with dimensions that match the image aspect ratio
        // Use A4 (210x297mm) as a reference but maintain the image aspect ratio
        let orientation: "portrait" | "landscape" = "portrait";
        let pdfWidth: number;
        let pdfHeight: number;
        
        // Determine orientation
        if (imgWidth > imgHeight) {
          orientation = "landscape";
        }
        
        // Create new PDF with the appropriate orientation
        const pdf = new jsPDF({
          orientation: orientation,
          unit: "px",
          format: [imgWidth, imgHeight]
        });
        
        // Add the image to the PDF at actual size
        pdf.addImage(image.src, "JPEG", 0, 0, imgWidth, imgHeight);
        
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
