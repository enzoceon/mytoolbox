
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, Palette, Image as ImageIcon, FileImage, Copy, 
  Check, AlertCircle, Trash, Upload, Globe, Phone, Mail, MessageSquare,
  Smartphone, QrCode, Plus, Minus, Settings, Scale, User
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Switch } from "@/components/ui/switch";
import { getStandardFilename } from '@/utils/fileUtils';
import QRCode from 'qrcode';
import { useIsMobile } from '@/hooks/use-mobile';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
  const [contentType, setContentType] = useState<'url' | 'text' | 'email' | 'phone' | 'sms' | 'vcard'>('url');
  const [emailDetails, setEmailDetails] = useState({ to: '', subject: '', body: '' });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsDetails, setSmsDetails] = useState({ number: '', message: '' });
  const [vcardDetails, setVcardDetails] = useState({ name: '', company: '', title: '', email: '', phone: '', website: '', address: '' });
  const [showStatistics, setShowStatistics] = useState(false);
  const [isColorsOpen, setIsColorsOpen] = useState(false);
  const [isLogoOpen, setIsLogoOpen] = useState(false);
  const [isDesignOpen, setIsDesignOpen] = useState(false);
  const [dotType, setDotType] = useState('square');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Generate QR code whenever relevant parameters change
  useEffect(() => {
    if (getFormattedContent().trim()) {
      generateQR();
    }
  }, [qrContent, contentType, emailDetails, phoneNumber, smsDetails, vcardDetails, qrSize, fgColor, bgColor, errorLevel, margin, centerImage, dotType]);

  const getFormattedContent = () => {
    switch (contentType) {
      case 'url':
        return qrContent;
      case 'text':
        return qrContent;
      case 'email':
        return `mailto:${emailDetails.to}?subject=${encodeURIComponent(emailDetails.subject)}&body=${encodeURIComponent(emailDetails.body)}`;
      case 'phone':
        return `tel:${phoneNumber}`;
      case 'sms':
        return `sms:${smsDetails.number}?body=${encodeURIComponent(smsDetails.message)}`;
      case 'vcard':
        return `BEGIN:VCARD
VERSION:3.0
N:${vcardDetails.name}
ORG:${vcardDetails.company}
TITLE:${vcardDetails.title}
TEL:${vcardDetails.phone}
EMAIL:${vcardDetails.email}
URL:${vcardDetails.website}
ADR:${vcardDetails.address}
END:VCARD`;
      default:
        return qrContent;
    }
  };

  const generateQR = async () => {
    const content = getFormattedContent();
    if (!content.trim()) return;
    
    setIsBusy(true);
    try {
      // Generate QR code
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      await QRCode.toCanvas(canvas, content, {
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
          const img = new globalThis.Image();
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

  const downloadQR = (format: 'png' | 'svg' | 'pdf' | 'eps' = 'png') => {
    if (!qrImage) return;
    
    const link = document.createElement('a');
    link.href = qrImage;
    link.download = getStandardFilename('png', 'qrcode');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Downloaded!",
      description: `Your styled QR code has been downloaded as ${format.toUpperCase()}.`
    });
  };

  const renderContentInput = () => {
    switch (contentType) {
      case 'url':
        return (
          <div className="space-y-3">
            <Label htmlFor="url-input">Your URL</Label>
            <Input
              id="url-input"
              value={qrContent}
              onChange={(e) => setQrContent(e.target.value)}
              placeholder="https://example.com"
              className="mt-1"
            />
          </div>
        );
      case 'text':
        return (
          <div className="space-y-3">
            <Label htmlFor="text-input">Your Text</Label>
            <Input
              id="text-input"
              value={qrContent}
              onChange={(e) => setQrContent(e.target.value)}
              placeholder="Enter any text here..."
              className="mt-1"
            />
          </div>
        );
      case 'email':
        return (
          <div className="space-y-3">
            <div>
              <Label htmlFor="email-to">Email Address</Label>
              <Input
                id="email-to"
                value={emailDetails.to}
                onChange={(e) => setEmailDetails({...emailDetails, to: e.target.value})}
                placeholder="recipient@example.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email-subject">Subject</Label>
              <Input
                id="email-subject"
                value={emailDetails.subject}
                onChange={(e) => setEmailDetails({...emailDetails, subject: e.target.value})}
                placeholder="Email subject"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email-body">Message</Label>
              <Input
                id="email-body"
                value={emailDetails.body}
                onChange={(e) => setEmailDetails({...emailDetails, body: e.target.value})}
                placeholder="Email message"
                className="mt-1"
              />
            </div>
          </div>
        );
      case 'phone':
        return (
          <div className="space-y-3">
            <Label htmlFor="phone-input">Phone Number</Label>
            <Input
              id="phone-input"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1234567890"
              className="mt-1"
            />
          </div>
        );
      case 'sms':
        return (
          <div className="space-y-3">
            <div>
              <Label htmlFor="sms-number">Phone Number</Label>
              <Input
                id="sms-number"
                value={smsDetails.number}
                onChange={(e) => setSmsDetails({...smsDetails, number: e.target.value})}
                placeholder="+1234567890"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="sms-message">Message</Label>
              <Input
                id="sms-message"
                value={smsDetails.message}
                onChange={(e) => setSmsDetails({...smsDetails, message: e.target.value})}
                placeholder="Your SMS message"
                className="mt-1"
              />
            </div>
          </div>
        );
      case 'vcard':
        return (
          <div className="space-y-3">
            <div>
              <Label htmlFor="vcard-name">Name</Label>
              <Input
                id="vcard-name"
                value={vcardDetails.name}
                onChange={(e) => setVcardDetails({...vcardDetails, name: e.target.value})}
                placeholder="John Doe"
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="vcard-company">Company</Label>
                <Input
                  id="vcard-company"
                  value={vcardDetails.company}
                  onChange={(e) => setVcardDetails({...vcardDetails, company: e.target.value})}
                  placeholder="Company"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="vcard-title">Job Title</Label>
                <Input
                  id="vcard-title"
                  value={vcardDetails.title}
                  onChange={(e) => setVcardDetails({...vcardDetails, title: e.target.value})}
                  placeholder="Job Title"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="vcard-email">Email</Label>
                <Input
                  id="vcard-email"
                  value={vcardDetails.email}
                  onChange={(e) => setVcardDetails({...vcardDetails, email: e.target.value})}
                  placeholder="email@example.com"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="vcard-phone">Phone</Label>
                <Input
                  id="vcard-phone"
                  value={vcardDetails.phone}
                  onChange={(e) => setVcardDetails({...vcardDetails, phone: e.target.value})}
                  placeholder="+1234567890"
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="vcard-website">Website</Label>
              <Input
                id="vcard-website"
                value={vcardDetails.website}
                onChange={(e) => setVcardDetails({...vcardDetails, website: e.target.value})}
                placeholder="https://example.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="vcard-address">Address</Label>
              <Input
                id="vcard-address"
                value={vcardDetails.address}
                onChange={(e) => setVcardDetails({...vcardDetails, address: e.target.value})}
                placeholder="123 Main St, City, Country"
                className="mt-1"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
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
        
        <div className="max-w-6xl mx-auto">
          {/* Mobile View */}
          <div className="lg:hidden">
            <Card className="mb-4 overflow-hidden">
              <div className="p-4 bg-primary/5">
                <Tabs defaultValue="url" onValueChange={(value) => setContentType(value as any)} className="w-full">
                  <TabsList className="w-full grid grid-cols-6 h-auto p-0 bg-transparent gap-1">
                    <TabsTrigger value="url" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3 flex flex-col items-center">
                      <Globe className="h-4 w-4 mb-1" />
                      <span className="text-xs">URL</span>
                    </TabsTrigger>
                    <TabsTrigger value="text" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3 flex flex-col items-center">
                      <FileImage className="h-4 w-4 mb-1" />
                      <span className="text-xs">TEXT</span>
                    </TabsTrigger>
                    <TabsTrigger value="email" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3 flex flex-col items-center">
                      <Mail className="h-4 w-4 mb-1" />
                      <span className="text-xs">EMAIL</span>
                    </TabsTrigger>
                    <TabsTrigger value="phone" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3 flex flex-col items-center">
                      <Phone className="h-4 w-4 mb-1" />
                      <span className="text-xs">PHONE</span>
                    </TabsTrigger>
                    <TabsTrigger value="sms" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3 flex flex-col items-center">
                      <MessageSquare className="h-4 w-4 mb-1" />
                      <span className="text-xs">SMS</span>
                    </TabsTrigger>
                    <TabsTrigger value="vcard" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3 flex flex-col items-center">
                      <User className="h-4 w-4 mb-1" />
                      <span className="text-xs">VCARD</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <Tabs defaultValue="url" onValueChange={(value) => setContentType(value as any)} className="w-full">
                <TabsContent value="url" className="p-4 m-0">
                  {renderContentInput()}
                </TabsContent>
                <TabsContent value="text" className="p-4 m-0">
                  {renderContentInput()}
                </TabsContent>
                <TabsContent value="email" className="p-4 m-0">
                  {renderContentInput()}
                </TabsContent>
                <TabsContent value="phone" className="p-4 m-0">
                  {renderContentInput()}
                </TabsContent>
                <TabsContent value="sms" className="p-4 m-0">
                  {renderContentInput()}
                </TabsContent>
                <TabsContent value="vcard" className="p-4 m-0">
                  {renderContentInput()}
                </TabsContent>
              </Tabs>
            </Card>

            <div className="flex gap-2 items-center mb-4">
              <Switch
                id="statistics-toggle"
                checked={showStatistics}
                onCheckedChange={setShowStatistics}
              />
              <Label htmlFor="statistics-toggle">Statistics and Editability</Label>
            </div>

            <Collapsible className="mb-3 border rounded-md overflow-hidden">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted/30 hover:bg-muted/50">
                <div className="flex items-center">
                  <Palette className="mr-2 h-5 w-5" />
                  <span>SET COLORS</span>
                </div>
                <span>{isColorsOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 border-t">
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
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="mb-3 border rounded-md overflow-hidden">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted/30 hover:bg-muted/50">
                <div className="flex items-center">
                  <FileImage className="mr-2 h-5 w-5" />
                  <span>ADD LOGO IMAGE</span>
                </div>
                <span>{isLogoOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 border-t">
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
              </CollapsibleContent>
            </Collapsible>

            <Collapsible className="mb-6 border rounded-md overflow-hidden">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted/30 hover:bg-muted/50">
                <div className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  <span>CUSTOMIZE DESIGN</span>
                </div>
                <span>{isDesignOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 border-t">
                <div className="space-y-6">
                  <div>
                    <Label>Error Correction Level</Label>
                    <RadioGroup 
                      value={errorLevel} 
                      onValueChange={setErrorLevel}
                      className="flex flex-wrap gap-2 mt-2"
                    >
                      <div className="flex items-center space-x-2 border rounded p-2">
                        <RadioGroupItem value="L" id="error-L" />
                        <Label htmlFor="error-L" className="cursor-pointer">Low</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded p-2">
                        <RadioGroupItem value="M" id="error-M" />
                        <Label htmlFor="error-M" className="cursor-pointer">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded p-2">
                        <RadioGroupItem value="Q" id="error-Q" />
                        <Label htmlFor="error-Q" className="cursor-pointer">Quartile</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded p-2">
                        <RadioGroupItem value="H" id="error-H" />
                        <Label htmlFor="error-H" className="cursor-pointer">High</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
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
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* QR Code Preview */}
            <div className="flex flex-col items-center mb-6">
              <div className="bg-white p-4 rounded-md shadow-sm mb-4 max-w-full overflow-hidden">
                {qrImage ? (
                  <img 
                    src={qrImage} 
                    alt="Generated QR Code" 
                    className="max-w-full h-auto mx-auto"
                    style={{ maxWidth: '300px' }}
                  />
                ) : (
                  <div 
                    className="bg-gray-100 flex items-center justify-center mx-auto"
                    style={{ width: 300, height: 300 }}
                  >
                    <AlertCircle className="text-muted-foreground" />
                  </div>
                )}
              </div>
              
              <canvas ref={canvasRef} className="hidden" />
              
              <div className="flex gap-3 justify-center flex-wrap w-full">
                <Button onClick={() => downloadQR('png')} disabled={!qrImage || isBusy} className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download PNG
                </Button>
                <Button variant="outline" onClick={copyToClipboard} disabled={!qrImage || isBusy} className="flex-1">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              </div>
              
              <div className="flex gap-2 justify-center mt-3 w-full">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => downloadQR('svg')} 
                  disabled={!qrImage || isBusy}
                  className="flex-1 h-10"
                >
                  .SVG
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => downloadQR('pdf')} 
                  disabled={!qrImage || isBusy}
                  className="flex-1 h-10"
                >
                  .PDF
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => downloadQR('eps')} 
                  disabled={!qrImage || isBusy}
                  className="flex-1 h-10"
                >
                  .EPS
                </Button>
              </div>
              
              <div className="flex items-center justify-between w-full mt-4">
                <span className="text-sm text-muted-foreground">Low Quality</span>
                <span className="text-sm font-medium">1000 x 1000 Px</span>
                <span className="text-sm text-muted-foreground">High Quality</span>
              </div>
              
              <Slider
                min={100}
                max={2000}
                step={100}
                value={[1000]}
                className="mt-2 w-full"
                disabled
              />
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8">
            {/* Left Column: QR Code Settings */}
            <Card className="p-6">
              <Tabs defaultValue="url" onValueChange={(value) => setContentType(value as any)} className="w-full">
                <TabsList className="grid grid-cols-6 w-full mb-6">
                  <TabsTrigger value="url" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>URL</span>
                  </TabsTrigger>
                  <TabsTrigger value="text" className="flex items-center gap-2">
                    <FileImage className="h-4 w-4" />
                    <span>TEXT</span>
                  </TabsTrigger>
                  <TabsTrigger value="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>EMAIL</span>
                  </TabsTrigger>
                  <TabsTrigger value="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>PHONE</span>
                  </TabsTrigger>
                  <TabsTrigger value="sms" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>SMS</span>
                  </TabsTrigger>
                  <TabsTrigger value="vcard" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>VCARD</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="url" className="mt-0">
                  {renderContentInput()}
                </TabsContent>
                <TabsContent value="text" className="mt-0">
                  {renderContentInput()}
                </TabsContent>
                <TabsContent value="email" className="mt-0">
                  {renderContentInput()}
                </TabsContent>
                <TabsContent value="phone" className="mt-0">
                  {renderContentInput()}
                </TabsContent>
                <TabsContent value="sms" className="mt-0">
                  {renderContentInput()}
                </TabsContent>
                <TabsContent value="vcard" className="mt-0">
                  {renderContentInput()}
                </TabsContent>
              </Tabs>
              
              <div className="mt-6">
                <div className="flex gap-2 items-center">
                  <Switch
                    id="statistics-toggle-desktop"
                    checked={showStatistics}
                    onCheckedChange={setShowStatistics}
                  />
                  <Label htmlFor="statistics-toggle-desktop">Statistics and Editability</Label>
                </div>
                
                <Separator className="my-6" />
                
                <Collapsible
                  open={isColorsOpen}
                  onOpenChange={setIsColorsOpen}
                  className="mb-4 border rounded-md overflow-hidden"
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted/30 hover:bg-muted/50">
                    <div className="flex items-center">
                      <Palette className="mr-2 h-5 w-5" />
                      <span>SET COLORS</span>
                    </div>
                    <span>{isColorsOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4 border-t">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fg-color-desktop">Foreground Color</Label>
                        <div className="flex mt-1">
                          <div 
                            className="w-10 h-10 border rounded-l-md" 
                            style={{ backgroundColor: fgColor }}
                          />
                          <Input
                            id="fg-color-desktop"
                            type="color"
                            value={fgColor}
                            onChange={(e) => setFgColor(e.target.value)}
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="bg-color-desktop">Background Color</Label>
                        <div className="flex mt-1">
                          <div 
                            className="w-10 h-10 border rounded-l-md" 
                            style={{ backgroundColor: bgColor }}
                          />
                          <Input
                            id="bg-color-desktop"
                            type="color"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                
                <Collapsible
                  open={isLogoOpen}
                  onOpenChange={setIsLogoOpen}
                  className="mb-4 border rounded-md overflow-hidden"
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted/30 hover:bg-muted/50">
                    <div className="flex items-center">
                      <FileImage className="mr-2 h-5 w-5" />
                      <span>ADD LOGO IMAGE</span>
                    </div>
                    <span>{isLogoOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4 border-t">
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
                            htmlFor="logo-upload-desktop" 
                            className="cursor-pointer flex flex-col items-center justify-center w-20 h-20 border-2 border-dashed rounded-md hover:border-accent hover:bg-accent/5 transition-colors"
                          >
                            <Upload size={24} className="text-muted-foreground" />
                            <span className="text-xs text-muted-foreground mt-1">Add Logo</span>
                          </Label>
                          <Input 
                            id="logo-upload-desktop" 
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
                  </CollapsibleContent>
                </Collapsible>
                
                <Collapsible
                  open={isDesignOpen}
                  onOpenChange={setIsDesignOpen}
                  className="mb-4 border rounded-md overflow-hidden"
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted/30 hover:bg-muted/50">
                    <div className="flex items-center">
                      <Settings className="mr-2 h-5 w-5" />
                      <span>CUSTOMIZE DESIGN</span>
                    </div>
                    <span>{isDesignOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4 border-t">
                    <div className="space-y-6">
                      <div>
                        <Label>Error Correction Level</Label>
                        <RadioGroup 
                          value={errorLevel} 
                          onValueChange={setErrorLevel}
                          className="grid grid-cols-4 gap-2 mt-2"
                        >
                          <div className="flex items-center space-x-2 border rounded p-2">
                            <RadioGroupItem value="L" id="error-L-desktop" />
                            <Label htmlFor="error-L-desktop" className="cursor-pointer">Low</Label>
                          </div>
                          <div className="flex items-center space-x-2 border rounded p-2">
                            <RadioGroupItem value="M" id="error-M-desktop" />
                            <Label htmlFor="error-M-desktop" className="cursor-pointer">Medium</Label>
                          </div>
                          <div className="flex items-center space-x-2 border rounded p-2">
                            <RadioGroupItem value="Q" id="error-Q-desktop" />
                            <Label htmlFor="error-Q-desktop" className="cursor-pointer">Quartile</Label>
                          </div>
                          <div className="flex items-center space-x-2 border rounded p-2">
                            <RadioGroupItem value="H" id="error-H-desktop" />
                            <Label htmlFor="error-H-desktop" className="cursor-pointer">High</Label>
                          </div>
                        </RadioGroup>
                        <p className="text-xs text-muted-foreground mt-1">
                          Higher correction levels allow for more decoration but may make the QR code larger.
                        </p>
                      </div>
                      
                      <div>
                        <Label htmlFor="qr-size-desktop">QR Code Size</Label>
                        <div className="flex items-center gap-4">
                          <Slider
                            id="qr-size-desktop"
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
                        <Label htmlFor="qr-margin-desktop">QR Code Margin</Label>
                        <div className="flex items-center gap-4">
                          <Slider
                            id="qr-margin-desktop"
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
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </Card>
            
            {/* Right Column: QR Code Preview */}
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
                
                <div className="flex flex-wrap gap-3 justify-center w-full max-w-lg">
                  <Button 
                    onClick={() => downloadQR('png')} 
                    disabled={!qrImage || isBusy}
                    className="flex-1"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PNG
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={copyToClipboard} 
                    disabled={!qrImage || isBusy}
                    className="flex-1"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy to Clipboard
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mt-3 w-full max-w-lg">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => downloadQR('svg')} 
                    disabled={!qrImage || isBusy}
                  >
                    .SVG
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => downloadQR('pdf')} 
                    disabled={!qrImage || isBusy}
                  >
                    .PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => downloadQR('eps')} 
                    disabled={!qrImage || isBusy}
                  >
                    .EPS
                  </Button>
                </div>
                
                <div className="flex items-center justify-between w-full max-w-lg mt-6">
                  <span className="text-sm text-muted-foreground">Low Quality</span>
                  <span className="text-sm font-medium">1000 x 1000 Px</span>
                  <span className="text-sm text-muted-foreground">High Quality</span>
                </div>
                
                <Slider
                  min={100}
                  max={2000}
                  step={100}
                  value={[1000]}
                  className="mt-2 w-full max-w-lg"
                  disabled
                />
                
                <div className="mt-6 w-full max-w-lg">
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
        </div>
      </PageContainer>
      
      <Footer />
    </>
  );
};

export default QrCodeStyler;
