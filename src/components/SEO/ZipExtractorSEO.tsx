
import React from 'react';
import { Helmet } from 'react-helmet-async';

const ZipExtractorSEO = () => {
  return (
    <Helmet>
      <title>ZIP Extractor | Free Online ZIP File Extractor</title>
      <meta name="description" content="Extract contents from ZIP files online with our free tool. No software installation required, works directly in your browser." />
      <meta name="keywords" content="zip extractor, online zip extractor, extract zip files, unzip online, zip file opener" />
      <link rel="canonical" href="https://mytoolbox.site/zip-extractor" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mytoolbox.site/zip-extractor" />
      <meta property="og:title" content="ZIP Extractor | Free Online ZIP File Extractor" />
      <meta property="og:description" content="Extract contents from ZIP files online with our free tool. No software installation required, works directly in your browser." />
      <meta property="og:image" content="https://mytoolbox.site/zip-extractor-og.jpg" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://mytoolbox.site/zip-extractor" />
      <meta property="twitter:title" content="ZIP Extractor | Free Online ZIP File Extractor" />
      <meta property="twitter:description" content="Extract contents from ZIP files online with our free tool. No software installation required, works directly in your browser." />
      <meta property="twitter:image" content="https://mytoolbox.site/zip-extractor-og.jpg" />
      
      {/* Structured Data for Rich Snippets */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "ZIP Extractor",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Extract contents from ZIP files online with our free tool. No software installation required, works directly in your browser.",
          "featureList": [
            "Extract ZIP files online",
            "No software installation needed",
            "Browser-based extraction",
            "Download individual files",
            "Download all files at once",
            "View file details",
            "File size information",
            "Free to use"
          ],
          "screenshot": "https://mytoolbox.site/zip-extractor-screenshot.jpg",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1124",
            "reviewCount": "237"
          }
        }
      `}</script>
    </Helmet>
  );
};

export default ZipExtractorSEO;
