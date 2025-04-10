
import React, { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Download, Clipboard, Check, Upload, RefreshCw, Image, 
  Link as LinkIcon, Phone, Smartphone, Mail, MapPin, Wifi, 
  Save, CheckCheck, Copy, PencilRuler, QrCode, Palette, Layers
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import QRCodeStyling from 'qr-code-styling';
import QrCodeStylerSEO from '@/components/SEO/QrCodeStylerSEO';

// Define types for the QR code options
interface QRCodeOptions {
  width: number;
  height: number;
  type: 'svg' | 'canvas';
  data: string;
  margin: number;
  qrOptions: {
    typeNumber: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40;
    mode: 'Byte';
    errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  };
  imageOptions: {
    hideBackgroundDots: boolean;
    imageSize: number;
    crossOrigin?: 'anonymous';
    margin: number;
  };
  dotsOptions: {
    type: 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded';
    color: string;
    gradient?: {
      type: 'linear' | 'radial';
      rotation: number;
      colorStops: Array<{ offset: number; color: string }>;
    };
  };
  cornersSquareOptions: {
    type: 'default' | 'dot' | 'square' | 'extra-rounded';
    color: string;
    gradient?: {
      type: 'linear' | 'radial';
      rotation: number;
      colorStops: Array<{ offset: number; color: string }>;
    };
  };
  cornersDotOptions: {
    type: 'default' | 'dot' | 'square';
    color: string;
    gradient?: {
      type: 'linear' | 'radial';
      rotation: number;
      colorStops: Array<{ offset: number; color: string }>;
    };
  };
  backgroundOptions: {
    color: string;
    gradient?: {
      type: 'linear' | 'radial';
      rotation: number;
      colorStops: Array<{ offset: number; color: string }>;
    };
  };
  image?: string;
}

// Content types for the tabs
type ContentType = 'text' | 'url' | 'email' | 'phone' | 'wifi' | 'location' | 'vcard';

// Default QR code options
const defaultOptions: QRCodeOptions = {
  width: 300,
  height: 300,
  type: 'svg',
  data: 'https://lovable.dev',
  margin: 10,
  qrOptions: {
    typeNumber: 0,
    mode: 'Byte',
    errorCorrectionLevel: 'M'
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 0
  },
  dotsOptions: {
    type: 'rounded',
    color: '#6366f1'
  },
  cornersSquareOptions: {
    type: 'extra-rounded',
    color: '#8b5cf6'
  },
  cornersDotOptions: {
    type: 'dot',
    color: '#6366f1'
  },
  backgroundOptions: {
    color: '#ffffff'
  }
};

// Generate sample QR codes for templates
const templates = [
  {
    name: 'Default',
    options: { ...defaultOptions }
  },
  {
    name: 'Gradient',
    options: {
      ...defaultOptions,
      dotsOptions: {
        ...defaultOptions.dotsOptions,
        color: '#000000',
        gradient: {
          type: 'linear' as const,
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#8b5cf6' },
            { offset: 1, color: '#6366f1' }
          ]
        }
      },
      cornersSquareOptions: {
        ...defaultOptions.cornersSquareOptions,
        color: '#000000',
        gradient: {
          type: 'linear' as const,
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#8b5cf6' },
            { offset: 1, color: '#6366f1' }
          ]
        }
      }
    }
  },
  {
    name: 'Clean',
    options: {
      ...defaultOptions,
      dotsOptions: {
        ...defaultOptions.dotsOptions,
        type: 'square',
        color: '#000000'
      },
      cornersSquareOptions: {
        ...defaultOptions.cornersSquareOptions,
        type: 'square',
        color: '#000000'
      },
      cornersDotOptions: {
        ...defaultOptions.cornersDotOptions,
        type: 'square',
        color: '#000000'
      }
    }
  },
  {
    name: 'Rounded',
    options: {
      ...defaultOptions,
      dotsOptions: {
        ...defaultOptions.dotsOptions,
        type: 'extra-rounded',
        color: '#000000'
      },
      cornersSquareOptions: {
        ...defaultOptions.cornersSquareOptions,
        type: 'extra-rounded',
        color: '#000000'
      },
      cornersDotOptions: {
        ...defaultOptions.cornersDotOptions,
        type: 'dot',
        color: '#000000'
      }
    }
  },
  {
    name: 'Colorful',
    options: {
      ...defaultOptions,
      dotsOptions: {
        ...defaultOptions.dotsOptions,
        type: 'dots',
        color: '#f97316'
      },
      cornersSquareOptions: {
        ...defaultOptions.cornersSquareOptions,
        type: 'square',
        color: '#8b5cf6'
      },
      cornersDotOptions: {
        ...defaultOptions.cornersDotOptions,
        type: 'square',
        color: '#6366f1'
      },
      backgroundOptions: {
        color: '#f8fafc'
      }
    }
  }
];

