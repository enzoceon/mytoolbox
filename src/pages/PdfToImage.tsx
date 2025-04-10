
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';
import PdfUploader from '@/components/PdfUploader';
import PdfConversionArea from '@/components/PdfConversionArea';
import HowToUse from '@/components/HowToUse';
import BackButton from '@/components/BackButton';
import PdfToImageSEO from '@/components/SEO/PdfToImageSEO';

const PdfToImage = () => {
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [convertedImages, setConvertedImages] = useState<string[]>([]);

  const handlePdfSelect = (file: File) => {
    setSelectedPdf(file);
    setPdfPreviewUrl(URL.createObjectURL(file));
    setDownloadUrl(null);
    setConvertedImages([]);
  };

  const handleRemovePdf = () => {
    if (pdfPreviewUrl) {
      URL.revokeObjectURL(pdfPreviewUrl);
    }
    setSelectedPdf(null);
    setPdfPreviewUrl(null);
    setDownloadUrl(null);
    setPageCount(0);
    setConvertedImages([]);
  };

  const handleConvert = () => {
    // Conversion logic would be implemented here
    console.log('Converting PDF to images...');
  };

  return (
    <>
      <PdfToImageSEO />
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
          <BackButton />
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 tracking-tight animate-fade-in">
              <span className="bg-gradient-primary bg-clip-text text-transparent">PDF</span>
              <span className="text-white"> to </span>
              <span className="bg-gradient-primary bg-clip-text text-transparent">Image</span>
              <span className="text-white"> Converter</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Convert PDF documents to high-quality JPG, PNG and other image formats.
              Free, secure with no watermarks.
            </p>
          </div>
          
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <PdfUploader
              onPdfSelect={handlePdfSelect}
              selectedPdf={pdfPreviewUrl}
              onRemovePdf={handleRemovePdf}
              pageCount={pageCount}
            />
          </div>
          
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <PdfConversionArea
              hasPdf={!!pdfPreviewUrl}
              onConvert={handleConvert}
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
