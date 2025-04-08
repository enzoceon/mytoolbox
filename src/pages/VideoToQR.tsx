
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileVideo, Download, AlertCircle, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from "sonner";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UploadBox from '@/components/UploadBox';
import BackButton from '@/components/BackButton';
import SpaceBackground from '@/components/SpaceBackground';

const VideoToQR = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
  const [qrSize, setQrSize] = useState(250);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [videoTooLarge, setVideoTooLarge] = useState(false);
  
  // Clean up URLs when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);
  
  const handleFileSelect = (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];
      
      // Check file type
      if (!file.type.startsWith('video/')) {
        toast.error('Please select a video file');
        return;
      }
      
      // Reset states
      setSelectedFile(file);
      setVideoTooLarge(false);
      setErrorMessage(null);
      setQrImageUrl(null);
      
      // Check file size (warn over 500KB, error over 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setVideoTooLarge(true);
        toast.error('Video is too large to encode in a QR code (max 2MB)');
      } else if (file.size > 500 * 1024) {
        toast.warning('Video is large and may result in a complex QR code');
      }
      
      // Create preview
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };
  
  const convertVideoToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };
  
  const generateQRCode = async () => {
    if (!selectedFile) {
      toast.error("Please select a video first");
      return;
    }
    
    if (videoTooLarge) {
      toast.error("Video is too large to encode in a QR code");
      return;
    }
    
    setIsGenerating(true);
    setErrorMessage(null);
    
    try {
      // Convert video to base64
      const base64Video = await convertVideoToBase64(selectedFile);
      
      // Generate QR code using Google Charts API
      const apiUrl = `https://chart.googleapis.com/chart?cht=qr&chs=${qrSize}x${qrSize}&chl=${encodeURIComponent(base64Video)}&choe=UTF-8&chld=L|0`;
      
      // Check if URL is too long
      if (apiUrl.length > 4096) {
        setErrorMessage("Video data is too large to encode in a QR code. Please use a smaller video or try compressing it first.");
        setQrImageUrl(null);
        setIsGenerating(false);
        return;
      }
      
      setQrImageUrl(apiUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
      setErrorMessage("Failed to generate QR code. Please try again with a different video.");
      setQrImageUrl(null);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleDownload = () => {
    if (!qrImageUrl) return;
    
    const link = document.createElement('a');
    link.href = qrImageUrl;
    link.download = `video-qr-code-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("QR Code downloaded successfully!");
  };
  
  const handleRemoveVideo = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setQrImageUrl(null);
    setErrorMessage(null);
    setVideoTooLarge(false);
  };

  return (
    <>
      <Helmet>
        <title>Video to QR Code - Convert Videos to QR | MyToolbox</title>
        <meta name="description" content="Convert small videos to QR codes. Great for sharing short clips, animations, and more." />
        <meta name="keywords" content="video to qr code, video converter, qr code generator, embed video in qr" />
      </Helmet>
      
      <SpaceBackground />
      <Header />
      
      <main className="container mx-auto px-4 py-10 min-h-screen">
        <BackButton />
        
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Video to QR Code</h1>
            <p className="text-lg text-muted-foreground">
              Convert small videos to scannable QR codes
            </p>
          </div>
          
          <Alert className="bg-amber-500/10 text-amber-500 border-amber-500/20">
            <Info className="h-4 w-4" />
            <AlertTitle>Size Limitations</AlertTitle>
            <AlertDescription>
              Only very small videos (under 2MB) can be encoded into QR codes. For best results, 
              use videos under 500KB. We recommend short, low resolution clips.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card/50 backdrop-blur border-border">
              <CardContent className="pt-6 space-y-6">
                {!selectedFile ? (
                  <UploadBox
                    title="Upload your video"
                    subtitle="Select a very small video to convert to QR code (MP4, WEBM, GIF)"
                    acceptedFileTypes="video/*"
                    onFileSelect={handleFileSelect}
                    multiple={false}
                  />
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>Selected Video</Label>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={handleRemoveVideo}
                        >
                          Remove
                        </Button>
                      </div>
                      <div className="border rounded-lg overflow-hidden bg-background/50">
                        <video 
                          src={previewUrl || ''} 
                          controls
                          className="w-full h-auto max-h-64 object-contain"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
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
                    
                    <Button 
                      className="w-full"
                      onClick={generateQRCode}
                      disabled={isGenerating || videoTooLarge}
                    >
                      {isGenerating ? 'Generating...' : 'Generate QR Code'}
                    </Button>
                    
                    {errorMessage && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errorMessage}</AlertDescription>
                      </Alert>
                    )}
                    
                    {videoTooLarge && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          This video exceeds the 2MB size limit for QR code encoding. 
                          Please select a smaller video or compress your video first.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
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
                      />
                    </div>
                    
                    <Button onClick={handleDownload} className="gap-2">
                      <Download size={16} />
                      Download QR Code
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground">
                      Note: This QR code contains the entire video data. When scanned, most QR code 
                      readers will allow you to view the video. Complex or large videos may result 
                      in QR codes that are difficult to scan.
                    </p>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <FileVideo size={100} className="text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">
                      Upload a small video and generate a QR code to see the result here
                    </p>
                    <p className="text-xs text-muted-foreground max-w-md">
                      Only very small videos work well in QR codes. For best results, use short 
                      videos with low resolution.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-card/30 backdrop-blur rounded-lg p-6 border border-border/50">
            <h2 className="text-xl font-semibold mb-4">About Video to QR Code</h2>
            <div className="space-y-4 text-sm">
              <p>
                This tool embeds your video data directly within a QR code. When scanned, compatible QR code readers 
                will display or allow you to access the embedded video.
              </p>
              <p>
                <strong>Important notes:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Only very small videos (under 2MB) can be encoded in QR codes</li>
                <li>Best results come from videos under 500KB</li>
                <li>We recommend using short, low-resolution videos</li>
                <li>All processing happens in your browser - your videos are never uploaded to our servers</li>
                <li>Not all QR code scanners support embedded video playback</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default VideoToQR;
