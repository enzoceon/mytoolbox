
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
        const pdf = new jsPDF({
          orientation: imgWidth > imgHeight ? "landscape" : "portrait",
          unit: "pt", // Use points for more precise sizing
          format: [imgWidth, imgHeight]
        });
        
        // Add the image to the PDF at full size without zoom
        pdf.addImage({
          imageData: image.src,
          format: "JPEG",
          x: 0,
          y: 0,
          width: imgWidth,
          height: imgHeight,
          compression: "FAST" // Higher quality
        });
        
        // Set initial view to fit page width
        pdf.setProperties({
          viewerPreferences: {
            FitWindow: true,
            CenterWindow: true
          },
          // Set the initial view to display the entire page
          openAction: {
            name: 'FitH',
            args: [null]
          }
        });
        
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
