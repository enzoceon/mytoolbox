
import React, { useEffect, useRef } from 'react';

interface AdPlacementProps {
  format?: 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
  contentLoaded?: boolean;
}

/**
 * AdPlacement component for displaying Google AdSense ads
 * Enhanced version with fallback content to prevent layout gaps
 */
const AdPlacement: React.FC<AdPlacementProps> = ({ 
  format = 'horizontal', 
  className = '',
  contentLoaded = false
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  
  // Format-specific classes
  const adClasses = {
    horizontal: 'w-full h-[90px] md:h-[90px]',
    vertical: 'w-[160px] h-[600px]',
    rectangle: 'w-[300px] h-[250px]',
  };
  
  useEffect(() => {
    // Only initialize AdSense if content is loaded
    if (contentLoaded && adRef.current && window.adsbygoogle) {
      try {
        console.log('Initializing AdSense ad');
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, [contentLoaded]);
  
  // Don't render anything if no content is loaded to avoid gaps
  if (!contentLoaded) {
    return null;
  }
  
  return (
    <div className={`ad-container my-4 mx-auto flex justify-center items-center ${adClasses[format]} ${className}`}>
      <div ref={adRef} className="w-full h-full">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '100%' }}
          data-ad-client="ca-pub-1941496122967255"
          data-ad-slot="auto"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        {/* Fallback content to prevent layout shifts if ad doesn't load */}
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center bg-muted/10 opacity-0">
          <span className="text-xs text-muted-foreground">Advertisement</span>
        </div>
      </div>
    </div>
  );
};

export default AdPlacement;
