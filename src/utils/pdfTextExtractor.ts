
import * as pdfjsLib from 'pdfjs-dist';
import { toast } from "sonner";

// Set the PDF.js worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Extracts text from a PDF file
 * @param file PDF file to extract text from
 * @param onProgress Optional callback to report progress
 * @returns Promise with extracted text
 */
export const extractTextFromPdf = async (
  file: File, 
  onProgress?: (progress: number) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        if (!event.target?.result) {
          reject(new Error("Failed to read the PDF file"));
          return;
        }
        
        try {
          const arrayBuffer = event.target.result as ArrayBuffer;
          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          const numPages = pdf.numPages;
          let extractedText = '';
          
          for (let i = 1; i <= numPages; i++) {
            // Update progress if callback provided
            if (onProgress) {
              onProgress((i / numPages) * 100);
            }
            
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const textItems = textContent.items;
            
            let lastY;
            let text = '';
            
            for (const item of textItems) {
              if ('str' in item) {
                // Check if we need to add a new line (different y position)
                if (lastY !== undefined && lastY !== item.transform[5]) {
                  text += '\n';
                }
                
                text += item.str;
                lastY = item.transform[5];
              }
            }
            
            extractedText += `\n--- Page ${i} ---\n${text}\n`;
          }
          
          resolve(extractedText.trim());
        } catch (error) {
          console.error("PDF extraction error:", error);
          reject(error);
        }
      };
      
      reader.onerror = () => {
        reject(new Error("Error reading the PDF file"));
      };
      
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("PDF extraction error:", error);
      reject(error);
    }
  });
};
