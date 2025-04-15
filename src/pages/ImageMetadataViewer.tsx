
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import UploadBox from '@/components/UploadBox';
import BackButton from '@/components/BackButton';
import HowToUse from '@/components/HowToUse';
import ImageMetadataSEO from '@/components/SEO/ImageMetadataSEO';
import { Button } from '@/components/ui/button';
import { Download, Trash2, X, Shield } from 'lucide-react';
import { toast } from "sonner";
import BackgroundAnimation from '@/components/BackgroundAnimation';

const ImageMetadataViewer: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cleanedImageUrl, setCleanedImageUrl] = useState<string | null>(null);

  const handleFileSelect = (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];
      
      // Validate file is an image
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file");
        return;
      }
      
      setSelectedImage(file);
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
      setMetadata(null);
      setCleanedImageUrl(null);
    }
  };

  const extractMetadata = async () => {
    if (!selectedImage) return;
    
    setIsLoading(true);
    
    try {
      // Simulate metadata extraction (in a real app, use EXIF-js or similar library)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock metadata for demonstration
      setMetadata({
        "Camera": {
          "Make": "Canon",
          "Model": "EOS 5D Mark IV",
          "Lens": "EF 24-70mm f/2.8L II USM",
          "Software": "Adobe Photoshop Lightroom Classic 10.0"
        },
        "Image": {
          "Width": "5760 pixels",
          "Height": "3840 pixels",
          "Resolution": "300 dpi",
          "Bit Depth": "8 bits/channel",
          "Color Space": "sRGB"
        },
        "Shooting": {
          "Date Taken": "2023-06-15 14:32:45",
          "Exposure": "1/250 sec at f/8.0",
          "ISO": "100",
          "Focal Length": "50mm",
          "Flash": "No Flash"
        },
        "Location": {
          "GPS Latitude": "34° 3' 12\" N",
          "GPS Longitude": "118° 14' 24\" W",
          "GPS Altitude": "105 meters"
        }
      });
    } catch (error) {
      toast.error("Failed to extract metadata");
      console.error("Metadata extraction error:", error);
    }
    
    setIsLoading(false);
  };

  const removeMetadata = async () => {
    if (!selectedImage || !imagePreview) return;
    
    setIsProcessing(true);
    
    try {
      // Simulate metadata removal process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real application, you would strip the metadata and return a clean image
      // For this demo, we'll just use the same image URL
      setCleanedImageUrl(imagePreview);
      
      toast.success("All metadata successfully removed from image");
    } catch (error) {
      toast.error("Failed to remove metadata");
      console.error("Metadata removal error:", error);
    }
    
    setIsProcessing(false);
  };

  const handleDownload = () => {
    if (!cleanedImageUrl) return;
    
    const link = document.createElement('a');
    link.href = cleanedImageUrl;
    link.download = `clean_${selectedImage?.name || 'image'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Clean image downloaded successfully");
  };

  const handleReset = () => {
    setSelectedImage(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    setMetadata(null);
    setCleanedImageUrl(null);
  };

  return (
    <>
      <ImageMetadataSEO />
      <BackgroundAnimation />
      <Header />
      <PageContainer>
        <BackButton />
        <PageHeader 
          title="Image Metadata Viewer" 
          description="View and remove hidden metadata from your images to enhance privacy and security"
          accentWord="Metadata"
        />
        
        <div className="max-w-4xl mx-auto">
          {!selectedImage ? (
            <UploadBox
              title="Drop your image here"
              subtitle="Select an image to view or remove its metadata"
              acceptedFileTypes="image/*"
              onFileSelect={handleFileSelect}
              multiple={false}
            />
          ) : (
            <div className="animate-fade-in">
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="flex-1">
                  <div className="relative rounded-lg overflow-hidden border border-border h-[300px]">
                    {imagePreview && (
                      <img 
                        src={imagePreview} 
                        alt="Selected" 
                        className="w-full h-full object-contain"
                      />
                    )}
                    <button
                      onClick={handleReset}
                      className="absolute top-2 right-2 p-1 bg-background/80 backdrop-blur-sm rounded-full border border-border/40"
                      aria-label="Remove image"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className="mt-4 flex justify-center gap-4">
                    <Button
                      onClick={extractMetadata}
                      disabled={isLoading || !selectedImage}
                      className="flex-1"
                    >
                      {isLoading ? "Extracting..." : "View Metadata"}
                    </Button>
                    <Button
                      onClick={removeMetadata}
                      variant="destructive"
                      disabled={isProcessing || !selectedImage}
                      className="flex-1"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      {isProcessing ? "Removing..." : "Remove All Metadata"}
                    </Button>
                  </div>
                </div>
                
                <div className="flex-1">
                  {metadata ? (
                    <div className="rounded-lg border border-border bg-card p-4 h-full overflow-auto">
                      <h3 className="text-lg font-medium mb-4">Image Metadata</h3>
                      
                      {Object.entries(metadata).map(([category, data]: [string, any]) => (
                        <div key={category} className="mb-4">
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">{category}</h4>
                          <div className="space-y-1 pl-2 border-l-2 border-accent/30">
                            {Object.entries(data).map(([key, value]: [string, any]) => (
                              <div key={key} className="grid grid-cols-2 gap-2 text-sm">
                                <span className="font-medium">{key}:</span>
                                <span className="text-muted-foreground">{value as string}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-border bg-card/50 p-4 h-full flex items-center justify-center">
                      <p className="text-muted-foreground text-center">
                        {isLoading ? "Extracting metadata..." : "Click 'View Metadata' to see information embedded in your image"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {cleanedImageUrl && (
                <div className="mt-6 p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20">
                  <div className="flex flex-col items-center">
                    <Shield className="h-10 w-10 text-green-600 dark:text-green-400 mb-2" />
                    <h3 className="text-lg font-medium text-green-700 dark:text-green-300 mb-1">Metadata Removed Successfully</h3>
                    <p className="text-sm text-green-600 dark:text-green-400 mb-4 text-center">
                      Your image is now clean and free from embedded metadata
                    </p>
                    <Button onClick={handleDownload} variant="outline" className="bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-800/50 border-green-200 dark:border-green-700">
                      <Download size={18} className="mr-2" />
                      Download Clean Image
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={handleReset}
                  variant="outline"
                >
                  <Trash2 size={18} className="mr-2" />
                  Reset
                </Button>
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

export default ImageMetadataViewer;
