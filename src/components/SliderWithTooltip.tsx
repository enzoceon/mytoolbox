
import React from 'react';
import { Slider } from '@/components/ui/slider';

interface SliderWithTooltipProps {
  id?: string;
  value: number[];
  min: number;
  max: number;
  step?: number;
  onValueChange: (value: number[]) => void;
  className?: string;
}

export const SliderWithTooltip: React.FC<SliderWithTooltipProps> = ({
  id,
  value,
  min,
  max,
  step = 1,
  onValueChange,
  className,
}) => {
  return (
    <Slider
      id={id}
      defaultValue={value}
      value={value}
      min={min}
      max={max}
      step={step}
      onValueChange={onValueChange}
      className={className}
    />
  );
};
