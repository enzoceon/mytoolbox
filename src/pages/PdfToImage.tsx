import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PdfUploader from '@/components/PdfUploader';
import PdfConversionArea from '@/components/PdfConversionArea';
import SpaceBackground from '@/components/SpaceBackground';
import HowToUse from '@/components/HowToUse';
import { Helmet } from 'react-helmet-async';
import JSZip from 'jszip';
import { toast } from "sonner";

// PDF.js library imports
import * as pdfjsLib from 'pdfjs-dist';
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';

// Set worker path to pdf.js worker
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfToImage = () => {
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [convertedImages, setConvertedImages] = useState<string[]>([]);
  
  const handlePdfSelect = async (file: File) => {
    // Clear previous results
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }
    
    setSelectedPdf(file);
    const fileUrl = URL.createObjectURL(file);
    setPdfUrl(fileUrl);
    setDownloadUrl(null);
    setConvertedImages([]);
    
    try {
      // Load the PDF to get page count
      const loadingTask = pdfjsLib.getDocument(fileUrl);
      const pdf = await loadingTask.promise;
      setPageCount(pdf.numPages);
    } catch (error) {
      console.error("Error loading PDF:", error);
      toast.error("Error loading PDF. Please try another file.");
      handleRemovePdf();
    }
  };
  
  const handleRemovePdf = () => {
    if (selectedPdf) {
      setSelectedPdf(null);
      
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
        setPdfUrl(null);
      }
      
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
        setDownloadUrl(null);
      }
      
      // Clear converted images
      convertedImages.forEach(url => URL.revokeObjectURL(url));
      setConvertedImages([]);
      
      setPageCount(0);
    }
  };
  
  const convertPdfToImage = async () => {
    if (!pdfUrl) return;
    
    setIsConverting(true);
    toast.loading("Converting PDF to images...");
    
    try {
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      const imageUrls: string[] = [];
      
      // Create a zip file for multiple pages
      const zip = new JSZip();
      const imgFolder = zip.folder("images");
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        if (!context) {
          throw new Error("Could not get canvas context");
        }
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise;
        
        // Convert canvas to blob
        const imgBlob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else resolve(new Blob());
          }, 'image/png');
        });
        
        // Add to zip file
        if (imgFolder) {
          imgFolder.file(`page-${i}.png`, imgBlob);
        }
        
        // Create URL for preview
        const imgUrl = URL.createObjectURL(imgBlob);
        imageUrls.push(imgUrl);
      }
      
      // Generate zip file for download
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const zipUrl = URL.createObjectURL(zipBlob);
      
      setConvertedImages(imageUrls);
      setDownloadUrl(zipUrl);
      toast.dismiss();
      toast.success(`PDF successfully converted to ${imageUrls.length} images!`);
    } catch (error) {
      console.error("Error converting PDF to images:", error);
      toast.dismiss();
      toast.error("Error converting PDF. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };
  
  return (
    <>
      <Helmet>
        <title>PDF to Image Converter - Free Online Tool</title>
        <meta name="description" content="Convert PDF files to high-quality images (JPG, PNG) for free. No registration or installation required. Process files securely in your browser." />
      </Helmet>
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 tracking-tight animate-fade-in">
              <span className="bg-gradient-primary bg-clip-text text-transparent">PDF</span>
              <span className="text-white"> to </span>
              <span className="bg-gradient-primary bg-clip-text text-transparent">Image</span>
              <span className="text-white"> Converter</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Convert PDF files to high-quality images with ease. Free, secure, and browser-based.
            </p>
          </div>
          
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="w-full max-w-md">
              <PdfUploader
                onPdfSelect={handlePdfSelect}
                selectedPdf={pdfUrl}
                onRemovePdf={handleRemovePdf}
                pageCount={pageCount}
              />
            </div>
          </div>
          
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <PdfConversionArea
              hasPdf={!!selectedPdf}
              onConvert={convertPdfToImage}
              downloadUrl={downloadUrl}
              isConverting={isConverting}
              pageCount={pageCount}
              convertedImages={convertedImages}
            />
          </div>
          
          <div className="mt-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <HowToUse />
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default PdfToImage;
