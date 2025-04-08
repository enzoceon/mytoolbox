
import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Crop, Download, Upload } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const ImageCropper = () => {
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [cropRatio, setCropRatio] = useState('1:1');
  const imageRef = useRef<HTMLImageElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid file type',
          description: 'Please upload an image file',
          variant: 'destructive',
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setCroppedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    if (!image || !imageRef.current) {
      toast({
        title: 'No image to crop',
        description: 'Please upload an image first',
        variant: 'destructive',
      });
      return;
    }
    
    // For now this is just a placeholder. In a real implementation,
    // we would use a library like react-image-crop to handle the cropping
    toast({
      title: 'Coming Soon',
      description: 'Image cropping functionality will be available soon!',
    });
    
    // Placeholder for cropped image (using the original for now)
    setCroppedImage(image);
  };

  const downloadImage = () => {
    if (croppedImage) {
      const link = document.createElement('a');
      link.href = croppedImage;
      link.download = 'cropped-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <Helmet>
        <title>Image Cropper - Resize Images Online | EveryTools</title>
        <meta name="description" content="Crop and resize your images to custom dimensions or popular formats like square, 16:9, 4:3, and more." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Image Cropper</h1>
              <p className="text-muted-foreground">Crop images to custom or preset dimensions like square or 16:9</p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Crop className="h-6 w-6 text-primary" />
                  <CardTitle>Upload and Crop</CardTitle>
                </div>
                <CardDescription>Select an image to crop to your desired dimensions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="image-upload">Upload Image</Label>
                    <div className="mt-2 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer" onClick={() => document.getElementById('image-upload')?.click()}>
                      <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-2 text-sm text-muted-foreground">
                          Click to upload or drag and drop
                        </div>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                      <input
                        id="image-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>

                  {image && (
                    <>
                      <div>
                        <Label htmlFor="crop-ratio">Crop Ratio</Label>
                        <Select
                          value={cropRatio}
                          onValueChange={setCropRatio}
                        >
                          <SelectTrigger id="crop-ratio">
                            <SelectValue placeholder="Select a ratio" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1:1">1:1 (Square)</SelectItem>
                            <SelectItem value="4:3">4:3</SelectItem>
                            <SelectItem value="16:9">16:9</SelectItem>
                            <SelectItem value="3:2">3:2</SelectItem>
                            <SelectItem value="2:3">2:3 (Portrait)</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex justify-center">
                        <div className="max-w-full max-h-[400px] overflow-hidden">
                          <img
                            ref={imageRef}
                            src={image}
                            alt="Source"
                            className="max-w-full max-h-[400px] object-contain"
                          />
                        </div>
                      </div>

                      <Button onClick={handleCrop} className="w-full">Crop Image</Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {croppedImage && (
              <Card>
                <CardHeader>
                  <CardTitle>Cropped Result</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mb-4">
                    <img
                      src={croppedImage}
                      alt="Cropped"
                      className="max-w-full max-h-[400px] object-contain"
                    />
                  </div>
                  <Button onClick={downloadImage} className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ImageCropper;
