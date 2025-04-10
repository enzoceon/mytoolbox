
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout';
import PageContainer from '@/components/PageContainer';
import BackButton from '@/components/BackButton';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { SliderWithTooltip } from '@/components/SliderWithTooltip';
import { Download, Share2, Copy, Check } from 'lucide-react';
import { ColorPicker } from '@/components/color-picker/ColorPicker';
import { toast } from "sonner";
import type { QRCodeErrorCorrectionLevel, QRCodeRenderersOptions, QRCodeToDataURLOptions } from 'qrcode';

const QrCodeGenerator = () => {
  const [qrCodeData, setQrCodeData] = useState('https://mytoolbox.site');
  const [qrCodeType, setQrCodeType] = useState('url');
  const [qrSize, setQrSize] = useState(300);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [fgColor, setFgColor] = useState('#000000');
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<QRCodeErrorCorrectionLevel>('H');
  const [quietZone, setQuietZone] = useState(4);
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Contact information state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactAddress, setContactAddress] = useState('');
  const [contactCompany, setContactCompany] = useState('');
  const [contactTitle, setContactTitle] = useState('');
  const [contactWebsite, setContactWebsite] = useState('');
  
  // WiFi state
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiEncryption, setWifiEncryption] = useState('WPA');
  const [wifiHidden, setWifiHidden] = useState(false);

  useEffect(() => {
    generateQrCode();
  }, [qrCodeData, qrSize, bgColor, fgColor, errorCorrectionLevel, quietZone]);
  
  const handleTabChange = (value: string) => {
    setQrCodeType(value);
    
    // Reset QR code data when changing tabs
    if (value === 'url') {
      setQrCodeData('https://mytoolbox.site');
    } else if (value === 'text') {
      setQrCodeData('Sample text for QR code');
    } else if (value === 'contact') {
      updateContactVcard();
    } else if (value === 'wifi') {
      updateWifiData();
    } else {
      setQrCodeData('');
    }
  };
  
  const updateContactVcard = () => {
    let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';
    if (contactName) vcard += `N:${contactName}\nFN:${contactName}\n`;
    if (contactPhone) vcard += `TEL:${contactPhone}\n`;
    if (contactEmail) vcard += `EMAIL:${contactEmail}\n`;
    if (contactAddress) vcard += `ADR:;;${contactAddress}\n`;
    if (contactCompany) vcard += `ORG:${contactCompany}\n`;
    if (contactTitle) vcard += `TITLE:${contactTitle}\n`;
    if (contactWebsite) vcard += `URL:${contactWebsite}\n`;
    vcard += 'END:VCARD';
    
    setQrCodeData(vcard);
  };
  
  const updateWifiData = () => {
    let wifiString = `WIFI:S:${wifiSsid};T:${wifiEncryption};P:${wifiPassword};H:${wifiHidden ? 'true' : 'false'};;`;
    setQrCodeData(wifiString);
  };
  
  const generateQrCode = async () => {
    if (!qrCodeData) return;
    
    try {
      // Import QRCode.js dynamically to avoid SSR issues
      const QRCode = (await import('qrcode')).default;
      
      // Generate QR code with enhanced options for ultra high quality
      const options: QRCodeToDataURLOptions = {
        errorCorrectionLevel: errorCorrectionLevel,
        margin: quietZone,
        width: qrSize,
        color: {
          dark: fgColor,
          light: bgColor
        },
        rendererOpts: {
          quality: 1.0 // Highest quality rendering
        }
      };
      
      // Create QR code as data URL for high resolution
      const url = await QRCode.toDataURL(qrCodeData, options);
      setQrCodeUrl(url);
      
      // Also draw on canvas for additional customization options
      if (canvasRef.current) {
        const canvasOptions: QRCodeRenderersOptions = {
          errorCorrectionLevel: errorCorrectionLevel,
          margin: quietZone,
          width: qrSize,
          color: {
            dark: fgColor,
            light: bgColor
          }
        };
        await QRCode.toCanvas(canvasRef.current, qrCodeData, canvasOptions);
      }
    } catch (err) {
      toast.error("Error generating QR code");
      console.error("Error generating QR code:", err);
    }
  };
  
  const handleDownload = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrCodeUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR code downloaded");
  };
  
  const handleCopyToClipboard = async () => {
    if (!qrCodeUrl) return;
    
    try {
      // Use clipboard API to copy the image
      const blob = await (await fetch(qrCodeUrl)).blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]);
      
      setCopied(true);
      toast.success("QR code copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy QR code to clipboard");
      console.error("Copy failed:", err);
    }
  };
  
  const handleShare = async () => {
    if (!qrCodeUrl || !navigator.share) return;
    
    try {
      const blob = await (await fetch(qrCodeUrl)).blob();
      const file = new File([blob], 'qrcode.png', { type: 'image/png' });
      
      await navigator.share({
        title: 'QR Code',
        text: 'QR Code generated with MyToolbox',
        files: [file]
      });
      
      toast.success("QR code shared");
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        toast.error("Failed to share QR code");
        console.error("Share failed:", err);
      }
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>QR Code Generator | Create Custom QR Codes Free Online</title>
        <meta 
          name="description" 
          content="Generate customizable QR codes for URLs, text, contact cards and WiFi networks. Create high-quality QR codes with our free online tool."
        />
      </Helmet>
      
      <PageContainer>
        <BackButton />
        <PageHeader 
          title="QR Code Generator" 
          description="Create custom QR codes for various purposes with our free online tool."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <Card className="md:sticky md:top-24 h-fit">
            <CardHeader>
              <CardTitle>QR Code Type</CardTitle>
              <CardDescription>
                Select what type of QR code you want to create
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="url" onValueChange={handleTabChange}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="url">URL</TabsTrigger>
                  <TabsTrigger value="text">Text</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                  <TabsTrigger value="wifi">WiFi</TabsTrigger>
                </TabsList>
                
                <TabsContent value="url" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="url">Website URL</Label>
                    <Input 
                      id="url" 
                      type="text" 
                      value={qrCodeData} 
                      onChange={(e) => setQrCodeData(e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="text" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="text">Text Content</Label>
                    <textarea 
                      id="text" 
                      className="w-full min-h-[120px] p-2 border rounded-md bg-background"
                      value={qrCodeData} 
                      onChange={(e) => setQrCodeData(e.target.value)}
                      placeholder="Enter your text here"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="contact" className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        value={contactName} 
                        onChange={(e) => {
                          setContactName(e.target.value);
                          setTimeout(updateContactVcard, 0);
                        }}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        value={contactPhone} 
                        onChange={(e) => {
                          setContactPhone(e.target.value);
                          setTimeout(updateContactVcard, 0);
                        }}
                        placeholder="+1234567890"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={contactEmail} 
                        onChange={(e) => {
                          setContactEmail(e.target.value);
                          setTimeout(updateContactVcard, 0);
                        }}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input 
                        id="website" 
                        value={contactWebsite} 
                        onChange={(e) => {
                          setContactWebsite(e.target.value);
                          setTimeout(updateContactVcard, 0);
                        }}
                        placeholder="https://example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input 
                        id="company" 
                        value={contactCompany} 
                        onChange={(e) => {
                          setContactCompany(e.target.value);
                          setTimeout(updateContactVcard, 0);
                        }}
                        placeholder="Company Ltd."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input 
                        id="title" 
                        value={contactTitle} 
                        onChange={(e) => {
                          setContactTitle(e.target.value);
                          setTimeout(updateContactVcard, 0);
                        }}
                        placeholder="Software Engineer"
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        id="address" 
                        value={contactAddress} 
                        onChange={(e) => {
                          setContactAddress(e.target.value);
                          setTimeout(updateContactVcard, 0);
                        }}
                        placeholder="123 Main St, City, Country"
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="wifi" className="mt-4 space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="ssid">Network Name (SSID)</Label>
                      <Input 
                        id="ssid" 
                        value={wifiSsid} 
                        onChange={(e) => {
                          setWifiSsid(e.target.value);
                          setTimeout(updateWifiData, 0);
                        }}
                        placeholder="WiFi Network Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        value={wifiPassword} 
                        onChange={(e) => {
                          setWifiPassword(e.target.value);
                          setTimeout(updateWifiData, 0);
                        }}
                        placeholder="WiFi Password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="encryption">Encryption Type</Label>
                      <Select 
                        value={wifiEncryption} 
                        onValueChange={(value) => {
                          setWifiEncryption(value);
                          setTimeout(updateWifiData, 0);
                        }}
                      >
                        <SelectTrigger id="encryption">
                          <SelectValue placeholder="Select encryption type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="WPA">WPA/WPA2</SelectItem>
                          <SelectItem value="WEP">WEP</SelectItem>
                          <SelectItem value="nopass">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="hidden" 
                        className="rounded" 
                        checked={wifiHidden} 
                        onChange={(e) => {
                          setWifiHidden(e.target.checked);
                          setTimeout(updateWifiData, 0);
                        }}
                      />
                      <Label htmlFor="hidden">Hidden Network</Label>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <CardHeader className="pt-0">
              <CardTitle>QR Code Options</CardTitle>
              <CardDescription>
                Customize the appearance of your QR code
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="size">Size (pixels)</Label>
                    <span className="text-sm text-muted-foreground">{qrSize}px</span>
                  </div>
                  <SliderWithTooltip 
                    id="size"
                    min={100} 
                    max={1000} 
                    step={10} 
                    value={[qrSize]} 
                    onValueChange={(values) => setQrSize(values[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="quiet-zone">Quiet Zone Size</Label>
                    <span className="text-sm text-muted-foreground">{quietZone} modules</span>
                  </div>
                  <SliderWithTooltip 
                    id="quiet-zone"
                    min={0} 
                    max={10} 
                    step={1} 
                    value={[quietZone]} 
                    onValueChange={(values) => setQuietZone(values[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="error-correction">Error Correction Level</Label>
                  <Select 
                    value={errorCorrectionLevel} 
                    onValueChange={(value) => setErrorCorrectionLevel(value as QRCodeErrorCorrectionLevel)}
                  >
                    <SelectTrigger id="error-correction">
                      <SelectValue placeholder="Select error correction level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L">Low (7%)</SelectItem>
                      <SelectItem value="M">Medium (15%)</SelectItem>
                      <SelectItem value="H">High (30%)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Higher correction allows QR code to be readable even if partially damaged or covered.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Foreground Color</Label>
                    <ColorPicker 
                      color={fgColor} 
                      onChange={setFgColor} 
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Background Color</Label>
                    <ColorPicker 
                      color={bgColor} 
                      onChange={setBgColor} 
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>QR Code Preview</CardTitle>
              <CardDescription>
                Scan this code with a QR code scanner to test
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  {qrCodeUrl ? (
                    <img 
                      src={qrCodeUrl} 
                      alt="QR Code" 
                      className="max-w-full rounded-lg shadow-md border"
                      style={{ width: qrSize + 'px', height: qrSize + 'px' }}
                    />
                  ) : (
                    <div 
                      className="bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center"
                      style={{ width: qrSize + 'px', height: qrSize + 'px' }}
                    >
                      Generating...
                    </div>
                  )}
                  {/* Hidden canvas for additional customization options */}
                  <canvas 
                    ref={canvasRef} 
                    className="hidden" 
                    width={qrSize} 
                    height={qrSize}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-4 flex-wrap">
              <Button onClick={handleDownload} className="flex items-center gap-2">
                <Download size={16} />
                Download
              </Button>
              <Button onClick={handleCopyToClipboard} variant="outline" className="flex items-center gap-2">
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy to Clipboard'}
              </Button>
              {navigator.share && (
                <Button onClick={handleShare} variant="outline" className="flex items-center gap-2">
                  <Share2 size={16} />
                  Share
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </PageContainer>
    </Layout>
  );
};

export default QrCodeGenerator;
