
import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageContainer from '@/components/PageContainer';
import BackButton from '@/components/BackButton';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Camera, FileUp, Copy, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import UploadBox from '@/components/UploadBox';
import jsQR from 'jsqr';

const QrCodeScanner = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState('webcam');
  const [hasCamera, setHasCamera] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  // Start webcam when component mounts and tab is active
  useEffect(() => {
    if (activeTab === 'webcam') {
      startWebcam();
    } else {
      stopWebcam();
    }

    // Cleanup on unmount
    return () => {
      stopWebcam();
    };
  }, [activeTab]);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setHasCamera(true);
        setIsScanning(true);
        scanQRCode();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCamera(false);
      toast({
        title: "Camera Error",
        description: "Could not access your camera. Please check permissions or try the image upload method.",
        variant: "destructive"
      });
    }
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const scanQRCode = () => {
    if (!isScanning) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;

    const checkVideoReady = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Get image data for QR code scanning
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        
        // Scan for QR code
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
        
        if (code) {
          // QR code found
          setIsScanning(false);
          setScanResult(code.data);
          stopWebcam();
          
          toast({
            title: "QR Code Detected!",
            description: "Successfully scanned QR code content."
          });
        } else {
          // Continue scanning
          requestAnimationFrame(checkVideoReady);
        }
      } else {
        // Wait until video is ready
        requestAnimationFrame(checkVideoReady);
      }
    };
    
    requestAnimationFrame(checkVideoReady);
  };

  const handleImageUpload = (files: FileList) => {
    if (files.length === 0) return;
    
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please upload an image file containing a QR code.",
        variant: "destructive"
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) return;
        
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);
        
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
        
        if (code) {
          setScanResult(code.data);
          toast({
            title: "QR Code Detected!",
            description: "Successfully scanned QR code from image."
          });
        } else {
          toast({
            title: "No QR Code Found",
            description: "Could not detect a valid QR code in this image.",
            variant: "destructive"
          });
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = () => {
    if (!scanResult) return;
    
    navigator.clipboard.writeText(scanResult)
      .then(() => {
        toast({
          title: "Copied!",
          description: "QR code content copied to clipboard."
        });
      })
      .catch(() => {
        toast({
          title: "Copy Failed",
          description: "Could not copy to clipboard. Please try manually.",
          variant: "destructive"
        });
      });
  };

  const resetScanner = () => {
    setScanResult(null);
    if (activeTab === 'webcam') {
      startWebcam();
    }
  };

  return (
    <>
      <Helmet>
        <title>QR Code Scanner | Scan QR Codes Online | MyToolbox</title>
        <meta name="description" content="Scan and decode QR codes from your webcam or uploaded images with our free online QR code scanner." />
      </Helmet>
      
      <Header />
      
      <PageContainer>
        <BackButton />
        
        <PageHeader 
          title="QR Code Scanner" 
          description="Scan and decode QR codes from your webcam or uploaded images for free. No registration required."
        />
        
        <div className="max-w-3xl mx-auto">
          {!scanResult ? (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="webcam" disabled={!navigator.mediaDevices}>
                  <Camera className="mr-2 h-4 w-4" />
                  Use Webcam
                </TabsTrigger>
                <TabsTrigger value="upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="webcam" className="space-y-4">
                <Card className="p-6">
                  {hasCamera ? (
                    <div className="flex flex-col items-center">
                      <p className="text-muted-foreground mb-4 text-center">
                        Point your camera at a QR code to scan it automatically.
                      </p>
                      <div className="relative aspect-video w-full max-w-md bg-black rounded-lg overflow-hidden">
                        <video 
                          ref={videoRef} 
                          autoPlay 
                          playsInline 
                          muted 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 border-4 border-dashed border-accent/50 rounded-lg" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-40 h-40 border-2 border-white/70 rounded-lg" />
                        </div>
                      </div>
                      <canvas ref={canvasRef} className="hidden" />
                      
                      {isScanning && (
                        <p className="mt-4 text-sm text-muted-foreground animate-pulse">
                          Scanning for QR codes...
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center p-6">
                      <AlertCircle className="h-10 w-10 text-amber-500 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Camera Not Available</h3>
                      <p className="text-center text-muted-foreground mb-4">
                        We couldn't access your camera. This could be due to permission settings or your device doesn't support camera access.
                      </p>
                      <p className="text-center text-sm">
                        Please try the "Upload Image" method instead.
                      </p>
                    </div>
                  )}
                </Card>
              </TabsContent>
              
              <TabsContent value="upload">
                <Card className="p-6">
                  <UploadBox
                    title="Upload an image with QR code"
                    subtitle="Drop your image here or click to browse"
                    acceptedFileTypes="image/*"
                    onFileSelect={handleImageUpload}
                    multiple={false}
                    icon={<FileUp size={40} />}
                  />
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="p-6 animate-scale-up">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">QR Code Scanned Successfully</h3>
                
                <Separator className="my-4 w-full" />
                
                <div className="w-full p-4 bg-muted rounded-md mb-4">
                  <h4 className="text-sm font-medium mb-2">QR Code Content:</h4>
                  <div className="p-3 bg-background border rounded-md">
                    <pre className="whitespace-pre-wrap break-words max-h-60 overflow-y-auto text-sm">
                      {scanResult}
                    </pre>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button onClick={copyToClipboard}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy to Clipboard
                  </Button>
                  <Button variant="outline" onClick={resetScanner}>
                    <Camera className="mr-2 h-4 w-4" />
                    Scan Another Code
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </PageContainer>
      
      <Footer />
    </>
  );
};

export default QrCodeScanner;
