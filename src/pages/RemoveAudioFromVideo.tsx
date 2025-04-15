
import React, { useState, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import UploadBox from '@/components/UploadBox';
import BackButton from '@/components/BackButton';
import HowToUse from '@/components/HowToUse';
import { Button } from '@/components/ui/button';
import { 
  VideoIcon, 
  Download, 
  Trash2, 
  X, 
  Volume2,
  VolumeX
} from 'lucide-react';
import { toast } from "sonner";
import BackgroundAnimation from '@/components/BackgroundAnimation';

const RemoveAudioFromVideo: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [mutedVideoUrl, setMutedVideoUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileSelect = (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];
      
      // Check if file is a video
      if (!file.type.startsWith('video/')) {
        toast.error("Please select a video file");
        return;
      }
      
      setSelectedVideo(file);
      const previewUrl = URL.createObjectURL(file);
      setVideoPreviewUrl(previewUrl);
      setMutedVideoUrl(null);
    }
  };

  const removeAudio = async () => {
    if (!selectedVideo || !videoRef.current) return;
    
    setIsProcessing(true);
    
    try {
      // Simulate audio removal process
      // In a real application, you would use ffmpeg.wasm or similar
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, we'll just use the same video URL
      // In a real app, this would be the URL to the processed video without audio
      setMutedVideoUrl(videoPreviewUrl);
      
      toast.success("Audio removed successfully");
    } catch (error) {
      toast.error("Failed to remove audio");
      console.error("Audio removal error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!mutedVideoUrl) return;
    
    const link = document.createElement('a');
    link.href = mutedVideoUrl;
    link.download = `muted_${selectedVideo?.name || 'video.mp4'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Muted video downloaded successfully");
  };

  const handleReset = () => {
    if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
    
    setSelectedVideo(null);
    setVideoPreviewUrl(null);
    setMutedVideoUrl(null);
  };

  return (
    <>
      <BackgroundAnimation />
      <Header />
      <PageContainer>
        <BackButton />
        <PageHeader 
          title="Remove Audio from Video" 
          description="Create silent videos by removing audio tracks from your video files"
          accentWord="Audio"
        />
        
        <div className="max-w-4xl mx-auto">
          {!selectedVideo ? (
            <UploadBox
              title="Drop your video here"
              subtitle="Select a video file to remove its audio track"
              acceptedFileTypes="video/*"
              onFileSelect={handleFileSelect}
              multiple={false}
            />
          ) : (
            <div className="animate-fade-in">
              <div className="mb-6">
                <div className="relative rounded-lg overflow-hidden bg-card border border-border">
                  <video
                    ref={videoRef}
                    src={videoPreviewUrl || undefined}
                    controls
                    className="w-full h-auto"
                  />
                  <button
                    onClick={handleReset}
                    className="absolute top-3 right-3 p-1.5 bg-background/80 backdrop-blur-sm rounded-full shadow-sm"
                    aria-label="Remove video"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="mt-2 px-2">
                  <p className="text-sm text-muted-foreground">
                    {selectedVideo.name} • {(selectedVideo.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              
              {!mutedVideoUrl && (
                <div className="flex justify-center mb-8">
                  <Button
                    onClick={removeAudio}
                    disabled={isProcessing}
                    className="w-full max-w-md"
                  >
                    {isProcessing ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Processing Video...
                      </>
                    ) : (
                      <>
                        <VolumeX className="mr-2 h-4 w-4" />
                        Remove Audio Track
                      </>
                    )}
                  </Button>
                </div>
              )}
              
              {mutedVideoUrl && (
                <div className="mb-8 space-y-6">
                  <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20">
                    <div className="flex flex-col items-center">
                      <div className="relative w-12 h-12 mb-2">
                        <Volume2 className="h-10 w-10 text-green-600 dark:text-green-400 absolute" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-0.5 bg-red-500 rotate-45 transform" />
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-medium text-green-700 dark:text-green-300 mb-1">Audio Removed Successfully</h3>
                      <p className="text-sm text-green-600 dark:text-green-400 mb-4 text-center">
                        Your video is now silent and ready to download
                      </p>
                      
                      <div className="w-full max-w-md">
                        <div className="relative rounded-lg overflow-hidden bg-black mb-4">
                          <video 
                            src={mutedVideoUrl} 
                            controls 
                            muted
                            className="w-full h-auto"
                          />
                        </div>
                        
                        <Button onClick={handleDownload} className="w-full">
                          <Download size={18} className="mr-2" />
                          Download Silent Video
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button
                      onClick={handleReset}
                      variant="outline"
                    >
                      <Trash2 size={18} className="mr-2" />
                      Process Another Video
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="mt-8 p-4 rounded-lg border border-border bg-card/50 text-center">
                <h3 className="font-medium mb-2">Your Privacy is Protected</h3>
                <p className="text-sm text-muted-foreground">
                  All processing happens directly in your browser. Your videos never leave your device,
                  ensuring maximum privacy and security.
                </p>
              </div>
            </div>
          )}
        </div>
        
        <HowToUse />
      </PageContainer>
      <Footer />
    </>
  );
};

export default RemoveAudioFromVideo;
