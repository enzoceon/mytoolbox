
import React, { createContext, useState, useCallback, useContext, ReactNode } from 'react';
import { toast } from "sonner";
import JSZip from 'jszip';
import { downloadWithStandardFilename } from '@/utils/fileUtils';

type FileRenamerContextType = {
  selectedFiles: File[];
  previewNames: { original: string; renamed: string }[];
  isProcessing: boolean;
  pattern: string;
  prefix: string;
  suffix: string;
  startNumber: number;
  handleFileSelect: (files: File[]) => void;
  handleRemoveFile: (index: number) => void;
  handleRemoveAllFiles: () => void;
  handlePatternChange: (pattern: string) => void;
  handlePrefixChange: (prefix: string) => void;
  handleSuffixChange: (suffix: string) => void;
  handleStartNumberChange: (startNumber: number) => void;
  handleDownload: () => void;
  applyRenaming: () => void;
};

const FileRenamerContext = createContext<FileRenamerContextType | undefined>(undefined);

export const useFileRenamer = () => {
  const context = useContext(FileRenamerContext);
  if (!context) {
    throw new Error('useFileRenamer must be used within a FileRenamerProvider');
  }
  return context;
};

interface FileRenamerProviderProps {
  children: ReactNode;
}

export const FileRenamerProvider: React.FC<FileRenamerProviderProps> = ({ children }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewNames, setPreviewNames] = useState<{ original: string; renamed: string }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pattern, setPattern] = useState<string>("{name}");
  const [prefix, setPrefix] = useState<string>("");
  const [suffix, setSuffix] = useState<string>("");
  const [startNumber, setStartNumber] = useState<number>(1);

  const updatePreviewNames = useCallback(() => {
    if (selectedFiles.length === 0) return;

    const updated = selectedFiles.map((file, index) => {
      const fileExt = file.name.substring(file.name.lastIndexOf('.'));
      const fileName = file.name.substring(0, file.name.lastIndexOf('.'));
      
      let newName = pattern
        .replace(/{name}/g, fileName)
        .replace(/{ext}/g, fileExt.substring(1))
        .replace(/{index}/g, (startNumber + index).toString())
        .replace(/{date}/g, new Date().toISOString().split('T')[0]);
      
      newName = prefix + newName + suffix + fileExt;
      
      return {
        original: file.name,
        renamed: newName
      };
    });
    
    setPreviewNames(updated);
  }, [pattern, prefix, suffix, startNumber, selectedFiles]);

  // Update preview names when any dependency changes
  React.useEffect(() => {
    updatePreviewNames();
  }, [pattern, prefix, suffix, startNumber, selectedFiles, updatePreviewNames]);

  const handleFileSelect = useCallback((files: File[]) => {
    try {
      if (files.length === 0) {
        toast.error("No files selected");
        return;
      }
      
      setSelectedFiles(prev => [...prev, ...files]);
      toast.success(`${files.length} file(s) added successfully`);
    } catch (error) {
      console.error("Error processing files:", error);
      toast.error("Failed to process the selected files");
    }
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewNames(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleRemoveAllFiles = useCallback(() => {
    setSelectedFiles([]);
    setPreviewNames([]);
  }, []);

  const handlePatternChange = useCallback((value: string) => {
    setPattern(value);
  }, []);

  const handlePrefixChange = useCallback((value: string) => {
    setPrefix(value);
  }, []);

  const handleSuffixChange = useCallback((value: string) => {
    setSuffix(value);
  }, []);

  const handleStartNumberChange = useCallback((value: number) => {
    setStartNumber(value);
  }, []);

  const applyRenaming = useCallback(() => {
    updatePreviewNames();
  }, [updatePreviewNames]);

  const handleDownload = useCallback(async () => {
    if (selectedFiles.length === 0) {
      toast.error("No files to download");
      return;
    }

    setIsProcessing(true);
    toast.loading("Preparing files for download...");

    try {
      const zip = new JSZip();

      // Add each file to the zip with its new name
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const newName = previewNames[i]?.renamed || file.name;
        
        const fileContent = await file.arrayBuffer();
        zip.file(newName, fileContent);
      }

      // Generate the zip file
      const content = await zip.generateAsync({ type: "blob" });
      
      // Create a download URL and trigger download
      const url = URL.createObjectURL(content);
      downloadWithStandardFilename(url, "zip", "renamed-files");
      
      // Clean up
      URL.revokeObjectURL(url);
      toast.dismiss();
      toast.success("Files prepared successfully!");
    } catch (error) {
      console.error("Error preparing files:", error);
      toast.dismiss();
      toast.error("Failed to prepare files for download");
    } finally {
      setIsProcessing(false);
    }
  }, [selectedFiles, previewNames]);

  const value = {
    selectedFiles,
    previewNames,
    isProcessing,
    pattern,
    prefix,
    suffix,
    startNumber,
    handleFileSelect,
    handleRemoveFile,
    handleRemoveAllFiles,
    handlePatternChange,
    handlePrefixChange,
    handleSuffixChange,
    handleStartNumberChange,
    handleDownload,
    applyRenaming
  };

  return (
    <FileRenamerContext.Provider value={value}>
      {children}
    </FileRenamerContext.Provider>
  );
};
