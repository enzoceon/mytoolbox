
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { 
  FileText, 
  Upload, 
  ArrowDown, 
  HelpCircle, 
  Download,
  Trash2,
  MoveUp,
  MoveDown,
  FilePlus
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
import { mergePdfFiles } from '@/utils/pdfUtils';

interface PdfFile {
  file: File;
  preview: string;
  name: string;
}

const PdfMerger = () => {
  const [pdfFiles, setPdfFiles] = useState<PdfFile[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles: PdfFile[] = Array.from(e.target.files).map(file => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name
      }));
      
      setPdfFiles(prev => [...prev, ...newFiles]);
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    setPdfFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleMoveFile = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === pdfFiles.length - 1)) {
      return;
    }
    
    setPdfFiles(prev => {
      const newFiles = [...prev];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
      return newFiles;
    });
  };

  const handleMergePDFs = async () => {
    if (pdfFiles.length < 2) {
      toast.error('Please upload at least two PDF files to merge');
      return;
    }
    
    setIsProcessing(true);
    setMergedPdfUrl(null);
    
    try {
      const files = pdfFiles.map(pdfFile => pdfFile.file);
      const mergedPdfUrl = await mergePdfFiles(files);
      
      setMergedPdfUrl(mergedPdfUrl);
      toast.success('PDFs merged successfully!');
    } catch (error) {
      console.error('Error merging PDFs:', error);
      toast.error('Failed to merge PDFs. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (mergedPdfUrl) {
      const link = document.createElement('a');
      link.href = mergedPdfUrl;
      link.download = 'merged-document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>PDF Merger | EveryTools</title>
        <meta name="description" content="Merge multiple PDF files into a single document. Free online PDF merger tool." />
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
                <BreadcrumbPage>PDF Merger</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <BackButton />
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 glow-text">PDF Merger</h1>
            <p className="text-muted-foreground">Combine multiple PDF files into a single document</p>
          </div>
          
          <Card className="mb-6 glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-500" />
                Upload PDFs
              </CardTitle>
              <CardDescription>
                Select multiple PDF files to merge into a single document. 
                You can rearrange the files to change their order in the final document.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-accent/50 transition-colors mb-6"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  accept=".pdf"
                  className="hidden"
                />
                <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-1">Upload PDF Files</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Click to browse or drag and drop PDF files here
                </p>
                <Button>
                  <FilePlus className="mr-2 h-4 w-4" />
                  Select PDF Files
                </Button>
              </div>
              
              {pdfFiles.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">
                    {pdfFiles.length} PDF file(s) selected:
                  </h3>
                  <div className="max-h-60 overflow-y-auto rounded-md border">
                    {pdfFiles.map((file, index) => (
                      <div 
                        key={`${file.name}-${index}`}
                        className="flex items-center justify-between p-3 border-b last:border-0 hover:bg-accent/30"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-500" />
                          <div className="truncate max-w-[250px]">{file.name}</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleMoveFile(index, 'up')}
                            disabled={index === 0}
                            title="Move Up"
                          >
                            <MoveUp className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleMoveFile(index, 'down')}
                            disabled={index === pdfFiles.length - 1}
                            title="Move Down"
                          >
                            <MoveDown className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRemoveFile(index)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                            title="Remove"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button 
                onClick={handleMergePDFs} 
                disabled={pdfFiles.length < 2 || isProcessing}
                className={isProcessing ? "animate-pulse" : ""}
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Merge PDFs
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          {mergedPdfUrl && (
            <Card className="mb-6 glass-card border-green-500/50">
              <CardHeader>
                <CardTitle className="text-green-500 flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  PDF Merged Successfully
                </CardTitle>
                <CardDescription>
                  Your PDF files have been merged into a single document
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="inline-block p-4 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                  <FileText className="h-10 w-10 text-green-500" />
                </div>
                <h3 className="text-lg font-medium mb-1">merged-document.pdf</h3>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button onClick={handleDownload} className="bg-green-500 hover:bg-green-600">
                  <Download className="mr-2 h-4 w-4" />
                  Download Merged PDF
                </Button>
              </CardFooter>
            </Card>
          )}
          
          <div className="mt-8 p-4 border rounded-lg bg-card shadow-sm">
            <div className="flex items-start gap-3">
              <HelpCircle className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h3 className="font-medium">How to Merge PDF Files</h3>
                <ol className="list-decimal list-inside text-sm text-muted-foreground mt-2 space-y-1">
                  <li>Click the upload area to select PDF files or drag and drop them</li>
                  <li>Rearrange files as needed using the up and down arrows</li>
                  <li>Click the "Merge PDFs" button to combine them</li>
                  <li>Download your merged PDF file</li>
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

export default PdfMerger;
