
import React from 'react';
import { ImageConversionProvider } from '@/components/conversion/ImageConversionProvider';
import HomePage from './HomePage';

const Index: React.FC = () => {
  return (
    <ImageConversionProvider>
      <HomePage />
    </ImageConversionProvider>
  );
};

export default Index;
