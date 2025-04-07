import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { 
  FileText, 
  Upload, 
  HelpCircle, 
  Download,
  Scissors,
  FileX,
  FilePlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from 'sonner';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import { splitPdfFile } from '@/utils/pdfUtils';

const PdfSplitter = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfName, setPdfName] = useState<string>('');
  const [pageCount, setPageCount] = useState<number>(0);
  const [pageRange, setPageRange] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [splitPdfUrls, setSplitPdfUrls] = useState<string[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      if (file.type !== 'application/pdf') {
        toast.error('Please upload a valid PDF file');
        return;
      }
      
      setPdfFile(file);
      setPdfName(file.name);
      setPageCount(10); // In a real implementation, we would extract the actual page count from the PDF
      setSplitPdfUrls([]);
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const validatePageRange = (range: string): boolean => {
    if (!range.trim()) return false;
    
    // Check format like "1-3,5,7-9"
    const rangePattern = /^(\d+(-\d+)?)(,\d+(-\d+)?)*$/;
    if (!rangePattern.test(range)) return false;
    
    const parts = range.split(',');
    for (const part of parts) {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(Number);
        if (start > end) return false;
        if (start < 1 || end > pageCount) return false;
      } else {
        const pageNum = Number(part);
        if (pageNum < 1 || pageNum > pageCount) return false;
      }
    }
    
    return true;
  };

  const handleSplitPDF = async () => {
    if (!pdfFile) {
      toast.error('Please upload a PDF file');
      return;
    }
    
    if (!validatePageRange(pageRange)) {
      toast.error(`Please enter a valid page range (e.g., "1-3,5,7-9"). Pages must be between 1 and ${pageCount}.`);
      return;
    }
    
    setIsProcessing(true);
    setSplitPdfUrls([]);
    
    try {
      const urls = await splitPdfFile(pdfFile, pageRange);
      setSplitPdfUrls(urls);
      toast.success('PDF split successfully!');
    } catch (error) {
      console.error('Error splitting PDF:', error);
      toast.error('Failed to split PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveFile = () => {
    setPdfFile(null);
    setPdfName('');
    setPageCount(0);
    setPageRange('');
    setSplitPdfUrls([]);
  };

  const handleDownload = (url: string, index: number) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `split-${index + 1}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>PDF Splitter | EveryTools</title>
        <meta name="description" content="Split PDF files into separate pages or sections. Free online PDF splitter tool." />
      </Helmet>
      
      <BackgroundAnimation />
      <Header />
      
      <main className="flex-1 container px-4 mx-auto py-12">
        <BackButton />
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 glow-text">PDF Splitter</h1>
            <p className="text-muted-foreground">Split PDF files into separate pages or sections</p>
          </div>
          
          <Card className="mb-6 glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scissors className="h-5 w-5 text-red-500" />
                Split PDF
              </CardTitle>
              <CardDescription>
                Upload a PDF file and specify which pages you want to extract
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!pdfFile ? (
                <div 
                  className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf"
                    className="hidden"
                  />
                  <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-1">Upload PDF File</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Click to browse or drag and drop a PDF file here
                  </p>
                  <Button>
                    <FilePlus className="mr-2 h-4 w-4" />
                    Select PDF File
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 border rounded-lg">
                    <FileText className="h-8 w-8 text-blue-500 mt-1" />
                    <div className="flex-1">
                      <div className="font-medium">{pdfName}</div>
                      <div className="text-sm text-muted-foreground">{pageCount} pages</div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleRemoveFile}
                      className="text-red-500"
                    >
                      <FileX className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                  
                  <div className="space-y-4 mt-6">
                    <div>
                      <Label htmlFor="page-range">Page Range</Label>
                      <div className="text-xs text-muted-foreground mb-1">
                        Specify pages to extract (e.g., "1-3,5,7-9")
                      </div>
                      <Input
                        id="page-range"
                        value={pageRange}
                        onChange={(e) => setPageRange(e.target.value)}
                        placeholder="e.g., 1-3,5,7-9"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button 
                onClick={handleSplitPDF} 
                disabled={!pdfFile || !pageRange || isProcessing}
                className={isProcessing ? "animate-pulse" : ""}
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Scissors className="mr-2 h-4 w-4" />
                    Split PDF
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          {splitPdfUrls.length > 0 && (
            <Card className="mb-6 glass-card border-green-500/50">
              <CardHeader>
                <CardTitle className="text-green-500 flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  PDF Split Successfully
                </CardTitle>
                <CardDescription>
                  Your PDF has been split into {splitPdfUrls.length} file(s)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {splitPdfUrls.map((url, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-md hover:bg-accent/30"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <div>Split-{index + 1}.pdf</div>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleDownload(url, index)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="mt-8 p-4 border rounded-lg bg-card shadow-sm">
            <div className="flex items-start gap-3">
              <HelpCircle className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h3 className="font-medium">How to Split a PDF File</h3>
                <ol className="list-decimal list-inside text-sm text-muted-foreground mt-2 space-y-1">
                  <li>Upload a PDF file</li>
                  <li>Enter the page range you want to extract</li>
                  <li>Click the "Split PDF" button</li>
                  <li>Download the split PDF files</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PdfSplitter;
