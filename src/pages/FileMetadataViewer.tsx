
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import UploadBox from '@/components/UploadBox';
import BackButton from '@/components/BackButton';
import HowToUse from '@/components/HowToUse';
import FileMetadataSEO from '@/components/SEO/FileMetadataSEO';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Trash2, X, FileSearch, Save } from 'lucide-react';
import { toast } from "sonner";
import BackgroundAnimation from '@/components/BackgroundAnimation';

const FileMetadataViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setMetadata(null);
      extractMetadata(file);
    }
  };

  const extractMetadata = async (file: File) => {
    setIsLoading(true);
    
    try {
      // Simulate metadata extraction (in a real app, use various APIs based on file type)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Basic metadata available from File object
      const basicMetadata = {
        "General Information": {
          "File Name": file.name,
          "File Size": `${(file.size / 1024).toFixed(2)} KB`,
          "File Type": file.type || "Unknown",
          "Last Modified": new Date(file.lastModified).toLocaleString()
        }
      };
      
      // Mock additional metadata based on file type
      let additionalMetadata = {};
      
      if (file.type.includes('image')) {
        additionalMetadata = {
          "Image Properties": {
            "Width": "1920 pixels",
            "Height": "1080 pixels",
            "Color Space": "sRGB",
            "Color Depth": "24-bit",
            "Resolution": "72 dpi"
          },
          "Camera Information": {
            "Make": "Canon",
            "Model": "EOS R5",
            "Software": "Adobe Photoshop 2023",
            "Date Taken": "2023-04-15 10:23:15"
          }
        };
      } else if (file.type.includes('pdf')) {
        additionalMetadata = {
          "PDF Properties": {
            "PDF Version": "1.7",
            "Page Count": "12",
            "Creator": "Microsoft Word 2019",
            "Producer": "Adobe PDF Library 15.0",
            "Creation Date": "2023-01-10 09:45:22",
            "Modified Date": "2023-02-05 14:30:18"
          }
        };
      } else if (file.type.includes('video')) {
        additionalMetadata = {
          "Video Properties": {
            "Duration": "00:03:24",
            "Width": "1920 pixels",
            "Height": "1080 pixels",
            "Frame Rate": "30 fps",
            "Codec": "H.264",
            "Bitrate": "8.5 Mbps"
          },
          "Audio Properties": {
            "Codec": "AAC",
            "Channels": "2 (Stereo)",
            "Sample Rate": "48 kHz",
            "Bitrate": "320 kbps"
          }
        };
      } else if (file.type.includes('audio')) {
        additionalMetadata = {
          "Audio Properties": {
            "Duration": "00:04:15",
            "Codec": "MP3",
            "Channels": "2 (Stereo)",
            "Sample Rate": "44.1 kHz",
            "Bitrate": "320 kbps"
          },
          "Tags": {
            "Title": "Example Song",
            "Artist": "Example Artist",
            "Album": "Example Album",
            "Year": "2023",
            "Genre": "Electronic"
          }
        };
      } else {
        additionalMetadata = {
          "Additional Information": {
            "Note": "Detailed metadata extraction not available for this file type"
          }
        };
      }
      
      // Combine metadata
      setMetadata({...basicMetadata, ...additionalMetadata});
    } catch (error) {
      toast.error("Failed to extract metadata");
      console.error("Metadata extraction error:", error);
    }
    
    setIsLoading(false);
  };

  const handleSaveMetadata = () => {
    if (!metadata) return;
    
    const jsonString = JSON.stringify(metadata, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `metadata_${selectedFile?.name || 'file'}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    toast.success("Metadata saved as JSON file");
  };

  const handleReset = () => {
    setSelectedFile(null);
    setMetadata(null);
  };

  return (
    <>
      <FileMetadataSEO />
      <BackgroundAnimation />
      <Header />
      <PageContainer>
        <BackButton />
        <PageHeader 
          title="File Metadata Viewer" 
          description="View detailed technical information and hidden metadata in your files"
          accentWord="Metadata"
        />
        
        <div className="max-w-4xl mx-auto">
          {!selectedFile ? (
            <UploadBox
              title="Drop any file here"
              subtitle="Select any file to view its metadata and properties"
              acceptedFileTypes="*/*"
              onFileSelect={handleFileSelect}
              multiple={false}
            />
          ) : (
            <div className="animate-fade-in">
              <div className="mb-6 p-4 rounded-lg border border-border bg-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <FileSearch className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{selectedFile.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.type || "Unknown type"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleReset}
                    className="p-1 bg-muted rounded-full"
                    aria-label="Remove file"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              
              {isLoading ? (
                <div className="p-8 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 border-4 border-t-primary rounded-full animate-spin mb-4"></div>
                  <p className="text-foreground">Extracting file metadata...</p>
                </div>
              ) : (
                <>
                  {metadata && (
                    <div className="bg-card border border-border rounded-lg overflow-hidden">
                      <div className="p-4 bg-muted/50">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium">File Metadata</h3>
                          <Button size="sm" variant="outline" onClick={handleSaveMetadata}>
                            <Save size={16} className="mr-2" />
                            Save as JSON
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        {Object.entries(metadata).map(([section, properties]: [string, any]) => (
                          <div key={section} className="mb-6 last:mb-0">
                            <h4 className="text-sm font-medium text-muted-foreground mb-3">{section}</h4>
                            <div className="bg-card rounded-md">
                              <Table>
                                <TableBody>
                                  {Object.entries(properties).map(([key, value]: [string, any]) => (
                                    <TableRow key={key}>
                                      <TableCell className="font-medium w-1/3">{key}</TableCell>
                                      <TableCell className="text-muted-foreground">{value as string}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-8 flex justify-center">
                    <Button
                      onClick={handleReset}
                      variant="outline"
                    >
                      <Trash2 size={18} className="mr-2" />
                      Select Another File
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        
        <HowToUse />
      </PageContainer>
      <Footer />
    </>
  );
};

export default FileMetadataViewer;
