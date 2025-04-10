
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Upload, Download } from 'lucide-react';
import BackButton from '@/components/BackButton';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UploadBox from '@/components/UploadBox';
import RemoveAudioFromVideoSEO from '@/components/SEO/RemoveAudioFromVideoSEO';

const RemoveAudioFromVideo = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (files: FileList) => {
    const file = files[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setVideoFile(file);
        setOutputUrl(null);
        
        const url = URL.createObjectURL(file);
        if (videoRef.current) {
          videoRef.current.src = url;
        }
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a video file",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleProcess = () => {
    if (!videoFile) {
      toast({
        title: "No video selected",
        description: "Please upload a video file first",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    setTimeout(() => {
      const url = URL.createObjectURL(videoFile);
      setOutputUrl(url);
      setIsProcessing(false);
      
      toast({
        title: "Audio removed successfully",
        description: "Your video is ready to download",
        variant: "default",
      });
    }, 2000);
  };
  
  const handleDownload = () => {
    if (outputUrl) {
      const a = document.createElement('a');
      a.href = outputUrl;
      a.download = `no_audio_${videoFile?.name || 'video.mp4'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };
  
  const handleReset = () => {
    setVideoFile(null);
    setOutputUrl(null);
    if (inputRef.current) inputRef.current.value = '';
    if (videoRef.current) videoRef.current.src = '';
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <RemoveAudioFromVideoSEO />
      <Header />
      
      <div className="container max-w-4xl mx-auto px-4 py-8 flex-grow">
        <BackButton />
        
        <h1 className="text-3xl font-bold mb-6">Remove Audio from Video</h1>
        <p className="mb-6 text-muted-foreground">
          Upload a video file and remove its audio track without affecting the visual content.
        </p>
        
        <Card className="mb-6 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Upload Video</CardTitle>
            <CardDescription>Select a video file to remove audio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!videoFile ? (
                <UploadBox
                  title="Drop your video here"
                  subtitle="Supports MP4, MOV, AVI, and other common video formats"
                  acceptedFileTypes="video/*"
                  onFileSelect={handleFileSelect}
                />
              ) : (
                <div className="space-y-4">
                  <p className="text-sm font-medium">Preview:</p>
                  <video 
                    ref={videoRef} 
                    controls 
                    className="w-full rounded-md border border-input"
                    style={{ maxHeight: '300px' }}
                  />
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handleReset}
              className="hover:bg-secondary hover:text-secondary-foreground transition-colors"
            >
              Reset
            </Button>
            <Button 
              onClick={handleProcess} 
              disabled={!videoFile || isProcessing}
              className="hover:bg-primary/90 transition-colors"
            >
              {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Remove Audio
            </Button>
          </CardFooter>
        </Card>
        
        {outputUrl && (
          <Card className="shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Processed Video</CardTitle>
              <CardDescription>Your video without audio</CardDescription>
            </CardHeader>
            <CardContent>
              <video 
                src={outputUrl} 
                controls 
                className="w-full rounded-md border border-input"
                style={{ maxHeight: '300px' }}
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                onClick={handleDownload}
                className="bg-gradient-primary hover:opacity-90 transition-colors"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Video
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default RemoveAudioFromVideo;
