
import React from 'react';
import { Volume2, Play, Pause, RotateCcw, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface VoiceControlsProps {
  text: string;
  isPlaying: boolean;
  isProcessing: boolean;
  audioUrl: string | null;
  playText: () => void;
  pauseResumeText: () => void;
  stopText: () => void;
  generateAudio: () => void;
  downloadAudio: () => void;
}

const VoiceControls: React.FC<VoiceControlsProps> = ({
  text,
  isPlaying,
  isProcessing,
  audioUrl,
  playText,
  pauseResumeText,
  stopText,
  generateAudio,
  downloadAudio
}) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Button
        variant="default"
        className="gap-2 hover:bg-primary/90 transition-all"
        onClick={isPlaying ? pauseResumeText : playText}
        disabled={!text.trim()}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        {isPlaying ? 'Pause' : 'Play'}
      </Button>
      
      {isPlaying && (
        <Button
          variant="outline"
          className="gap-2 hover:bg-secondary/90 transition-all"
          onClick={stopText}
        >
          <RotateCcw size={16} />
          Stop
        </Button>
      )}
      
      <Button
        variant="secondary"
        className="gap-2 hover:bg-secondary/90 transition-all"
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
          className="gap-2 hover:bg-muted transition-all"
          onClick={downloadAudio}
        >
          <Download size={16} />
          Download Audio
        </Button>
      )}
    </div>
  );
};

export default VoiceControls;
