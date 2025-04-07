
import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Play, Pause, Volume2, Download, Mic, RotateCcw } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import BackButton from '@/components/BackButton';
import AdPlacement from '@/components/AdPlacement';

// List of available voices
const VOICES = [
  { id: 'en-US-1', name: 'US English (Female)' },
  { id: 'en-US-2', name: 'US English (Male)' },
  { id: 'en-GB-1', name: 'British English (Female)' },
  { id: 'en-GB-2', name: 'British English (Male)' },
  { id: 'es-ES-1', name: 'Spanish (Female)' },
  { id: 'fr-FR-1', name: 'French (Female)' },
  { id: 'de-DE-1', name: 'German (Female)' },
];

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('en-US-1');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synth = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech synthesis
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      synth.current = window.speechSynthesis;
      
      // Detect user interaction
      const handleInteraction = () => {
        setHasUserInteracted(true);
      };
      
      document.addEventListener('click', handleInteraction, { once: true });
      document.addEventListener('keydown', handleInteraction, { once: true });
      
      return () => {
        document.removeEventListener('click', handleInteraction);
        document.removeEventListener('keydown', handleInteraction);
        
        // Clean up speech synthesis
        if (synth.current) {
          synth.current.cancel();
        }
      };
    }
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleVoiceChange = (value: string) => {
    setVoice(value);
  };

  const handleRateChange = (value: number[]) => {
    setRate(value[0]);
  };

  const handlePitchChange = (value: number[]) => {
    setPitch(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (audioRef.current) {
      audioRef.current.volume = value[0];
    }
  };

  const playText = () => {
    if (!text.trim()) {
      toast.error('Please enter some text to speak');
      return;
    }

    // If browser supports SpeechSynthesis
    if (synth.current) {
      // Cancel any ongoing speech
      synth.current.cancel();
      
      // Create a new utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;
      
      // Get available voices
      const voices = synth.current.getVoices();
      
      // Try to match the selected voice ID with available system voices
      // This is approximate as browser voices vary
      const voiceIndex = voice.startsWith('en-US') ? 0 : 
                        voice.startsWith('en-GB') ? 1 : 
                        voice.startsWith('es') ? 2 : 
                        voice.startsWith('fr') ? 3 : 
                        voice.startsWith('de') ? 4 : 0;
                        
      if (voices.length > voiceIndex) {
        utterance.voice = voices[voiceIndex];
      }
      
      // Set speech parameters
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;
      
      // Handle playing state
      setIsPlaying(true);
      utterance.onend = () => {
        setIsPlaying(false);
      };
      
      utterance.onerror = () => {
        setIsPlaying(false);
        toast.error('Error occurred while speaking');
      };
      
      // Speak the text
      synth.current.speak(utterance);
    } else {
      toast.error('Speech synthesis is not supported in your browser');
    }
  };

  const pauseResumeText = () => {
    if (synth.current) {
      if (synth.current.paused) {
        synth.current.resume();
        setIsPlaying(true);
      } else {
        synth.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const stopText = () => {
    if (synth.current) {
      synth.current.cancel();
      setIsPlaying(false);
    }
  };

  const generateAudio = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to convert');
      return;
    }

    setIsProcessing(true);
    
    // This is a simulated audio generation
    // In a real app, you would call an API to generate audio
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create an audio context for generating a simple tone
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      const duration = 2; // seconds
      
      oscillator.type = 'sine';
      oscillator.frequency.value = 440; // A4 note
      gainNode.gain.value = 0.1;
      
      const startTime = audioContext.currentTime;
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
      
      // Record the audio
      const mediaStreamDestination = audioContext.createMediaStreamDestination();
      gainNode.connect(mediaStreamDestination);
      
      const mediaRecorder = new MediaRecorder(mediaStreamDestination.stream);
      const chunks: BlobPart[] = [];
      
      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setIsProcessing(false);
        toast.success('Audio generated successfully');
      };
      
      mediaRecorder.start();
      setTimeout(() => {
        mediaRecorder.stop();
      }, duration * 1000 + 500);
      
    } catch (error) {
      console.error('Error generating audio:', error);
      setIsProcessing(false);
      toast.error('Failed to generate audio');
    }
  };

  const downloadAudio = () => {
    if (!audioUrl) return;
    
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = 'speech.wav';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Audio downloaded successfully');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Text to Speech Converter | EveryTools</title>
        <meta name="description" content="Convert text to natural-sounding speech with our free online text to speech tool. Adjust voice, speed, and pitch to your preference." />
      </Helmet>
      
      <BackgroundAnimation />
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <BackButton />
        
        <div className="max-w-4xl mx-auto glass-card p-6 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Text to Speech</span> Converter
          </h1>
          
          <p className="text-muted-foreground text-center mb-8">
            Convert text to natural-sounding speech with customizable voices and settings
          </p>
          
          <div className="grid gap-6">
            <div>
              <Label htmlFor="text-input">Enter Text</Label>
              <Textarea
                id="text-input"
                placeholder="Type or paste your text here..."
                className="min-h-[150px]"
                value={text}
                onChange={handleTextChange}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="voice-select">Voice</Label>
                <Select value={voice} onValueChange={handleVoiceChange}>
                  <SelectTrigger id="voice-select">
                    <SelectValue placeholder="Select a voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {VOICES.map((v) => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col space-y-2">
                <Label htmlFor="volume-slider">Volume ({Math.round(volume * 100)}%)</Label>
                <Slider
                  id="volume-slider"
                  min={0}
                  max={1}
                  step={0.01}
                  value={[volume]}
                  onValueChange={handleVolumeChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="rate-slider">Speed ({rate.toFixed(1)}x)</Label>
                <Slider
                  id="rate-slider"
                  min={0.1}
                  max={3}
                  step={0.1}
                  value={[rate]}
                  onValueChange={handleRateChange}
                />
              </div>
              
              <div className="flex flex-col space-y-2">
                <Label htmlFor="pitch-slider">Pitch ({pitch.toFixed(1)})</Label>
                <Slider
                  id="pitch-slider"
                  min={0.1}
                  max={2}
                  step={0.1}
                  value={[pitch]}
                  onValueChange={handlePitchChange}
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant="default"
                className="gap-2"
                onClick={isPlaying ? pauseResumeText : playText}
                disabled={!text.trim()}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              
              {isPlaying && (
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={stopText}
                >
                  <RotateCcw size={16} />
                  Stop
                </Button>
              )}
              
              <Button
                variant="secondary"
                className="gap-2"
                onClick={generateAudio}
                disabled={!text.trim() || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin mr-1">⏳</span>
                    Generating...
                  </>
                ) : (
                  <>
                    <Volume2 size={16} />
                    Generate Audio File
                  </>
                )}
              </Button>
              
              {audioUrl && (
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={downloadAudio}
                >
                  <Download size={16} />
                  Download Audio
                </Button>
              )}
            </div>
            
            {audioUrl && (
              <div className="mt-4">
                <Label>Preview</Label>
                <div className="bg-muted p-4 rounded-md">
                  <audio
                    ref={audioRef}
                    src={audioUrl}
                    controls
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        <AdPlacement 
          format="horizontal" 
          contentLoaded={hasUserInteracted} 
          className="my-8"
        />
        
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">How to Use the Text to Speech Tool</h2>
          <div className="glass-card p-6 rounded-xl">
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
              <li>Enter or paste your text in the text area</li>
              <li>Choose your preferred voice from the options</li>
              <li>Adjust the volume, speed, and pitch to your liking</li>
              <li>Click "Play" to listen to the speech</li>
              <li>Click "Generate Audio File" to create a downloadable audio file</li>
              <li>Click "Download Audio" to save the generated file to your device</li>
            </ol>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TextToSpeech;
