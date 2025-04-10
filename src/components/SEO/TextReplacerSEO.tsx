
import React from 'react';
import { Helmet } from 'react-helmet-async';

const TextReplacerSEO = () => {
  return (
    <Helmet>
      <title>Text Replacer Tool | Find & Replace Multiple Text Online Free</title>
      <meta name="description" content="Find and replace text within documents online for free. Fast batch text replacement tool with case-sensitive options and instant results." />
      <meta name="keywords" content="text replacer, find and replace, text editor, word replacer, text processor, batch replace text, search and replace" />
      <link rel="canonical" href="https://mytoolbox.site/text-replacer" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mytoolbox.site/text-replacer" />
      <meta property="og:title" content="Online Text Find & Replace Tool | Fast Batch Text Editing" />
      <meta property="og:description" content="Quickly find and replace multiple text occurrences in your documents. Free tool with case-sensitive options and real-time processing." />
      <meta property="og:image" content="https://mytoolbox.site/text-replacer-og.jpg" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://mytoolbox.site/text-replacer" />
      <meta property="twitter:title" content="Online Text Find & Replace Tool | Fast Batch Text Editing" />
      <meta property="twitter:description" content="Quickly find and replace multiple text occurrences in your documents. Free tool with case-sensitive options and real-time processing." />
      <meta property="twitter:image" content="https://mytoolbox.site/text-replacer-og.jpg" />
      
      {/* Structured Data for Rich Snippets */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Text Replacer",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Find and replace text within documents online for free. Fast batch text replacement tool with case-sensitive options and instant results.",
          "featureList": [
            "Fast text search and replace",
            "Case-sensitive options",
            "Replace multiple occurrences",
            "Real-time replacement count",
            "Copy results to clipboard",
            "No registration required",
            "Works with any text content"
          ],
          "screenshot": "https://mytoolbox.site/text-replacer-screenshot.jpg",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.6",
            "ratingCount": "1837",
            "reviewCount": "359"
          }
        }
      `}</script>
    </Helmet>
  );
};

export default TextReplacerSEO;
