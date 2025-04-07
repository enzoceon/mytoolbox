import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';
import BackButton from '@/components/BackButton';
import HowToUse from '@/components/HowToUse';
import { 
  Download, 
  Copy, 
  QrCode,
  Palette,
  QrCode as QrCodeIcon
} from 'lucide-react';

const QrCodeGenerator = () => {
  const [qrValue, setQrValue] = useState('https://everytools.site');
  const [size, setSize] = useState(200);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [qrLevel, setQrLevel] = useState('L');
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!qrRef.current) return;

    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('QR Code downloaded successfully!');
  };

  const handleCopy = () => {
    if (!qrRef.current) return;

    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) {
        toast.error('Failed to copy QR code');
        return;
      }
      
      const item = new ClipboardItem({ 'image/png': blob });
      navigator.clipboard.write([item])
        .then(() => toast.success('QR Code copied to clipboard!'))
        .catch(() => toast.error('Failed to copy QR code'));
    });
  };

  return (
    <>
      <Helmet>
        <title>QR Code Generator | Free Online QR Code Tool | EveryTools</title>
        <meta name="description" content="Generate custom QR codes for free. Customize size, colors, and error correction levels. Download your QR code instantly - no registration required." />
      </Helmet>
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <BackButton />
          
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">QR Code Generator</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Generate custom QR codes for URLs, text, or contact information. Customize colors, size, and more.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="glass-card p-6 rounded-xl flex flex-col items-center justify-center">
              <div className="mb-4 w-14 h-14 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <QrCodeIcon className="h-8 w-8 text-indigo-400" />
              </div>
              
              <h2 className="text-xl font-semibold mb-6">QR Code Preview</h2>
              
              <div 
                ref={qrRef} 
                className="bg-white p-4 rounded-lg shadow-lg mb-6"
                style={{ maxWidth: `${size + 40}px` }}
              >
                <QRCodeCanvas 
                  value={qrValue || ' '} 
                  size={size} 
                  bgColor={bgColor}
                  fgColor={fgColor}
                  level={qrLevel as "L" | "M" | "Q" | "H"}
                  includeMargin={true}
                />
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  onClick={handleDownload} 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleCopy}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-6">QR Code Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="content-type">Content Type</Label>
                  <Select defaultValue="url">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="url">URL</SelectItem>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="qr-content">QR Code Content</Label>
                  <Textarea 
                    id="qr-content"
                    placeholder="Enter URL or text for your QR code"
                    value={qrValue}
                    onChange={(e) => setQrValue(e.target.value)}
                    rows={3}
                    className="resize-none"
                  />
                </div>
                
                <div>
                  <Label htmlFor="qr-size">Size: {size}px</Label>
                  <Slider
                    id="qr-size"
                    min={100}
                    max={400}
                    step={10}
                    value={[size]}
                    onValueChange={(value) => setSize(value[0])}
                    className="my-2"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fg-color">Foreground Color</Label>
                    <div className="flex mt-1">
                      <div 
                        className="w-10 h-10 rounded border border-gray-300 mr-2"
                        style={{ backgroundColor: fgColor }}
                      />
                      <Input
                        id="fg-color"
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="w-full h-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="bg-color">Background Color</Label>
                    <div className="flex mt-1">
                      <div 
                        className="w-10 h-10 rounded border border-gray-300 mr-2"
                        style={{ backgroundColor: bgColor }}
                      />
                      <Input
                        id="bg-color"
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-full h-10"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="error-correction">Error Correction Level</Label>
                  <Select value={qrLevel} onValueChange={setQrLevel}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select error correction level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L">Low (7%)</SelectItem>
                      <SelectItem value="M">Medium (15%)</SelectItem>
                      <SelectItem value="Q">Quartile (25%)</SelectItem>
                      <SelectItem value="H">High (30%)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Higher levels make QR code more resistant to damage, but increase complexity.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <HowToUse />
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default QrCodeGenerator;
