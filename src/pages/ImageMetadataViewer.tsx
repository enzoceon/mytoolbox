
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Download, ImageIcon, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import UploadBox from '@/components/UploadBox';
import { extractImageMetadata, removeImageMetadata, downloadWithStandardFilename } from '@/utils/fileUtils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Helmet } from 'react-helmet-async';

interface MetadataItem {
  label: string;
  value: string | number | null;
}

const ImageMetadataViewer = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<Record<string, any> | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRemovingMetadata, setIsRemovingMetadata] = useState(false);
  const [cleanImageUrl, setCleanImageUrl] = useState<string | null>(null);
  const [showTechnicalData, setShowTechnicalData] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (files: FileList) => {
    const file = files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setImageFile(file);
        setMetadata(null);
        setCleanImageUrl(null);
        
        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setImagePreviewUrl(previewUrl);
        
        // Extract metadata
        setIsProcessing(true);
        try {
          const data = await extractImageMetadata(file);
          setMetadata(data);
        } catch (error) {
          console.error("Error extracting metadata:", error);
          toast({
            title: "Error extracting metadata",
            description: "Could not extract metadata from this image",
            variant: "destructive",
          });
        } finally {
          setIsProcessing(false);
        }
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleRemoveMetadata = async () => {
    if (!imageFile) return;
    
    setIsRemovingMetadata(true);
    try {
      const cleanBlob = await removeImageMetadata(imageFile);
      
      // Create URL for clean image
      const cleanUrl = URL.createObjectURL(cleanBlob);
      setCleanImageUrl(cleanUrl);
      
      toast({
        title: "Metadata removed",
        description: "All metadata has been stripped from the image",
      });
    } catch (error) {
      console.error("Error removing metadata:", error);
      toast({
        title: "Error removing metadata",
        description: "Could not remove metadata from this image",
        variant: "destructive",
      });
    } finally {
      setIsRemovingMetadata(false);
    }
  };
  
  const handleDownloadCleanImage = () => {
    if (cleanImageUrl && imageFile) {
      downloadWithStandardFilename(
        cleanImageUrl, 
        imageFile.name.split('.').pop() || 'jpg', 
        'cleaned'
      );
      
      toast({
        title: "Download started",
        description: "Your metadata-free image will download shortly",
      });
    }
  };
  
  const handleReset = () => {
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    if (cleanImageUrl) URL.revokeObjectURL(cleanImageUrl);
    
    setImageFile(null);
    setImagePreviewUrl(null);
    setMetadata(null);
    setCleanImageUrl(null);
    
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  
  const formatMetadataForDisplay = (): MetadataItem[] => {
    if (!metadata) return [];
    
    const basicItems: MetadataItem[] = [
      { label: 'File Name', value: metadata.name },
      { label: 'File Size', value: metadata.formattedSize },
      { label: 'Dimensions', value: metadata.dimensions },
      { label: 'File Type', value: metadata.type },
    ];
    
    if (!showTechnicalData) return basicItems;
    
    // Additional technical metadata
    const technicalItems: MetadataItem[] = [
      { label: 'Last Modified', value: metadata.lastModified instanceof Date ? metadata.lastModified.toLocaleString() : null },
      { label: 'Aspect Ratio', value: metadata.aspectRatio },
      { label: 'Camera', value: metadata.camera },
      { label: 'Date Taken', value: metadata.dateTaken },
      { label: 'Exposure', value: metadata.exposure },
      { label: 'Focal Length', value: metadata.focalLength },
      { label: 'ISO', value: metadata.iso },
      { label: 'Flash', value: metadata.flash },
      { label: 'GPS Coordinates', value: metadata.coordinates },
    ];
    
    return [...basicItems, ...technicalItems];
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Image Metadata Viewer - MyToolbox</title>
        <meta name="description" content="View and remove EXIF and other metadata from your images with our free online tool." />
      </Helmet>

      <Header />
      
      <div className="container max-w-4xl mx-auto px-4 py-8 flex-grow">
        <BackButton />
        
        <h1 className="text-3xl font-bold mb-6">Image Metadata Viewer</h1>
        <p className="mb-6 text-muted-foreground">
          View and optionally remove EXIF and other metadata from your images. All processing happens in your browser for maximum privacy.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>Select an image to view its metadata</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {!imageFile ? (
                  <UploadBox
                    title="Drop your image here"
                    subtitle="Supports JPG, PNG, WEBP, and other formats"
                    acceptedFileTypes="image/*"
                    onFileSelect={handleFileSelect}
                    ref={fileInputRef}
                  />
                ) : (
                  <div className="space-y-4">
                    <div className="aspect-video bg-black/5 rounded-md flex items-center justify-center overflow-hidden">
                      <img
                        src={imagePreviewUrl || ''}
                        alt="Preview"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">{imageFile.name}</p>
                      <p className="text-muted-foreground">
                        {(imageFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <Button variant="outline" className="w-full" onClick={handleReset}>
                      <Trash className="mr-2 h-4 w-4" />
                      Select Another Image
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Image Metadata</CardTitle>
              <CardDescription>
                {metadata 
                  ? 'Information extracted from your image' 
                  : isProcessing 
                    ? 'Extracting metadata...'
                    : 'Upload an image to view its metadata'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isProcessing ? (
                <div className="flex items-center justify-center h-60">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Extracting metadata...</span>
                </div>
              ) : metadata ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="show-technical"
                      checked={showTechnicalData}
                      onCheckedChange={setShowTechnicalData}
                    />
                    <Label htmlFor="show-technical">Show technical data</Label>
                  </div>
                  
                  <ScrollArea className="h-60 pr-4">
                    <div className="space-y-2">
                      {formatMetadataForDisplay().map((item, index) => (
                        item.value != null && (
                          <div key={index}>
                            <div className="flex justify-between items-start py-1">
                              <span className="text-sm font-medium">{item.label}:</span>
                              <span className="text-sm text-right">{String(item.value)}</span>
                            </div>
                            {index < formatMetadataForDisplay().length - 1 && <Separator />}
                          </div>
                        )
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <Button 
                    className="w-full" 
                    onClick={handleRemoveMetadata}
                    disabled={isRemovingMetadata}
                  >
                    {isRemovingMetadata && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isRemovingMetadata ? 'Removing metadata...' : 'Remove All Metadata'}
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-60 text-muted-foreground">
                  <ImageIcon className="h-12 w-12 mb-4" />
                  <p className="text-center">
                    Upload an image to view its metadata
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {cleanImageUrl && (
          <Card className="mt-6 shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Metadata-Free Image</CardTitle>
              <CardDescription>All metadata has been stripped from your image</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-black/5 rounded-md flex items-center justify-center overflow-hidden">
                <img
                  src={cleanImageUrl}
                  alt="Clean preview"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleDownloadCleanImage}
                className="w-full bg-gradient-primary hover:opacity-90"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Metadata-Free Image
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ImageMetadataViewer;
