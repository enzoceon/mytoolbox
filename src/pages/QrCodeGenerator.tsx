
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { QrCode, Download, Copy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from "sonner";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HowToUse from '@/components/HowToUse';
import BackButton from '@/components/BackButton';
import SpaceBackground from '@/components/SpaceBackground';

const QrCodeGenerator = () => {
  const [qrValue, setQrValue] = useState('https://mytoolbox.site');
  const [qrSize, setQrSize] = useState(200);
  const [qrForeground, setQrForeground] = useState('#000000');
  const [qrBackground, setQrBackground] = useState('#FFFFFF');
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState('M');
  const [qrImageUrl, setQrImageUrl] = useState('');
  const [qrType, setQrType] = useState('url');
  
  // Generate QR code whenever parameters change
  useEffect(() => {
    generateQrCode();
  }, [qrValue, qrSize, qrForeground, qrBackground, errorCorrectionLevel]);
  
  const generateQrCode = () => {
    if (!qrValue.trim()) {
      setQrImageUrl('');
      return;
    }
    
    // Construct Google Charts API URL for QR code
    const apiUrl = `https://chart.googleapis.com/chart?cht=qr&chs=${qrSize}x${qrSize}&chl=${encodeURIComponent(qrValue)}&choe=UTF-8&chld=${errorCorrectionLevel}|0&chco=${qrForeground.substring(1)}`;
    setQrImageUrl(apiUrl);
  };
  
  const handleDownload = () => {
    if (!qrImageUrl) return;
    
    // Create a temporary link element and trigger download
    const link = document.createElement('a');
    link.href = qrImageUrl;
    link.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("QR Code downloaded successfully!");
  };
  
  const handleCopyToClipboard = async () => {
    if (!qrImageUrl) return;
    
    try {
      // Fetch the image as blob
      const response = await fetch(qrImageUrl);
      const blob = await response.blob();
      
      // Copy to clipboard using the Clipboard API
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      
      toast.success("QR Code copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy QR code:", err);
      toast.error("Failed to copy QR code to clipboard");
    }
  };
  
  const handleQrTypeChange = (value: string) => {
    setQrType(value);
    // Reset the input field when changing type
    setQrValue('');
  };
  
  const getPlaceholderByType = () => {
    switch (qrType) {
      case 'url':
        return 'Enter URL (e.g., https://example.com)';
      case 'text':
        return 'Enter plain text';
      case 'email':
        return 'Enter email address';
      case 'phone':
        return 'Enter phone number';
      case 'sms':
        return 'Enter phone number for SMS';
      case 'wifi':
        return 'WIFI:S:<SSID>;T:<WPA|WEP>;P:<PASSWORD>;;';
      case 'geo':
        return 'GEO:latitude,longitude';
      case 'contact':
        return 'MECARD:N:<name>;TEL:<phone>;EMAIL:<email>;ADR:<address>;;';
      default:
        return 'Enter data for QR code';
    }
  };
  
  const formatInputByType = (value: string) => {
    switch (qrType) {
      case 'url':
        // Add https:// if not present and not empty
        if (value && !value.match(/^[a-zA-Z]+:\/\//)) {
          return `https://${value}`;
        }
        return value;
      case 'email':
        return `mailto:${value}`;
      case 'phone':
        return `tel:${value}`;
      case 'sms':
        return `sms:${value}`;
      default:
        return value;
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQrValue(formatInputByType(value));
  };

  return (
    <>
      <Helmet>
        <title>QR Code Generator - Free Online Tool | MyToolbox</title>
        <meta name="description" content="Create custom QR codes for URLs, text, contact info, WiFi, and more. Download or share your QR codes for free." />
        <meta name="keywords" content="qr code generator, qr code creator, qr code maker, free qr code, custom qr code, url to qr code" />
      </Helmet>
      
      <SpaceBackground />
      <Header />
      
      <main className="container mx-auto px-4 py-10 min-h-screen">
        <BackButton />
        
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">QR Code Generator</h1>
            <p className="text-lg text-muted-foreground">
              Create custom QR codes for URLs, text, contact info, WiFi, and more
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card/50 backdrop-blur border-border">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="qrType">QR Code Type</Label>
                    <Select value={qrType} onValueChange={handleQrTypeChange}>
                      <SelectTrigger id="qrType">
                        <SelectValue placeholder="Select QR code type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="url">URL</SelectItem>
                        <SelectItem value="text">Plain Text</SelectItem>
                        <SelectItem value="email">Email Address</SelectItem>
                        <SelectItem value="phone">Phone Number</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="wifi">WiFi Network</SelectItem>
                        <SelectItem value="geo">Geolocation</SelectItem>
                        <SelectItem value="contact">Contact Info</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="qrValue">Data for QR Code</Label>
                    <Input
                      id="qrValue"
                      placeholder={getPlaceholderByType()}
                      value={qrValue.replace(/^(https?:\/\/|mailto:|tel:|sms:)/, '')}
                      onChange={handleInputChange}
                    />
                    <p className="text-sm text-muted-foreground">
                      Enter the data you want to encode in the QR code
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
                  
                  <div className="space-y-3">
                    <Label>Error Correction Level</Label>
                    <RadioGroup 
                      value={errorCorrectionLevel}
                      onValueChange={setErrorCorrectionLevel}
                      className="flex space-x-2"
                    >
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="L" id="ecl-l" />
                        <Label htmlFor="ecl-l" className="cursor-pointer">Low</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="M" id="ecl-m" />
                        <Label htmlFor="ecl-m" className="cursor-pointer">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="Q" id="ecl-q" />
                        <Label htmlFor="ecl-q" className="cursor-pointer">Quartile</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="H" id="ecl-h" />
                        <Label htmlFor="ecl-h" className="cursor-pointer">High</Label>
                      </div>
                    </RadioGroup>
                    <p className="text-xs text-muted-foreground">
                      Higher correction levels make QR codes more resistant to damage but increase complexity
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="qrForeground">Foreground Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          id="qrForeground"
                          value={qrForeground}
                          onChange={(e) => setQrForeground(e.target.value)}
                          className="w-12 h-9 p-1"
                        />
                        <Input 
                          type="text"
                          value={qrForeground} 
                          onChange={(e) => setQrForeground(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="qrBackground">Background Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          id="qrBackground"
                          value={qrBackground}
                          onChange={(e) => setQrBackground(e.target.value)}
                          className="w-12 h-9 p-1"
                        />
                        <Input 
                          type="text"
                          value={qrBackground} 
                          onChange={(e) => setQrBackground(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
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
                        style={{ backgroundColor: qrBackground }}
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2 w-full">
                      <Button onClick={handleDownload} className="gap-2 w-full">
                        <Download size={16} />
                        Download QR Code
                      </Button>
                      <Button onClick={handleCopyToClipboard} variant="outline" className="gap-2 w-full">
                        <Copy size={16} />
                        Copy to Clipboard
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <QrCode size={100} className="text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">
                      Enter data to generate a QR code
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* How to Use Section */}
        <HowToUse />
      </main>
      
      <Footer />
    </>
  );
};

export default QrCodeGenerator;
