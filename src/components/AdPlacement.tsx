
import React, { useEffect, useRef } from 'react';

interface AdPlacementProps {
  format?: 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

/**
 * AdPlacement component for displaying Google AdSense ads
 * This component ensures ads are only shown on content-rich pages
 */
const AdPlacement: React.FC<AdPlacementProps> = ({ format = 'horizontal', className = '' }) => {
  const adRef = useRef<HTMLDivElement>(null);
  
  // Format-specific classes
  const adClasses = {
    horizontal: 'w-full h-[90px] md:h-[90px]',
    vertical: 'w-[160px] h-[600px]',
    rectangle: 'w-[300px] h-[250px]',
  };
  
  useEffect(() => {
    try {
      // Push the ad after the component mounts
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);
  
  return (
    <div className={`ad-container my-8 mx-auto flex justify-center items-center ${adClasses[format]} ${className}`}>
      <div ref={adRef}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '100%' }}
          data-ad-client="ca-pub-1941496122967255"
          data-ad-slot="auto"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  );
};

export default AdPlacement;
