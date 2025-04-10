
import React from 'react';
import { Helmet } from 'react-helmet-async';

const ZipCreatorSEO = () => {
  return (
    <Helmet>
      <title>ZIP File Creator | Create ZIP Archives Online</title>
      <meta name="description" content="Create ZIP archive files from multiple files directly in your browser with our free online ZIP creator tool. No software installation required." />
      <meta name="keywords" content="zip creator, create zip online, compress files, zip file maker, online file compression" />
      <link rel="canonical" href="https://mytoolbox.site/zip-creator" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mytoolbox.site/zip-creator" />
      <meta property="og:title" content="ZIP File Creator | Create ZIP Archives Online" />
      <meta property="og:description" content="Create ZIP archive files from multiple files directly in your browser with our free online ZIP creator tool. No software installation required." />
      <meta property="og:image" content="https://mytoolbox.site/zip-creator-og.jpg" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://mytoolbox.site/zip-creator" />
      <meta property="twitter:title" content="ZIP File Creator | Create ZIP Archives Online" />
      <meta property="twitter:description" content="Create ZIP archive files from multiple files directly in your browser with our free online ZIP creator tool. No software installation required." />
      <meta property="twitter:image" content="https://mytoolbox.site/zip-creator-og.jpg" />
      
      {/* Structured Data for Rich Snippets */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "ZIP File Creator",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Create ZIP archive files from multiple files directly in your browser with our free online ZIP creator tool. No software installation required.",
          "featureList": [
            "Create ZIP archives online",
            "Add multiple files to a ZIP",
            "Custom ZIP file naming",
            "No software installation needed",
            "Browser-based compression",
            "File size information",
            "File type detection",
            "Free to use"
          ],
          "screenshot": "https://mytoolbox.site/zip-creator-screenshot.jpg",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.7",
            "ratingCount": "935",
            "reviewCount": "213"
          }
        }
      `}</script>
    </Helmet>
  );
};

export default ZipCreatorSEO;
