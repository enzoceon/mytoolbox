import React, { useState, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera, Upload, Scan, Copy, CheckCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import { useIsMobile } from '@/hooks/use-mobile';

const QrCodeScanner = () => {
  const [result, setResult] = useState<string>('');
  const [scanning, setScanning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processingUpload, setProcessingUpload] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Start webcam scanning
  const startScanning = async () => {
    setScanning(true);
    setResult('');
    
    try {
      const constraints = { 
        video: { 
          facingMode: isMobile ? 'environment' : 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        
        // Start scanning frames
        requestAnimationFrame(scanFrame);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: "Could not access your camera. Please check permissions.",
        variant: "destructive"
      });
      setScanning(false);
    }
  };

  // Stop webcam scanning
  const stopScanning = () => {
    setScanning(false);
    
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // Function to process each video frame
  const scanFrame = async () => {
    if (!scanning || !videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (context && video.readyState === video.HAVE_ENOUGH_DATA) {
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      try {
        // Get image data from canvas
        const imageData = canvas.toDataURL('image/png');
        
        // Use a dynamic import for jsQR to keep bundle size smaller
        const jsQR = (await import('jsqr')).default;
        
        // Convert to format for jsQR
        const imageElement = new Image();
        imageElement.src = imageData;
        
        imageElement.onload = () => {
          const tempCanvas = document.createElement('canvas');
          const tempContext = tempCanvas.getContext('2d');
          
          if (tempContext) {
            tempCanvas.width = imageElement.width;
            tempCanvas.height = imageElement.height;
            
            tempContext.drawImage(imageElement, 0, 0);
            const imageData = tempContext.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
            
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            
            if (code) {
              // QR code detected
              setResult(code.data);
              stopScanning();
              
              toast({
                title: "QR Code Detected",
                description: "Successfully scanned QR code",
              });
              
              return;
            }
          }
          
          // Continue scanning if no QR code was found
          if (scanning) {
            requestAnimationFrame(scanFrame);
          }
        };
      } catch (error) {
        console.error('Error scanning QR code:', error);
        if (scanning) {
          requestAnimationFrame(scanFrame);
        }
      }
    } else {
      // Video not ready yet, request next frame
      if (scanning) {
        requestAnimationFrame(scanFrame);
      }
    }
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setProcessingUpload(true);
    setResult('');
    
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      const imageData = e.target?.result as string;
      setUploadedImage(imageData);
      
      try {
        // Use a dynamic import for jsQR
        const jsQR = (await import('jsqr')).default;
        
        // Create an image from the uploaded file
        const image = new Image();
        image.src = imageData;
        
        image.onload = () => {
          // Create a canvas to draw the image
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          
          if (context) {
            canvas.width = image.width;
            canvas.height = image.height;
            
            context.drawImage(image, 0, 0);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            
            // Scan for QR code
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            
            if (code) {
              setResult(code.data);
              toast({
                title: "QR Code Detected",
                description: "Successfully scanned QR code from image",
              });
            } else {
              toast({
                title: "No QR Code Found",
                description: "Could not detect a QR code in this image",
                variant: "destructive"
              });
            }
          }
          
          setProcessingUpload(false);
        };
        
        image.onerror = () => {
          toast({
            title: "Error Processing Image",
            description: "Failed to load the selected image",
            variant: "destructive"
          });
          setProcessingUpload(false);
        };
      } catch (error) {
        console.error('Error processing QR code:', error);
        toast({
          title: "Processing Error",
          description: "Failed to process the QR code image",
          variant: "destructive"
        });
        setProcessingUpload(false);
      }
    };
    
    reader.onerror = () => {
      toast({
        title: "File Error",
        description: "Failed to read the selected file",
        variant: "destructive"
      });
      setProcessingUpload(false);
    };
    
    reader.readAsDataURL(file);
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    if (!result) return;
    
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Copied",
        description: "QR code content copied to clipboard",
      });
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      });
    });
  };

  // Reset everything
  const handleReset = () => {
    setResult('');
    setUploadedImage(null);
    stopScanning();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Open URL if result is a valid URL
  const isValidUrl = (text: string) => {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  };

  const openUrl = () => {
    if (result && isValidUrl(result)) {
      window.open(result, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <PageContainer>
      <PageHeader 
        title="QR Code Scanner" 
        description="Scan QR codes from your webcam or uploaded images"
      />
      
      <div className="container mx-auto max-w-3xl py-8">
        <Tabs defaultValue="camera" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="camera" className="flex items-center gap-2">
              <Camera className="h-4 w-4" /> Webcam
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" /> Upload Image
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="camera" className="space-y-6">
            <div className="relative mx-auto overflow-hidden rounded-lg bg-black aspect-video max-w-2xl">
              {scanning ? (
                <>
                  <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full"
                    playsInline
                    muted
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-3/4 h-3/4 border-2 border-white/60 rounded-lg"></div>
                  </div>
                  <canvas
                    ref={canvasRef}
                    className="hidden" // Hidden canvas for processing
                  />
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white">
                  <Camera className="h-16 w-16 mb-4 opacity-30" />
                  <p className="text-center opacity-60">Camera is not active</p>
                </div>
              )}
            </div>
            
            <div className="flex gap-4 justify-center">
              {!scanning ? (
                <Button onClick={startScanning} className="gap-2">
                  <Camera className="h-4 w-4" />
                  Start Scanning
                </Button>
              ) : (
                <Button onClick={stopScanning} variant="destructive" className="gap-2">
                  <Camera className="h-4 w-4" />
                  Stop Scanning
                </Button>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {uploadedImage ? (
                    <div className="flex flex-col items-center">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded QR Code" 
                        className="max-h-64 mb-4 rounded-md"
                      />
                      <p className="text-sm text-gray-500">Click to upload a different image</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-lg font-medium mb-1">Click to upload</p>
                      <p className="text-sm text-gray-500">Upload a QR code image (PNG, JPG)</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={processingUpload}
                  />
                </div>
              </CardContent>
            </Card>
            
            {processingUpload && (
              <div className="text-center py-4">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] mb-2"></div>
                <p>Processing image...</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Results Section */}
        {result && (
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-bold">Scan Result</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md break-all">
                  {result}
                </div>
                
                <div className="flex flex-wrap gap-3 mt-4">
                  <Button variant="outline" onClick={copyToClipboard} className="gap-2">
                    {copied ? (
                      <>
                        <CheckCheck className="h-4 w-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                  
                  {isValidUrl(result) && (
                    <Button onClick={openUrl} className="gap-2">
                      <Scan className="h-4 w-4" />
                      Open URL
                    </Button>
                  )}
                  
                  <Button variant="ghost" onClick={handleReset} className="ml-auto">
                    Scan Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default QrCodeScanner;
