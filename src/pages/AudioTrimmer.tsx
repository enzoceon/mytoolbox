
import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Upload, Play, Pause, Save, Scissors, RotateCcw, Volume2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import BackButton from '@/components/BackButton';
import AdPlacement from '@/components/AdPlacement';

const AudioTrimmer = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [trimRange, setTrimRange] = useState<[number, number]>([0, 100]);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  
  // Detect user interaction
  useEffect(() => {
    const handleInteraction = () => {
      setHasUserInteracted(true);
    };
    
    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('keydown', handleInteraction, { once: true });
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, []);
  
  // Clean up resources when component unmounts
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [audioUrl]);
  
  // Update currentTime while playing
  useEffect(() => {
    if (audioRef.current) {
      const handleTimeUpdate = () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      };
      
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          audioRef.current.removeEventListener('ended', () => setIsPlaying(false));
        }
      };
    }
  }, [audioRef.current]);
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const validAudioTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/ogg', 'audio/x-m4a'];
    
    if (!validAudioTypes.includes(file.type)) {
      toast.error('Please upload a valid audio file (MP3, WAV, OGG, M4A)');
      return;
    }
    
    // Clean up previous audio
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    
    setAudioFile(file);
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    setTrimRange([0, 100]);
    setCurrentTime(0);
    setIsPlaying(false);
    
    // Reset audio element
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.load();
      
      audioRef.current.onloadedmetadata = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
          initializeAudioVisualizer();
        }
      };
    }
  };
  
  const initializeAudioVisualizer = () => {
    if (!audioRef.current || !canvasRef.current) return;
    
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const audioContext = audioContextRef.current;
    
    // Create audio source from the audio element
    const source = audioContext.createMediaElementSource(audioRef.current);
    
    // Create analyzer node
    analyserRef.current = audioContext.createAnalyser();
    analyserRef.current.fftSize = 256;
    
    // Connect source to analyzer and then to destination
    source.connect(analyserRef.current);
    analyserRef.current.connect(audioContext.destination);
    
    // Create data array for analyzer
    const bufferLength = analyserRef.current.frequencyBinCount;
    dataArrayRef.current = new Uint8Array(bufferLength);
    
    // Start visualizer
    drawVisualizer();
  };
  
  const drawVisualizer = () => {
    if (!canvasRef.current || !analyserRef.current || !dataArrayRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Match canvas dimensions to its displayed size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Draw loop
    function draw() {
      animationRef.current = requestAnimationFrame(draw);
      
      if (!analyserRef.current || !dataArrayRef.current) return;
      
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      
      ctx.clearRect(0, 0, width, height);
      
      // Calculate the trim range in pixels
      const startX = (trimRange[0] / 100) * width;
      const endX = (trimRange[1] / 100) * width;
      
      // Draw trim range background
      ctx.fillStyle = 'rgba(99, 102, 241, 0.2)';
      ctx.fillRect(startX, 0, endX - startX, height);
      
      // Draw waveform
      const barWidth = width / dataArrayRef.current.length;
      
      for (let i = 0; i < dataArrayRef.current.length; i++) {
        const barHeight = (dataArrayRef.current[i] / 255) * height;
        
        // Determine if this bar is within the trim range
        const x = i * barWidth;
        const isInTrimRange = x >= startX && x <= endX;
        
        // Set color based on whether in trim range
        ctx.fillStyle = isInTrimRange ? 
                        'rgba(99, 102, 241, 0.8)' : 
                        'rgba(156, 163, 175, 0.5)';
        
        // Draw the bar
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);
      }
      
      // Draw current position marker
      if (audioRef.current && duration > 0) {
        const positionX = (audioRef.current.currentTime / duration) * width;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(positionX, 0);
        ctx.lineTo(positionX, height);
        ctx.stroke();
      }
    }
    
    draw();
  };
  
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Set current time based on trim start if needed
      if (audioRef.current.currentTime < getTimeFromPercent(trimRange[0]) || 
          audioRef.current.currentTime > getTimeFromPercent(trimRange[1])) {
        audioRef.current.currentTime = getTimeFromPercent(trimRange[0]);
      }
      
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
        toast.error('Error playing audio');
      });
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const handleTrimRangeChange = (value: number[]) => {
    setTrimRange([value[0], value[1]]);
    
    // If playing, update current time to be within the new range
    if (isPlaying && audioRef.current) {
      const currentTimePercent = (audioRef.current.currentTime / duration) * 100;
      if (currentTimePercent < value[0] || currentTimePercent > value[1]) {
        audioRef.current.currentTime = getTimeFromPercent(value[0]);
      }
    }
  };
  
  const getTimeFromPercent = (percent: number): number => {
    return (percent / 100) * duration;
  };
  
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const trimAudio = async () => {
    if (!audioFile || !audioUrl || !audioRef.current) {
      toast.error('Please upload an audio file first');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Get trim start and end times
      const startTime = getTimeFromPercent(trimRange[0]);
      const endTime = getTimeFromPercent(trimRange[1]);
      
      if (startTime >= endTime) {
        toast.error('Invalid trim range');
        setIsProcessing(false);
        return;
      }
      
      // Create AudioContext
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Fetch and decode the audio file
      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      // Calculate the new buffer length
      const sampleRate = audioBuffer.sampleRate;
      const channels = audioBuffer.numberOfChannels;
      const startOffset = Math.floor(startTime * sampleRate);
      const endOffset = Math.floor(endTime * sampleRate);
      const newLength = endOffset - startOffset;
      
      // Create a new buffer for the trimmed audio
      const trimmedBuffer = audioContext.createBuffer(
        channels,
        newLength,
        sampleRate
      );
      
      // Copy the desired portion of audio data
      for (let channel = 0; channel < channels; channel++) {
        const channelData = audioBuffer.getChannelData(channel);
        const trimmedData = trimmedBuffer.getChannelData(channel);
        
        for (let i = 0; i < newLength; i++) {
          trimmedData[i] = channelData[startOffset + i];
        }
      }
      
      // Convert the buffer to a wav blob
      const offlineContext = new OfflineAudioContext(
        channels,
        trimmedBuffer.length,
        sampleRate
      );
      
      const source = offlineContext.createBufferSource();
      source.buffer = trimmedBuffer;
      source.connect(offlineContext.destination);
      source.start(0);
      
      const renderedBuffer = await offlineContext.startRendering();
      
      // Create WAV file
      const wavBlob = audioBufferToWav(renderedBuffer);
      
      // Create download URL
      const trimmedUrl = URL.createObjectURL(wavBlob);
      
      // Update audio player with trimmed audio
      if (audioRef.current) {
        // Clean up old URL
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
        }
        
        setAudioUrl(trimmedUrl);
        audioRef.current.src = trimmedUrl;
        audioRef.current.load();
        audioRef.current.onloadedmetadata = () => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
            setTrimRange([0, 100]);
            setCurrentTime(0);
          }
        };
      }
      
      toast.success('Audio trimmed successfully');
      
      // Provide download option
      const link = document.createElement('a');
      link.href = trimmedUrl;
      link.download = `trimmed_${audioFile.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Error trimming audio:', error);
      toast.error('Error trimming audio');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Helper function to convert AudioBuffer to WAV Blob
  const audioBufferToWav = (buffer: AudioBuffer): Blob => {
    const numOfChan = buffer.numberOfChannels;
    const length = buffer.length * numOfChan * 2 + 44;
    const data = new ArrayBuffer(length);
    const view = new DataView(data);
    
    // RIFF chunk descriptor
    writeString(view, 0, 'RIFF');
    view.setUint32(4, length - 8, true);
    writeString(view, 8, 'WAVE');
    
    // FMT sub-chunk
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // subchunk1size (16 for PCM)
    view.setUint16(20, 1, true); // AudioFormat (1 for PCM)
    view.setUint16(22, numOfChan, true); // NumChannels
    view.setUint32(24, buffer.sampleRate, true); // SampleRate
    view.setUint32(28, buffer.sampleRate * numOfChan * 2, true); // ByteRate
    view.setUint16(32, numOfChan * 2, true); // BlockAlign
    view.setUint16(34, 16, true); // BitsPerSample
    
    // Data sub-chunk
    writeString(view, 36, 'data');
    view.setUint32(40, length - 44, true);
    
    // Write the PCM samples
    const dataOffset = 44;
    let offset = dataOffset;
    for (let i = 0; i < buffer.length; i++) {
      for (let channel = 0; channel < numOfChan; channel++) {
        const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
        const int16 = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
        view.setInt16(offset, int16, true);
        offset += 2;
      }
    }
    
    return new Blob([data], { type: 'audio/wav' });
    
    // Helper function to write a string to a DataView
    function writeString(view: DataView, offset: number, string: string) {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Audio Trimmer | MyToolbox</title>
        <meta name="description" content="Trim and cut audio files online. Simple, free tool to trim your audio files with no registration required." />
      </Helmet>
      
      <BackgroundAnimation />
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <BackButton />
        
        <div className="max-w-4xl mx-auto glass-card p-6 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Audio Trimmer</span> Tool
          </h1>
          
          <p className="text-muted-foreground text-center mb-8">
            Trim your audio files to get exactly the part you need
          </p>
          
          <div className="grid gap-6">
            <div className="flex justify-center">
              <div className="relative">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                />
                <Button variant="outline" className="gap-2">
                  <Upload size={16} />
                  {audioFile ? 'Change Audio File' : 'Upload Audio File'}
                </Button>
                {audioFile && (
                  <span className="ml-2 text-sm text-muted-foreground">
                    {audioFile.name}
                  </span>
                )}
              </div>
            </div>
            
            {audioUrl && (
              <>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <canvas
                    ref={canvasRef}
                    className="w-full h-32 mb-2"
                  />
                  
                  <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span>{formatTime(getTimeFromPercent(trimRange[0]))}</span>
                    <span>{formatTime(getTimeFromPercent(trimRange[1]))}</span>
                  </div>
                  
                  <Slider
                    min={0}
                    max={100}
                    step={0.1}
                    value={trimRange}
                    onValueChange={handleTrimRangeChange}
                    className="mb-4"
                  />
                  
                  <div className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      Current: {formatTime(currentTime)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Duration: {formatTime(duration)}
                    </div>
                  </div>
                  
                  <audio
                    ref={audioRef}
                    src={audioUrl}
                    className="hidden"
                    onEnded={() => setIsPlaying(false)}
                  />
                </div>
                
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button
                    variant="default"
                    className="gap-2"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  
                  <Button
                    variant="secondary"
                    className="gap-2"
                    onClick={trimAudio}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <span className="animate-spin mr-1">⏳</span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Scissors size={16} />
                        Trim Audio
                      </>
                    )}
                  </Button>
                  
                  {audioUrl && (
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = audioUrl;
                        link.download = audioFile ? `trimmed_${audioFile.name}` : 'trimmed_audio.wav';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        toast.success('Audio downloaded successfully');
                      }}
                    >
                      <Save size={16} />
                      Download
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        
        <AdPlacement 
          format="horizontal" 
          contentLoaded={hasUserInteracted} 
          className="my-8"
        />
        
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">How to Use the Audio Trimmer Tool</h2>
          <div className="glass-card p-6 rounded-xl">
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
              <li>Upload an audio file (MP3, WAV, OGG, or M4A format)</li>
              <li>Use the slider to select the portion of audio you want to keep</li>
              <li>Preview your selection by clicking the "Play" button</li>
              <li>Click "Trim Audio" to process your selection</li>
              <li>Download your trimmed audio file</li>
            </ol>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AudioTrimmer;
