
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
