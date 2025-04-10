
import React from 'react';
import { Helmet } from 'react-helmet-async';

const FileMetadataSEO = () => {
  return (
    <Helmet>
      <title>File Metadata Viewer | View Hidden File Information Online Free</title>
      <meta name="description" content="View detailed metadata and hidden information in any file type with our free online file metadata extractor. No installation or registration required." />
      <meta name="keywords" content="file metadata viewer, view file information, file properties viewer, document metadata, media file metadata, file details extractor" />
      <link rel="canonical" href="https://mytoolbox.site/file-metadata" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mytoolbox.site/file-metadata" />
      <meta property="og:title" content="File Metadata Viewer | View Hidden Information in Any File" />
      <meta property="og:description" content="Discover hidden details in your files with our free online metadata viewer. Check file properties, creation dates, and technical information for any file type." />
      <meta property="og:image" content="https://mytoolbox.site/file-metadata-og.jpg" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://mytoolbox.site/file-metadata" />
      <meta property="twitter:title" content="File Metadata Viewer | View Hidden Information in Any File" />
      <meta property="twitter:description" content="Discover hidden details in your files with our free online metadata viewer. Check file properties, creation dates, and technical information for any file type." />
      <meta property="twitter:image" content="https://mytoolbox.site/file-metadata-og.jpg" />
      
      {/* Structured Data for Rich Snippets */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "File Metadata Viewer",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "View detailed metadata and technical information in any file type. Discover hidden details about your files without any software installation.",
          "featureList": [
            "Works with any file type",
            "Extract detailed file properties",
            "View creation and modification dates",
            "Technical information display",
            "File structure analysis",
            "No software installation needed",
            "Browser-based secure processing"
          ],
          "screenshot": "https://mytoolbox.site/file-metadata-screenshot.jpg",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.6",
            "ratingCount": "936",
            "reviewCount": "183"
          }
        }
      `}</script>
    </Helmet>
  );
};

export default FileMetadataSEO;
