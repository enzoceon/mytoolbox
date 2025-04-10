
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, Download, FileText, Folder, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import UploadBox from '@/components/UploadBox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import RarExtractorSEO from '@/components/SEO/RarExtractorSEO';

interface FileEntry {
  name: string;
  path: string;
  size: number;
  type: 'file' | 'folder';
  data?: Blob;
}

const RarExtractor = () => {
  const [rarFile, setRarFile] = useState<File | null>(null);
  const [extractedFiles, setExtractedFiles] = useState<FileEntry[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList) => {
    const file = files[0];
    if (file) {
      if (file.name.endsWith('.rar')) {
        setRarFile(file);
        setExtractedFiles([]);
        setError(null);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a RAR file",
          variant: "destructive",
        });
      }
    }
  };

  const extractRar = async () => {
    if (!rarFile) return;
    
    setIsExtracting(true);
    setError(null);
    
    try {
      // Since browser APIs cannot directly extract RAR files, we'll simulate it
      // In a real app, you would need a server-side solution or use WebAssembly
      
      setTimeout(() => {
        // For demonstration purposes, create some fake extracted files
        const simulatedFiles: FileEntry[] = [
          { name: 'readme.txt', path: 'readme.txt', size: 1024, type: 'file', data: new Blob(['This is a readme file'], { type: 'text/plain' }) },
          { name: 'images', path: 'images', size: 0, type: 'folder' },
          { name: 'document.pdf', path: 'document.pdf', size: 52428, type: 'file', data: new Blob(['PDF content'], { type: 'application/pdf' }) },
          { name: 'thumbnail.jpg', path: 'images/thumbnail.jpg', size: 15360, type: 'file', data: new Blob(['Image data'], { type: 'image/jpeg' }) }
        ];
        
        // Sort entries: folders first, then files
        simulatedFiles.sort((a, b) => {
          if (a.type === b.type) {
            return a.name.localeCompare(b.name);
          }
          return a.type === 'folder' ? -1 : 1;
        });
        
        setExtractedFiles(simulatedFiles);
        
        toast({
          title: "RAR extraction simulated",
          description: "This is a simulation since browsers cannot natively extract RAR files",
          variant: "default",
        });
        
        setIsExtracting(false);
      }, 2000);
      
      // In reality, show the limitation message
      setError("Due to browser limitations, direct RAR extraction is not available. For actual RAR extraction, consider using a desktop application like WinRAR or 7-Zip.");
      
    } catch (error) {
      console.error('Error extracting RAR:', error);
      setError("Failed to process RAR file. The file may be corrupted or invalid.");
      toast({
        title: "Extraction failed",
        description: "Failed to extract RAR file",
        variant: "destructive",
      });
      setIsExtracting(false);
    }
  };

  const downloadFile = (file: FileEntry) => {
    if (file.data) {
      const url = URL.createObjectURL(file.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download started",
        description: `"${file.name}" will download shortly`,
        variant: "default",
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const resetExtractor = () => {
    setRarFile(null);
    setExtractedFiles([]);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <RarExtractorSEO />
      <Header />
      
      <div className="container max-w-4xl mx-auto px-4 py-8 flex-grow">
        <BackButton />
        
        <h1 className="text-3xl font-bold mb-6">RAR Extractor</h1>
        <p className="mb-6 text-muted-foreground">
          Extract contents from RAR archive files online.
        </p>
        
        <Alert variant="warning" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Browser Limitation</AlertTitle>
          <AlertDescription>
            Due to browser limitations, direct RAR extraction is not fully supported. 
            This tool provides a simulation of RAR extraction. For complete functionality, 
            use desktop applications like WinRAR or 7-Zip.
          </AlertDescription>
        </Alert>
        
        <Card className="mb-6 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Upload RAR File</CardTitle>
            <CardDescription>Select a RAR file to see a simulation of its contents</CardDescription>
          </CardHeader>
          <CardContent>
            {!rarFile ? (
              <UploadBox
                title="Drop your RAR file here"
                subtitle="Upload a RAR archive to extract"
                acceptedFileTypes=".rar"
                onFileSelect={handleFileSelect}
                ref={fileInputRef}
              />
            ) : (
              <div className="p-4 border rounded-md bg-muted/50">
                <p className="font-medium">Selected file:</p>
                <p className="text-muted-foreground">{rarFile.name} ({formatFileSize(rarFile.size)})</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={resetExtractor}
              disabled={isExtracting}
            >
              Reset
            </Button>
            <Button 
              onClick={extractRar} 
              disabled={!rarFile || isExtracting}
            >
              {isExtracting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isExtracting ? 'Processing...' : 'Simulate Extraction'}
            </Button>
          </CardFooter>
        </Card>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Limitation</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {extractedFiles.length > 0 && (
          <Card className="shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Simulated Contents</CardTitle>
              <CardDescription>
                {extractedFiles.filter(f => f.type === 'file').length} files and {extractedFiles.filter(f => f.type === 'folder').length} folders in simulation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Size</TableHead>
                      <TableHead className="text-right w-[100px]">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {extractedFiles.map((file, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium truncate max-w-[300px]">
                          <div className="flex items-center">
                            {file.type === 'folder' ? (
                              <Folder className="h-4 w-4 mr-2 text-blue-500" />
                            ) : (
                              <FileText className="h-4 w-4 mr-2 text-green-500" />
                            )}
                            <span className="truncate">{file.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{file.type === 'folder' ? 'Folder' : 'File'}</TableCell>
                        <TableCell className="text-right">{formatFileSize(file.size)}</TableCell>
                        <TableCell className="text-right">
                          {file.type === 'file' && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => downloadFile(file)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default RarExtractor;
