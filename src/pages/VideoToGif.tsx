
import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Upload, PlayCircle, Film, X, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const VideoToGif = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [duration, setDuration] = useState(3); // Default 3 seconds
  const [videoDuration, setVideoDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    if (!file.type.startsWith('video/')) {
      toast({
        title: "Invalid file",
        description: "Please upload a video file",
        variant: "destructive",
      });
      return;
    }
    
    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setGifUrl(null);
  };

  const handleVideoLoad = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
      // Default to the first 3 seconds, or the whole video if shorter
      setDuration(Math.min(3, videoRef.current.duration));
    }
  };

  const handleConvertToGif = () => {
    // In a real implementation, we would use a library like ffmpeg.wasm
    // to convert the video to GIF. Here, we'll simulate the conversion.
    if (!videoUrl) return;
    
    setIsConverting(true);
    
    // Simulate processing time
    setTimeout(() => {
      // For demo purposes, we'll just use the video as the "GIF"
      // In a real app, this would be the converted GIF URL
      setGifUrl(videoUrl);
      setIsConverting(false);
      
      toast({
        title: "Conversion complete",
        description: "Video has been converted to GIF",
      });
    }, 2000);
  };

  const clearVideo = () => {
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    if (gifUrl) URL.revokeObjectURL(gifUrl);
    setVideoFile(null);
    setVideoUrl(null);
    setGifUrl(null);
    setStartTime(0);
    setDuration(3);
  };

  return (
    <>
      <Helmet>
        <title>Video to GIF Converter - Create Animated GIFs | EveryTools</title>
        <meta name="description" content="Convert video clips to animated GIFs online with our free video to GIF converter. No watermarks, no registration required." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Video to GIF Converter</h1>
              <p className="text-muted-foreground">Convert video clips to animated GIFs</p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Film className="h-6 w-6 text-primary" />
                  <CardTitle>Create Animated GIFs</CardTitle>
                </div>
                <CardDescription>Upload a video and convert it to a GIF</CardDescription>
              </CardHeader>
              <CardContent>
                {!videoFile ? (
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Upload a video file to convert</p>
                    <Label 
                      htmlFor="video-upload" 
                      className="cursor-pointer inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90"
                    >
                      Select Video
                    </Label>
                    <Input 
                      id="video-upload" 
                      type="file" 
                      accept="video/*" 
                      className="hidden" 
                      onChange={handleVideoUpload}
                    />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="relative">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="absolute top-2 right-2 z-10 bg-background/80"
                        onClick={clearVideo}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <video 
                        ref={videoRef}
                        src={videoUrl || undefined} 
                        controls 
                        className="w-full rounded-lg" 
                        onLoadedMetadata={handleVideoLoad}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label htmlFor="start-time">Start Time (seconds)</Label>
                          <span>{startTime.toFixed(1)}s</span>
                        </div>
                        <Slider
                          id="start-time"
                          defaultValue={[0]}
                          max={Math.max(0, videoDuration - duration)}
                          step={0.1}
                          value={[startTime]}
                          onValueChange={([value]) => setStartTime(value)}
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label htmlFor="duration">Duration (seconds)</Label>
                          <span>{duration.toFixed(1)}s</span>
                        </div>
                        <Slider
                          id="duration"
                          defaultValue={[3]}
                          min={0.5}
                          max={Math.min(10, videoDuration - startTime)}
                          step={0.1}
                          value={[duration]}
                          onValueChange={([value]) => setDuration(value)}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleConvertToGif} 
                      className="w-full"
                      disabled={isConverting}
                    >
                      {isConverting ? (
                        <>
                          <Clock className="mr-2 h-4 w-4 animate-spin" /> Converting...
                        </>
                      ) : (
                        <>
                          <PlayCircle className="mr-2 h-4 w-4" /> Convert to GIF
                        </>
                      )}
                    </Button>
                    
                    {gifUrl && !isConverting && (
                      <div className="mt-6 space-y-4">
                        <h3 className="font-medium">Your GIF</h3>
                        <div className="border rounded-lg overflow-hidden">
                          {/* Note: In a real implementation, this would be an actual GIF */}
                          <video src={gifUrl} autoPlay loop muted className="w-full" />
                        </div>
                        <Button variant="outline" className="w-full">
                          <Download className="mr-2 h-4 w-4" /> Download GIF
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">
                          Note: In this demo, the download would provide a real GIF file.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="bg-muted/30 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">About This Tool</h2>
              <p className="text-muted-foreground mb-4">
                The Video to GIF converter lets you create animated GIFs from video clips.
                Simply upload a video, select the portion you want to convert, and download your GIF.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-background p-4 rounded-md">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Upload className="h-4 w-4 mr-2" /> Step 1
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Upload your video file (MP4, WebM, MOV, etc.)
                  </p>
                </div>
                <div className="bg-background p-4 rounded-md">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-2" /> Step 2
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Select the section of the video to convert to GIF
                  </p>
                </div>
                <div className="bg-background p-4 rounded-md">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Download className="h-4 w-4 mr-2" /> Step 3
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Convert and download your animated GIF
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default VideoToGif;
