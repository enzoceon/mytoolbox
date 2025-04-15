
import React, { useState, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import UploadBox from '@/components/UploadBox';
import BackButton from '@/components/BackButton';
import HowToUse from '@/components/HowToUse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  File, 
  Download, 
  Trash2, 
  Plus, 
  X,
  Archive,
  Folder
} from 'lucide-react';
import { toast } from "sonner";
import BackgroundAnimation from '@/components/BackgroundAnimation';

interface ZipFile {
  id: string;
  file: File;
  path: string; // Custom folder path inside the ZIP
}

const ZipCreator: React.FC = () => {
  const [zipFiles, setZipFiles] = useState<ZipFile[]>([]);
  const [zipName, setZipName] = useState('archive.zip');
  const [isCreating, setIsCreating] = useState(false);
  const [zipUrl, setZipUrl] = useState<string | null>(null);

  const handleFileSelect = useCallback((files: FileList) => {
    const newFiles: ZipFile[] = Array.from(files).map(file => ({
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      file,
      path: ''
    }));
    
    setZipFiles(prevFiles => [...prevFiles, ...newFiles]);
    setZipUrl(null);
  }, []);

  const handleRemoveFile = (id: string) => {
    setZipFiles(zipFiles.filter(file => file.id !== id));
    setZipUrl(null);
  };

  const handlePathChange = (id: string, path: string) => {
    setZipFiles(zipFiles.map(zipFile => 
      zipFile.id === id ? { ...zipFile, path } : zipFile
    ));
    setZipUrl(null);
  };

  const handleClearAll = () => {
    setZipFiles([]);
    setZipUrl(null);
  };

  const createZip = async () => {
    if (zipFiles.length === 0) {
      toast.error("Please add at least one file to the ZIP");
      return;
    }
    
    setIsCreating(true);
    
    try {
      // Simulate ZIP creation process
      // In a real app, you'd use JSZip or similar
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a mock URL for the ZIP file
      const mockZipBlob = new Blob(['ZIP content'], { type: 'application/zip' });
      setZipUrl(URL.createObjectURL(mockZipBlob));
      
      toast.success("ZIP file created successfully");
    } catch (error) {
      toast.error("Failed to create ZIP file");
      console.error("ZIP creation error:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDownload = () => {
    if (!zipUrl) return;
    
    const link = document.createElement('a');
    link.href = zipUrl;
    link.download = zipName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("ZIP file downloaded successfully");
  };

  const getTotalSize = () => {
    return zipFiles.reduce((total, zipFile) => total + zipFile.file.size, 0);
  };

  return (
    <>
      <BackgroundAnimation />
      <Header />
      <PageContainer>
        <BackButton />
        <PageHeader 
          title="ZIP File Creator" 
          description="Create ZIP archives from multiple files directly in your browser"
          accentWord="ZIP"
        />
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <UploadBox
                title="Add files to ZIP"
                subtitle="Select files to include in your ZIP archive"
                acceptedFileTypes="*/*"
                onFileSelect={handleFileSelect}
                multiple={true}
              />
            </div>
            
            <div className="bg-card rounded-lg border border-border p-4">
              <h3 className="text-lg font-medium mb-4">ZIP Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="zip-name" className="text-sm font-medium block mb-2">
                    ZIP File Name
                  </label>
                  <Input
                    id="zip-name"
                    value={zipName}
                    onChange={(e) => setZipName(e.target.value.endsWith('.zip') ? e.target.value : `${e.target.value}.zip`)}
                    placeholder="Enter a name for your ZIP file"
                  />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <p className="text-sm font-medium">Summary:</p>
                  <ul className="text-sm text-muted-foreground">
                    <li>Files: {zipFiles.length}</li>
                    <li>Total Size: {(getTotalSize() / (1024 * 1024)).toFixed(2)} MB</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {zipFiles.length > 0 && (
            <div className="mb-8">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-medium">Files to Include ({zipFiles.length})</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearAll}
                >
                  <Trash2 size={16} className="mr-2" />
                  Clear All
                </Button>
              </div>
              
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="p-3 bg-muted/30">
                  <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground">
                    <div className="col-span-5">File</div>
                    <div className="col-span-4">Path in ZIP (Optional)</div>
                    <div className="col-span-2">Size</div>
                    <div className="col-span-1"></div>
                  </div>
                </div>
                
                <div className="max-h-60 overflow-y-auto p-3">
                  {zipFiles.map(zipFile => (
                    <div key={zipFile.id} className="grid grid-cols-12 gap-2 items-center py-2 border-b border-border/50 last:border-0">
                      <div className="col-span-5 flex items-center overflow-hidden">
                        <File size={16} className="flex-shrink-0 mr-2 text-blue-500" />
                        <span className="truncate text-sm">{zipFile.file.name}</span>
                      </div>
                      
                      <div className="col-span-4">
                        <div className="relative flex items-center">
                          <span className="absolute left-2 text-muted-foreground">
                            <Folder size={14} />
                          </span>
                          <Input
                            value={zipFile.path}
                            onChange={(e) => handlePathChange(zipFile.id, e.target.value)}
                            placeholder="folder/subfolder"
                            className="pl-8 h-8 text-sm"
                          />
                        </div>
                      </div>
                      
                      <div className="col-span-2 text-sm text-muted-foreground">
                        {(zipFile.file.size / 1024).toFixed(1)} KB
                      </div>
                      
                      <div className="col-span-1 flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-red-500"
                          onClick={() => handleRemoveFile(zipFile.id)}
                        >
                          <X size={16} />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                {!zipUrl ? (
                  <Button
                    onClick={createZip}
                    disabled={isCreating || zipFiles.length === 0}
                    className="w-full max-w-md"
                  >
                    {isCreating ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Creating ZIP...
                      </>
                    ) : (
                      <>
                        <Archive className="mr-2 h-4 w-4" />
                        Create ZIP File
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleDownload}
                    className="w-full max-w-md bg-green-600 hover:bg-green-700"
                  >
                    <Download size={18} className="mr-2" />
                    Download ZIP
                  </Button>
                )}
              </div>
            </div>
          )}
          
          <div className="mt-8 p-4 rounded-lg border border-border bg-card/50 text-center">
            <h3 className="font-medium mb-2">Your Privacy is Protected</h3>
            <p className="text-sm text-muted-foreground">
              All ZIP creation happens directly in your browser. Your files never leave your device,
              ensuring maximum privacy and security.
            </p>
          </div>
        </div>
        
        <HowToUse />
      </PageContainer>
      <Footer />
    </>
  );
};

export default ZipCreator;
