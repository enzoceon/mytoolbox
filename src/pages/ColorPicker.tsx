import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';
import { Button } from '@/components/ui/button';
import { 
  Palette, 
  Upload, 
  Pipette, 
  Trash2, 
  Copy, 
  Plus, 
  HistoryIcon as History,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";

interface SavedColor {
  id: string;
  hex: string;
  rgb: string;
  hsl: string;
  name: string;
}

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    
    h *= 60;
  }
  
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
};

const ColorPicker = () => {
  const [color, setColor] = useState<string>('#3b82f6');
  const [r, setR] = useState<number>(59);
  const [g, setG] = useState<number>(130);
  const [b, setB] = useState<number>(246);
  const [h, setH] = useState<number>(217);
  const [s, setS] = useState<number>(91);
  const [l, setL] = useState<number>(60);
  const [savedColors, setSavedColors] = useState<SavedColor[]>([]);
  const [colorName, setColorName] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('picker');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('savedColors');
    if (saved) {
      try {
        setSavedColors(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved colors');
      }
    }
  }, []);

  useEffect(() => {
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!result) return { r: 0, g: 0, b: 0 };
      
      return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      };
    };
    
    if (activeTab === 'picker') {
      const { r: newR, g: newG, b: newB } = hexToRgb(color);
      setR(newR);
      setG(newG);
      setB(newB);
      
      const { h: newH, s: newS, l: newL } = rgbToHsl(newR, newG, newB);
      setH(newH);
      setS(newS);
      setL(newL);
    }
  }, [color, activeTab]);

  useEffect(() => {
    if (activeTab === 'rgb') {
      const hexValue = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      setColor(hexValue);
      
      const { h: newH, s: newS, l: newL } = rgbToHsl(r, g, b);
      setH(newH);
      setS(newS);
      setL(newL);
    }
  }, [r, g, b, activeTab]);

  useEffect(() => {
    if (activeTab === 'hsl') {
      const hslToRgb = (h: number, s: number, l: number) => {
        h /= 360;
        s /= 100;
        l /= 100;
        
        let r, g, b;
        
        if (s === 0) {
          r = g = b = l; // achromatic
        } else {
          const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
          };
          
          const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          const p = 2 * l - q;
          
          r = hue2rgb(p, q, h + 1/3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1/3);
        }
        
        return {
          r: Math.round(r * 255),
          g: Math.round(g * 255),
          b: Math.round(b * 255)
        };
      };
      
      const { r: newR, g: newG, b: newB } = hslToRgb(h, s, l);
      setR(newR);
      setG(newG);
      setB(newB);
      
      const hexValue = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
      setColor(hexValue);
    }
  }, [h, s, l, activeTab]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    if (!file.type.match('image.*')) {
      toast.error('Please select an image file');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImageUrl(result);
      
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const maxWidth = canvas.width;
        const maxHeight = canvas.height;
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }
        
        if (height > maxHeight) {
          width = (maxHeight / height) * width;
          height = maxHeight;
        }
        
        const x = (maxWidth - width) / 2;
        const y = (maxHeight - height) / 2;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, width, height);
      };
      
      img.src = result;
    };
    
    reader.readAsDataURL(file);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const imageData = ctx.getImageData(x, y, 1, 1).data;
    const r = imageData[0];
    const g = imageData[1];
    const b = imageData[2];
    
    const hexValue = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    
    setColor(hexValue);
    setR(r);
    setG(g);
    setB(b);
    
    setActiveTab('picker');
    
    toast.success(`Color picked: ${hexValue}`);
  };

  const saveColor = () => {
    if (!color) return;
    
    const rgbValue = `rgb(${r}, ${g}, ${b})`;
    const hslValue = `hsl(${h}, ${s}%, ${l}%)`;
    const name = colorName || generateColorName(color);
    
    const newColor: SavedColor = {
      id: Date.now().toString(),
      hex: color,
      rgb: rgbValue,
      hsl: hslValue,
      name
    };
    
    const updatedColors = [...savedColors, newColor];
    setSavedColors(updatedColors);
    localStorage.setItem('savedColors', JSON.stringify(updatedColors));
    
    setColorName('');
    toast.success('Color saved!');
  };

  const generateColorName = (hex: string) => {
    const colors = [
      { name: 'Red', hue: 0 },
      { name: 'Orange', hue: 30 },
      { name: 'Yellow', hue: 60 },
      { name: 'Lime', hue: 90 },
      { name: 'Green', hue: 120 },
      { name: 'Teal', hue: 150 },
      { name: 'Cyan', hue: 180 },
      { name: 'Blue', hue: 240 },
      { name: 'Purple', hue: 270 },
      { name: 'Magenta', hue: 300 },
      { name: 'Pink', hue: 330 }
    ];
    
    const closestColor = colors.reduce((prev, curr) => {
      return Math.abs(curr.hue - h) < Math.abs(prev.hue - h) ? curr : prev;
    });
    
    let brightness = '';
    if (l < 30) brightness = 'Dark ';
    else if (l > 70) brightness = 'Light ';
    
    let saturation = '';
    if (s < 30) saturation = 'Muted ';
    
    return `${brightness}${saturation}${closestColor.name}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const deleteColor = (id: string) => {
    const updatedColors = savedColors.filter(color => color.id !== id);
    setSavedColors(updatedColors);
    localStorage.setItem('savedColors', JSON.stringify(updatedColors));
    toast.success('Color removed');
  };

  return (
    <>
      <Helmet>
        <title>Color Picker | Free Online Color Tool | EveryTools</title>
        <meta name="description" content="Pick colors from images, create custom color palettes, and convert between color formats. Free online color picker tool." />
      </Helmet>
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Color Picker</h1>
              <p className="text-muted-foreground">Pick colors from images and convert between formats</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="glass-card p-6 rounded-xl">
              <div className="mb-4 w-14 h-14 rounded-full bg-pink-500/20 flex items-center justify-center">
                <Palette className="h-8 w-8 text-pink-400" />
              </div>
              
              <h2 className="text-xl font-semibold mb-6">Color Selector</h2>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="mb-4">
                  <TabsTrigger value="picker">Color Picker</TabsTrigger>
                  <TabsTrigger value="image">From Image</TabsTrigger>
                  <TabsTrigger value="rgb">RGB</TabsTrigger>
                  <TabsTrigger value="hsl">HSL</TabsTrigger>
                </TabsList>
                
                <TabsContent value="picker">
                  <div className="space-y-4">
                    <div
                      className="w-full h-32 rounded-lg shadow-inner cursor-pointer"
                      style={{ backgroundColor: color }}
                    />
                    
                    <div>
                      <Label htmlFor="color-input">Hex Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="color-input"
                          type="text"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          className="font-mono"
                        />
                        <Input
                          type="color"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          className="w-14 p-1 h-10"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="image">
                  <div className="space-y-4">
                    {!imageUrl ? (
                      <div 
                        className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors h-48"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="mx-auto w-12 h-12 mb-4 text-muted-foreground">
                          <Upload className="h-12 w-12" />
                        </div>
                        <p className="text-base font-medium mb-2">Upload an image</p>
                        <p className="text-sm text-muted-foreground mb-4">
                          Click to select an image to pick colors from
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="relative">
                          <canvas 
                            ref={canvasRef} 
                            width={500} 
                            height={300} 
                            className="w-full h-auto rounded-lg cursor-crosshair border shadow-sm" 
                            onClick={handleCanvasClick}
                          />
                          
                          <div className="mt-2 flex items-center justify-between">
                            <p className="text-sm text-muted-foreground flex items-center">
                              <Pipette className="h-4 w-4 mr-1" />
                              Click on the image to pick a color
                            </p>
                            
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => {
                                setImageUrl(null);
                                if (fileInputRef.current) fileInputRef.current.value = '';
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Clear Image
                            </Button>
                          </div>
                        </div>
                        
                        <div
                          className="w-full h-16 rounded-lg shadow-inner"
                          style={{ backgroundColor: color }}
                        />
                        
                        <div className="text-center">
                          <p className="font-mono">{color}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="rgb">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label htmlFor="r-slider">Red: {r}</Label>
                      </div>
                      <Slider
                        id="r-slider"
                        min={0}
                        max={255}
                        step={1}
                        value={[r]}
                        onValueChange={(value) => setR(value[0])}
                        className="mb-6"
                      />
                      
                      <div className="flex justify-between mb-2">
                        <Label htmlFor="g-slider">Green: {g}</Label>
                      </div>
                      <Slider
                        id="g-slider"
                        min={0}
                        max={255}
                        step={1}
                        value={[g]}
                        onValueChange={(value) => setG(value[0])}
                        className="mb-6"
                      />
                      
                      <div className="flex justify-between mb-2">
                        <Label htmlFor="b-slider">Blue: {b}</Label>
                      </div>
                      <Slider
                        id="b-slider"
                        min={0}
                        max={255}
                        step={1}
                        value={[b]}
                        onValueChange={(value) => setB(value[0])}
                      />
                    </div>
                    
                    <div
                      className="w-full h-16 rounded-lg shadow-inner"
                      style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
                    />
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="rgb-value">RGB Value</Label>
                        <div className="flex">
                          <Input
                            id="rgb-value"
                            value={`rgb(${r}, ${g}, ${b})`}
                            readOnly
                            className="font-mono"
                          />
                          <Button 
                            variant="ghost" 
                            onClick={() => copyToClipboard(`rgb(${r}, ${g}, ${b})`)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="hex-value">Hex Value</Label>
                        <div className="flex">
                          <Input
                            id="hex-value"
                            value={color}
                            readOnly
                            className="font-mono"
                          />
                          <Button 
                            variant="ghost" 
                            onClick={() => copyToClipboard(color)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="hsl">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label htmlFor="h-slider">Hue: {h}°</Label>
                      </div>
                      <Slider
                        id="h-slider"
                        min={0}
                        max={360}
                        step={1}
                        value={[h]}
                        onValueChange={(value) => setH(value[0])}
                        className="mb-6"
                      />
                      
                      <div className="flex justify-between mb-2">
                        <Label htmlFor="s-slider">Saturation: {s}%</Label>
                      </div>
                      <Slider
                        id="s-slider"
                        min={0}
                        max={100}
                        step={1}
                        value={[s]}
                        onValueChange={(value) => setS(value[0])}
                        className="mb-6"
                      />
                      
                      <div className="flex justify-between mb-2">
                        <Label htmlFor="l-slider">Lightness: {l}%</Label>
                      </div>
                      <Slider
                        id="l-slider"
                        min={0}
                        max={100}
                        step={1}
                        value={[l]}
                        onValueChange={(value) => setL(value[0])}
                      />
                    </div>
                    
                    <div
                      className="w-full h-16 rounded-lg shadow-inner"
                      style={{ backgroundColor: `hsl(${h}, ${s}%, ${l}%)` }}
                    />
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="hsl-value">HSL Value</Label>
                        <div className="flex">
                          <Input
                            id="hsl-value"
                            value={`hsl(${h}, ${s}%, ${l}%)`}
                            readOnly
                            className="font-mono"
                          />
                          <Button 
                            variant="ghost" 
                            onClick={() => copyToClipboard(`hsl(${h}, ${s}%, ${l}%)`)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="hex-value-hsl">Hex Value</Label>
                        <div className="flex">
                          <Input
                            id="hex-value-hsl"
                            value={color}
                            readOnly
                            className="font-mono"
                          />
                          <Button 
                            variant="ghost" 
                            onClick={() => copyToClipboard(color)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="pt-6 border-t">
                <div className="flex gap-4 items-center mb-4">
                  <div
                    className="w-12 h-12 rounded-lg shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                  <div className="flex-grow">
                    <Input
                      placeholder="Color name (optional)"
                      value={colorName}
                      onChange={(e) => setColorName(e.target.value)}
                    />
                  </div>
                  <Button onClick={saveColor}>
                    <Plus className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => copyToClipboard(color)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Hex
                    </Button>
                  </div>
                  <div>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => copyToClipboard(`rgb(${r}, ${g}, ${b})`)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      RGB
                    </Button>
                  </div>
                  <div>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => copyToClipboard(`hsl(${h}, ${s}%, ${l}%)`)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      HSL
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <div className="mb-4 w-14 h-14 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <History className="h-8 w-8 text-indigo-400" />
              </div>
              
              <h2 className="text-xl font-semibold mb-6">Saved Colors</h2>
              
              {savedColors.length === 0 ? (
                <div className="text-center py-10 border border-dashed rounded-lg">
                  <Palette className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Your saved colors will appear here.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={saveColor}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Save Current Color
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {savedColors.map((savedColor) => (
                      <div 
                        key={savedColor.id} 
                        className="rounded-lg overflow-hidden border shadow-sm"
                      >
                        <div 
                          className="h-16 w-full"
                          style={{ backgroundColor: savedColor.hex }}
                        />
                        <div className="p-3">
                          <div className="flex justify-between items-center mb-2">
                            <p className="font-medium">{savedColor.name}</p>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0" 
                              onClick={() => deleteColor(savedColor.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-1 text-xs">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 justify-start px-1"
                              onClick={() => {
                                copyToClipboard(savedColor.hex);
                                setColor(savedColor.hex);
                                setActiveTab('picker');
                              }}
                            >
                              <span className="font-mono">{savedColor.hex}</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 justify-start px-1"
                              onClick={() => copyToClipboard(savedColor.rgb)}
                            >
                              <span>RGB</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 justify-start px-1"
                              onClick={() => copyToClipboard(savedColor.hsl)}
                            >
                              <span>HSL</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {savedColors.length > 0 && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setSavedColors([]);
                        localStorage.removeItem('savedColors');
                        toast.success('All saved colors cleared');
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear All Saved Colors
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto mt-12 glass-card p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">How to Use Color Picker</h2>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
              <li>Select a color using the color picker, RGB/HSL sliders, or by uploading an image.</li>
              <li>Pick colors directly from your uploaded images by clicking on them.</li>
              <li>Convert between HEX, RGB, and HSL color formats.</li>
              <li>Save your favorite colors with custom names for future reference.</li>
              <li>Copy color values to clipboard in different formats.</li>
            </ol>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ColorPicker;
