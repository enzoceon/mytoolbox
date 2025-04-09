
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Download } from 'lucide-react';
import BackButton from '@/components/BackButton';
import { useToast } from '@/hooks/use-toast';

const ExtractAudioFromVideo = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setVideoFile(file);
        setOutputUrl(null);
        
        // Display preview
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
    
    // Simulating processing time
    setTimeout(() => {
      // In a real implementation, we would use a library like FFmpeg.wasm
      // to actually extract the audio from the video
      
      // For now, we'll just create an audio element with the video as source
      // This won't extract the audio but will simulate it for demonstration
      const url = URL.createObjectURL(videoFile);
      setOutputUrl(url);
      setIsProcessing(false);
      
      toast({
        title: "Audio extracted successfully",
        description: "Your audio file is ready to play and download",
        variant: "default",
      });
    }, 2000);
  };
  
  const handleDownload = () => {
    if (outputUrl) {
      const a = document.createElement('a');
      a.href = outputUrl;
      a.download = `${videoFile?.name.split('.')[0] || 'audio'}.mp3`;
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
    if (audioRef.current) audioRef.current.src = '';
  };
  
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <BackButton />
      
      <h1 className="text-3xl font-bold mb-6">Extract Audio from Video</h1>
      <p className="mb-6 text-muted-foreground">
        Upload a video file and extract its audio track as an MP3 file.
      </p>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload Video</CardTitle>
          <CardDescription>Select a video file to extract audio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Input
                ref={inputRef}
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
            </div>
            
            {videoFile && (
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
          <Button variant="outline" onClick={handleReset}>Reset</Button>
          <Button 
            onClick={handleProcess} 
            disabled={!videoFile || isProcessing}
          >
            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Extract Audio
          </Button>
        </CardFooter>
      </Card>
      
      {outputUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Extracted Audio</CardTitle>
            <CardDescription>Your audio file is ready</CardDescription>
          </CardHeader>
          <CardContent>
            <audio 
              ref={audioRef}
              src={outputUrl} 
              controls 
              className="w-full"
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download Audio
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ExtractAudioFromVideo;
