
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
  FileX,
  FilePlus,
  Minimize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from 'sonner';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { compressPdf } from '@/utils/pdfUtils';

const PdfCompressor = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfName, setPdfName] = useState<string>('');
  const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [compressedPdfUrl, setCompressedPdfUrl] = useState<string | null>(null);
  const [compressionStats, setCompressionStats] = useState<{
    originalSize: string;
    compressedSize: string;
    reduction: string;
  } | null>(null);
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
      setCompressedPdfUrl(null);
      setCompressionStats(null);
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleCompressPDF = async () => {
    if (!pdfFile) {
      toast.error('Please upload a PDF file');
      return;
    }
    
    setIsProcessing(true);
    setProgress(0);
    setCompressedPdfUrl(null);
    setCompressionStats(null);
    
    const updateProgress = (value: number) => {
      setProgress(value);
    };
    
    try {
      const result = await compressPdf(pdfFile, compressionLevel, updateProgress);
      setCompressedPdfUrl(result.url);
      
      const originalSize = pdfFile.size;
      const compressedSize = result.size;
      const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
      
      setCompressionStats({
        originalSize: formatFileSize(originalSize),
        compressedSize: formatFileSize(compressedSize),
        reduction: `${reduction}%`
      });
      
      toast.success('PDF compressed successfully!');
    } catch (error) {
      console.error('Error compressing PDF:', error);
      toast.error('Failed to compress PDF. Please try again.');
    } finally {
      setIsProcessing(false);
      setProgress(100);
    }
  };

  const handleRemoveFile = () => {
    setPdfFile(null);
    setPdfName('');
    setCompressedPdfUrl(null);
    setCompressionStats(null);
  };

  const handleDownload = () => {
    if (compressedPdfUrl) {
      const link = document.createElement('a');
      link.href = compressedPdfUrl;
      link.download = `compressed-${pdfName}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>PDF Compressor | EveryTools</title>
        <meta name="description" content="Reduce PDF file size without losing quality. Free online PDF compressor tool." />
      </Helmet>
      
      <BackgroundAnimation />
      <Header />
      
      <main className="flex-1 container px-4 mx-auto py-12">
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/tools">Tools</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>PDF Compressor</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <BackButton />
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 glow-text">PDF Compressor</h1>
            <p className="text-muted-foreground">Reduce PDF file size without losing quality</p>
          </div>
          
          <Card className="mb-6 glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Minimize2 className="h-5 w-5 text-blue-500" />
                Compress PDF
              </CardTitle>
              <CardDescription>
                Upload a PDF file and choose your compression level
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
                      <div className="text-sm text-muted-foreground">
                        Size: {formatFileSize(pdfFile.size)}
                      </div>
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
                      <h3 className="text-sm font-medium mb-2">Compression Level</h3>
                      <RadioGroup 
                        value={compressionLevel} 
                        onValueChange={(value) => setCompressionLevel(value as 'low' | 'medium' | 'high')}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="low" id="low" />
                          <Label htmlFor="low">Low (Better Quality)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="medium" id="medium" />
                          <Label htmlFor="medium">Medium (Balanced)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="high" id="high" />
                          <Label htmlFor="high">High (Smaller Size)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              )}
              
              {isProcessing && (
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Compressing...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button 
                onClick={handleCompressPDF} 
                disabled={!pdfFile || isProcessing}
                className={isProcessing ? "animate-pulse" : ""}
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Minimize2 className="mr-2 h-4 w-4" />
                    Compress PDF
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          {compressedPdfUrl && compressionStats && (
            <Card className="mb-6 glass-card border-green-500/50">
              <CardHeader>
                <CardTitle className="text-green-500 flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  PDF Compressed Successfully
                </CardTitle>
                <CardDescription>
                  Your PDF file has been compressed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 p-4 bg-accent/50 rounded-lg text-center">
                    <div>
                      <div className="text-sm text-muted-foreground">Original Size</div>
                      <div className="font-medium">{compressionStats.originalSize}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Compressed Size</div>
                      <div className="font-medium">{compressionStats.compressedSize}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Reduction</div>
                      <div className="font-medium text-green-500">{compressionStats.reduction}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button onClick={handleDownload} className="bg-green-500 hover:bg-green-600">
                  <Download className="mr-2 h-4 w-4" />
                  Download Compressed PDF
                </Button>
              </CardFooter>
            </Card>
          )}
          
          <div className="mt-8 p-4 border rounded-lg bg-card shadow-sm">
            <div className="flex items-start gap-3">
              <HelpCircle className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h3 className="font-medium">About PDF Compression</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  This tool reduces the size of PDF files by optimizing images, removing unnecessary metadata, 
                  and applying compression algorithms. Choose the compression level based on your needs:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                  <li><strong>Low:</strong> Minimal compression, preserves high image quality</li>
                  <li><strong>Medium:</strong> Balanced compression, good for most documents</li>
                  <li><strong>High:</strong> Maximum compression, may reduce image quality</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PdfCompressor;
