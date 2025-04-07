
import React, { useState, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileImage, 
  Download, 
  Trash2, 
  RotateCcw,
  ArrowLeft,
  Image as ImageIcon
} from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import BackButton from '@/components/BackButton'; // Added BackButton import

const DEFAULT_QUALITY = 75;
const DEFAULT_MAX_WIDTH = 1200;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const ImageCompressor = () => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [quality, setQuality] = useState<number>(DEFAULT_QUALITY);
  const [maxWidth, setMaxWidth] = useState<number>(DEFAULT_MAX_WIDTH);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [compressionStats, setCompressionStats] = useState<{
    originalSize: number;
    compressedSize: number;
    reduction: number;
  } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetState = () => {
    setOriginalFile(null);
    setOriginalPreview(null);
    setCompressedPreview(null);
    setCompressedBlob(null);
    setQuality(DEFAULT_QUALITY);
    setMaxWidth(DEFAULT_MAX_WIDTH);
    setCompressionStats(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast.error('Please select an image file');
      return;
    }
    
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size exceeds 10MB limit');
      return;
    }

    setOriginalFile(file);
    
    // Create preview of original image
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    // Reset compressed image when a new file is selected
    setCompressedPreview(null);
    setCompressedBlob(null);
    setCompressionStats(null);
  };

  const compressImage = useCallback(async () => {
    if (!originalFile || !originalPreview) return;
    
    setIsCompressing(true);
    
    try {
      // Create an image element to load the original image
      const img = new Image();
      img.src = originalPreview;
      
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
      });
      
      // Calculate new dimensions, maintaining aspect ratio
      let newWidth = img.width;
      let newHeight = img.height;
      
      if (newWidth > maxWidth) {
        const ratio = maxWidth / newWidth;
        newWidth = maxWidth;
        newHeight = Math.round(newHeight * ratio);
      }
      
      // Create a canvas to draw the resized image
      const canvas = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeight;
      
      // Draw the image on the canvas
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');
      
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      
      // Convert canvas to blob with specified quality
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob(
          (blob) => resolve(blob!),
          originalFile.type,
          quality / 100
        );
      });
      
      // Convert blob to data URL for preview
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      
      await new Promise<void>((resolve) => {
        reader.onloadend = () => {
          setCompressedPreview(reader.result as string);
          setCompressedBlob(blob);
          
          // Calculate compression stats
          setCompressionStats({
            originalSize: originalFile.size,
            compressedSize: blob.size,
            reduction: Math.round(((originalFile.size - blob.size) / originalFile.size) * 100)
          });
          
          resolve();
        };
      });
      
      toast.success('Image compressed successfully');
    } catch (error) {
      toast.error('Error compressing image');
      console.error('Compression error:', error);
    } finally {
      setIsCompressing(false);
    }
  }, [originalFile, originalPreview, quality, maxWidth]);

  const handleDownload = () => {
    if (!compressedBlob) return;
    
    const filename = originalFile?.name.replace(/\.[^/.]+$/, '') || 'compressed-image';
    const extension = originalFile?.name.split('.').pop() || 'jpg';
    const downloadLink = document.createElement('a');
    
    downloadLink.href = URL.createObjectURL(compressedBlob);
    downloadLink.download = `${filename}-compressed.${extension}`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    toast.success('Image downloaded successfully');
  };

  return (
    <>
      <Helmet>
        <title>Image Compressor | Free Online Image Compression Tool | EveryTools</title>
        <meta name="description" content="Compress your images online for free. Reduce file size while maintaining quality. No registration required, works in your browser." />
      </Helmet>
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <BackButton /> {/* Added BackButton component */}
          
          <div className="flex items-center mb-6">
            <Link to="/" className="inline-flex items-center mr-4">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Image Compressor</h1>
              <p className="text-muted-foreground">Reduce image file size while maintaining quality</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Upload Area */}
            <div className="glass-card p-6 rounded-xl">
              <div className="mb-4 w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center">
                <FileImage className="h-8 w-8 text-blue-400" />
              </div>
              
              <h2 className="text-xl font-semibold mb-6">Upload Image</h2>
              
              {!originalFile ? (
                <div 
                  className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="mx-auto w-16 h-16 mb-4 text-muted-foreground">
                    <ImageIcon className="h-16 w-16" />
                  </div>
                  <p className="text-lg font-medium mb-2">Drag and drop or click to upload</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Supports JPG, PNG, WEBP (Max: 10MB)
                  </p>
                  <Button variant="outline" onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}>
                    Select Image
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              ) : (
                <div>
                  <div className="mb-4 relative rounded-lg overflow-hidden max-h-[300px] flex justify-center bg-black/10">
                    {originalPreview && (
                      <img 
                        src={originalPreview} 
                        alt="Original" 
                        className="max-h-[300px] object-contain" 
                      />
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <p className="font-medium">{originalFile.name}</p>
                      <p className="text-muted-foreground">{formatFileSize(originalFile.size)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={resetState}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Compression Settings */}
            <div className="glass-card p-6 rounded-xl">
              <div className="mb-4 w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center">
                <RotateCcw className="h-8 w-8 text-purple-400" />
              </div>
              
              <h2 className="text-xl font-semibold mb-6">Compression Settings</h2>
              
              {!originalFile ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Upload an image to adjust compression settings</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="quality">Quality: {quality}%</Label>
                    </div>
                    <Slider
                      id="quality"
                      min={10}
                      max={100}
                      step={1}
                      value={[quality]}
                      onValueChange={(value) => setQuality(value[0])}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Lower quality = smaller file size, higher compression
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="max-width">Max Width: {maxWidth}px</Label>
                    </div>
                    <Slider
                      id="max-width"
                      min={100}
                      max={3000}
                      step={100}
                      value={[maxWidth]}
                      onValueChange={(value) => setMaxWidth(value[0])}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Resize image if wider than this value (maintains aspect ratio)
                    </p>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    onClick={compressImage}
                    disabled={isCompressing}
                  >
                    {isCompressing ? 'Compressing...' : 'Compress Image'}
                  </Button>
                </div>
              )}
              
              {/* Compression Result */}
              {compressedPreview && (
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Compression Result</h3>
                  
                  <Tabs defaultValue="preview">
                    <TabsList className="mb-4">
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                      <TabsTrigger value="stats">Stats</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="preview">
                      <div className="mb-4 relative rounded-lg overflow-hidden max-h-[200px] flex justify-center bg-black/10">
                        <img 
                          src={compressedPreview} 
                          alt="Compressed" 
                          className="max-h-[200px] object-contain" 
                        />
                      </div>
                      
                      <Button 
                        className="w-full"
                        onClick={handleDownload}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Compressed Image
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="stats">
                      {compressionStats && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                              <p className="text-sm text-muted-foreground">Original Size</p>
                              <p className="text-xl font-semibold">{formatFileSize(compressionStats.originalSize)}</p>
                            </div>
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
                              <p className="text-sm text-muted-foreground">Compressed Size</p>
                              <p className="text-xl font-semibold">{formatFileSize(compressionStats.compressedSize)}</p>
                            </div>
                          </div>
                          
                          <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg text-center">
                            <p className="text-sm text-muted-foreground">Reduction</p>
                            <p className="text-2xl font-bold">{compressionStats.reduction}%</p>
                          </div>
                          
                          <Button 
                            className="w-full"
                            onClick={handleDownload}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download Compressed Image
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto mt-12 glass-card p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">How to Use Image Compressor</h2>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
              <li>Upload your image by clicking the upload area or dragging and dropping.</li>
              <li>Adjust the quality slider to control compression level (lower quality = smaller file).</li>
              <li>Set the maximum width if you want to resize large images (maintains aspect ratio).</li>
              <li>Click "Compress Image" to process your image.</li>
              <li>Preview the compressed result and check the size reduction.</li>
              <li>Download your compressed image when you're satisfied with the result.</li>
            </ol>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ImageCompressor;
