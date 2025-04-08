
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileImage, Download, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from "sonner";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UploadBox from '@/components/UploadBox';
import BackButton from '@/components/BackButton';
import SpaceBackground from '@/components/SpaceBackground';

const ImageToQR = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
  const [qrSize, setQrSize] = useState(250);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Clean up URLs when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);
  
  const handleFileSelect = (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      // Check file size (max 1MB)
      if (file.size > 1024 * 1024) {
        toast.warning('Image is too large, may result in a complex QR code');
      }
      
      // Set file and create preview
      setSelectedFile(file);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setQrImageUrl(null);
      setErrorMessage(null);
    }
  };
  
  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };
  
  const generateQRCode = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first");
      return;
    }
    
    setIsGenerating(true);
    setErrorMessage(null);
    
    try {
      // Convert image to base64
      const base64Image = await convertImageToBase64(selectedFile);
      
      // Optimize base64 data if needed
      // For larger images, we might want to resize them first
      
      // Generate QR code using Google Charts API
      const apiUrl = `https://chart.googleapis.com/chart?cht=qr&chs=${qrSize}x${qrSize}&chl=${encodeURIComponent(base64Image)}&choe=UTF-8&chld=L|0`;
      
      // Check if URL is too long
      if (apiUrl.length > 2048) {
        setErrorMessage("Image is too large to encode in a QR code. Please use a smaller image.");
        setQrImageUrl(null);
        setIsGenerating(false);
        return;
      }
      
      setQrImageUrl(apiUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
      setErrorMessage("Failed to generate QR code. Please try again with a different image.");
      setQrImageUrl(null);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleDownload = () => {
    if (!qrImageUrl) return;
    
    const link = document.createElement('a');
    link.href = qrImageUrl;
    link.download = `image-qr-code-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("QR Code downloaded successfully!");
  };
  
  const handleRemoveImage = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setQrImageUrl(null);
    setErrorMessage(null);
  };

  return (
    <>
      <Helmet>
        <title>Image to QR Code - Convert Images to QR | MyToolbox</title>
        <meta name="description" content="Convert images to QR codes easily and securely. No uploads, all processing happens in your browser." />
        <meta name="keywords" content="image to qr code, image converter, qr code generator, embed image in qr" />
      </Helmet>
      
      <SpaceBackground />
      <Header />
      
      <main className="container mx-auto px-4 py-10 min-h-screen">
        <BackButton />
        
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Image to QR Code</h1>
            <p className="text-lg text-muted-foreground">
              Convert your images to QR codes - the entire image is embedded in the QR
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card/50 backdrop-blur border-border">
              <CardContent className="pt-6 space-y-6">
                {!selectedFile ? (
                  <UploadBox
                    title="Upload your image"
                    subtitle="Select a small image to convert to QR code (PNG, JPG, WEBP)"
                    acceptedFileTypes="image/*"
                    onFileSelect={handleFileSelect}
                    multiple={false}
                  />
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>Selected Image</Label>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={handleRemoveImage}
                        >
                          Remove
                        </Button>
                      </div>
                      <div className="border rounded-lg overflow-hidden bg-background/50">
                        <img 
                          src={previewUrl || ''} 
                          alt="Selected" 
                          className="w-full h-auto max-h-64 object-contain" 
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="qrSize">QR Code Size</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          id="qrSize"
                          min={100}
                          max={500}
                          step={10}
                          value={[qrSize]}
                          onValueChange={(values) => setQrSize(values[0])}
                          className="flex-1"
                        />
                        <span className="text-sm w-12 text-right">{qrSize}px</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full"
                      onClick={generateQRCode}
                      disabled={isGenerating}
                    >
                      {isGenerating ? 'Generating...' : 'Generate QR Code'}
                    </Button>
                    
                    {errorMessage && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errorMessage}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur border-border">
              <CardContent className="flex flex-col items-center justify-center min-h-[400px] p-6">
                {qrImageUrl ? (
                  <div className="space-y-6 w-full flex flex-col items-center">
                    <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                      <img 
                        src={qrImageUrl} 
                        alt="Generated QR Code" 
                        className="max-w-full"
                      />
                    </div>
                    
                    <Button onClick={handleDownload} className="gap-2">
                      <Download size={16} />
                      Download QR Code
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground">
                      Note: This QR code contains the entire image data. Complex images result in 
                      denser QR codes which might be harder to scan. Test with your QR scanner app.
                    </p>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <FileImage size={100} className="text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">
                      Upload an image and generate a QR code to see the result here
                    </p>
                    <p className="text-xs text-muted-foreground max-w-md">
                      Best results with small, simple images. Very detailed or large images 
                      may create complex QR codes that are difficult to scan.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-card/30 backdrop-blur rounded-lg p-6 border border-border/50">
            <h2 className="text-xl font-semibold mb-4">About Image to QR Code</h2>
            <div className="space-y-4 text-sm">
              <p>
                This tool embeds your entire image data within a QR code. When scanned, most QR code readers will 
                display or allow you to access the embedded image.
              </p>
              <p>
                <strong>Important notes:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Best results come from small, simple images (under 100KB)</li>
                <li>Larger or complex images create denser QR codes that may be difficult to scan</li>
                <li>All processing happens in your browser - your images are never uploaded to our servers</li>
                <li>Some QR code readers have limitations on the data they can process</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ImageToQR;
