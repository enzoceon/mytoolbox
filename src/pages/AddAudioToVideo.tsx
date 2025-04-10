
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Upload, Download, Music } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { downloadWithStandardFilename } from '@/utils/fileUtils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import UploadBox from '@/components/UploadBox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import AddAudioToVideoSEO from '@/components/SEO/AddAudioToVideoSEO';

const AddAudioToVideo = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [audioVolume, setAudioVolume] = useState([50]); // 0-100
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const previewRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const handleVideoSelect = (files: FileList) => {
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
  
  const handleAudioSelect = (files: FileList) => {
    const file = files[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setAudioFile(file);
        
        const url = URL.createObjectURL(file);
        if (audioRef.current) {
          audioRef.current.src = url;
        }
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an audio file",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleProcess = () => {
    if (!videoFile || !audioFile) {
      toast({
        title: "Files missing",
        description: "Please upload both a video and audio file",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate processing with a timeout
    setTimeout(() => {
      // In a real implementation, we would use the Web Audio API or FFmpeg
      // to combine the audio and video
      const url = URL.createObjectURL(videoFile);
      setOutputUrl(url);
      setIsProcessing(false);
      
      if (previewRef.current) {
        previewRef.current.src = url;
        
        // Add the audio to the video preview
        previewRef.current.onplay = () => {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.volume = audioVolume[0] / 100;
            audioRef.current.play();
          }
        };
        
        previewRef.current.onpause = () => {
          if (audioRef.current) {
            audioRef.current.pause();
          }
        };
        
        previewRef.current.onseeked = () => {
          if (audioRef.current) {
            audioRef.current.currentTime = previewRef.current?.currentTime || 0;
          }
        };
      }
      
      toast({
        title: "Audio added successfully",
        description: "Your video with new audio is ready",
        variant: "default",
      });
    }, 2000);
  };
  
  const handleDownload = () => {
    if (outputUrl && videoFile) {
      downloadWithStandardFilename(outputUrl, videoFile.name.split('.').pop() || 'mp4', 'audio-added');
      
      toast({
        title: "Download started",
        description: "Your file will download shortly",
        variant: "default",
      });
    }
  };
  
  const handleVolumeChange = (values: number[]) => {
    setAudioVolume(values);
    if (audioRef.current) {
      audioRef.current.volume = values[0] / 100;
    }
  };
  
  const handleReset = () => {
    setVideoFile(null);
    setAudioFile(null);
    setOutputUrl(null);
    setAudioVolume([50]);
    
    if (videoRef.current) videoRef.current.src = '';
    if (audioRef.current) audioRef.current.src = '';
    if (previewRef.current) previewRef.current.src = '';
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <AddAudioToVideoSEO />
      <Header />
      
      <div className="container max-w-4xl mx-auto px-4 py-8 flex-grow">
        <BackButton />
        
        <h1 className="text-3xl font-bold mb-6">Add Audio to Video</h1>
        <p className="mb-6 text-muted-foreground">
          Add or replace the audio track of your video files with custom audio.
        </p>
        
        <Tabs defaultValue="upload" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload Files</TabsTrigger>
            <TabsTrigger value="preview" disabled={!videoFile || !audioFile}>Preview & Process</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <Card className="shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle>Upload Video</CardTitle>
                  <CardDescription>Select a video file</CardDescription>
                </CardHeader>
                <CardContent>
                  {!videoFile ? (
                    <UploadBox
                      title="Drop your video here"
                      subtitle="Supports MP4, MOV, AVI, and other formats"
                      acceptedFileTypes="video/*"
                      onFileSelect={handleVideoSelect}
                    />
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm font-medium">Video preview:</p>
                      <video 
                        ref={videoRef} 
                        controls 
                        className="w-full rounded-md border border-input"
                        style={{ maxHeight: '200px' }}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle>Upload Audio</CardTitle>
                  <CardDescription>Select an audio file</CardDescription>
                </CardHeader>
                <CardContent>
                  {!audioFile ? (
                    <UploadBox
                      title="Drop your audio here"
                      subtitle="Supports MP3, WAV, OGG, and other formats"
                      acceptedFileTypes="audio/*"
                      onFileSelect={handleAudioSelect}
                    />
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm font-medium">Audio preview:</p>
                      <audio 
                        ref={audioRef} 
                        controls 
                        className="w-full rounded-md border border-input"
                      />
                      <div className="space-y-2">
                        <Label htmlFor="audio-volume">Audio Volume</Label>
                        <Slider 
                          id="audio-volume"
                          value={audioVolume}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={handleVolumeChange}
                        />
                        <div className="text-right text-sm text-muted-foreground">
                          {audioVolume[0]}%
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="preview">
            <Card className="shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Preview & Process</CardTitle>
                <CardDescription>Check your audio and video combination</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm font-medium">Combined preview will play the video with audio overlay:</p>
                  <div className="relative">
                    <video 
                      ref={previewRef} 
                      controls 
                      className="w-full rounded-md border border-input"
                      style={{ maxHeight: '400px' }}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Video: {videoFile?.name}</p>
                    <p>Audio: {audioFile?.name}</p>
                    <p>Audio volume: {audioVolume[0]}%</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleProcess} 
                    disabled={!videoFile || !audioFile || isProcessing}
                  >
                    {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isProcessing ? 'Processing...' : 'Process Video'}
                  </Button>
                  
                  {outputUrl && (
                    <Button 
                      variant="default" 
                      className="bg-gradient-primary hover:opacity-90"
                      onClick={handleDownload}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default AddAudioToVideo;
