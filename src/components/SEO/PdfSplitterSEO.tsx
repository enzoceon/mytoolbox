
import React from 'react';
import { Helmet } from 'react-helmet-async';

const PdfSplitterSEO = () => {
  return (
    <Helmet>
      <title>PDF Splitter | Split PDF Files Online Free | MyToolbox</title>
      <meta name="description" content="Split PDF files into individual pages or custom page ranges online for free. Extract pages from PDF documents without installing software. No registration required." />
      <meta name="keywords" content="pdf splitter, split pdf, extract pdf pages, pdf page extractor, pdf cutter, online pdf splitter, free pdf tool" />
      <link rel="canonical" href="https://mytoolbox.site/pdf-splitter" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mytoolbox.site/pdf-splitter" />
      <meta property="og:title" content="PDF Splitter | Split PDF Files Online Free | MyToolbox" />
      <meta property="og:description" content="Split PDF files into individual pages or custom page ranges. Extract specific pages from PDF documents with our free online PDF splitter tool." />
      <meta property="og:image" content="https://mytoolbox.site/pdf-splitter-og.jpg" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://mytoolbox.site/pdf-splitter" />
      <meta property="twitter:title" content="PDF Splitter | Split PDF Files Online Free | MyToolbox" />
      <meta property="twitter:description" content="Split PDF files into individual pages or custom page ranges. Extract specific pages from PDF documents with our free online PDF splitter tool." />
      <meta property="twitter:image" content="https://mytoolbox.site/pdf-splitter-og.jpg" />
      
      {/* Structured Data for Rich Snippets */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "PDF Splitter",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Split PDF files into individual pages or custom page ranges. Extract specific pages from PDF documents with our free online PDF splitter tool. No registration or software installation required.",
          "featureList": [
            "Split PDF into individual pages",
            "Extract specific page ranges",
            "No software installation required",
            "No registration needed",
            "Works on all devices",
            "Privacy-focused processing",
            "Instant download of results"
          ],
          "screenshot": "https://mytoolbox.site/pdf-splitter-screenshot.jpg",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.7",
            "ratingCount": "1623",
            "reviewCount": "312"
          }
        }
      `}</script>
    </Helmet>
  );
};

export default PdfSplitterSEO;
