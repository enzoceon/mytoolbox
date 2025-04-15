
import React from 'react';
import { Helmet } from 'react-helmet-async';

const FileRenamerSEO = () => {
  return (
    <Helmet>
      <title>Bulk File Renamer | Rename Multiple Files Online Free</title>
      <meta name="description" content="Rename multiple files at once with our free online batch file renamer. Add prefixes, suffixes, sequential numbering, and custom patterns without installing any software." />
      <meta name="keywords" content="file renamer, batch rename files, rename multiple files, file name changer, file renaming tool, online file renamer" />
      <link rel="canonical" href="https://mytoolbox.site/file-renamer" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mytoolbox.site/file-renamer" />
      <meta property="og:title" content="Batch File Renamer | Rename Multiple Files Online Free" />
      <meta property="og:description" content="Rename multiple files at once with our free online batch file renamer. Add prefixes, suffixes, sequential numbering, and custom patterns without installing any software." />
      <meta property="og:image" content="https://mytoolbox.site/file-renamer-og.jpg" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://mytoolbox.site/file-renamer" />
      <meta property="twitter:title" content="Batch File Renamer | Rename Multiple Files Online Free" />
      <meta property="twitter:description" content="Rename multiple files at once with our free online batch file renamer. Add prefixes, suffixes, sequential numbering, and custom patterns without installing any software." />
      <meta property="twitter:image" content="https://mytoolbox.site/file-renamer-og.jpg" />
      
      {/* Structured Data for Rich Snippets */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "File Renamer",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Rename multiple files at once with our free online batch file renamer. Add prefixes, suffixes, sequential numbering, and custom patterns without installing any software.",
          "featureList": [
            "Batch rename multiple files",
            "Add prefixes and suffixes",
            "Sequential numbering option",
            "Custom pattern templates",
            "Date and timestamp insertion",
            "Preview changes before downloading",
            "No software installation required"
          ],
          "screenshot": "https://mytoolbox.site/file-renamer-screenshot.jpg",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "957",
            "reviewCount": "214"
          }
        }
      `}</script>
    </Helmet>
  );
};

export default FileRenamerSEO;
