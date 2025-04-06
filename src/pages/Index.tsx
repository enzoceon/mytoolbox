
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import HowToUse from '@/components/HowToUse';
import AdPlacement from '@/components/AdPlacement';
import HeroSection from '@/components/sections/HeroSection';
import ConverterSection from '@/components/sections/ConverterSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import WhyChooseSection from '@/components/sections/WhyChooseSection';
import FaqSection from '@/components/sections/FaqSection';
import { ImageConversionProvider } from '@/components/conversion/ImageConversionProvider';
import SEOMetadata from '@/components/SEO/SEOMetadata';

const Index = () => {
  return (
    <ImageConversionProvider>
      <div className="min-h-screen flex flex-col">
        <SEOMetadata />
        <BackgroundAnimation />
        <Header />
        
        <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-8">
          {/* Hero Section */}
          <HeroSection />
          
          {/* Converter Section - Main content for AdSense compliance */}
          <ConverterSection />
          
          {/* How to Use Section - Additional valuable content */}
          <HowToUse />
          
          {/* Key Features Section - Added for SEO and user value */}
          <FeaturesSection />
          
          {/* More Valuable Content for SEO and AdSense compliance */}
          <WhyChooseSection />
          
          {/* FAQ Section - Great for SEO */}
          <FaqSection />
          
          {/* Bottom AdSense placement - Only shown when there's substantial content */}
          <AdPlacementWrapper />
        </main>
        
        <Footer />
      </div>
    </ImageConversionProvider>
  );
};

// Simple wrapper component to conditionally render ad placement
const AdPlacementWrapper = () => {
  const { hasUserInteracted, isConverting } = React.useContext(
    require('@/components/conversion/ImageConversionProvider').useImageConversion()
  );
  
  return (
    <AdPlacement 
      format="rectangle" 
      className="mb-8" 
      contentLoaded={hasUserInteracted && !isConverting}
    />
  );
};

export default Index;
