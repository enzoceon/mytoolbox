
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Download } from 'lucide-react';
import BackButton from '@/components/BackButton';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UploadBox from '@/components/UploadBox';
import RemoveAudioFromVideoSEO from '@/components/SEO/RemoveAudioFromVideoSEO';
import { Progress } from '@/components/ui/progress';

const RemoveAudioFromVideo = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const outputVideoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (files: FileList) => {
    const file = files[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setVideoFile(file);
        setOutputUrl(null);
        setProgress(0);
        
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
  
  const handleProcess = async () => {
    if (!videoFile) {
      toast({
        title: "No video selected",
        description: "Please upload a video file first",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    setProgress(0);
    
    try {
      // Create a URL from the video file
      const videoURL = URL.createObjectURL(videoFile);
      
      // Create a video element to load the source video
      const sourceVideo = document.createElement('video');
      sourceVideo.src = videoURL;
      
      // Wait for the video to be loaded
      await new Promise((resolve) => {
        sourceVideo.onloadedmetadata = resolve;
        sourceVideo.load();
      });
      
      // Create a canvas element to capture video frames
      const canvas = document.createElement('canvas');
      canvas.width = sourceVideo.videoWidth;
      canvas.height = sourceVideo.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Failed to get canvas context');
      }
      
      // Set up MediaRecorder to record from canvas
      const stream = canvas.captureStream();
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9',
      });
      
      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        
        setOutputUrl(url);
        setIsProcessing(false);
        setProgress(100);
        
        if (outputVideoRef.current) {
          outputVideoRef.current.src = url;
        }
        
        toast({
          title: "Audio removed successfully",
          description: "Your video is ready to download",
          variant: "default",
        });
      };
      
      // Start recording
      mediaRecorder.start();
      
      // Function to draw frames at the video's frame rate
      const drawFrame = () => {
        if (sourceVideo.ended || !isProcessing) {
          mediaRecorder.stop();
          return;
        }
        
        // Draw the current frame to the canvas
        ctx.drawImage(sourceVideo, 0, 0, canvas.width, canvas.height);
        
        // Update progress
        const currentProgress = Math.min(100, Math.round((sourceVideo.currentTime / sourceVideo.duration) * 100));
        setProgress(currentProgress);
        
        // Request the next frame
        requestAnimationFrame(drawFrame);
      };
      
      // Start playback and drawing frames
      sourceVideo.onplay = drawFrame;
      sourceVideo.play();
      
    } catch (error) {
      console.error('Remove audio error:', error);
      setIsProcessing(false);
      setProgress(0);
      
      toast({
        title: "Process failed",
        description: "There was an error removing the audio. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleDownload = () => {
    if (outputUrl) {
      const a = document.createElement('a');
      a.href = outputUrl;
      a.download = `no_audio_${videoFile?.name || 'video.webm'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast({
        title: "Download started",
        description: "Your video will download shortly",
        variant: "default",
      });
    }
  };
  
  const handleReset = () => {
    if (videoRef.current) videoRef.current.src = '';
    if (outputVideoRef.current) outputVideoRef.current.src = '';
    
    if (outputUrl) {
      URL.revokeObjectURL(outputUrl);
    }
    
    setVideoFile(null);
    setOutputUrl(null);
    setProgress(0);
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
          <CardFooter className="flex flex-col space-y-4 w-full">
            {isProcessing && (
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Processing video...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            )}
            <div className="flex justify-between w-full">
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
            </div>
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
                ref={outputVideoRef}
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
