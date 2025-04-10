
/**
 * Utility functions for handling files and downloads
 */

/**
 * Creates a standardized filename for downloads following the format:
 * mytoolbox.site.<extension>
 * 
 * @param fileType - The type of file (pdf, jpg, png, zip, etc.)
 * @param prefix - Optional prefix to add before the domain name
 * @returns Standardized filename
 */
export const getStandardFilename = (fileType: string, prefix?: string): string => {
  const baseFilename = prefix ? `${prefix}-mytoolbox.site` : 'mytoolbox.site';
  return `${baseFilename}.${fileType.toLowerCase()}`;
};

/**
 * Helper to trigger a file download with the standardized filename format
 * 
 * @param url - URL or Data URL of the file to download
 * @param fileType - The type of file (pdf, jpg, png, zip, etc.)
 * @param prefix - Optional prefix to add before the domain name
 */
export const downloadWithStandardFilename = (url: string, fileType: string, prefix?: string): void => {
  const link = document.createElement('a');
  link.href = url;
  link.download = getStandardFilename(fileType, prefix);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Extracts metadata from a file
 * 
 * @param file - The file to extract metadata from
 * @returns Object containing file metadata
 */
export const extractFileMetadata = (file: File): Record<string, string | number | Date> => {
  const metadata: Record<string, string | number | Date> = {
    name: file.name,
    size: file.size,
    type: file.type || 'Unknown',
    lastModified: new Date(file.lastModified),
  };
  
  // Extract extension from file name
  const extension = file.name.split('.').pop()?.toLowerCase() || 'Unknown';
  metadata.extension = extension;
  
  // Format file size
  metadata.formattedSize = formatFileSize(file.size);
  
  return metadata;
};

/**
 * Format file size into human readable format
 * 
 * @param bytes - Size in bytes
 * @returns Formatted size string (e.g., "1.5 MB")
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Extract EXIF data from an image
 * 
 * @param file - Image file to extract EXIF data from
 * @returns Promise that resolves to EXIF data object
 */
export const extractImageMetadata = (file: File): Promise<Record<string, any>> {
  return new Promise((resolve, reject) => {
    try {
      // Basic metadata available without EXIF extraction
      const basicMetadata = extractFileMetadata(file);
      
      // For images, create a URL to load the image for dimensions
      const url = URL.createObjectURL(file);
      const img = new Image();
      
      img.onload = () => {
        basicMetadata.width = img.width;
        basicMetadata.height = img.height;
        basicMetadata.dimensions = `${img.width} × ${img.height}`;
        basicMetadata.aspectRatio = (img.width / img.height).toFixed(2);
        
        // Clean up
        URL.revokeObjectURL(url);
        
        // Simulate extracting more detailed EXIF data
        // In a real implementation, this would use a library like exif-js
        const exifData = {
          ...basicMetadata,
          camera: "Simulated Camera Data",
          dateTaken: new Date().toISOString(),
          exposure: "1/100",
          focalLength: "35mm",
          iso: "100",
          flash: "No Flash",
          coordinates: null,
        };
        
        resolve(exifData);
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(basicMetadata); // Return basic metadata if image loading fails
      };
      
      img.src = url;
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Remove EXIF data from an image and return a clean version
 * 
 * @param file - Image file to clean
 * @returns Promise that resolves to a Blob with no EXIF data
 */
export const removeImageMetadata = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    try {
      const url = URL.createObjectURL(file);
      const img = new Image();
      
      img.onload = () => {
        // Create a canvas with the same dimensions as the image
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the image on the canvas
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0);
        
        // Convert the canvas to a Blob (this strips EXIF data)
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to create Blob from canvas'));
            return;
          }
          
          // Clean up
          URL.revokeObjectURL(url);
          
          resolve(blob);
        }, file.type);
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load image'));
      };
      
      img.src = url;
    } catch (error) {
      reject(error);
    }
  });
};
