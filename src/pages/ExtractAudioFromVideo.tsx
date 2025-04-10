
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Download } from 'lucide-react';
import BackButton from '@/components/BackButton';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UploadBox from '@/components/UploadBox';
import ExtractAudioFromVideoSEO from '@/components/SEO/ExtractAudioFromVideoSEO';

const ExtractAudioFromVideo = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (files: FileList) => {
    const file = files[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setVideoFile(file);
        setOutputUrl(null);
        setProgress(0);
        
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
      
      // Create audio context
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Set up media element source
      const mediaElement = document.createElement('video');
      mediaElement.src = videoURL;
      await mediaElement.play();
      mediaElement.pause();
      
      // Create media element source
      const mediaSource = audioContext.createMediaElementSource(mediaElement);
      
      // Create a media stream destination
      const destination = audioContext.createMediaStreamDestination();
      
      // Connect the media source to the destination
      mediaSource.connect(destination);
      
      // Create a media recorder to record the audio stream
      const mediaRecorder = new MediaRecorder(destination.stream);
      const audioChunks: Blob[] = [];
      
      // Set up event listeners for the media recorder
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };
      
      mediaRecorder.onstart = () => {
        mediaElement.currentTime = 0;
        mediaElement.play();
      };
      
      // Progress tracking
      const duration = mediaElement.duration || 0;
      const updateProgress = () => {
        if (mediaElement.currentTime && duration) {
          const newProgress = Math.min(100, Math.round((mediaElement.currentTime / duration) * 100));
          setProgress(newProgress);
        }
        
        if (mediaElement.currentTime < duration) {
          requestAnimationFrame(updateProgress);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        setOutputUrl(audioUrl);
        setIsProcessing(false);
        setProgress(100);
        
        // Set the audio source for playback
        if (audioRef.current) {
          audioRef.current.src = audioUrl;
        }
        
        toast({
          title: "Audio extracted successfully",
          description: "Your audio file is ready to play and download",
          variant: "default",
        });
      };
      
      // Start recording
      mediaRecorder.start();
      updateProgress();
      
      // Listen for the end of the video
      mediaElement.onended = () => {
        mediaRecorder.stop();
        mediaElement.onended = null;
      };
      
    } catch (error) {
      console.error('Audio extraction error:', error);
      setIsProcessing(false);
      setProgress(0);
      
      toast({
        title: "Extraction failed",
        description: "There was an error extracting the audio. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleDownload = () => {
    if (outputUrl) {
      const a = document.createElement('a');
      a.href = outputUrl;
      a.download = `${videoFile?.name.split('.')[0] || 'audio'}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast({
        title: "Download started",
        description: "Your audio file will download shortly",
        variant: "default",
      });
    }
  };
  
  const handleReset = () => {
    if (videoRef.current) videoRef.current.src = '';
    if (audioRef.current) audioRef.current.src = '';
    
    if (outputUrl) {
      URL.revokeObjectURL(outputUrl);
    }
    
    setVideoFile(null);
    setOutputUrl(null);
    setProgress(0);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <ExtractAudioFromVideoSEO />
      <Header />
      
      <div className="container max-w-4xl mx-auto px-4 py-8 flex-grow">
        <BackButton />
        
        <h1 className="text-3xl font-bold mb-6">Extract Audio from Video</h1>
        <p className="mb-6 text-muted-foreground">
          Upload a video file and extract its audio track as an MP3 file.
        </p>
        
        <Card className="mb-6 shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Upload Video</CardTitle>
            <CardDescription>Select a video file to extract audio</CardDescription>
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
              {isProcessing ? `Processing ${progress}%` : 'Extract Audio'}
            </Button>
          </CardFooter>
        </Card>
        
        {outputUrl && (
          <Card className="shadow-md hover:shadow-lg transition-all duration-300">
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
              <Button 
                onClick={handleDownload}
                className="bg-gradient-primary hover:opacity-90 transition-colors"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Audio
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ExtractAudioFromVideo;
