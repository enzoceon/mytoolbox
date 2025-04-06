
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ImageConversionProvider } from '@/components/conversion/ImageConversionProvider';
import ConverterSection from '@/components/sections/ConverterSection';
import HowToUse from '@/components/HowToUse';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <ImageConversionProvider>
          <ConverterSection />
          <HowToUse />
        </ImageConversionProvider>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
