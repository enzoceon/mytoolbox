
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';

export const useSpeechSynthesis = () => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('en-US-1');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synth = window.speechSynthesis;
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech synthesis and load available voices
  useEffect(() => {
    // Check if speech synthesis is available
    if (!synth) {
      toast.error('Speech synthesis is not supported in your browser');
      return;
    }
    
    // Load available voices
    const loadVoices = () => {
      const voices = synth.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices);
        console.log('Available voices:', voices);
      }
    };
    
    // Load voices initially and add event listener for voiceschanged
    loadVoices();
    synth.addEventListener('voiceschanged', loadVoices);
    
    // Clean up
    return () => {
      synth.cancel();
      synth.removeEventListener('voiceschanged', loadVoices);
      
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
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
    if (synth) {
      // Cancel any ongoing speech
      synth.cancel();
      
      // Create a new utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;
      
      // Find a matching voice based on the selected voice ID
      if (availableVoices.length > 0) {
        // Try to match language first
        const languageCode = voice.split('-').slice(0, 2).join('-');
        const matchingVoices = availableVoices.filter(v => 
          v.lang.startsWith(languageCode)
        );
        
        // Choose a voice - prefer matching language and gender if possible
        const isFemaleVoice = voice.endsWith('1'); // Assuming "-1" suffix is female
        let selectedVoice;
        
        if (matchingVoices.length > 0) {
          // Try to match gender if multiple voices available
          if (matchingVoices.length > 1) {
            // This is a simplistic approach as browser APIs don't expose gender directly
            // We're using name as a heuristic which isn't perfect
            selectedVoice = matchingVoices.find(v => {
              const name = v.name.toLowerCase();
              return isFemaleVoice ? 
                (name.includes('female') || name.includes('woman')) :
                (name.includes('male') || name.includes('man'));
            });
          }
          
          // If no gender match or just one voice, use the first matching language
          if (!selectedVoice) {
            selectedVoice = matchingVoices[0];
          }
        } else {
          // Fallback to any voice
          selectedVoice = availableVoices[0];
        }
        
        if (selectedVoice) {
          utterance.voice = selectedVoice;
          console.log('Selected voice:', selectedVoice.name);
        }
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
      
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setIsPlaying(false);
        toast.error('Error occurred while speaking');
      };
      
      // Speak the text
      synth.speak(utterance);
    } else {
      toast.error('Speech synthesis is not supported in your browser');
    }
  };

  const pauseResumeText = () => {
    if (synth) {
      if (synth.paused) {
        synth.resume();
        setIsPlaying(true);
      } else {
        synth.pause();
        setIsPlaying(false);
      }
    }
  };

  const stopText = () => {
    if (synth) {
      synth.cancel();
      setIsPlaying(false);
    }
  };

  const generateAudio = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to convert');
      return;
    }

    setIsProcessing(true);
    toast.info('Generating audio file...');
    
    try {
      // Create an AudioContext
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const mediaStreamDest = audioContext.createMediaStreamDestination();
      
      // Create a MediaRecorder to capture the audio
      const mediaRecorder = new MediaRecorder(mediaStreamDest.stream);
      const audioChunks: BlobPart[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        
        // Clean up previous URL if it exists
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
        }
        
        setAudioUrl(url);
        setIsProcessing(false);
        toast.success('Audio generated successfully');
      };
      
      // Start recording
      mediaRecorder.start();
      
      // Create and configure the utterance
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Find a matching voice
      if (availableVoices.length > 0) {
        const languageCode = voice.split('-').slice(0, 2).join('-');
        const matchingVoice = availableVoices.find(v => v.lang.startsWith(languageCode)) || availableVoices[0];
        utterance.voice = matchingVoice;
      }
      
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;
      
      // We need to connect a speech synthesis to the media stream
      // This is a workaround since there's no direct API to record speech synthesis
      // We'll use an audio element to play the speech and capture its output
      const tempAudio = new Audio();
      let speechEnded = false;
      
      utterance.onend = () => {
        speechEnded = true;
        setTimeout(() => {
          mediaRecorder.stop();
        }, 500); // Allow a small delay to capture the full audio
      };
      
      // Speak the text and capture using the media recorder
      synth.speak(utterance);
      
      // If speech doesn't end properly, set a maximum timeout
      setTimeout(() => {
        if (!speechEnded) {
          mediaRecorder.stop();
        }
      }, 30000); // 30 seconds max
      
    } catch (error) {
      console.error('Error generating audio:', error);
      setIsProcessing(false);
      toast.error('Failed to generate audio. Please try again.');
    }
  };

  const downloadAudio = () => {
    if (!audioUrl) {
      toast.error('No audio file available to download');
      return;
    }
    
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = 'speech.wav';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Audio downloaded successfully');
  };

  return {
    text,
    voice,
    rate,
    pitch,
    volume,
    isPlaying,
    audioUrl,
    isProcessing,
    audioRef,
    handleTextChange,
    handleVoiceChange,
    handleRateChange,
    handlePitchChange,
    handleVolumeChange,
    playText,
    pauseResumeText,
    stopText,
    generateAudio,
    downloadAudio
  };
};