const QrCodeStyler = () => {
  const [activeTab, setActiveTab] = useState<ContentType>('url');
  const [qrText, setQrText] = useState('https://lovable.dev');
  const [qrName, setQrName] = useState('');
  const [qrOptions, setQrOptions] = useState<QRCodeOptions>({ ...defaultOptions });
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [usingGradient, setUsingGradient] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<'svg' | 'png' | 'jpeg'>('svg');
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const qrCode = useRef<any>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Initialize QR code on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('qr-code-styling').then((QRCodeStylingModule) => {
        const QRCodeStylingClass = QRCodeStylingModule.default;
        qrCode.current = new QRCodeStylingClass(qrOptions);
        if (qrCodeRef.current) {
          qrCodeRef.current.innerHTML = '';
          qrCode.current.append(qrCodeRef.current);
        }
      }).catch(err => {
        console.error('Failed to load QR code styling library:', err);
        toast({
          title: 'Error',
          description: 'Failed to load QR code generator',
          variant: 'destructive'
        });
      });
    }

    return () => {
      // Clean up on unmount
      if (qrCodeRef.current) {
        qrCodeRef.current.innerHTML = '';
      }
    };
  }, []);

  // Update QR code when options change
  useEffect(() => {
    if (qrCode.current) {
      qrCode.current.update(qrOptions);
    }
  }, [qrOptions]);

  // Handle content changes based on tab
  const handleContentChange = (type: ContentType, value: string) => {
    let formattedData = value;

    // Format data based on content type
    switch (type) {
      case 'url':
        // If no protocol specified, add https://
        if (value && !value.startsWith('http://') && !value.startsWith('https://')) {
          formattedData = `https://${value}`;
        }
        break;
      case 'email':
        if (value) {
          formattedData = `mailto:${value}`;
        }
        break;
      case 'phone':
        if (value) {
          formattedData = `tel:${value}`;
        }
        break;
      case 'wifi':
        // Format: WIFI:T:WPA;S:SSID;P:PASSWORD;;
        const ssid = (document.getElementById('wifi-ssid') as HTMLInputElement)?.value || '';
        const password = (document.getElementById('wifi-password') as HTMLInputElement)?.value || '';
        const encryption = (document.getElementById('wifi-encryption') as HTMLSelectElement)?.value || 'WPA';
        if (ssid) {
          formattedData = `WIFI:T:${encryption};S:${ssid};P:${password};;`;
        }
        break;
      case 'location':
        // Format: geo:latitude,longitude
        const latitude = (document.getElementById('location-lat') as HTMLInputElement)?.value || '';
        const longitude = (document.getElementById('location-lon') as HTMLInputElement)?.value || '';
        if (latitude && longitude) {
          formattedData = `geo:${latitude},${longitude}`;
        }
        break;
      case 'vcard':
        // Format vCard
        const name = (document.getElementById('vcard-name') as HTMLInputElement)?.value || '';
        const organization = (document.getElementById('vcard-org') as HTMLInputElement)?.value || '';
        const phone = (document.getElementById('vcard-phone') as HTMLInputElement)?.value || '';
        const email = (document.getElementById('vcard-email') as HTMLInputElement)?.value || '';
        const website = (document.getElementById('vcard-website') as HTMLInputElement)?.value || '';
        const address = (document.getElementById('vcard-address') as HTMLInputElement)?.value || '';
        
        let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';
        if (name) vcard += `FN:${name}\n`;
        if (organization) vcard += `ORG:${organization}\n`;
        if (phone) vcard += `TEL:${phone}\n`;
        if (email) vcard += `EMAIL:${email}\n`;
        if (website) vcard += `URL:${website}\n`;
        if (address) vcard += `ADR:;;${address};;;\n`;
        vcard += 'END:VCARD';
        
        formattedData = vcard;
        break;
      default:
        break;
    }

    setQrText(formattedData);
    setQrOptions(prev => ({ ...prev, data: formattedData }));
  };

  // Handle logo image upload
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageDataUrl = e.target?.result as string;
      setLogoImage(imageDataUrl);
      
      // Update QR code options with the logo
      setQrOptions(prev => ({
        ...prev,
        image: imageDataUrl,
        imageOptions: {
          ...prev.imageOptions,
          hideBackgroundDots: true,
          imageSize: 0.3,
          margin: 10,
          crossOrigin: 'anonymous'
        }
      }));
    };
    reader.readAsDataURL(file);
  };

  // Remove logo
  const removeLogo = () => {
    setLogoImage(null);
    setQrOptions(prev => {
      const updatedOptions = { ...prev };
      delete updatedOptions.image;
      return updatedOptions;
    });
  };

  // Handle QR code style changes
  const updateQRStyle = (property: string, value: any) => {
    setQrOptions(prev => {
      const newOptions = { ...prev };
      
      switch (property) {
        case 'size':
          newOptions.width = value;
          newOptions.height = value;
          break;
        case 'margin':
          newOptions.margin = value;
          break;
        case 'errorCorrection':
          newOptions.qrOptions.errorCorrectionLevel = value;
          break;
        case 'dotsType':
          newOptions.dotsOptions.type = value;
          break;
        case 'dotsColor':
          if (usingGradient) {
            // Update gradient color stops
            if (newOptions.dotsOptions.gradient) {
              newOptions.dotsOptions.gradient.colorStops[0].color = value;
            }
          } else {
            newOptions.dotsOptions.color = value;
            if (newOptions.dotsOptions.gradient) {
              delete newOptions.dotsOptions.gradient;
            }
          }
          break;
        case 'cornersType':
          newOptions.cornersSquareOptions.type = value;
          break;
        case 'cornersColor':
          if (usingGradient) {
            // Update gradient color stops
            if (newOptions.cornersSquareOptions.gradient) {
              newOptions.cornersSquareOptions.gradient.colorStops[0].color = value;
            }
          } else {
            newOptions.cornersSquareOptions.color = value;
            if (newOptions.cornersSquareOptions.gradient) {
              delete newOptions.cornersSquareOptions.gradient;
            }
          }
          break;
        case 'cornersDotType':
          newOptions.cornersDotOptions.type = value;
          break;
        case 'cornersDotColor':
          if (usingGradient) {
            // Update gradient color stops
            if (newOptions.cornersDotOptions.gradient) {
              newOptions.cornersDotOptions.gradient.colorStops[0].color = value;
            }
          } else {
            newOptions.cornersDotOptions.color = value;
            if (newOptions.cornersDotOptions.gradient) {
              delete newOptions.cornersDotOptions.gradient;
            }
          }
          break;
        case 'backgroundColor':
          newOptions.backgroundOptions.color = value;
          break;
        case 'useGradient':
          setUsingGradient(value);
          if (value) {
            // Add gradient to all elements
            const colorStops = [
              { offset: 0, color: newOptions.dotsOptions.color || '#6366f1' },
              { offset: 1, color: '#8b5cf6' }
            ];
            
            newOptions.dotsOptions.gradient = {
              type: 'linear',
              rotation: 45,
              colorStops: [...colorStops]
            };
            
            newOptions.cornersSquareOptions.gradient = {
              type: 'linear',
              rotation: 45,
              colorStops: [...colorStops]
            };
            
            newOptions.cornersDotOptions.gradient = {
              type: 'linear',
              rotation: 45,
              colorStops: [...colorStops]
            };
          } else {
            // Remove all gradients
            const dotsColor = newOptions.dotsOptions.gradient?.colorStops[0].color || newOptions.dotsOptions.color;
            const cornersColor = newOptions.cornersSquareOptions.gradient?.colorStops[0].color || newOptions.cornersSquareOptions.color;
            const cornersDotColor = newOptions.cornersDotOptions.gradient?.colorStops[0].color || newOptions.cornersDotOptions.color;
            
            newOptions.dotsOptions.color = dotsColor;
            newOptions.cornersSquareOptions.color = cornersColor;
            newOptions.cornersDotOptions.color = cornersDotColor;
            
            delete newOptions.dotsOptions.gradient;
            delete newOptions.cornersSquareOptions.gradient;
            delete newOptions.cornersDotOptions.gradient;
          }
          break;
        case 'secondaryGradientColor':
          if (usingGradient) {
            // Update the second color stop in all gradients
            if (newOptions.dotsOptions.gradient) {
              newOptions.dotsOptions.gradient.colorStops[1].color = value;
            }
            if (newOptions.cornersSquareOptions.gradient) {
              newOptions.cornersSquareOptions.gradient.colorStops[1].color = value;
            }
            if (newOptions.cornersDotOptions.gradient) {
              newOptions.cornersDotOptions.gradient.colorStops[1].color = value;
            }
          }
          break;
        case 'gradientRotation':
          if (usingGradient) {
            // Update rotation in all gradients
            if (newOptions.dotsOptions.gradient) {
              newOptions.dotsOptions.gradient.rotation = value;
            }
            if (newOptions.cornersSquareOptions.gradient) {
              newOptions.cornersSquareOptions.gradient.rotation = value;
            }
            if (newOptions.cornersDotOptions.gradient) {
              newOptions.cornersDotOptions.gradient.rotation = value;
            }
          }
          break;
        case 'gradientType':
          if (usingGradient) {
            // Update type in all gradients
            const gradientType = value as 'linear' | 'radial';
            if (newOptions.dotsOptions.gradient) {
              newOptions.dotsOptions.gradient.type = gradientType;
            }
            if (newOptions.cornersSquareOptions.gradient) {
              newOptions.cornersSquareOptions.gradient.type = gradientType;
            }
            if (newOptions.cornersDotOptions.gradient) {
              newOptions.cornersDotOptions.gradient.type = gradientType;
            }
          }
          break;
        default:
          break;
      }
      
      return newOptions;
    });
  };

  // Apply template
  const applyTemplate = (templateIndex: number) => {
    if (templates[templateIndex]) {
      // Keep the current data and logo
      const currentData = qrOptions.data;
      const currentLogo = qrOptions.image;
      
      const newOptions = { ...templates[templateIndex].options, data: currentData };
      if (currentLogo) {
        newOptions.image = currentLogo;
      }
      
      setQrOptions(newOptions);
      setUsingGradient(!!newOptions.dotsOptions.gradient);
      
      toast({
        title: 'Template Applied',
        description: `Applied "${templates[templateIndex].name}" template`
      });
    }
  };

  // Download QR code
  const downloadQRCode = () => {
    if (!qrCode.current) return;
    
    const fileName = qrName || 'styled-qr-code';
    
    switch (downloadFormat) {
      case 'svg':
        qrCode.current.download({
          name: fileName,
          extension: 'svg'
        });
        break;
      case 'png':
        qrCode.current.download({
          name: fileName,
          extension: 'png'
        });
        break;
      case 'jpeg':
        qrCode.current.download({
          name: fileName,
          extension: 'jpeg'
        });
        break;
      default:
        qrCode.current.download({
          name: fileName,
          extension: 'svg'
        });
    }
    
    toast({
      title: 'QR Code Downloaded',
      description: `Your QR code has been downloaded as ${fileName}.${downloadFormat}`
    });
  };

  // Copy QR code as data URL
  const copyQRCodeAsDataURL = async () => {
    if (!qrCode.current) return;
    
    try {
      const dataUrl = await qrCode.current.getRawData('png');
      
      // Create a canvas to get the data URL
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        // Create a blob from the data URL
        canvas.toBlob(async (blob) => {
          if (blob) {
            // Create a ClipboardItem
            const item = new ClipboardItem({ 'image/png': blob });
            await navigator.clipboard.write([item]);
            
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            
            toast({
              title: 'Copied',
              description: 'QR code image copied to clipboard'
            });
          }
        });
      };
      
      img.src = dataUrl;
    } catch (error) {
      console.error('Failed to copy QR code:', error);
      toast({
        title: 'Copy Failed',
        description: 'Failed to copy QR code to clipboard',
        variant: 'destructive'
      });
    }
  };

  return (
    <PageContainer>
      <QrCodeStylerSEO />
      <PageHeader 
        title="QR Code Styler" 
        description="Create beautiful, customized QR codes for your business, events, or personal use"
      />
      
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* QR Code Preview */}
          <div className="lg:col-span-1 flex flex-col space-y-6">
            <Card className="p-6">
              <div className="text-xl font-bold mb-4 flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                Preview
              </div>
              
              <div className="flex flex-col items-center">
                <div 
                  ref={qrCodeRef} 
                  className="qr-code-container mb-4 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg p-4"
                ></div>
                
                <div className="w-full space-y-4">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="qr-name">File Name (for download)</Label>
                    <Input 
                      id="qr-name"
                      placeholder="styled-qr-code"
                      value={qrName}
                      onChange={(e) => setQrName(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Label>Download Format</Label>
                    <div className="flex space-x-2">
                      <Button 
                        variant={downloadFormat === 'svg' ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setDownloadFormat('svg')}
                      >
                        SVG
                      </Button>
                      <Button 
                        variant={downloadFormat === 'png' ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setDownloadFormat('png')}
                      >
                        PNG
                      </Button>
                      <Button 
                        variant={downloadFormat === 'jpeg' ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setDownloadFormat('jpeg')}
                      >
                        JPEG
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button className="flex-1 gap-2" onClick={downloadQRCode}>
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="outline" className="gap-2" onClick={copyQRCodeAsDataURL}>
                      {copied ? (
                        <>
                          <CheckCheck className="h-4 w-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Clipboard className="h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Templates */}
            <Card className="p-6">
              <div className="text-xl font-bold mb-4 flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Templates
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {templates.map((template, index) => (
                  <Button 
                    key={index}
                    variant="outline"
                    className="h-auto p-4 flex flex-col"
                    onClick={() => applyTemplate(index)}
                  >
                    <span className="text-sm font-medium mb-1">{template.name}</span>
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-md m-1 flex items-center justify-center">
                      <div className="w-12 h-12 opacity-70">
                        <QrCode size={48} />
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </Card>
          </div>
          
          {/* QR Code Content & Styling */}
          <div className="lg:col-span-2 flex flex-col space-y-6">
            {/* Content */}
            <Card className="p-6">
              <div className="text-xl font-bold mb-4 flex items-center gap-2">
                <PencilRuler className="h-5 w-5" />
                QR Code Content
              </div>
              
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ContentType)}>
                <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-4">
                  <TabsTrigger value="text" className="text-xs sm:text-sm flex items-center justify-center gap-1">
                    Text
                  </TabsTrigger>
                  <TabsTrigger value="url" className="text-xs sm:text-sm flex items-center justify-center gap-1">
                    <LinkIcon className="h-3 w-3 hidden sm:block" />
                    URL
                  </TabsTrigger>
                  <TabsTrigger value="email" className="text-xs sm:text-sm flex items-center justify-center gap-1">
                    <Mail className="h-3 w-3 hidden sm:block" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="phone" className="text-xs sm:text-sm flex items-center justify-center gap-1">
                    <Phone className="h-3 w-3 hidden sm:block" />
                    Phone
                  </TabsTrigger>
                  <TabsTrigger value="wifi" className="text-xs sm:text-sm flex items-center justify-center gap-1">
                    <Wifi className="h-3 w-3 hidden sm:block" />
                    WiFi
                  </TabsTrigger>
                  <TabsTrigger value="location" className="text-xs sm:text-sm flex items-center justify-center gap-1">
                    <MapPin className="h-3 w-3 hidden sm:block" />
                    Location
                  </TabsTrigger>
                  <TabsTrigger value="vcard" className="text-xs sm:text-sm flex items-center justify-center gap-1">
                    <Smartphone className="h-3 w-3 hidden sm:block" />
                    vCard
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="text" className="space-y-4">
                  <Textarea 
                    placeholder="Enter text content" 
                    onChange={(e) => handleContentChange('text', e.target.value)}
                  />
                </TabsContent>
                
                <TabsContent value="url" className="space-y-4">
                  <Input 
                    placeholder="example.com or https://example.com" 
                    defaultValue="lovable.dev"
                    onChange={(e) => handleContentChange('url', e.target.value)}
                  />
                </TabsContent>
                
                <TabsContent value="email" className="space-y-4">
                  <Input 
                    placeholder="example@email.com" 
                    onChange={(e) => handleContentChange('email', e.target.value)}
                  />
                </TabsContent>
                
                <TabsContent value="phone" className="space-y-4">
                  <Input 
                    placeholder="+1234567890" 
                    onChange={(e) => handleContentChange('phone', e.target.value)}
                  />
                </TabsContent>
                
                <TabsContent value="wifi" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="wifi-ssid">Network Name (SSID)</Label>
                      <Input 
                        id="wifi-ssid" 
                        placeholder="WiFi Network Name" 
                        onChange={() => handleContentChange('wifi', '')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wifi-password">Password</Label>
                      <Input 
                        id="wifi-password" 
                        type="password"
                        placeholder="WiFi Password" 
                        onChange={() => handleContentChange('wifi', '')}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wifi-encryption">Security Type</Label>
                    <Select 
                      defaultValue="WPA" 
                      onValueChange={() => handleContentChange('wifi', '')}
                    >
                      <SelectTrigger id="wifi-encryption">
                        <SelectValue placeholder="Security Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WPA">WPA/WPA2</SelectItem>
                        <SelectItem value="WEP">WEP</SelectItem>
                        <SelectItem value="nopass">No Password</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
                
                <TabsContent value="location" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location-lat">Latitude</Label>
                      <Input 
                        id="location-lat" 
                        placeholder="40.7128" 
                        onChange={() => handleContentChange('location', '')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location-lon">Longitude</Label>
                      <Input 
                        id="location-lon" 
                        placeholder="-74.0060" 
                        onChange={() => handleContentChange('location', '')}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="vcard" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vcard-name">Full Name</Label>
                      <Input 
                        id="vcard-name" 
                        placeholder="John Doe" 
                        onChange={() => handleContentChange('vcard', '')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vcard-org">Organization</Label>
                      <Input 
                        id="vcard-org" 
                        placeholder="Company Name" 
                        onChange={() => handleContentChange('vcard', '')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vcard-phone">Phone</Label>
                      <Input 
                        id="vcard-phone" 
                        placeholder="+1234567890" 
                        onChange={() => handleContentChange('vcard', '')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vcard-email">Email</Label>
                      <Input 
                        id="vcard-email" 
                        placeholder="john@example.com" 
                        onChange={() => handleContentChange('vcard', '')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vcard-website">Website</Label>
                      <Input 
                        id="vcard-website" 
                        placeholder="example.com" 
                        onChange={() => handleContentChange('vcard', '')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vcard-address">Address</Label>
                      <Input 
                        id="vcard-address" 
                        placeholder="123 Street, City, Country" 
                        onChange={() => handleContentChange('vcard', '')}
                      />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => handleContentChange('vcard', '')}>
                    Generate vCard
                  </Button>
                </TabsContent>
              </Tabs>
            </Card>
            
            {/* Logo */}
            <Card className="p-6">
              <div className="text-xl font-bold mb-4 flex items-center gap-2">
                <Image className="h-5 w-5" />
                Add Logo
              </div>
              
              <div className="space-y-4">
                {logoImage ? (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-24 h-24 border rounded-lg overflow-hidden">
                      <img src={logoImage} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={removeLogo}>
                        Remove Logo
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Click to upload your logo
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      PNG, JPG, SVG up to 2MB
                    </p>
                  </div>
                )}
                
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
                
                {logoImage && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Logo Size</Label>
                      <Slider
                        value={[qrOptions.imageOptions?.imageSize ? qrOptions.imageOptions.imageSize * 100 : 30]}
                        min={10}
                        max={50}
                        step={1}
                        onValueChange={(value) => {
                          setQrOptions(prev => ({
                            ...prev,
                            imageOptions: {
                              ...prev.imageOptions,
                              imageSize: value[0] / 100
                            }
                          }));
                        }}
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Small</span>
                        <span>Large</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
            
            {/* Styling */}
            <Card className="p-6">
              <div className="text-xl font-bold mb-4 flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Style Options
              </div>
              
              <Tabs defaultValue="general">
                <TabsList className="mb-4">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="dots">Dots</TabsTrigger>
                  <TabsTrigger value="corners">Corners</TabsTrigger>
                  <TabsTrigger value="colors">Colors</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general" className="space-y-6">
                  <div className="space-y-2">
                    <Label>QR Code Size</Label>
                    <Slider
                      value={[qrOptions.width]}
                      min={100}
                      max={500}
                      step={10}
                      onValueChange={(value) => updateQRStyle('size', value[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Small (100px)</span>
                      <span>Large (500px)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Margin</Label>
                    <Slider
                      value={[qrOptions.margin]}
                      min={0}
                      max={40}
                      step={5}
                      onValueChange={(value) => updateQRStyle('margin', value[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>None</span>
                      <span>Large</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="error-correction">Error Correction Level</Label>
                    <Select 
                      value={qrOptions.qrOptions.errorCorrectionLevel}
                      onValueChange={(value) => updateQRStyle('errorCorrection', value)}
                    >
                      <SelectTrigger id="error-correction">
                        <SelectValue placeholder="Error Correction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="L">Low (7%)</SelectItem>
                        <SelectItem value="M">Medium (15%)</SelectItem>
                        <SelectItem value="Q">Quartile (25%)</SelectItem>
                        <SelectItem value="H">High (30%)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      Higher correction levels make QR codes more reliable but denser.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="dots" className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="dots-style">Dots Style</Label>
                    <Select 
                      value={qrOptions.dotsOptions.type}
                      onValueChange={(value) => updateQRStyle('dotsType', value)}
                    >
                      <SelectTrigger id="dots-style">
                        <SelectValue placeholder="Dots Style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="square">Square</SelectItem>
                        <SelectItem value="dots">Dots</SelectItem>
                        <SelectItem value="rounded">Rounded</SelectItem>
                        <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
                        <SelectItem value="classy">Classy</SelectItem>
                        <SelectItem value="classy-rounded">Classy Rounded</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dots-color">Dots Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="dots-color"
                        type="color"
                        value={usingGradient 
                          ? qrOptions.dotsOptions.gradient?.colorStops[0].color || '#6366f1'
                          : qrOptions.dotsOptions.color}
                        className="w-16 h-10 p-1"
                        onChange={(e) => updateQRStyle('dotsColor', e.target.value)}
                      />
                      <Input 
                        value={usingGradient 
                          ? qrOptions.dotsOptions.gradient?.colorStops[0].color || '#6366f1'
                          : qrOptions.dotsOptions.color}
                        className="flex-1"
                        onChange={(e) => updateQRStyle('dotsColor', e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="corners" className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="corners-style">Corner Squares Style</Label>
                    <Select 
                      value={qrOptions.cornersSquareOptions.type}
                      onValueChange={(value) => updateQRStyle('cornersType', value)}
                    >
                      <SelectTrigger id="corners-style">
                        <SelectValue placeholder="Corner Style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="square">Square</SelectItem>
                        <SelectItem value="dot">Dot</SelectItem>
                        <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="corners-color">Corner Squares Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="corners-color"
                        type="color"
                        value={usingGradient 
                          ? qrOptions.cornersSquareOptions.gradient?.colorStops[0].color || '#8b5cf6'
                          : qrOptions.cornersSquareOptions.color}
                        className="w-16 h-10 p-1"
                        onChange={(e) => updateQRStyle('cornersColor', e.target.value)}
                      />
                      <Input 
                        value={usingGradient 
                          ? qrOptions.cornersSquareOptions.gradient?.colorStops[0].color || '#8b5cf6'
                          : qrOptions.cornersSquareOptions.color}
                        className="flex-1"
                        onChange={(e) => updateQRStyle('cornersColor', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="corner-dots-style">Corner Dots Style</Label>
                    <Select 
                      value={qrOptions.cornersDotOptions.type}
                      onValueChange={(value) => updateQRStyle('cornersDotType', value)}
                    >
                      <SelectTrigger id="corner-dots-style">
                        <SelectValue placeholder="Corner Dots Style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="square">Square</SelectItem>
                        <SelectItem value="dot">Dot</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="corner-dots-color">Corner Dots Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="corner-dots-color"
                        type="color"
                        value={usingGradient 
                          ? qrOptions.cornersDotOptions.gradient?.colorStops[0].color || '#6366f1'
                          : qrOptions.cornersDotOptions.color}
                        className="w-16 h-10 p-1"
                        onChange={(e) => updateQRStyle('cornersDotColor', e.target.value)}
                      />
                      <Input 
                        value={usingGradient 
                          ? qrOptions.cornersDotOptions.gradient?.colorStops[0].color || '#6366f1'
                          : qrOptions.cornersDotOptions.color}
                        className="flex-1"
                        onChange={(e) => updateQRStyle('cornersDotColor', e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="colors" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="use-gradient">Use Gradient</Label>
                    <Switch
                      id="use-gradient"
                      checked={usingGradient}
                      onCheckedChange={(checked) => updateQRStyle('useGradient', checked)}
                    />
                  </div>
                  
                  {usingGradient && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="gradient-type">Gradient Type</Label>
                        <Select 
                          value={qrOptions.dotsOptions.gradient?.type || 'linear'}
                          onValueChange={(value: 'linear' | 'radial') => updateQRStyle('gradientType', value)}
                        >
                          <SelectTrigger id="gradient-type">
                            <SelectValue placeholder="Gradient Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="linear">Linear</SelectItem>
                            <SelectItem value="radial">Radial</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Gradient Rotation</Label>
                        <Slider
                          value={[qrOptions.dotsOptions.gradient?.rotation || 0]}
                          min={0}
                          max={360}
                          step={15}
                          onValueChange={(value) => updateQRStyle('gradientRotation', value[0])}
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>0°</span>
                          <span>360°</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="secondary-gradient-color">Secondary Gradient Color</Label>
                        <div className="flex space-x-2">
                          <Input
                            id="secondary-gradient-color"
                            type="color"
                            value={qrOptions.dotsOptions.gradient?.colorStops[1]?.color || '#8b5cf6'}
                            className="w-16 h-10 p-1"
                            onChange={(e) => updateQRStyle('secondaryGradientColor', e.target.value)}
                          />
                          <Input 
                            value={qrOptions.dotsOptions.gradient?.colorStops[1]?.color || '#8b5cf6'}
                            className="flex-1"
                            onChange={(e) => updateQRStyle('secondaryGradientColor', e.target.value)}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="background-color">Background Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="background-color"
                        type="color"
                        value={qrOptions.backgroundOptions.color}
                        className="w-16 h-10 p-1"
                        onChange={(e) => updateQRStyle('backgroundColor', e.target.value)}
                      />
                      <Input 
                        value={qrOptions.backgroundOptions.color}
                        className="flex-1"
                        onChange={(e) => updateQRStyle('backgroundColor', e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default QrCodeStyler;
