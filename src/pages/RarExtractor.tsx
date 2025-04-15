
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import UploadBox from '@/components/UploadBox';
import BackButton from '@/components/BackButton';
import HowToUse from '@/components/HowToUse';
import { Button } from '@/components/ui/button';
import { 
  File, 
  Download, 
  Folder, 
  Archive,
  ChevronRight,
  ChevronDown,
  FileText,
  Image,
  Film,
  Music
} from 'lucide-react';
import { toast } from "sonner";
import BackgroundAnimation from '@/components/BackgroundAnimation';

interface ExtractedFile {
  id: string;
  name: string;
  type: string;
  size: string;
  path: string;
}

interface ExtractedFolder {
  id: string;
  name: string;
  files: ExtractedFile[];
  folders: ExtractedFolder[];
  isOpen: boolean;
}

const RarExtractor: React.FC = () => {
  const [selectedRar, setSelectedRar] = useState<File | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedFiles, setExtractedFiles] = useState<ExtractedFile[]>([]);
  const [extractedFolders, setExtractedFolders] = useState<ExtractedFolder[]>([]);

  const handleFileSelect = (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];
      
      // Check if file is a RAR
      if (!file.name.toLowerCase().endsWith('.rar')) {
        toast.error("Please select a RAR file");
        return;
      }
      
      setSelectedRar(file);
      setExtractedFiles([]);
      setExtractedFolders([]);
    }
  };

  const extractRar = async () => {
    if (!selectedRar) return;
    
    setIsExtracting(true);
    
    try {
      // Simulate extraction process
      // In a real app, you'd use a library like unrar.js
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock extracted files
      const mockFiles: ExtractedFile[] = [
        { 
          id: '1', 
          name: 'document.pdf', 
          type: 'application/pdf', 
          size: '1.2 MB',
          path: '/'
        },
        { 
          id: '2', 
          name: 'image1.jpg', 
          type: 'image/jpeg', 
          size: '485 KB',
          path: '/'
        },
        { 
          id: '3', 
          name: 'presentation.pptx', 
          type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 
          size: '2.7 MB',
          path: '/'
        }
      ];
      
      // Mock folders
      const mockFolders: ExtractedFolder[] = [
        {
          id: 'folder1',
          name: 'Images',
          files: [
            { 
              id: '4', 
              name: 'photo1.jpg', 
              type: 'image/jpeg', 
              size: '1.8 MB',
              path: '/Images'
            },
            { 
              id: '5', 
              name: 'photo2.png', 
              type: 'image/png', 
              size: '2.3 MB',
              path: '/Images'
            }
          ],
          folders: [],
          isOpen: false
        },
        {
          id: 'folder2',
          name: 'Documents',
          files: [
            { 
              id: '6', 
              name: 'contract.docx', 
              type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
              size: '567 KB',
              path: '/Documents'
            }
          ],
          folders: [
            {
              id: 'subfolder1',
              name: 'Reports',
              files: [
                { 
                  id: '7', 
                  name: 'annual_report.pdf', 
                  type: 'application/pdf', 
                  size: '3.4 MB',
                  path: '/Documents/Reports'
                }
              ],
              folders: [],
              isOpen: false
            }
          ],
          isOpen: false
        }
      ];
      
      setExtractedFiles(mockFiles);
      setExtractedFolders(mockFolders);
      toast.success("RAR file extracted successfully");
    } catch (error) {
      toast.error("Failed to extract RAR file");
      console.error("RAR extraction error:", error);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleDownloadFile = (file: ExtractedFile) => {
    // In a real app, you'd create a Blob from the extracted file content
    const mockContent = new Blob(['File content'], { type: file.type });
    const url = URL.createObjectURL(mockContent);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    toast.success(`${file.name} downloaded successfully`);
  };

  const handleDownloadAll = () => {
    // In a real app, you'd create a zip file with all extracted contents
    toast.success("All files downloaded successfully");
  };

  const toggleFolder = (folderId: string, folderList: ExtractedFolder[]) => {
    return folderList.map(folder => {
      if (folder.id === folderId) {
        return { ...folder, isOpen: !folder.isOpen };
      } else if (folder.folders.length > 0) {
        return { ...folder, folders: toggleFolder(folderId, folder.folders) };
      } else {
        return folder;
      }
    });
  };

  const handleToggleFolder = (folderId: string) => {
    setExtractedFolders(toggleFolder(folderId, extractedFolders));
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('image')) {
      return <Image size={16} className="text-blue-500" />;
    } else if (fileType.includes('pdf')) {
      return <FileText size={16} className="text-red-500" />;
    } else if (fileType.includes('video')) {
      return <Film size={16} className="text-purple-500" />;
    } else if (fileType.includes('audio')) {
      return <Music size={16} className="text-green-500" />;
    } else {
      return <File size={16} className="text-gray-500" />;
    }
  };

  const handleReset = () => {
    setSelectedRar(null);
    setExtractedFiles([]);
    setExtractedFolders([]);
  };

  const renderFolder = (folder: ExtractedFolder, depth: number = 0) => {
    return (
      <div key={folder.id} className="mb-1">
        <div 
          className="flex items-center py-2 px-3 rounded-md hover:bg-muted/50 cursor-pointer"
          onClick={() => handleToggleFolder(folder.id)}
          style={{ paddingLeft: `${(depth * 12) + 12}px` }}
        >
          {folder.isOpen ? (
            <ChevronDown size={16} className="mr-2 text-muted-foreground" />
          ) : (
            <ChevronRight size={16} className="mr-2 text-muted-foreground" />
          )}
          <Folder size={16} className="mr-2 text-blue-400" />
          <span className="text-sm">{folder.name}</span>
        </div>
        
        {folder.isOpen && (
          <div className="ml-6">
            {folder.files.map(file => (
              <div 
                key={file.id} 
                className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted/50"
                style={{ paddingLeft: `${(depth * 12) + 18}px` }}
              >
                <div className="flex items-center">
                  {getFileIcon(file.type)}
                  <span className="ml-2 text-sm">{file.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-muted-foreground mr-3">{file.size}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 w-7 p-0" 
                    onClick={() => handleDownloadFile(file)}
                  >
                    <Download size={14} />
                    <span className="sr-only">Download</span>
                  </Button>
                </div>
              </div>
            ))}
            
            {folder.folders.map(subFolder => renderFolder(subFolder, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <BackgroundAnimation />
      <Header />
      <PageContainer>
        <BackButton />
        <PageHeader 
          title="RAR Extractor" 
          description="Extract files from RAR archives directly in your browser"
          accentWord="RAR"
        />
        
        <div className="max-w-4xl mx-auto">
          {!selectedRar ? (
            <UploadBox
              title="Drop your RAR file here"
              subtitle="Select a RAR archive to extract its contents"
              acceptedFileTypes=".rar"
              onFileSelect={handleFileSelect}
              multiple={false}
            />
          ) : (
            <div className="animate-fade-in">
              <div className="mb-6 p-4 rounded-lg border border-border bg-card">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Archive className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{selectedRar.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {(selectedRar.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </div>
              
              {extractedFiles.length === 0 && extractedFolders.length === 0 && (
                <div className="flex justify-center mb-8">
                  <Button
                    onClick={extractRar}
                    disabled={isExtracting}
                    className="w-full max-w-md"
                  >
                    {isExtracting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Extracting RAR...
                      </>
                    ) : (
                      <>
                        <Archive className="mr-2 h-4 w-4" />
                        Extract RAR Archive
                      </>
                    )}
                  </Button>
                </div>
              )}
              
              {(extractedFiles.length > 0 || extractedFolders.length > 0) && (
                <div className="mb-8">
                  <div className="mb-4 flex justify-between items-center">
                    <h3 className="text-lg font-medium">Extracted Contents</h3>
                    <Button
                      size="sm"
                      onClick={handleDownloadAll}
                    >
                      <Download size={16} className="mr-2" />
                      Download All
                    </Button>
                  </div>
                  
                  <div className="bg-card border border-border rounded-lg overflow-hidden">
                    <div className="p-2">
                      {extractedFiles.map(file => (
                        <div 
                          key={file.id} 
                          className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted/50"
                        >
                          <div className="flex items-center">
                            {getFileIcon(file.type)}
                            <span className="ml-2 text-sm">{file.name}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-muted-foreground mr-3">{file.size}</span>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 w-7 p-0" 
                              onClick={() => handleDownloadFile(file)}
                            >
                              <Download size={14} />
                              <span className="sr-only">Download</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      {extractedFolders.map(folder => renderFolder(folder))}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-center">
                    <Button
                      onClick={handleReset}
                      variant="outline"
                    >
                      Extract Another RAR File
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="mt-8 p-4 rounded-lg border border-border bg-card/50 text-center">
                <h3 className="font-medium mb-2">Your Privacy is Protected</h3>
                <p className="text-sm text-muted-foreground">
                  All extraction happens directly in your browser. Your files never leave your device,
                  ensuring maximum privacy and security.
                </p>
              </div>
            </div>
          )}
        </div>
        
        <HowToUse />
      </PageContainer>
      <Footer />
    </>
  );
};

export default RarExtractor;
