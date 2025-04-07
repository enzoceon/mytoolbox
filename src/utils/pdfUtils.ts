
import { toast } from "sonner";
import { jsPDF } from "jspdf";

// Function to merge PDF files
export const mergePdfFiles = async (files: File[]): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      // In a real implementation, we would use a PDF library to merge PDFs
      // For now, we'll simulate merging with a delay
      setTimeout(() => {
        // Create a simple PDF to simulate the merged output
        const pdf = new jsPDF();
        
        // Add a title page
        pdf.setFontSize(22);
        pdf.text("Merged PDF Document", 105, 80, { align: "center" });
        
        pdf.setFontSize(12);
        pdf.text(`Contains ${files.length} merged documents:`, 105, 100, { align: "center" });
        
        // List the file names
        let y = 120;
        files.forEach((file, index) => {
          pdf.text(`${index + 1}. ${file.name}`, 105, y, { align: "center" });
          y += 10;
          
          // Add a new page after listing 10 files or if it's the last file
          if ((index + 1) % 10 === 0 && index < files.length - 1) {
            pdf.addPage();
            y = 20;
          }
        });
        
        // Return the PDF data URL
        const pdfOutput = pdf.output('datauristring');
        resolve(pdfOutput);
      }, 2000);
    } catch (error) {
      console.error("PDF merger error:", error);
      reject(error);
    }
  });
};

// Function to split a PDF file
export const splitPdfFile = async (file: File, pageRange: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    try {
      // In a real implementation, we would use a PDF library to split the PDF
      // For now, we'll simulate splitting with a delay
      setTimeout(() => {
        // Parse the page range
        const ranges: number[] = [];
        const parts = pageRange.split(',');
        
        parts.forEach(part => {
          if (part.includes('-')) {
            const [start, end] = part.split('-').map(Number);
            for (let i = start; i <= end; i++) {
              ranges.push(i);
            }
          } else {
            ranges.push(Number(part));
          }
        });
        
        // Create simulated PDFs for each page or range
        const pdfs: string[] = [];
        
        // Group consecutive pages together
        let currentGroup: number[] = [];
        let lastPage = -1;
        
        for (let i = 0; i < ranges.length; i++) {
          const page = ranges[i];
          
          if (page !== lastPage + 1 && currentGroup.length > 0) {
            // Create a PDF for the current group
            const pdf = new jsPDF();
            pdf.setFontSize(22);
            
            if (currentGroup.length === 1) {
              pdf.text(`Page ${currentGroup[0]}`, 105, 80, { align: "center" });
            } else {
              pdf.text(`Pages ${currentGroup[0]}-${currentGroup[currentGroup.length - 1]}`, 105, 80, { align: "center" });
            }
            
            pdfs.push(pdf.output('datauristring'));
            currentGroup = [];
          }
          
          currentGroup.push(page);
          lastPage = page;
        }
        
        // Process the last group
        if (currentGroup.length > 0) {
          const pdf = new jsPDF();
          pdf.setFontSize(22);
          
          if (currentGroup.length === 1) {
            pdf.text(`Page ${currentGroup[0]}`, 105, 80, { align: "center" });
          } else {
            pdf.text(`Pages ${currentGroup[0]}-${currentGroup[currentGroup.length - 1]}`, 105, 80, { align: "center" });
          }
          
          pdfs.push(pdf.output('datauristring'));
        }
        
        resolve(pdfs);
      }, 2000);
    } catch (error) {
      console.error("PDF splitter error:", error);
      reject(error);
    }
  });
};

// Function to compress a PDF file
export const compressPdf = async (
  file: File, 
  level: 'low' | 'medium' | 'high', 
  progressCallback: (progress: number) => void
): Promise<{ url: string, size: number }> => {
  return new Promise((resolve, reject) => {
    try {
      // In a real implementation, we would use a PDF library to compress the PDF
      // For now, we'll simulate compression with a delay and progress updates
      
      // Define compression ratios based on level
      const compressionRatios = {
        low: 0.9,
        medium: 0.7,
        high: 0.5
      };
      
      // Calculate estimated compressed size
      const originalSize = file.size;
      const compressedSize = Math.floor(originalSize * compressionRatios[level]);
      
      // Simulate the compression process with progress updates
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        progressCallback(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          
          // Create a simple PDF to simulate the compressed output
          const pdf = new jsPDF();
          
          pdf.setFontSize(22);
          pdf.text("Compressed PDF Document", 105, 80, { align: "center" });
          
          pdf.setFontSize(14);
          pdf.text(`Original: ${formatFileSize(originalSize)}`, 105, 100, { align: "center" });
          pdf.text(`Compressed (${level}): ${formatFileSize(compressedSize)}`, 105, 110, { align: "center" });
          pdf.text(`Reduction: ${((originalSize - compressedSize) / originalSize * 100).toFixed(1)}%`, 105, 120, { align: "center" });
          
          // Return the PDF data URL and compressed size
          const pdfOutput = pdf.output('datauristring');
          resolve({
            url: pdfOutput,
            size: compressedSize
          });
        }
      }, 100);
    } catch (error) {
      console.error("PDF compression error:", error);
      reject(error);
    }
  });
};

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
