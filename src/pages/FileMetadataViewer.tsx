
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, File, Trash, Info, FilesIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import UploadBox from '@/components/UploadBox';
import { extractFileMetadata } from '@/utils/fileUtils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Helmet } from 'react-helmet-async';

interface MetadataDisplay {
  category: string;
  items: { label: string; value: string | number | Date | null }[];
}

const FileMetadataViewer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<Record<string, any> | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (files: FileList) => {
    const file = files[0];
    if (file) {
      setFile(file);
      setMetadata(null);
      
      // Extract metadata
      setIsProcessing(true);
      try {
        const data = await extractFileMetadata(file);
        setMetadata(data);
        
        toast({
          title: "Metadata extracted",
          description: `Discovered ${Object.keys(data).length} metadata properties`,
        });
      } catch (error) {
        console.error("Error extracting metadata:", error);
        toast({
          title: "Error extracting metadata",
          description: "Could not extract metadata from this file",
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
      }
    }
  };
  
  const handleReset = () => {
    setFile(null);
    setMetadata(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  
  const getFileIcon = (fileType: string): JSX.Element => {
    // Return different icons based on file type
    if (fileType.includes('image')) {
      return <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>;
    } else if (fileType.includes('video')) {
      return <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14 2 6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8z"></path><path d="m14 2 6 6h-6V2z"></path><path d="m10 11 5 3-5 3v-6z"></path></svg>;
    } else if (fileType.includes('audio')) {
      return <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.7 5a4 4 0 0 0-5.6 0l-3.2 3.2-3.3 3.2a4 4 0 0 0 5.7 5.7l3.1-3.2"></path><path d="m7.325 10.294 5.382 5.36"></path><path d="m18.634 2.993 2.478 2.46"></path><path d="M16.427 5.179v.005"></path><path d="M9.217 12.392v.005"></path><path d="m3.121 18.4 2.499 2.498"></path></svg>;
    } else if (fileType.includes('pdf')) {
      return <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>;
    } else if (fileType.includes('zip') || fileType.includes('compressed')) {
      return <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M12 12v6"></path><path d="M15 15h-6"></path></svg>;
    } else if (fileType.includes('text') || fileType.includes('xml') || fileType.includes('json')) {
      return <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>;
    } else {
      return <File className="h-10 w-10 text-gray-500" />;
    }
  };
  
  const formatMetadataForDisplay = (): MetadataDisplay[] => {
    if (!metadata) return [];
    
    // Basic file information
    const basicInfo = {
      category: 'Basic Information',
      items: [
        { label: 'File Name', value: metadata.name },
        { label: 'File Size', value: metadata.formattedSize },
        { label: 'File Type', value: metadata.type },
        { label: 'Extension', value: metadata.extension },
        { label: 'Last Modified', value: metadata.lastModified },
      ]
    };
    
    // For simplicity, we'll just show the basic info
    // In a real application, you would extract additional metadata
    // based on the file type (e.g., EXIF for images, ID3 for MP3, etc.)
    return [basicInfo];
  };
  
  const getFileTypeCategory = (fileType: string): string => {
    if (fileType.includes('image')) return 'Image';
    if (fileType.includes('video')) return 'Video';
    if (fileType.includes('audio')) return 'Audio';
    if (fileType.includes('pdf')) return 'PDF';
    if (fileType.includes('zip') || fileType.includes('compressed')) return 'Archive';
    if (fileType.includes('text') || fileType.includes('xml') || fileType.includes('json')) return 'Text';
    return 'Other';
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>File Metadata Viewer - MyToolbox</title>
        <meta name="description" content="View detailed metadata information for any file type with our free online tool." />
      </Helmet>

      <Header />
      
      <div className="container max-w-4xl mx-auto px-4 py-8 flex-grow">
        <BackButton />
        
        <h1 className="text-3xl font-bold mb-6">File Metadata Viewer</h1>
        <p className="mb-6 text-muted-foreground">
          View detailed metadata information for any file type. All processing happens in your browser for maximum privacy.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Upload File</CardTitle>
              <CardDescription>Select any file to view its metadata</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {!file ? (
                  <UploadBox
                    title="Drop your file here"
                    subtitle="Supports all file types"
                    acceptedFileTypes="*/*"
                    onFileSelect={handleFileSelect}
                    ref={fileInputRef}
                  />
                ) : (
                  <div className="space-y-4">
                    <div className="p-6 bg-primary/10 rounded-md flex items-center justify-center">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="text-center">
                      <p className="font-medium truncate">{file.name}</p>
                      <div className="flex justify-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {getFileTypeCategory(file.type)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {(file.size / 1024).toFixed(2)} KB
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" onClick={handleReset}>
                      <Trash className="mr-2 h-4 w-4" />
                      Select Another File
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>File Metadata</CardTitle>
              <CardDescription>
                {metadata 
                  ? 'Information extracted from your file' 
                  : isProcessing 
                    ? 'Extracting metadata...'
                    : 'Upload a file to view its metadata'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isProcessing ? (
                <div className="flex items-center justify-center h-60">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Extracting metadata...</span>
                </div>
              ) : metadata ? (
                <ScrollArea className="h-80 pr-4">
                  <div className="space-y-6">
                    {formatMetadataForDisplay().map((category, categoryIndex) => (
                      <div key={categoryIndex} className="space-y-3">
                        <h3 className="font-semibold">{category.category}</h3>
                        <div className="bg-secondary/20 rounded-md p-3 space-y-2">
                          {category.items.map((item, itemIndex) => (
                            item.value != null && (
                              <div key={itemIndex}>
                                <div className="flex justify-between items-start py-1">
                                  <span className="text-sm font-medium">{item.label}:</span>
                                  <span className="text-sm text-right">
                                    {item.value instanceof Date 
                                      ? item.value.toLocaleString() 
                                      : String(item.value)}
                                  </span>
                                </div>
                                {itemIndex < category.items.length - 1 && <Separator />}
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <div className="text-center text-muted-foreground text-sm p-4">
                      <Info className="h-4 w-4 inline-block mr-1" />
                      This is a basic metadata viewer. A full implementation would extract more detailed metadata specific to each file type.
                    </div>
                  </div>
                </ScrollArea>
              ) : (
                <div className="flex flex-col items-center justify-center h-60 text-muted-foreground">
                  <FilesIcon className="h-12 w-12 mb-4" />
                  <p className="text-center">
                    Upload a file to view its metadata
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FileMetadataViewer;
