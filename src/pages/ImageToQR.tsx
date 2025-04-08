
import React, { useState, useRef } from 'react';
import { FileImage, QrCode, Download, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { Helmet } from 'react-helmet-async';
import SpaceBackground from '@/components/SpaceBackground';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import UploadBox from '@/components/UploadBox';
import AdPlacement from '@/components/AdPlacement';
import QRCode from 'qrcode.react';

const ImageToQR = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [qrCodeValue, setQrCodeValue] = useState<string | null>(null);
  const [qrSize, setQrSize] = useState<number>(200);
  const [qrColor, setQrColor] = useState<string>('#000000');
  const [qrBgColor, setQrBgColor] = useState<string>('#ffffff');
  const [loading, setLoading] = useState<boolean>(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file");
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      // Set the selected file and preview
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setQrCodeValue(null); // Reset QR code when new image is selected
    }
  };

  const generateQRCode = () => {
    if (!selectedImage) {
      toast.error("Please select an image first");
      return;
    }
    
    setLoading(true);
    
    // Convert image to Data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        // Set QR code value to the data URL
        setQrCodeValue(e.target.result as string);
        setLoading(false);
        toast.success("QR Code generated successfully!");
      }
    };
    reader.onerror = () => {
      toast.error("Failed to read the image file");
      setLoading(false);
    };
    reader.readAsDataURL(selectedImage);
  };

  const downloadQRCode = () => {
    if (!qrRef.current) return;
    
    try {
      const canvas = qrRef.current.querySelector('canvas');
      if (!canvas) {
        toast.error("QR Code canvas not found");
        return;
      }
      
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `image-qr-code.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      toast.success("QR Code downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download QR Code");
    }
  };

  const resetState = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setSelectedImage(null);
    setImagePreview(null);
    setQrCodeValue(null);
  };

  return (
    <>
      <Helmet>
        <title>Image to QR Code Converter - Free Online Tool | EveryTools</title>
        <meta name="description" content="Convert your images to QR codes for easy sharing. No registration, no watermarks, all processing happens in your browser." />
        <link rel="canonical" href="https://everytools.site/image-to-qr" />
      </Helmet>
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
          <BackButton />
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 tracking-tight animate-fade-in">
              <span className="bg-gradient-primary bg-clip-text text-transparent">Image</span>
              <span className="text-white"> to </span>
              <span className="bg-gradient-primary bg-clip-text text-transparent">QR Code</span>
              <span className="text-white"> Converter</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Convert your images to QR codes for easy sharing. No registration required.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-border/40">
              <h2 className="text-xl font-semibold mb-4 text-center">Upload Image</h2>
              
              {!imagePreview ? (
                <UploadBox 
                  title="Drop your image here"
                  subtitle="Select an image to convert to QR code"
                  acceptedFileTypes="image/*"
                  onFileSelect={handleFileSelect}
                  multiple={false}
                />
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-md overflow-hidden border border-white/10 aspect-square max-h-[300px]">
                    <img 
                      src={imagePreview} 
                      alt="Image Preview" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex justify-between">
                    <Button 
                      variant="destructive" 
                      onClick={resetState}
                    >
                      Remove
                    </Button>
                    <Button 
                      onClick={generateQRCode}
                      disabled={loading}
                    >
                      {loading ? (
                        <>Generating QR Code...</>
                      ) : (
                        <>
                          <QrCode className="mr-2 h-4 w-4" />
                          Generate QR Code
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="text-center text-sm text-yellow-400 flex items-center justify-center mt-2">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    <span>For better results, use smaller images (under 1MB)</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-border/40">
              <h2 className="text-xl font-semibold mb-4 text-center">QR Code Result</h2>
              
              {qrCodeValue ? (
                <div className="space-y-6 flex flex-col items-center">
                  <div ref={qrRef} className="p-4 bg-white rounded-lg shadow-lg">
                    <QRCode 
                      value={qrCodeValue} 
                      size={qrSize}
                      fgColor={qrColor}
                      bgColor={qrBgColor}
                      level="H"
                      renderAs="canvas"
                    />
                  </div>
                  
                  <div className="w-full grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium block mb-1">QR Size</label>
                      <input 
                        type="range" 
                        min="100" 
                        max="300" 
                        value={qrSize} 
                        onChange={(e) => setQrSize(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1">QR Color</label>
                      <input 
                        type="color" 
                        value={qrColor} 
                        onChange={(e) => setQrColor(e.target.value)}
                        className="w-full h-8 cursor-pointer rounded"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={downloadQRCode}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download QR Code
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Note: The QR code contains the image data. For large images, some QR code scanners may have difficulties reading the code.
                  </p>
                </div>
              ) : (
                <div className="h-[300px] flex flex-col items-center justify-center text-muted-foreground">
                  <QrCode className="h-16 w-16 mb-4 opacity-20" />
                  <p>Upload an image and generate a QR code to see the result here</p>
                </div>
              )}
            </div>
          </div>
          
          <AdPlacement format="horizontal" className="mt-8" contentLoaded={true} />
          
          <div className="mt-8 bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-border/40">
            <h2 className="text-xl font-semibold mb-4">About Image to QR Code Conversion</h2>
            <p className="mb-4">
              This tool allows you to convert any image into a QR code. The QR code will contain the image data, 
              so when someone scans it with a QR code reader, they can see the image.
            </p>
            <p className="mb-4">
              For optimal results, use smaller images (under 1MB), as larger images generate more complex QR codes 
              that may be difficult for some scanners to read.
            </p>
            <p>
              All processing happens directly in your browser - your images are never uploaded to any server, 
              ensuring your privacy and data security.
            </p>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ImageToQR;
