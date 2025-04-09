
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// List of available voices
export const VOICES = [
  { id: 'en-US-1', name: 'US English (Female)' },
  { id: 'en-US-2', name: 'US English (Male)' },
  { id: 'en-GB-1', name: 'British English (Female)' },
  { id: 'en-GB-2', name: 'British English (Male)' },
  { id: 'es-ES-1', name: 'Spanish (Female)' },
  { id: 'fr-FR-1', name: 'French (Female)' },
  { id: 'de-DE-1', name: 'German (Female)' },
];

interface VoiceSettingsProps {
  voice: string;
  rate: number;
  pitch: number;
  volume: number;
  handleVoiceChange: (value: string) => void;
  handleRateChange: (value: number[]) => void;
  handlePitchChange: (value: number[]) => void;
  handleVolumeChange: (value: number[]) => void;
}

const VoiceSettings: React.FC<VoiceSettingsProps> = ({
  voice,
  rate,
  pitch,
  volume,
  handleVoiceChange,
  handleRateChange,
  handlePitchChange,
  handleVolumeChange
}) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="voice-select">Voice</Label>
          <Select value={voice} onValueChange={handleVoiceChange}>
            <SelectTrigger id="voice-select">
              <SelectValue placeholder="Select a voice" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
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
    </>
  );
};

export default VoiceSettings;
