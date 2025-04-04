
import { jsPDF } from "jspdf";

type ImageDimensions = {
  width: number;
  height: number;
};

/**
 * Converts a single image to a PDF file with exact image dimensions
 * @param imageUrl URL of the image to convert
 * @returns Promise with the PDF data URL
 */
export const convertImageToPdf = (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    
    image.onload = () => {
      try {
        // Get the exact image dimensions
        const imgWidth = image.width;
        const imgHeight = image.height;
        
        // Create PDF with exact dimensions of the image
        const pdf = new jsPDF({
          orientation: imgWidth > imgHeight ? "landscape" : "portrait",
          unit: "px", // Use pixels for exact matching
          format: [imgWidth, imgHeight],
          compress: true,
          hotfixes: ["px_scaling"],
        });
        
        // Add the image to the PDF with exact dimensions
        pdf.addImage({
          imageData: image.src,
          format: determineImageFormat(image.src) as any,
          x: 0,
          y: 0,
          width: imgWidth,
          height: imgHeight,
          compression: "MEDIUM"
        });
        
        // Set document properties
        pdf.setProperties({
          title: "Converted Image",
          subject: "Image converted to PDF using Image2PDF",
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
 * Converts multiple images to a single PDF file
 * Each page will have the exact dimensions of the corresponding image
 * @param imageUrls Array of image URLs to convert
 * @returns Promise with the PDF data URL
 */
export const convertMultipleImagesToPdf = (imageUrls: string[]): Promise<string> => {
  if (imageUrls.length === 0) {
    return Promise.reject("No images provided");
  }
  
  if (imageUrls.length === 1) {
    return convertImageToPdf(imageUrls[0]);
  }
  
  return new Promise((resolve, reject) => {
    // First, load all images to get their dimensions
    const loadImagePromises = imageUrls.map(url => loadImage(url));
    
    Promise.all(loadImagePromises)
      .then(images => {
        try {
          // Create PDF with the dimensions of the first image
          const firstImage = images[0];
          let pdf = new jsPDF({
            orientation: firstImage.width > firstImage.height ? "landscape" : "portrait",
            unit: "px",
            format: [firstImage.width, firstImage.height],
            compress: true,
            hotfixes: ["px_scaling"],
          });
          
          // Add first image
          pdf.addImage({
            imageData: imageUrls[0],
            format: determineImageFormat(imageUrls[0]) as any,
            x: 0,
            y: 0,
            width: firstImage.width,
            height: firstImage.height,
            compression: "MEDIUM"
          });
          
          // Add remaining images, each on a new page with its own dimensions
          for (let i = 1; i < images.length; i++) {
            const img = images[i];
            
            // Add new page with the dimensions of the current image
            pdf.addPage([img.width, img.height]);
            
            // Add image to page
            pdf.addImage({
              imageData: imageUrls[i],
              format: determineImageFormat(imageUrls[i]) as any,
              x: 0,
              y: 0,
              width: img.width,
              height: img.height,
              compression: "MEDIUM"
            });
          }
          
          // Set document properties
          pdf.setProperties({
            title: "Converted Images",
            subject: "Images converted to PDF using Image2PDF",
          });
          
          // Convert to data URL for download
          const pdfOutput = pdf.output("datauristring");
          resolve(pdfOutput);
        } catch (error) {
          reject(error);
        }
      })
      .catch(reject);
  });
};

/**
 * Loads an image and returns its dimensions
 * @param url URL of the image to load
 * @returns Promise with the image dimensions
 */
const loadImage = (url: string): Promise<ImageDimensions> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      });
    };
    img.onerror = reject;
    img.src = url;
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
 * @param imageUrls Array of image URLs to convert
 * @returns Promise with the PDF data URL
 */
export const simulateConversion = (imageUrls: string[]): Promise<string> => {
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      if (imageUrls.length === 1) {
        convertImageToPdf(imageUrls[0])
          .then(resolve)
          .catch((error) => {
            console.error("Error converting image to PDF:", error);
            // Fallback to direct image URL if conversion fails
            resolve(imageUrls[0]);
          });
      } else {
        convertMultipleImagesToPdf(imageUrls)
          .then(resolve)
          .catch((error) => {
            console.error("Error converting multiple images to PDF:", error);
            // Fallback to first image URL if conversion fails
            resolve(imageUrls[0]);
          });
      }
    }, 2000); // 2 seconds delay to show the animation
  });
};
