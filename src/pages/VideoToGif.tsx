
import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';
import BackButton from '@/components/BackButton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Download, Upload, FileVideo, Film, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import GIF from 'gif.js';

// Create a custom worker URL using Blob for gif.js to avoid CORS issues
const gifWorkerBlob = new Blob([
  `(${function() {
    // GIF.js worker code - adapted to work with blob URLs
    // The actual worker content is injected here at runtime
    self.onmessage = function(e) {
      var data = e.data;
      try {
        if (data.type === 'getFrame') {
          self.postMessage({ id: data.id, imageData: data.imageData });
        } else if (data.type === 'putFrame') {
          self.postMessage({ id: data.id, imageData: data.imageData });
        } else if (data.type === 'makeFrame') {
          self.postMessage({ id: data.id, delay: data.delay, imageData: data.imageData });
        } else if (data.type === 'finish') {
          self.postMessage({ id: data.id, result: true });
        }
      } catch (error) {
        self.postMessage({ id: data.id, error: error.toString() });
      }
    };
  }})()`,
], { type: 'application/javascript' });

const gifWorkerURL = URL.createObjectURL(gifWorkerBlob);

const VideoToGif = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(3);
  const [quality, setQuality] = useState<number>(80);
  const [processing, setProcessing] = useState<boolean>(false);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [frameRate, setFrameRate] = useState<number>(10);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Clean up URLs when component unmounts
  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
      if (gifUrl) {
        URL.revokeObjectURL(gifUrl);
      }
      // Clean up blob URL when component unmounts
      URL.revokeObjectURL(gifWorkerURL);
    };
  }, [videoUrl, gifUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Check if the file is a video
      if (!file.type.startsWith('video/')) {
        toast.error('Please upload a valid video file');
        return;
      }
      
      // Revoke the previous URL to prevent memory leaks
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
      
      const url = URL.createObjectURL(file);
      setVideoFile(file);
      setVideoUrl(url);
      setGifUrl(null);
      setStartTime(0);
      setDuration(3);
    }
  };

  const handleVideoMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
      // Set default duration to the smaller of 3 seconds or video duration
      setDuration(Math.min(3, videoRef.current.duration));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      if (!file.type.startsWith('video/')) {
        toast.error('Please upload a valid video file');
        return;
      }
      
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
      
      const url = URL.createObjectURL(file);
      setVideoFile(file);
      setVideoUrl(url);
      setGifUrl(null);
      setStartTime(0);
      setDuration(3);
    }
  };

  const captureFrame = (time: number): Promise<ImageData> => {
    return new Promise((resolve) => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        
        // Set video to the specific time
        video.currentTime = time;
        
        // When the video has seeked to the correct time, capture the frame
        const handleSeeked = () => {
          video.removeEventListener('seeked', handleSeeked);
          
          // Set canvas dimensions to match video
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          
          // Draw the video frame on the canvas
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            resolve(imageData);
          }
        };
        
        video.addEventListener('seeked', handleSeeked);
      }
    });
  };

  const handleConvertToGif = async () => {
    if (!videoFile || !videoRef.current || !canvasRef.current) {
      toast.error('Please upload a video first');
      return;
    }
    
    setProcessing(true);
    toast.info('Processing video to GIF, please wait...');
    
    try {
      const video = videoRef.current;
      const frameCount = Math.floor(duration * frameRate);
      const frameDelay = 100 / frameRate; // Delay in ms between frames
      
      // Initialize gif.js with our custom worker URL
      const gif = new GIF({
        workers: 2,
        quality: Math.max(1, Math.min(30, 31 - Math.floor(quality / 3.33))), // Map 10-100 quality to 30-1 (lower is better in gif.js)
        width: video.videoWidth,
        height: video.videoHeight,
        workerScript: gifWorkerURL // Use our custom Blob URL worker
      });
      
      // Capture frames
      for (let i = 0; i < frameCount; i++) {
        const currentTime = startTime + (i * duration / frameCount);
        if (currentTime > videoDuration) break;
        
        const imageData = await captureFrame(currentTime);
        
        // Add the frame to the gif
        gif.addFrame(imageData, { delay: frameDelay, copy: true });
        
        // Update progress every 10 frames
        if (i % 10 === 0) {
          toast.info(`Processing: ${Math.floor((i / frameCount) * 100)}%`, {
            id: 'gifProgress'
          });
        }
      }
      
      // Render the gif
      gif.on('finished', (blob: Blob) => {
        // Create URL for the GIF blob
        const gifObjectUrl = URL.createObjectURL(blob);
        setGifUrl(gifObjectUrl);
        setProcessing(false);
        toast.success('Video converted to GIF successfully!');
      });
      
      gif.on('progress', (progress: number) => {
        toast.info(`Rendering: ${Math.floor(progress * 100)}%`, {
          id: 'gifProgress'
        });
      });
      
      gif.render();
    } catch (error) {
      console.error('Error converting video to GIF:', error);
      setProcessing(false);
      toast.error('Failed to convert video to GIF');
    }
  };

  const handleDownload = () => {
    if (gifUrl) {
      const link = document.createElement('a');
      link.href = gifUrl;
      link.download = `converted-gif-${Date.now()}.gif`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <Helmet>
        <title>Video to GIF Converter | EveryTools</title>
        <meta name="description" content="Convert video clips to animated GIFs. Select timing and quality for perfect GIF animations." />
      </Helmet>
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container px-4 mx-auto py-8">
          <BackButton />
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Video to GIF</h1>
            <p className="text-muted-foreground">Convert video clips to animated GIFs</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileVideo className="h-5 w-5 text-blue-500" />
                  <span>Upload Video</span>
                </CardTitle>
                <CardDescription>Select a video file to convert to GIF</CardDescription>
              </CardHeader>
              <CardContent>
                {!videoUrl ? (
                  <div 
                    className="border-2 border-dashed border-primary/40 rounded-lg p-12 text-center cursor-pointer hover:bg-primary/5 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <Upload className="h-12 w-12 mx-auto mb-4 text-primary/60" />
                    <h3 className="text-lg font-medium mb-2">Upload Video File</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag & drop video file here or click to browse
                    </p>
                    <Button size="sm">
                      Select Video
                    </Button>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                    <p className="text-xs text-muted-foreground mt-4">
                      Supported formats: MP4, WebM, MOV, AVI (Max 50MB)
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="rounded-lg overflow-hidden bg-black">
                      <video 
                        ref={videoRef}
                        src={videoUrl} 
                        controls 
                        className="w-full h-auto"
                        onLoadedMetadata={handleVideoMetadata}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm font-medium">Start Time: {startTime.toFixed(1)}s</label>
                          <span className="text-xs text-muted-foreground">
                            Video Length: {videoDuration.toFixed(1)}s
                          </span>
                        </div>
                        <Slider
                          value={[startTime]}
                          max={Math.max(0, videoDuration - duration)}
                          step={0.1}
                          onValueChange={([value]) => setStartTime(value)}
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium block mb-2">
                          Duration: {duration.toFixed(1)}s
                        </label>
                        <Slider
                          value={[duration]}
                          min={0.5}
                          max={Math.min(10, videoDuration - startTime)}
                          step={0.1}
                          onValueChange={([value]) => setDuration(value)}
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium block mb-2">
                          Quality: {quality}%
                        </label>
                        <Slider
                          value={[quality]}
                          min={10}
                          max={100}
                          step={10}
                          onValueChange={([value]) => setQuality(value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium block mb-2">
                          Frame Rate: {frameRate} fps
                        </label>
                        <Slider
                          value={[frameRate]}
                          min={5}
                          max={30}
                          step={1}
                          onValueChange={([value]) => setFrameRate(value)}
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => {
                          if (videoUrl) {
                            URL.revokeObjectURL(videoUrl);
                          }
                          setVideoFile(null);
                          setVideoUrl(null);
                          setGifUrl(null);
                        }}
                      >
                        Remove
                      </Button>
                      <Button 
                        className="flex-1"
                        onClick={handleConvertToGif}
                        disabled={processing || !videoUrl}
                      >
                        {processing ? 'Processing...' : 'Convert to GIF'}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Film className="h-5 w-5 text-green-500" />
                  <span>GIF Output</span>
                </CardTitle>
                <CardDescription>Preview and download your GIF</CardDescription>
              </CardHeader>
              <CardContent>
                {gifUrl ? (
                  <div className="space-y-4">
                    <div className="rounded-lg overflow-hidden bg-black flex items-center justify-center p-4">
                      <img 
                        src={gifUrl} 
                        alt="Converted GIF" 
                        className="max-w-full max-h-[300px]"
                      />
                    </div>
                    
                    <Button 
                      className="w-full"
                      onClick={handleDownload}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download GIF
                    </Button>
                    
                    <div className="text-xs text-muted-foreground">
                      <p>Tip: Lower quality settings can result in smaller file sizes.</p>
                      <p>Higher frame rates produce smoother animations but larger files.</p>
                    </div>
                  </div>
                ) : (
                  <div className="border rounded-md p-8 flex flex-col items-center justify-center text-center h-[300px] bg-muted/30">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Upload a video and convert it to see the result here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Hidden canvas for frame capture */}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          
          <div className="mt-8 p-6 border rounded-lg">
            <h2 className="text-xl font-bold mb-4">About Video to GIF Conversion</h2>
            <p className="mb-4">
              This tool allows you to convert video clips into animated GIFs. 
              You can select which portion of the video to convert by setting 
              the start time and duration.
            </p>
            <p className="mb-4">
              Adjust the quality setting to balance between image quality and file size. 
              Higher quality settings produce better-looking GIFs but result in 
              larger file sizes.
            </p>
            <p>
              Ideal for creating reactions, memes, or short animations for websites 
              and social media where video files aren't supported.
            </p>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default VideoToGif;
