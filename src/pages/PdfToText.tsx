
import React, { useState } from 'react';
import { FileText, Copy, Download, Trash } from 'lucide-react';
import { toast } from "sonner";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import SpaceBackground from '@/components/SpaceBackground';
import PdfUploader from '@/components/PdfUploader';
import BackButton from '@/components/BackButton';
import { extractTextFromPdf } from '@/utils/pdfTextExtractor';
import PdfToTextSEO from '@/components/SEO/PdfToTextSEO';

const PdfToText: React.FC = () => {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  
  // Handle PDF file selection
  const handlePdfSelect = (file: File) => {
    setPdfFile(file);
    setSelectedPdf(URL.createObjectURL(file));
    setExtractedText('');
  };
  
  // Handle PDF file removal
  const handleRemovePdf = () => {
    if (selectedPdf) {
      URL.revokeObjectURL(selectedPdf);
    }
    setPdfFile(null);
    setSelectedPdf(null);
    setExtractedText('');
    setProgress(0);
  };
  
  // Extract text from PDF
  const handleExtractText = async () => {
    if (!pdfFile) {
      toast.error("Please select a PDF file first");
      return;
    }
    
    try {
      setIsExtracting(true);
      setProgress(0);
      
      const text = await extractTextFromPdf(pdfFile, (progress) => {
        setProgress(progress);
      });
      
      setExtractedText(text);
      toast.success("Text extracted successfully");
    } catch (error) {
      console.error("Text extraction failed:", error);
      toast.error("Failed to extract text from PDF");
    } finally {
      setIsExtracting(false);
    }
  };
  
  // Copy extracted text to clipboard
  const handleCopyText = () => {
    if (!extractedText) {
      toast.error("No text to copy");
      return;
    }
    
    navigator.clipboard.writeText(extractedText)
      .then(() => toast.success("Text copied to clipboard"))
      .catch(() => toast.error("Failed to copy text"));
  };
  
  // Download extracted text as .txt file
  const handleDownloadText = () => {
    if (!extractedText) {
      toast.error("No text to download");
      return;
    }
    
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = pdfFile ? `${pdfFile.name.replace('.pdf', '')}_text.txt` : 'extracted_text.txt';
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
    
    toast.success("Text file downloaded");
  };
  
  // Clear extracted text
  const handleClearText = () => {
    setExtractedText('');
    toast.info("Text cleared");
  };
  
  return (
    <>
      <PdfToTextSEO />
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-6">
          <div className="mb-6">
            <BackButton />
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">
                <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                  PDF to Text
                </span>
                <span className="text-white"> Converter</span>
              </h1>
              <p className="text-muted-foreground">
                Extract text content from PDF documents easily. No registration required.
              </p>
            </div>
            
            <div className="glass-card rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="p-6">
                {/* PDF Uploader section */}
                <PdfUploader
                  onPdfSelect={handlePdfSelect}
                  selectedPdf={selectedPdf}
                  onRemovePdf={handleRemovePdf}
                />
                
                {/* Extract button and progress */}
                {selectedPdf && (
                  <div className="mt-6 animate-fade-in">
                    <Button
                      onClick={handleExtractText}
                      disabled={isExtracting}
                      className="w-full py-6 text-base bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    >
                      {isExtracting ? (
                        <span className="flex items-center gap-2">
                          <FileText className="h-5 w-5 animate-pulse" />
                          Extracting Text...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Extract Text from PDF
                        </span>
                      )}
                    </Button>
                    
                    {isExtracting && (
                      <Progress value={progress} className="h-2 mt-4" />
                    )}
                  </div>
                )}
                
                {/* Extracted text display and actions */}
                {extractedText && (
                  <div className="mt-8 animate-fade-in">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Extracted Text</h3>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCopyText}
                          className="flex items-center gap-1"
                        >
                          <Copy className="h-4 w-4" />
                          Copy
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDownloadText}
                          className="flex items-center gap-1"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleClearText}
                          className="flex items-center gap-1"
                        >
                          <Trash className="h-4 w-4" />
                          Clear
                        </Button>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <Textarea
                        value={extractedText}
                        onChange={(e) => setExtractedText(e.target.value)}
                        className="min-h-[300px] font-mono text-sm"
                        placeholder="Extracted text will appear here..."
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Instructions */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">How to Use PDF to Text Converter</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-5 rounded-lg">
                  <div className="rounded-full bg-purple-500/10 w-10 h-10 flex items-center justify-center mb-3">
                    <span className="text-purple-400 font-semibold">1</span>
                  </div>
                  <h3 className="font-medium mb-1">Upload PDF</h3>
                  <p className="text-sm text-muted-foreground">
                    Click the upload area to select a PDF file from your device or simply drag and drop it.
                  </p>
                </div>
                <div className="glass-card p-5 rounded-lg">
                  <div className="rounded-full bg-blue-500/10 w-10 h-10 flex items-center justify-center mb-3">
                    <span className="text-blue-400 font-semibold">2</span>
                  </div>
                  <h3 className="font-medium mb-1">Extract Text</h3>
                  <p className="text-sm text-muted-foreground">
                    Click the "Extract Text from PDF" button and wait for the extraction process to complete.
                  </p>
                </div>
                <div className="glass-card p-5 rounded-lg">
                  <div className="rounded-full bg-indigo-500/10 w-10 h-10 flex items-center justify-center mb-3">
                    <span className="text-indigo-400 font-semibold">3</span>
                  </div>
                  <h3 className="font-medium mb-1">Save Your Text</h3>
                  <p className="text-sm text-muted-foreground">
                    Copy the extracted text to clipboard or download it as a text file for your use.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default PdfToText;
