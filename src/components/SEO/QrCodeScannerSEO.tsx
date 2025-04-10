
import React from 'react';
import { Helmet } from 'react-helmet-async';

const QrCodeScannerSEO = () => {
  return (
    <Helmet>
      <title>QR Code Scanner | Scan QR Codes from Images or Webcam</title>
      <meta name="description" content="Use our free QR code scanner to scan and decode QR codes from your webcam or uploaded images. Works on mobile and desktop devices." />
      <meta name="keywords" content="qr code scanner, scan qr codes, qr code reader, webcam qr scanner, qr code decoder, mobile qr code scanner" />
      <link rel="canonical" href="/qr-code-scanner" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mytoolbox.site/qr-code-scanner" />
      <meta property="og:title" content="QR Code Scanner | Scan QR Codes from Images or Webcam" />
      <meta property="og:description" content="Use our free QR code scanner to scan and decode QR codes from your webcam or uploaded images. Works on mobile and desktop devices." />
      <meta property="og:image" content="https://mytoolbox.site/qr-code-scanner-og.jpg" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://mytoolbox.site/qr-code-scanner" />
      <meta property="twitter:title" content="QR Code Scanner | Scan QR Codes from Images or Webcam" />
      <meta property="twitter:description" content="Use our free QR code scanner to scan and decode QR codes from your webcam or uploaded images. Works on mobile and desktop devices." />
      <meta property="twitter:image" content="https://mytoolbox.site/qr-code-scanner-og.jpg" />
      
      {/* Structured Data */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "QR Code Scanner",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Use our free QR code scanner to scan and decode QR codes from your webcam or uploaded images. Works on mobile and desktop devices."
        }
      `}</script>
    </Helmet>
  );
};

export default QrCodeScannerSEO;
