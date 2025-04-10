
import React, { useState, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout';
import PageHeader from '@/components/PageHeader';
import BackButton from '@/components/BackButton';
import UploadBox from '@/components/UploadBox';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Toggle } from '@/components/ui/toggle';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { toast } from 'sonner';
import ImageToQRSEO from '@/components/SEO/ImageToQRSEO';
import { Download, Image, Copy, QrCode, RefreshCw } from 'lucide-react';
import QRCode from 'qrcode';
import HowToUse from '@/components/HowToUse';

const ImageToQR = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<string>('M');
  const [qrSize, setQrSize] = useState<number>(300);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [darkColor, setDarkColor] = useState<string>('#000000');
  const [lightColor, setLightColor] = useState<string>('#FFFFFF');
  const [margin, setMargin] = useState<number>(1);
  const [enableCompression, setEnableCompression] = useState<boolean>(true);

  const qrRef = useRef<HTMLImageElement>(null);

  const handleFileSelect = useCallback((files: FileList) => {
    const file = files[0];
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select a valid image file");
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }
    
    setSelectedImage(file);
    
    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    // Reset QR code
    setQrCodeImage(null);
  }, []);

  const convertToQRCode = useCallback(async () => {
    if (!imagePreview) return;
    
    setIsConverting(true);
    
    try {
      // Compress image if needed
      let imageData = imagePreview;
      
      if (enableCompression) {
        const img = new Image();
        img.src = imagePreview;
        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
        });
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Calculate new dimensions (max 800px)
        const maxDimension = 800;
        let width = img.width;
        let height = img.height;
        
        if (width > height && width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        ctx?.drawImage(img, 0, 0, width, height);
        imageData = canvas.toDataURL('image/jpeg', 0.8);
      }
      
      // Generate QR code
      const qrOptions = {
        errorCorrectionLevel: errorCorrectionLevel as 'L' | 'M' | 'Q' | 'H',
        margin: margin,
        width: qrSize,
        color: {
          dark: darkColor,
          light: lightColor
        }
      };
      
      const qrCodeDataURL = await QRCode.toDataURL(imageData, qrOptions);
      setQrCodeImage(qrCodeDataURL);
      
      toast.success("QR code generated successfully!");
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast.error("Failed to generate QR code. Please try again.");
    } finally {
      setIsConverting(false);
    }
  }, [imagePreview, errorCorrectionLevel, qrSize, darkColor, lightColor, margin, enableCompression]);

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setQrCodeImage(null);
  };

  const handleDownload = () => {
    if (!qrCodeImage) return;
    
    const link = document.createElement('a');
    link.href = qrCodeImage;
    link.download = 'image-qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("QR code downloaded successfully!");
  };

  const copyToClipboard = async () => {
    if (!qrCodeImage) return;
    
    try {
      const blob = await fetch(qrCodeImage).then(r => r.blob());
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      toast.success("QR code copied to clipboard!");
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error("Failed to copy to clipboard. Please try downloading instead.");
    }
  };

  const resetSettings = () => {
    setErrorCorrectionLevel('M');
    setQrSize(300);
    setDarkColor('#000000');
    setLightColor('#FFFFFF');
    setMargin(1);
    setEnableCompression(true);
    
    toast.info("Settings reset to default values");
  };

  return (
    <Layout>
      <ImageToQRSEO />
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <BackButton />
        
        <PageHeader
          title="Image to QR Code"
          description="Convert your images into QR codes that can be scanned to view the original image."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
            
            {imagePreview ? (
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden border border-border">
                  <img 
                    src={imagePreview} 
                    alt="Image preview" 
                    className="w-full h-auto max-h-[300px] object-contain bg-muted p-2" 
                  />
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="absolute top-2 right-2"
                    onClick={handleRemoveImage}
                  >
                    Remove
                  </Button>
                </div>
                
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="error-correction">Error Correction Level</Label>
                      <Select 
                        value={errorCorrectionLevel} 
                        onValueChange={setErrorCorrectionLevel}
                      >
                        <SelectTrigger id="error-correction">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="L">Low (7%)</SelectItem>
                          <SelectItem value="M">Medium (15%)</SelectItem>
                          <SelectItem value="Q">Quartile (25%)</SelectItem>
                          <SelectItem value="H">High (30%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="qr-size">QR Code Size: {qrSize}px</Label>
                      </div>
                      <Slider
                        id="qr-size"
                        min={100}
                        max={1000}
                        step={10}
                        value={[qrSize]}
                        onValueChange={(values) => setQrSize(values[0])}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="margin">Margin: {margin}</Label>
                      </div>
                      <Slider
                        id="margin"
                        min={0}
                        max={4}
                        step={1}
                        value={[margin]}
                        onValueChange={(values) => setMargin(values[0])}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dark-color">Dark Color</Label>
                        <div className="flex gap-2">
                          <div 
                            className="w-8 h-8 border border-border rounded" 
                            style={{ backgroundColor: darkColor }}
                          />
                          <Input
                            id="dark-color"
                            type="color"
                            value={darkColor}
                            onChange={(e) => setDarkColor(e.target.value)}
                            className="w-full h-8"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="light-color">Light Color</Label>
                        <div className="flex gap-2">
                          <div 
                            className="w-8 h-8 border border-border rounded" 
                            style={{ backgroundColor: lightColor }}
                          />
                          <Input
                            id="light-color"
                            type="color"
                            value={lightColor}
                            onChange={(e) => setLightColor(e.target.value)}
                            className="w-full h-8"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Toggle
                        pressed={enableCompression}
                        onPressedChange={setEnableCompression}
                      >
                        Enable Image Compression
                      </Toggle>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={resetSettings}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reset Settings
                      </Button>
                      
                      <Button 
                        onClick={convertToQRCode}
                        disabled={isConverting || !imagePreview}
                        className="bg-gradient-primary text-white"
                      >
                        {isConverting ? (
                          <>
                            <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                            Converting...
                          </>
                        ) : (
                          <>
                            <QrCode className="h-4 w-4 mr-2" />
                            Generate QR Code
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <UploadBox
                title="Upload your image"
                subtitle="Supports JPG, PNG, GIF and WebP up to 5MB"
                acceptedFileTypes="image/*"
                onFileSelect={handleFileSelect}
                multiple={false}
                icon={<Image className="h-10 w-10 text-muted-foreground" />}
              />
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">QR Code Result</h2>
            
            {qrCodeImage ? (
              <div className="space-y-4">
                <div className="flex justify-center border border-border rounded-lg p-4 bg-muted/30">
                  <img 
                    ref={qrRef}
                    src={qrCodeImage} 
                    alt="QR Code" 
                    className="max-w-full" 
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button
                    onClick={handleDownload}
                    className="flex-1 bg-accent text-white"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download QR Code
                  </Button>
                  
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="flex-1"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy to Clipboard
                  </Button>
                </div>
                
                <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-medium mb-2">QR Code Information</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Content Type: Image</li>
                    <li>• Error Correction: {errorCorrectionLevel === 'L' ? 'Low (7%)' : 
                       errorCorrectionLevel === 'M' ? 'Medium (15%)' : 
                       errorCorrectionLevel === 'Q' ? 'Quartile (25%)' : 'High (30%)'}</li>
                    <li>• Size: {qrSize}px</li>
                    <li>• Margin: {margin}</li>
                  </ul>
                  <p className="text-sm mt-4 text-muted-foreground">
                    When scanned, this QR code will show the image you uploaded.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] border border-dashed border-border rounded-lg p-8 bg-muted/30">
                <QrCode className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground">
                  Your QR code will appear here after generation
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-12">
          <HowToUse />
        </div>
      </div>
    </Layout>
  );
};

export default ImageToQR;
