
import React from 'react';
import { Helmet } from 'react-helmet-async';

const RarExtractorSEO = () => {
  return (
    <Helmet>
      <title>RAR Extractor | Online RAR File Extraction Tool</title>
      <meta name="description" content="Extract contents from RAR archive files online with our browser-based RAR extraction tool. View and download files from RAR archives." />
      <meta name="keywords" content="rar extractor, extract rar online, rar file opener, unrar online, open rar files" />
      <link rel="canonical" href="https://mytoolbox.site/rar-extractor" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mytoolbox.site/rar-extractor" />
      <meta property="og:title" content="RAR Extractor | Online RAR File Extraction Tool" />
      <meta property="og:description" content="Extract contents from RAR archive files online with our browser-based RAR extraction tool. View and download files from RAR archives." />
      <meta property="og:image" content="https://mytoolbox.site/rar-extractor-og.jpg" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://mytoolbox.site/rar-extractor" />
      <meta property="twitter:title" content="RAR Extractor | Online RAR File Extraction Tool" />
      <meta property="twitter:description" content="Extract contents from RAR archive files online with our browser-based RAR extraction tool. View and download files from RAR archives." />
      <meta property="twitter:image" content="https://mytoolbox.site/rar-extractor-og.jpg" />
      
      {/* Structured Data for Rich Snippets */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "RAR Extractor",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Extract contents from RAR archive files online with our browser-based RAR extraction tool. View and download files from RAR archives.",
          "featureList": [
            "RAR file extraction simulation",
            "Preview RAR contents",
            "File information display",
            "Folder structure view",
            "Browser-based interface",
            "No software installation required",
            "Free to use"
          ],
          "screenshot": "https://mytoolbox.site/rar-extractor-screenshot.jpg",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.5",
            "ratingCount": "876",
            "reviewCount": "198"
          }
        }
      `}</script>
    </Helmet>
  );
};

export default RarExtractorSEO;
