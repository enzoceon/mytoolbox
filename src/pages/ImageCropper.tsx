
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Cropper, ReactCropperElement } from 'react-cropper';
import "cropperjs/dist/cropper.css";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { 
  RotateCw, 
  RotateCcw, 
  RefreshCw, 
  Upload, 
  Download, 
  Crop as CropIcon, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  AlignCenter,
  X
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UploadBox from '@/components/UploadBox';
import BackButton from '@/components/BackButton';

const ImageCropper = () => {
  const [image, setImage] = useState<string | null>(null);
  const [output, setOutput] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(0);
  const cropperRef = useRef<ReactCropperElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = useCallback((files: FileList) => {
    if (files && files.length > 0) {
      const file = files[0];
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp'];
      if (!validTypes.includes(file.type)) {
        toast.error("Please select a valid image file (JPEG, PNG, GIF, WebP, BMP)");
        return;
      }
      
      // Reset output and zoom when a new image is selected
      setOutput(null);
      setZoom(0);
      
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleCrop = useCallback(() => {
    if (!cropperRef.current) return;
    
    setIsProcessing(true);
    try {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
      if (croppedCanvas) {
        setOutput(croppedCanvas.toDataURL());
        toast.success("Image cropped successfully!");
      }
    } catch (error) {
      console.error("Error cropping image:", error);
      toast.error("Failed to crop image. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    if (!cropperRef.current) return;
    cropperRef.current.cropper.reset();
    setZoom(0);
    setOutput(null);
  }, []);

  const handleRotateLeft = useCallback(() => {
    if (!cropperRef.current) return;
    cropperRef.current.cropper.rotate(-90);
  }, []);

  const handleRotateRight = useCallback(() => {
    if (!cropperRef.current) return;
    cropperRef.current.cropper.rotate(90);
  }, []);

  const handleZoomChange = useCallback((value: number[]) => {
    if (!cropperRef.current) return;
    const zoomValue = value[0];
    setZoom(zoomValue);
    cropperRef.current.cropper.zoom(zoomValue / 50);
  }, []);

  const handleZoomIn = useCallback(() => {
    if (!cropperRef.current) return;
    const newZoom = Math.min(zoom + 5, 100);
    setZoom(newZoom);
    cropperRef.current.cropper.zoom(0.1);
  }, [zoom]);

  const handleZoomOut = useCallback(() => {
    if (!cropperRef.current) return;
    const newZoom = Math.max(zoom - 5, 0);
    setZoom(newZoom);
    cropperRef.current.cropper.zoom(-0.1);
  }, [zoom]);

  const handleFlipHorizontal = useCallback(() => {
    if (!cropperRef.current) return;
    cropperRef.current.cropper.scaleX(cropperRef.current.cropper.getData().scaleX === 1 ? -1 : 1);
  }, []);

  const handleFlipVertical = useCallback(() => {
    if (!cropperRef.current) return;
    cropperRef.current.cropper.scaleY(cropperRef.current.cropper.getData().scaleY === 1 ? -1 : 1);
  }, []);

  const handleDownload = useCallback(() => {
    if (!output) return;
    
    const link = document.createElement('a');
    link.download = 'cropped-image.png';
    link.href = output;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Image downloaded successfully!");
  }, [output]);

  const handleRemoveImage = useCallback(() => {
    setImage(null);
    setOutput(null);
    setZoom(0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Image Cropper - Free Online Image Crop & Resize Tool</title>
        <meta name="description" content="Crop, resize, and edit your images online. Free online image cropper with no watermarks. Rotate, flip, and resize images easily with our professional tools." />
      </Helmet>
      
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <BackButton />

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Image Cropper
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Crop, resize and edit your images online. Select an image to get started.
          </p>
        </div>
        
        <div className="w-full max-w-5xl mx-auto">
          {!image ? (
            <UploadBox
              title="Upload an image to crop"
              subtitle="Select or drag & drop a JPEG, PNG, GIF, WebP or BMP image"
              acceptedFileTypes="image/jpeg, image/png, image/gif, image/webp, image/bmp"
              onFileSelect={handleFileSelect}
              multiple={false}
            />
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  onClick={handleRemoveImage}
                  className="gap-2"
                >
                  <X size={16} />
                  Remove Image
                </Button>
                
                <Button 
                  variant="default" 
                  onClick={handleDownload}
                  disabled={!output}
                  className="gap-2"
                >
                  <Download size={16} />
                  Download
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Editor Panel */}
                <Card>
                  <CardContent className="p-4">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium mb-2">Image Editor</h3>
                      <div className="relative border rounded-md overflow-hidden bg-checkerboard h-[400px]">
                        <Cropper
                          ref={cropperRef}
                          src={image}
                          style={{ height: '100%', width: '100%' }}
                          guides={true}
                          responsive={true}
                          checkOrientation={false}
                          viewMode={1}
                          background={false}
                          dragMode="move"
                          autoCropArea={1}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Zoom</span>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={handleZoomOut}
                              disabled={zoom <= 0}
                              className="h-7 w-7 p-0"
                            >
                              <ZoomOut size={14} />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={handleZoomIn}
                              disabled={zoom >= 100}
                              className="h-7 w-7 p-0"
                            >
                              <ZoomIn size={14} />
                            </Button>
                          </div>
                        </div>
                        <Slider 
                          value={[zoom]} 
                          max={100} 
                          step={1}
                          onValueChange={handleZoomChange} 
                        />
                      </div>

                      <div className="grid grid-cols-5 gap-2">
                        <Button 
                          variant="outline" 
                          className="flex flex-col gap-1 h-auto py-2"
                          onClick={handleRotateLeft}
                        >
                          <RotateCcw size={16} />
                          <span className="text-xs">Rotate Left</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex flex-col gap-1 h-auto py-2"
                          onClick={handleRotateRight}
                        >
                          <RotateCw size={16} />
                          <span className="text-xs">Rotate Right</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex flex-col gap-1 h-auto py-2"
                          onClick={handleFlipHorizontal}
                        >
                          <RefreshCw size={16} className="rotate-90" />
                          <span className="text-xs">Flip H</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex flex-col gap-1 h-auto py-2"
                          onClick={handleFlipVertical}
                        >
                          <RefreshCw size={16} />
                          <span className="text-xs">Flip V</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex flex-col gap-1 h-auto py-2"
                          onClick={handleReset}
                        >
                          <AlignCenter size={16} />
                          <span className="text-xs">Reset</span>
                        </Button>
                      </div>

                      <Button 
                        className="w-full gap-2" 
                        onClick={handleCrop}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw size={16} className="animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CropIcon size={16} />
                            Crop Image
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Preview Panel */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium mb-2">Cropped Result</h3>
                    <div className="border rounded-md overflow-hidden bg-checkerboard h-[400px] flex items-center justify-center">
                      {output ? (
                        <img 
                          src={output} 
                          alt="Cropped" 
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <div className="text-muted-foreground text-center p-4">
                          <CropIcon size={48} className="mx-auto mb-2 opacity-50" />
                          <p>Crop your image to see the result here</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-4">
                      <Button 
                        className="w-full gap-2" 
                        onClick={handleDownload}
                        disabled={!output}
                      >
                        <Download size={16} />
                        Download Cropped Image
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ImageCropper;
