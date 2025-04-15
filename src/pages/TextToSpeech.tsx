
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import BackButton from '@/components/BackButton';
import AdPlacement from '@/components/AdPlacement';
import TextInputArea from '@/components/text-to-speech/TextInputArea';
import VoiceSettings from '@/components/text-to-speech/VoiceSettings';
import VoiceControls from '@/components/text-to-speech/VoiceControls';
import AudioPreview from '@/components/text-to-speech/AudioPreview';
import Instructions from '@/components/text-to-speech/Instructions';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';

const TextToSpeech = () => {
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  
  const {
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
  } = useSpeechSynthesis();

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

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Text to Speech Converter | MyToolbox</title>
        <meta name="description" content="Convert text to natural-sounding speech with our free online text to speech tool. Adjust voice, speed, and pitch to your preference." />
      </Helmet>
      
      <BackgroundAnimation />
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <BackButton />
        
        <div className="max-w-4xl mx-auto glass-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <h1 className="text-3xl font-bold mb-6 text-center">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Text to Speech</span> Converter
          </h1>
          
          <p className="text-muted-foreground text-center mb-8">
            Convert text to natural-sounding speech with customizable voices and settings
          </p>
          
          <div className="grid gap-6">
            <TextInputArea 
              text={text} 
              handleTextChange={handleTextChange} 
            />
            
            <VoiceSettings
              voice={voice}
              rate={rate}
              pitch={pitch}
              volume={volume}
              handleVoiceChange={handleVoiceChange}
              handleRateChange={handleRateChange}
              handlePitchChange={handlePitchChange}
              handleVolumeChange={handleVolumeChange}
            />
            
            <VoiceControls
              text={text}
              isPlaying={isPlaying}
              isProcessing={isProcessing}
              audioUrl={audioUrl}
              playText={playText}
              pauseResumeText={pauseResumeText}
              stopText={stopText}
              generateAudio={generateAudio}
              downloadAudio={downloadAudio}
            />
            
            <AudioPreview
              audioUrl={audioUrl}
              audioRef={audioRef}
            />
          </div>
        </div>
        
        <AdPlacement 
          format="horizontal" 
          contentLoaded={hasUserInteracted} 
          className="my-8"
        />
        
        <Instructions />
      </main>
      
      <Footer />
    </div>
  );
};

export default TextToSpeech;
