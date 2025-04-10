
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, FileText, Folder, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import UploadBox from '@/components/UploadBox';
import JSZip from 'jszip';
import ZipExtractorSEO from '@/components/SEO/ZipExtractorSEO';

interface ZipEntry {
  name: string;
  path: string;
  size: number;
  type: 'file' | 'folder';
  data?: Blob;
}

const ZipExtractor = () => {
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [extractedFiles, setExtractedFiles] = useState<ZipEntry[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList) => {
    const file = files[0];
    if (file) {
      if (file.type === 'application/zip' || file.name.endsWith('.zip')) {
        setZipFile(file);
        setExtractedFiles([]);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a ZIP file",
          variant: "destructive",
        });
      }
    }
  };

  const extractZip = async () => {
    if (!zipFile) return;
    
    setIsExtracting(true);
    
    try {
      const zip = new JSZip();
      const zipData = await zip.loadAsync(zipFile);
      const extractedEntries: ZipEntry[] = [];
      
      // Process all files and folders in the ZIP
      for (const [path, zipEntry] of Object.entries(zipData.files)) {
        const isFolder = zipEntry.dir;
        const name = path.split('/').pop() || path;
        
        if (isFolder) {
          extractedEntries.push({
            name,
            path,
            size: 0,
            type: 'folder'
          });
        } else {
          // Get file data as blob
          const blob = await zipEntry.async('blob');
          const size = blob.size;
          
          extractedEntries.push({
            name,
            path,
            size,
            type: 'file',
            data: blob
          });
        }
      }
      
      // Sort entries: folders first, then files
      extractedEntries.sort((a, b) => {
        if (a.type === b.type) {
          return a.name.localeCompare(b.name);
        }
        return a.type === 'folder' ? -1 : 1;
      });
      
      setExtractedFiles(extractedEntries);
      
      toast({
        title: "ZIP extracted successfully",
        description: `${extractedEntries.filter(e => e.type === 'file').length} files extracted`,
        variant: "default",
      });
    } catch (error) {
      console.error('Error extracting ZIP:', error);
      toast({
        title: "Extraction failed",
        description: "Failed to extract ZIP file. The file may be corrupted or invalid.",
        variant: "destructive",
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const downloadFile = (file: ZipEntry) => {
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

  const downloadAll = () => {
    const fileEntries = extractedFiles.filter(file => file.type === 'file');
    
    if (fileEntries.length === 0) {
      toast({
        title: "No files to download",
        variant: "destructive",
      });
      return;
    }
    
    // For multiple files, create a new zip
    if (fileEntries.length > 1) {
      const zip = new JSZip();
      
      fileEntries.forEach(file => {
        if (file.data) {
          zip.file(file.name, file.data);
        }
      });
      
      zip.generateAsync({ type: 'blob' }).then((content) => {
        const url = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download = `extracted_files.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast({
          title: "Download started",
          description: `All files will download as a ZIP shortly`,
          variant: "default",
        });
      });
    } else {
      // For a single file, download directly
      downloadFile(fileEntries[0]);
    }
  };

  const resetExtractor = () => {
    setZipFile(null);
    setExtractedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ZipExtractorSEO />
      <Header />
      
      <div className="container max-w-4xl mx-auto px-4 py-8 flex-grow">
        <BackButton />
        
        <h1 className="text-3xl font-bold mb-6">ZIP Extractor</h1>
        <p className="mb-6 text-muted-foreground">
          Extract contents from ZIP archive files online without installing any software.
        </p>
        
        <Card className="mb-6 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Upload ZIP File</CardTitle>
            <CardDescription>Select a ZIP file to extract its contents</CardDescription>
          </CardHeader>
          <CardContent>
            {!zipFile ? (
              <UploadBox
                title="Drop your ZIP file here"
                subtitle="Upload a ZIP archive to extract its contents"
                acceptedFileTypes=".zip,application/zip"
                onFileSelect={handleFileSelect}
                ref={fileInputRef}
              />
            ) : (
              <div className="p-4 border rounded-md bg-muted/50">
                <p className="font-medium">Selected file:</p>
                <p className="text-muted-foreground">{zipFile.name} ({formatFileSize(zipFile.size)})</p>
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
              onClick={extractZip} 
              disabled={!zipFile || isExtracting}
            >
              {isExtracting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isExtracting ? 'Extracting...' : 'Extract ZIP'}
            </Button>
          </CardFooter>
        </Card>
        
        {extractedFiles.length > 0 && (
          <Card className="shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Extracted Contents</CardTitle>
                <Button onClick={downloadAll} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </Button>
              </div>
              <CardDescription>
                {extractedFiles.filter(f => f.type === 'file').length} files and {extractedFiles.filter(f => f.type === 'folder').length} folders found
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

export default ZipExtractor;
