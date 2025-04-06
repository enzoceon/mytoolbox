
import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOMetadata = () => {
  return (
    <Helmet>
      <title>Image to PDF - Free Online Image to PDF Converter | No Registration Required</title>
      <meta name="description" content="Instantly convert JPG, PNG, GIF, BMP, WEBP, TIFF and other image formats to PDF for free. No registration, no watermarks, no file size limits. Fast. Free. Fluid." />
      <meta name="keywords" content="image to pdf, jpg to pdf, png to pdf, image converter, pdf creator, free conversion, no watermarks, batch conversion, high quality, online tool" />
      <link rel="canonical" href="https://image2pdf.site/" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://image2pdf.site/" />
      <meta property="og:title" content="Image to PDF - Convert Images to PDF Instantly | 100% Free" />
      <meta property="og:description" content="Convert images to PDF with just a few clicks. Free, secure, browser-based conversion with no watermarks or registration. Fast. Free. Fluid." />
      <meta property="og:image" content="https://image2pdf.site/og-image.jpg" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://image2pdf.site/" />
      <meta property="twitter:title" content="Image to PDF - Convert Images to PDF Instantly | 100% Free" />
      <meta property="twitter:description" content="Convert images to PDF with just a few clicks. Free, secure, browser-based conversion with no watermarks or registration. Fast. Free. Fluid." />
      <meta property="twitter:image" content="https://image2pdf.site/og-image.jpg" />
      
      {/* Structured Data for Rich Snippets */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Image to PDF",
          "url": "https://image2pdf.site/",
          "description": "Free online tool to convert images to PDF documents without watermarks or registration. Fast. Free. Fluid.",
          "applicationCategory": "Utility",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "Convert JPG, PNG, GIF, BMP, WEBP, TIFF to PDF",
            "No registration required",
            "No watermarks",
            "High quality conversion",
            "Multiple images to single PDF",
            "Browser-based processing for privacy",
            "Instant download"
          ]
        }
      `}</script>
    </Helmet>
  );
};

export default SEOMetadata;
