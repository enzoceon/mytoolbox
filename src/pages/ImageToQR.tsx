
import React from 'react';
import ComingSoon from './ComingSoon';
import ImageToQRSEO from '@/components/SEO/ImageToQRSEO';

const ImageToQR = () => {
  return (
    <>
      <ImageToQRSEO />
      <ComingSoon 
        title="Image to QR Code Converter" 
        description="Convert your images to scannable QR codes. This feature is coming soon!" 
      />
    </>
  );
};

export default ImageToQR;
