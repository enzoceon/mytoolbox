
import React from 'react';
import { Label } from '@/components/ui/label';

interface AudioPreviewProps {
  audioUrl: string | null;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const AudioPreview: React.FC<AudioPreviewProps> = ({ audioUrl, audioRef }) => {
  if (!audioUrl) return null;
  
  return (
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
  );
};

export default AudioPreview;
