
import React from 'react';
import { useFileRenamer } from './FileRenamerProvider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { File, ArrowRight, X, Download, RefreshCw } from 'lucide-react';
import UploadBox from '@/components/UploadBox';

const FileRenamerArea: React.FC = () => {
  const {
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
  } = useFileRenamer();

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFiles = (files: FileList) => {
    handleFileSelect(Array.from(files));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {selectedFiles.length === 0 ? (
        <UploadBox
          title="Upload Files"
          subtitle="Select files you want to rename"
          acceptedFileTypes="*"
          onFileSelect={handleFiles}
          multiple={true}
        />
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <File className="h-6 w-6 text-primary" />
                <span>Rename Pattern</span>
              </CardTitle>
              <CardDescription>
                Customize how your files will be renamed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Pattern</label>
                  <div className="mt-1">
                    <Input
                      value={pattern}
                      onChange={(e) => handlePatternChange(e.target.value)}
                      placeholder="Pattern (e.g. {name}-{index})"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Available placeholders: {"{name}"}, {"{ext}"}, {"{index}"}, {"{date}"}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Starting Number</label>
                  <div className="mt-1">
                    <Input
                      type="number"
                      min={0}
                      value={startNumber}
                      onChange={(e) => handleStartNumberChange(parseInt(e.target.value))}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Used with {"{index}"} placeholder
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Prefix</label>
                  <div className="mt-1">
                    <Input
                      value={prefix}
                      onChange={(e) => handlePrefixChange(e.target.value)}
                      placeholder="Text to add before the name"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Suffix</label>
                  <div className="mt-1">
                    <Input
                      value={suffix}
                      onChange={(e) => handleSuffixChange(e.target.value)}
                      placeholder="Text to add after the name"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  onClick={triggerFileInput}
                >
                  Add More Files
                </Button>
                <Button 
                  onClick={applyRenaming} 
                  className="gap-2"
                  variant="secondary"
                >
                  <RefreshCw className="h-4 w-4" />
                  Preview Renaming
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Files to Rename ({selectedFiles.length})</span>
              </CardTitle>
              <div className="flex justify-between">
                <CardDescription>
                  Preview how your files will be renamed
                </CardDescription>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleRemoveAllFiles} 
                  className="text-destructive hover:text-destructive"
                >
                  Remove All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {previewNames.map((item, index) => (
                  <div key={index} className="border rounded-md p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <File className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium truncate max-w-xs">
                          {item.original}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemoveFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      <span className="text-primary truncate max-w-md">
                        {item.renamed}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="flex justify-center">
                <Button
                  onClick={handleDownload}
                  disabled={isProcessing || selectedFiles.length === 0}
                  className="gap-2"
                  size="lg"
                >
                  <Download className="h-4 w-4" />
                  {isProcessing ? "Processing..." : "Download Renamed Files (ZIP)"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
        multiple
      />
    </div>
  );
};

export default FileRenamerArea;
