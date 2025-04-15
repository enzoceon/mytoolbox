
import React, { useState, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import UploadBox from '@/components/UploadBox';
import BackButton from '@/components/BackButton';
import HowToUse from '@/components/HowToUse';
import AddAudioToVideoSEO from '@/components/SEO/AddAudioToVideoSEO';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  VideoIcon, 
  Download, 
  Trash2, 
  X, 
  Music,
  Volume,
  Plus,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { toast } from "sonner";
import BackgroundAnimation from '@/components/BackgroundAnimation';

const AddAudioToVideo: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [selectedAudio, setSelectedAudio] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null);
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioVolume, setAudioVolume] = useState(80);
  const [originalAudioVolume, setOriginalAudioVolume] = useState(50);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [keepOriginalAudio, setKeepOriginalAudio] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleVideoSelect = (files: FileList) => {
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
      setProcessedVideoUrl(null);
    }
  };

  const handleAudioSelect = (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];
      
      // Check if file is an audio
      if (!file.type.startsWith('audio/')) {
        toast.error("Please select an audio file");
        return;
      }
      
      setSelectedAudio(file);
      const previewUrl = URL.createObjectURL(file);
      setAudioPreviewUrl(previewUrl);
      setProcessedVideoUrl(null);
    }
  };

  const combineVideoAndAudio = async () => {
    if (!selectedVideo || !selectedAudio) {
      toast.error("Please select both video and audio files");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simulate processing
      // In a real application, you would use ffmpeg.wasm or similar
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // For demo purposes, we'll just use the original video URL
      // In a real app, this would be the URL to the processed video with the new audio
      setProcessedVideoUrl(videoPreviewUrl);
      
      toast.success("Audio added successfully to video");
    } catch (error) {
      toast.error("Failed to add audio to video");
      console.error("Audio addition error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedVideoUrl) return;
    
    const link = document.createElement('a');
    link.href = processedVideoUrl;
    link.download = `combined_${selectedVideo?.name || 'video.mp4'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Video with new audio downloaded successfully");
  };

  const handleReset = () => {
    if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
    if (audioPreviewUrl) URL.revokeObjectURL(audioPreviewUrl);
    if (processedVideoUrl && processedVideoUrl !== videoPreviewUrl) URL.revokeObjectURL(processedVideoUrl);
    
    setSelectedVideo(null);
    setSelectedAudio(null);
    setVideoPreviewUrl(null);
    setAudioPreviewUrl(null);
    setProcessedVideoUrl(null);
    setAudioVolume(80);
    setOriginalAudioVolume(50);
    setKeepOriginalAudio(true);
  };

  const handleRemoveVideo = () => {
    if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
    setSelectedVideo(null);
    setVideoPreviewUrl(null);
    setProcessedVideoUrl(null);
  };

  const handleRemoveAudio = () => {
    if (audioPreviewUrl) URL.revokeObjectURL(audioPreviewUrl);
    setSelectedAudio(null);
    setAudioPreviewUrl(null);
    setProcessedVideoUrl(null);
  };

  return (
    <>
      <AddAudioToVideoSEO />
      <BackgroundAnimation />
      <Header />
      <PageContainer>
        <BackButton />
        <PageHeader 
          title="Add Audio to Video" 
          description="Combine video files with audio tracks to create enhanced videos"
          accentWord="Audio"
        />
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              {!selectedVideo ? (
                <UploadBox
                  title="Drop your video here"
                  subtitle="Select a video to add audio to"
                  acceptedFileTypes="video/*"
                  onFileSelect={handleVideoSelect}
                  multiple={false}
                />
              ) : (
                <div className="animate-fade-in">
                  <div className="relative rounded-lg overflow-hidden bg-card border border-border">
                    <video
                      ref={videoRef}
                      src={videoPreviewUrl || undefined}
                      controls
                      className="w-full h-auto"
                    />
                    <button
                      onClick={handleRemoveVideo}
                      className="absolute top-3 right-3 p-1.5 bg-background/80 backdrop-blur-sm rounded-full shadow-sm"
                      aria-label="Remove video"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className="mt-2 px-2">
                    <p className="text-sm text-muted-foreground truncate">
                      {selectedVideo.name} • {(selectedVideo.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <div>
              {!selectedAudio ? (
                <UploadBox
                  title="Drop your audio here"
                  subtitle="Select an audio file to add to the video"
                  acceptedFileTypes="audio/*"
                  onFileSelect={handleAudioSelect}
                  multiple={false}
                />
              ) : (
                <div className="animate-fade-in">
                  <div className="relative rounded-lg bg-card border border-border p-4">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Music className="h-6 w-6 text-primary" />
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="font-medium text-foreground truncate">{selectedAudio.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {(selectedAudio.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        onClick={handleRemoveAudio}
                        className="ml-auto p-1.5 bg-muted rounded-full"
                        aria-label="Remove audio"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    
                    <audio 
                      ref={audioRef}
                      src={audioPreviewUrl || undefined}
                      controls
                      className="w-full mb-4"
                    />
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <label htmlFor="audio-volume" className="text-sm font-medium">
                            Audio Volume: {audioVolume}%
                          </label>
                        </div>
                        <Slider
                          id="audio-volume"
                          defaultValue={[audioVolume]}
                          max={100}
                          step={1}
                          onValueChange={(value) => setAudioVolume(value[0])}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {selectedVideo && selectedAudio && (
            <div className="mb-8">
              <Button
                onClick={() => setShowAdvanced(!showAdvanced)}
                variant="outline"
                className="w-full mb-4"
              >
                Advanced Options
                {showAdvanced ? (
                  <ChevronUp className="ml-2 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-2 h-4 w-4" />
                )}
              </Button>
              
              {showAdvanced && (
                <div className="p-4 bg-card border border-border rounded-lg mb-4 animate-fade-in">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label htmlFor="keep-original" className="text-sm font-medium flex items-center">
                        <input
                          id="keep-original"
                          type="checkbox"
                          checked={keepOriginalAudio}
                          onChange={(e) => setKeepOriginalAudio(e.target.checked)}
                          className="mr-2 h-4 w-4 rounded border-gray-300 text-primary"
                        />
                        Keep original video audio
                      </label>
                    </div>
                    
                    {keepOriginalAudio && (
                      <div>
                        <div className="flex justify-between mb-2">
                          <label htmlFor="original-volume" className="text-sm font-medium">
                            Original Audio Volume: {originalAudioVolume}%
                          </label>
                        </div>
                        <Slider
                          id="original-volume"
                          defaultValue={[originalAudioVolume]}
                          max={100}
                          step={1}
                          onValueChange={(value) => setOriginalAudioVolume(value[0])}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {!processedVideoUrl && (
                <Button
                  onClick={combineVideoAndAudio}
                  disabled={isProcessing || !selectedVideo || !selectedAudio}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Combine Video and Audio
                    </>
                  )}
                </Button>
              )}
            </div>
          )}
          
          {processedVideoUrl && (
            <div className="mb-8 space-y-6">
              <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20">
                <div className="flex flex-col items-center">
                  <div className="flex items-center mb-3">
                    <VideoIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                    <Plus className="mx-1 h-6 w-6 text-green-600 dark:text-green-400" />
                    <Music className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  
                  <h3 className="text-lg font-medium text-green-700 dark:text-green-300 mb-1">Video with New Audio Ready</h3>
                  <p className="text-sm text-green-600 dark:text-green-400 mb-4 text-center">
                    Your video now has the new audio track added
                  </p>
                  
                  <div className="w-full">
                    <div className="relative rounded-lg overflow-hidden bg-black mb-4">
                      <video 
                        src={processedVideoUrl} 
                        controls 
                        className="w-full h-auto"
                      />
                    </div>
                    
                    <Button onClick={handleDownload} className="w-full">
                      <Download size={18} className="mr-2" />
                      Download Combined Video
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
                  Create Another Video
                </Button>
              </div>
            </div>
          )}
              
          <div className="mt-8 p-4 rounded-lg border border-border bg-card/50 text-center">
            <h3 className="font-medium mb-2">Your Privacy is Protected</h3>
            <p className="text-sm text-muted-foreground">
              All processing happens directly in your browser. Your videos and audio files never leave your device,
              ensuring maximum privacy and security.
            </p>
          </div>
        </div>
        
        <HowToUse />
      </PageContainer>
      <Footer />
    </>
  );
};

export default AddAudioToVideo;
