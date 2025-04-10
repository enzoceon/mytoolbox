
import React from 'react';
import { Helmet } from 'react-helmet-async';

const PdfToImageSEO = () => {
  return (
    <Helmet>
      <title>PDF to Image Converter | Convert PDF to JPG & PNG Online Free</title>
      <meta name="description" content="Convert PDF documents to high-quality JPG, PNG, and other image formats online for free. No watermarks, no registration, instant download." />
      <meta name="keywords" content="pdf to image, convert pdf to jpg, pdf to png converter, extract images from pdf, pdf pages to images, pdf converter online" />
      <link rel="canonical" href="https://mytoolbox.site/pdf-to-image" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mytoolbox.site/pdf-to-image" />
      <meta property="og:title" content="Convert PDF to Images | Free Online PDF to JPG & PNG Tool" />
      <meta property="og:description" content="Transform PDF documents into high-quality JPG and PNG images with our free online converter. No registration required, no watermarks added." />
      <meta property="og:image" content="https://mytoolbox.site/pdf-to-image-og.jpg" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://mytoolbox.site/pdf-to-image" />
      <meta property="twitter:title" content="Convert PDF to Images | Free Online PDF to JPG & PNG Tool" />
      <meta property="twitter:description" content="Transform PDF documents into high-quality JPG and PNG images with our free online converter. No registration required, no watermarks added." />
      <meta property="twitter:image" content="https://mytoolbox.site/pdf-to-image-og.jpg" />
      
      {/* Structured Data for Rich Snippets */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "PDF to Image Converter",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Convert PDF documents to high-quality JPG, PNG and other image formats. Free online tool with no registration required and no watermarks.",
          "featureList": [
            "Convert PDF to JPG, PNG and other formats",
            "High-quality image conversion",
            "Individual page extraction",
            "Batch conversion of multiple pages",
            "Preserve original quality",
            "No watermarks added",
            "No registration required"
          ],
          "screenshot": "https://mytoolbox.site/pdf-to-image-screenshot.jpg",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "3562",
            "reviewCount": "714"
          }
        }
      `}</script>
    </Helmet>
  );
};

export default PdfToImageSEO;
