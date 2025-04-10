
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, FileText, Folder, Loader2, Plus, Trash, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import JSZip from 'jszip';
import ZipCreatorSEO from '@/components/SEO/ZipCreatorSEO';

interface FileEntry {
  id: string;
  name: string;
  file: File;
  size: number;
  type: string;
}

const ZipCreator = () => {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [zipName, setZipName] = useState('archive.zip');
  const [isCreating, setIsCreating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFiles = Array.from(event.target.files);
      
      const newFiles = selectedFiles.map(file => ({
        id: generateId(),
        name: file.name,
        file: file,
        size: file.size,
        type: file.type || 'application/octet-stream'
      }));
      
      setFiles(prev => [...prev, ...newFiles]);
      
      // Reset input to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      toast({
        title: "Files added",
        description: `${newFiles.length} file(s) added to the ZIP`,
        variant: "default",
      });
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
    
    toast({
      title: "File removed",
      variant: "default",
    });
  };

  const createZip = async () => {
    if (files.length === 0) {
      toast({
        title: "No files added",
        description: "Please add at least one file to create a ZIP",
        variant: "destructive",
      });
      return;
    }
    
    setIsCreating(true);
    
    try {
      const zip = new JSZip();
      
      // Add each file to the zip
      for (const fileEntry of files) {
        zip.file(fileEntry.name, fileEntry.file);
      }
      
      // Generate the zip file
      const content = await zip.generateAsync({ type: 'blob' });
      
      // Create download link
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = zipName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "ZIP created successfully",
        description: `${zipName} has been created with ${files.length} file(s)`,
        variant: "default",
      });
    } catch (error) {
      console.error('Error creating ZIP:', error);
      toast({
        title: "ZIP creation failed",
        description: "An error occurred while creating the ZIP file",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getTotalSize = () => {
    return files.reduce((total, file) => total + file.size, 0);
  };

  const resetCreator = () => {
    setFiles([]);
    setZipName('archive.zip');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getIconForFileType = (type: string) => {
    if (type.includes('image')) return '🖼️';
    if (type.includes('text')) return '📄';
    if (type.includes('pdf')) return '📑';
    if (type.includes('zip') || type.includes('rar') || type.includes('tar')) return '🗜️';
    if (type.includes('audio')) return '🎵';
    if (type.includes('video')) return '🎬';
    return '📁';
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ZipCreatorSEO />
      <Header />
      
      <div className="container max-w-4xl mx-auto px-4 py-8 flex-grow">
        <BackButton />
        
        <h1 className="text-3xl font-bold mb-6">ZIP File Creator</h1>
        <p className="mb-6 text-muted-foreground">
          Create ZIP archive files from multiple files directly in your browser.
        </p>
        
        <Card className="mb-6 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Create ZIP Archive</CardTitle>
            <CardDescription>Add files and create a downloadable ZIP file</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="zipName">ZIP File Name</Label>
              <Input 
                id="zipName" 
                value={zipName} 
                onChange={(e) => setZipName(e.target.value.endsWith('.zip') ? e.target.value : `${e.target.value}.zip`)} 
                placeholder="archive.zip" 
              />
            </div>
            
            <div className="space-y-2">
              <Label>Add Files</Label>
              <div className="flex items-center space-x-2">
                <Input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden" 
                  onChange={handleFileSelect} 
                  multiple 
                />
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Select Files
                </Button>
              </div>
            </div>
            
            {files.length > 0 && (
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Size</TableHead>
                      <TableHead className="text-right w-[80px]">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {files.map((file) => (
                      <TableRow key={file.id}>
                        <TableCell className="font-medium truncate max-w-[300px]">
                          <div className="flex items-center">
                            <span className="mr-2">{getIconForFileType(file.type)}</span>
                            <span className="truncate">{file.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{file.type.split('/')[1] || 'Unknown'}</TableCell>
                        <TableCell className="text-right">{formatFileSize(file.size)}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeFile(file.id)}
                          >
                            <Trash className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            
            {files.length > 0 && (
              <div className="text-sm text-muted-foreground">
                Total: {files.length} file(s), {formatFileSize(getTotalSize())}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={resetCreator}
              disabled={isCreating}
            >
              Reset
            </Button>
            <Button 
              onClick={createZip} 
              disabled={files.length === 0 || isCreating}
              className="bg-gradient-primary hover:opacity-90"
            >
              {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isCreating ? 'Creating ZIP...' : 'Create ZIP'}
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default ZipCreator;
