
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import AdPlacement from '@/components/AdPlacement';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import WhyChooseSection from '@/components/sections/WhyChooseSection';
import FaqSection from '@/components/sections/FaqSection';

const HomePage = () => {
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  
  // Track user interaction for AdSense
  React.useEffect(() => {
    const handleInteraction = () => {
      setHasUserInteracted(true);
    };

    // Listen for user interaction events
    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('keydown', handleInteraction, { once: true });
    document.addEventListener('scroll', handleInteraction, { once: true });
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>EveryTools - Free Online Tools For Everyone | No Registration Required</title>
        <meta name="description" content="Access free online tools for file conversion, editing, and much more. No registration, no watermarks, no file size limits. Fast. Free. Fluid." />
        <meta name="keywords" content="online tools, file converter, image to pdf, pdf to image, video converter, audio tools, document tools, free tools, no registration, no watermark" />
        <link rel="canonical" href="https://everytools.site/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://everytools.site/" />
        <meta property="og:title" content="EveryTools - Free Online Tools For Everyone | No Registration" />
        <meta property="og:description" content="Access dozens of free online tools for file conversion, editing and more. No registration, no watermarks. Fast. Free. Fluid." />
        <meta property="og:image" content="/og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://everytools.site/" />
        <meta property="twitter:title" content="EveryTools - Free Online Tools For Everyone | No Registration" />
        <meta property="twitter:description" content="Access dozens of free online tools for file conversion, editing and more. No registration, no watermarks. Fast. Free. Fluid." />
        <meta property="twitter:image" content="/og-image.jpg" />
        
        {/* Structured Data */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "EveryTools",
            "url": "https://everytools.site/",
            "description": "Free online tools for file conversion, editing, and much more. No registration, no watermarks, no file size limits.",
            "applicationCategory": "Utility",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          }
        `}</script>
      </Helmet>
      
      <BackgroundAnimation />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        
        {/* AdSense placement */}
        <AdPlacement 
          format="horizontal" 
          contentLoaded={hasUserInteracted} 
        />
        
        {/* Key Features Section */}
        <FeaturesSection />
        
        {/* How It Works Section */}
        <HowItWorksSection />
        
        {/* Why Choose Section */}
        <WhyChooseSection />
        
        {/* FAQ Section */}
        <FaqSection />
        
        {/* Bottom Ad */}
        <AdPlacement 
          format="rectangle" 
          className="mt-10" 
          contentLoaded={hasUserInteracted} 
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
