
import React from 'react';

interface AdPlacementProps {
  format?: 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

/**
 * AdPlacement component for displaying Google AdSense ads
 * This component ensures ads are only shown on content-rich pages
 */
const AdPlacement: React.FC<AdPlacementProps> = ({ format = 'horizontal', className = '' }) => {
  // Format-specific classes
  const adClasses = {
    horizontal: 'w-full h-[90px] md:h-[90px]',
    vertical: 'w-[160px] h-[600px]',
    rectangle: 'w-[300px] h-[250px]',
  };
  
  return (
    <div className={`ad-container my-8 mx-auto flex justify-center items-center ${adClasses[format]} ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1941496122967255"
        data-ad-slot="auto"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      {/* Ad initialization script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (adsbygoogle = window.adsbygoogle || []).push({});
        `
      }} />
    </div>
  );
};

export default AdPlacement;
