
import React, { useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';

const PdfWorkerSetup: React.FC = () => {
  useEffect(() => {
    // Set worker path to pdf.js worker
    GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  }, []);
  
  return null;
};

export default PdfWorkerSetup;
