
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SliderWithTooltipProps {
  id?: string;
  value: number[];
  min: number;
  max: number;
  step?: number;
  onValueChange: (value: number[]) => void;
  className?: string;
  disabled?: boolean;
}

export const SliderWithTooltip: React.FC<SliderWithTooltipProps> = ({
  id,
  value,
  min,
  max,
  step = 1,
  onValueChange,
  className,
  disabled = false,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip open={showTooltip && !disabled}>
        <TooltipTrigger asChild>
          <div
            className="w-full"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <Slider
              id={id}
              value={value}
              min={min}
              max={max}
              step={step}
              onValueChange={onValueChange}
              className={className}
              disabled={disabled}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{value[0]}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
