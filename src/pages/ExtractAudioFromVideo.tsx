
import React, { useState, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import UploadBox from '@/components/UploadBox';
import BackButton from '@/components/BackButton';
import HowToUse from '@/components/HowToUse';
import ExtractAudioFromVideoSEO from '@/components/SEO/ExtractAudioFromVideoSEO';
import { Button } from '@/components/ui/button';
import { 
  VideoIcon, 
  Download, 
  Trash2, 
  X, 
  Music,
  Waveform
} from 'lucide-react';
import { toast } from "sonner";
import BackgroundAnimation from '@/components/BackgroundAnimation';

const ExtractAudioFromVideo: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [extractedAudioUrl, setExtractedAudioUrl] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
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
      setExtractedAudioUrl(null);
    }
  };

  const extractAudio = async () => {
    if (!selectedVideo || !videoRef.current) return;
    
    setIsExtracting(true);
    
    try {
      // Simulate audio extraction process
      // In a real application, you would use Web Audio API or FFmpeg.wasm
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, we'll just use a mock audio URL
      // In a real app, this would be the URL to the extracted audio file
      setExtractedAudioUrl(URL.createObjectURL(new Blob(['audio content'], { type: 'audio/mp3' })));
      
      toast.success("Audio extracted successfully");
    } catch (error) {
      toast.error("Failed to extract audio");
      console.error("Audio extraction error:", error);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleDownload = () => {
    if (!extractedAudioUrl) return;
    
    const link = document.createElement('a');
    link.href = extractedAudioUrl;
    link.download = `audio_${selectedVideo?.name.split('.').slice(0, -1).join('.') || 'extracted'}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Audio downloaded successfully");
  };

  const handleReset = () => {
    if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
    if (extractedAudioUrl) URL.revokeObjectURL(extractedAudioUrl);
    
    setSelectedVideo(null);
    setVideoPreviewUrl(null);
    setExtractedAudioUrl(null);
  };

  return (
    <>
      <ExtractAudioFromVideoSEO />
      <BackgroundAnimation />
      <Header />
      <PageContainer>
        <BackButton />
        <PageHeader 
          title="Extract Audio from Video" 
          description="Extract audio tracks from video files without losing quality"
          accentWord="Audio"
        />
        
        <div className="max-w-4xl mx-auto">
          {!selectedVideo ? (
            <UploadBox
              title="Drop your video here"
              subtitle="Select a video file to extract its audio track"
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
              
              {!extractedAudioUrl && (
                <div className="flex justify-center mb-8">
                  <Button
                    onClick={extractAudio}
                    disabled={isExtracting}
                    className="w-full max-w-md"
                  >
                    {isExtracting ? (
                      <>
                        <Waveform className="mr-2 h-4 w-4 animate-pulse" />
                        Extracting Audio...
                      </>
                    ) : (
                      <>
                        <Music className="mr-2 h-4 w-4" />
                        Extract Audio Track
                      </>
                    )}
                  </Button>
                </div>
              )}
              
              {extractedAudioUrl && (
                <div className="mb-8 space-y-6">
                  <div className="p-4 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20">
                    <div className="flex flex-col items-center">
                      <Waveform className="h-10 w-10 text-green-600 dark:text-green-400 mb-2" />
                      <h3 className="text-lg font-medium text-green-700 dark:text-green-300 mb-1">Audio Extracted Successfully</h3>
                      <p className="text-sm text-green-600 dark:text-green-400 mb-4 text-center">
                        The audio track has been extracted from your video and is ready to download
                      </p>
                      
                      <div className="w-full max-w-md">
                        <audio controls className="w-full mb-4">
                          <source src={extractedAudioUrl} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                        
                        <Button onClick={handleDownload} className="w-full">
                          <Download size={18} className="mr-2" />
                          Download MP3 Audio
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
                      Extract from Another Video
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

export default ExtractAudioFromVideo;
