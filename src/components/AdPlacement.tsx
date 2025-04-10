
import React, { useEffect, useRef } from 'react';

interface AdPlacementProps {
  format?: 'horizontal' | 'rectangle' | 'vertical';
  contentLoaded?: boolean;
  className?: string;
}

/**
 * AdPlacement component that displays Google AdSense ads
 */
const AdPlacement: React.FC<AdPlacementProps> = ({ format = 'horizontal', contentLoaded = true, className = '' }) => {
  const adRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // Only attempt to load ads if the content is loaded (helps with performance)
    if (contentLoaded && adRef.current) {
      try {
        // @ts-ignore - AdSense is loaded via the script in the head
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('Error loading AdSense ad:', error);
      }
    }
  }, [contentLoaded]);
  
  // Define ad sizes based on format
  const getAdSize = () => {
    switch (format) {
      case 'rectangle':
        return { width: '300px', height: '250px' };
      case 'vertical':
        return { width: '160px', height: '600px' };
      case 'horizontal':
      default:
        return { width: '728px', height: '90px' };
    }
  };
  
  const { width, height } = getAdSize();
  
  return (
    <div className={`ad-container flex justify-center my-4 ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width, height }}
        data-ad-client="ca-pub-1941496122967255"
        data-ad-slot="auto"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdPlacement;
