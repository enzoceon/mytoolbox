
import React from 'react';
import { Helmet } from 'react-helmet-async';

const QrCodeStylerSEO = () => {
  return (
    <Helmet>
      <title>QR Code Styler | Create Beautiful Custom QR Codes</title>
      <meta name="description" content="Design and create beautiful, customized QR codes with logos, colors, and styles. Use our free QR code styler to create unique QR codes for your business or personal use." />
      <meta name="keywords" content="qr code styler, custom qr codes, qr code generator, qr code with logo, colored qr codes, stylish qr codes, designer qr codes" />
      <link rel="canonical" href="/qr-code-styler" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mytoolbox.site/qr-code-styler" />
      <meta property="og:title" content="QR Code Styler | Create Beautiful Custom QR Codes" />
      <meta property="og:description" content="Design and create beautiful, customized QR codes with logos, colors, and styles. Use our free QR code styler to create unique QR codes for your business or personal use." />
      <meta property="og:image" content="https://mytoolbox.site/qr-code-styler-og.jpg" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://mytoolbox.site/qr-code-styler" />
      <meta property="twitter:title" content="QR Code Styler | Create Beautiful Custom QR Codes" />
      <meta property="twitter:description" content="Design and create beautiful, customized QR codes with logos, colors, and styles. Use our free QR code styler to create unique QR codes for your business or personal use." />
      <meta property="twitter:image" content="https://mytoolbox.site/qr-code-styler-og.jpg" />
      
      {/* Structured Data */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "QR Code Styler",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Design and create beautiful, customized QR codes with logos, colors, and styles. Use our free QR code styler to create unique QR codes for your business or personal use."
        }
      `}</script>
    </Helmet>
  );
};

export default QrCodeStylerSEO;
