
import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageContainer from '@/components/PageContainer';
import BackButton from '@/components/BackButton';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Download, Palette, Image, Copy, 
  Check, AlertCircle, Trash, Upload
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { getStandardFilename } from '@/utils/fileUtils';
import QRCode from 'qrcode';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const QrCodeStyler = () => {
  const [qrContent, setQrContent] = useState('https://mytoolbox.site');
  const [qrSize, setQrSize] = useState(300);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [errorLevel, setErrorLevel] = useState('M');
  const [margin, setMargin] = useState(4);
  const [isBusy, setIsBusy] = useState(false);
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [centerImage, setCenterImage] = useState<string | null>(null);
  const [selectedLogoFile, setSelectedLogoFile] = useState<File | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  // Generate QR code whenever relevant parameters change
  useEffect(() => {
    if (qrContent.trim()) {
      generateQR();
    }
  }, [qrContent, qrSize, fgColor, bgColor, errorLevel, margin, centerImage]);

  const generateQR = async () => {
    if (!qrContent.trim()) return;
    
    setIsBusy(true);
    try {
      // Generate QR code
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      await QRCode.toCanvas(canvas, qrContent, {
        width: qrSize,
        margin: margin,
        color: {
          dark: fgColor,
          light: bgColor
        },
        errorCorrectionLevel: errorLevel as any
      });
      
      // If there's a center image, draw it on the canvas
      if (centerImage) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const img = new Image();
          img.onload = () => {
            // Calculate logo size (max 30% of QR code)
            const logoSize = qrSize * 0.3;
            const xPos = (qrSize - logoSize) / 2;
            const yPos = (qrSize - logoSize) / 2;
            
            // Draw white background for logo
            ctx.fillStyle = bgColor;
            ctx.fillRect(xPos - 5, yPos - 5, logoSize + 10, logoSize + 10);
            
            // Draw logo
            ctx.drawImage(img, xPos, yPos, logoSize, logoSize);
            
            // Update QR image
            setQrImage(canvas.toDataURL('image/png'));
          };
          img.src = centerImage;
        }
      } else {
        // Just use the QR code without a center image
        setQrImage(canvas.toDataURL('image/png'));
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast({
        title: "QR Code Generation Failed",
        description: "There was an error creating your QR code. Please try again with different settings.",
        variant: "destructive"
      });
    } finally {
      setIsBusy(false);
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please upload an image file for the logo.",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedLogoFile(file);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setCenterImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setCenterImage(null);
    setSelectedLogoFile(null);
  };

  const copyToClipboard = async () => {
    if (!qrImage) return;
    
    try {
      // Create a blob from the image
      const response = await fetch(qrImage);
      const blob = await response.blob();
      
      // Copy to clipboard using Clipboard API
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      
      toast({
        title: "Copied!",
        description: "QR code image copied to clipboard."
      });
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast({
        title: "Copy Failed",
        description: "Could not copy the QR code to clipboard. Try downloading instead.",
        variant: "destructive"
      });
    }
  };

  const downloadQR = () => {
    if (!qrImage) return;
    
    const link = document.createElement('a');
    link.href = qrImage;
    link.download = getStandardFilename('png', 'qrcode');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Downloaded!",
      description: "Your styled QR code has been downloaded."
    });
  };

  return (
    <>
      <Helmet>
        <title>QR Code Styler | Create Custom QR Codes | MyToolbox</title>
        <meta name="description" content="Create custom styled QR codes with logos and colors. Generate branded QR codes for your business or personal use." />
      </Helmet>
      
      <Header />
      
      <PageContainer>
        <BackButton />
        
        <PageHeader 
          title="QR Code Styler" 
          description="Create beautiful custom QR codes with logos, colors, and styles for your business or personal use."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* QR Code Settings */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">QR Code Settings</h3>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="qr-content">QR Code Content</Label>
                <Input
                  id="qr-content"
                  value={qrContent}
                  onChange={(e) => setQrContent(e.target.value)}
                  placeholder="Enter URL, text or contact info"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>Error Correction Level</Label>
                <RadioGroup 
                  value={errorLevel} 
                  onValueChange={setErrorLevel}
                  className="flex space-x-4 mt-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="L" id="error-L" />
                    <Label htmlFor="error-L" className="cursor-pointer">Low</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="M" id="error-M" />
                    <Label htmlFor="error-M" className="cursor-pointer">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Q" id="error-Q" />
                    <Label htmlFor="error-Q" className="cursor-pointer">Quartile</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="H" id="error-H" />
                    <Label htmlFor="error-H" className="cursor-pointer">High</Label>
                  </div>
                </RadioGroup>
                <p className="text-xs text-muted-foreground mt-1">
                  Higher correction levels allow for more decoration but may make the QR code larger.
                </p>
              </div>
              
              <div>
                <Label>Logo or Center Image</Label>
                <div className="mt-2 flex items-center gap-4">
                  {centerImage ? (
                    <div className="relative w-20 h-20 border rounded-md overflow-hidden">
                      <img src={centerImage} alt="Logo" className="w-full h-full object-contain" />
                      <button
                        onClick={removeLogo}
                        className="absolute top-1 right-1 bg-black/70 rounded-full p-1 text-white"
                        aria-label="Remove logo"
                      >
                        <Trash size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Label 
                        htmlFor="logo-upload" 
                        className="cursor-pointer flex flex-col items-center justify-center w-20 h-20 border-2 border-dashed rounded-md hover:border-accent hover:bg-accent/5 transition-colors"
                      >
                        <Upload size={24} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground mt-1">Add Logo</span>
                      </Label>
                      <Input 
                        id="logo-upload" 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleLogoUpload}
                      />
                    </div>
                  )}
                  <div className="text-sm text-muted-foreground">
                    Adding a logo may reduce how well the QR code scans. Use the highest error correction level for best results.
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <Label htmlFor="qr-size">QR Code Size</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="qr-size"
                    min={100}
                    max={800}
                    step={10}
                    value={[qrSize]}
                    onValueChange={(value) => setQrSize(value[0])}
                    className="flex-1"
                  />
                  <span className="w-16 text-right">{qrSize}px</span>
                </div>
              </div>
              
              <div>
                <Label htmlFor="qr-margin">QR Code Margin</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="qr-margin"
                    min={0}
                    max={16}
                    step={1}
                    value={[margin]}
                    onValueChange={(value) => setMargin(value[0])}
                    className="flex-1"
                  />
                  <span className="w-16 text-right">{margin} units</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fg-color">Foreground Color</Label>
                  <div className="flex mt-1">
                    <div 
                      className="w-10 h-10 border rounded-l-md" 
                      style={{ backgroundColor: fgColor }}
                    />
                    <Input
                      id="fg-color"
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="rounded-l-none"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="bg-color">Background Color</Label>
                  <div className="flex mt-1">
                    <div 
                      className="w-10 h-10 border rounded-l-md" 
                      style={{ backgroundColor: bgColor }}
                    />
                    <Input
                      id="bg-color"
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="rounded-l-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          {/* QR Code Preview */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">QR Code Preview</h3>
            
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-md shadow-sm mb-6 max-w-full overflow-hidden">
                {qrImage ? (
                  <img 
                    src={qrImage} 
                    alt="Generated QR Code" 
                    className="max-w-full h-auto"
                    style={{ width: qrSize }}
                  />
                ) : (
                  <div 
                    className="bg-gray-100 flex items-center justify-center"
                    style={{ width: qrSize, height: qrSize }}
                  >
                    <AlertCircle className="text-muted-foreground" />
                  </div>
                )}
              </div>
              
              <canvas ref={canvasRef} className="hidden" />
              
              <div className="flex flex-wrap gap-3 justify-center">
                <Button onClick={downloadQR} disabled={!qrImage || isBusy}>
                  <Download className="mr-2 h-4 w-4" />
                  Download QR Code
                </Button>
                <Button variant="outline" onClick={copyToClipboard} disabled={!qrImage || isBusy}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy to Clipboard
                </Button>
              </div>
              
              <div className="mt-6 w-full">
                <Separator className="mb-4" />
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">
                    <Check className="inline-block h-4 w-4 mr-1" />
                    Always test your QR code with multiple devices to ensure it scans properly.
                  </p>
                  <p>
                    <Check className="inline-block h-4 w-4 mr-1" />
                    Higher error correction allows for more visual changes but creates more complex QR codes.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </PageContainer>
      
      <Footer />
    </>
  );
};

export default QrCodeStyler;
