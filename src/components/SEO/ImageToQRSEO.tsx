
import React from 'react';
import { Helmet } from 'react-helmet-async';

const ImageToQRSEO = () => {
  return (
    <Helmet>
      <title>Image to QR Code Converter | Free Online Tool</title>
      <meta name="description" content="Convert your images to scannable QR codes with our free online tool. No registration required, processing happens in your browser." />
      <meta name="keywords" content="image to qr code, convert image to qr, qr code generator, image qr code, create qr code from image" />
      <link rel="canonical" href="https://mytoolbox.site/image-to-qr" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mytoolbox.site/image-to-qr" />
      <meta property="og:title" content="Image to QR Code Converter | Free Online Tool" />
      <meta property="og:description" content="Convert your images to scannable QR codes with our free online tool. No registration required, processing happens in your browser." />
      <meta property="og:image" content="https://mytoolbox.site/image-to-qr-og.jpg" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://mytoolbox.site/image-to-qr" />
      <meta property="twitter:title" content="Image to QR Code Converter | Free Online Tool" />
      <meta property="twitter:description" content="Convert your images to scannable QR codes with our free online tool. No registration required, processing happens in your browser." />
      <meta property="twitter:image" content="https://mytoolbox.site/image-to-qr-og.jpg" />
      
      {/* Structured Data */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Image to QR Code Converter",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Convert your images to scannable QR codes with our free online tool. No registration required, processing happens in your browser."
        }
      `}</script>
    </Helmet>
  );
};

export default ImageToQRSEO;
