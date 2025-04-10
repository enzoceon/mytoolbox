
import React from 'react';
import { Helmet } from 'react-helmet-async';

const WordCounterSEO = () => {
  return (
    <Helmet>
      <title>Word Counter | Free Online Word Count Tool</title>
      <meta name="description" content="Count words, characters, sentences, and paragraphs in your text with our free online word counter tool. Get reading time estimates and word frequency analysis." />
      <meta name="keywords" content="word counter, character count, word count, text analysis, reading time calculator" />
      <link rel="canonical" href="https://mytoolbox.site/word-counter" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mytoolbox.site/word-counter" />
      <meta property="og:title" content="Word Counter | Free Online Word Count Tool" />
      <meta property="og:description" content="Count words, characters, sentences, and paragraphs in your text with our free online word counter tool. Get reading time estimates and word frequency analysis." />
      <meta property="og:image" content="https://mytoolbox.site/word-counter-og.jpg" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://mytoolbox.site/word-counter" />
      <meta property="twitter:title" content="Word Counter | Free Online Word Count Tool" />
      <meta property="twitter:description" content="Count words, characters, sentences, and paragraphs in your text with our free online word counter tool. Get reading time estimates and word frequency analysis." />
      <meta property="twitter:image" content="https://mytoolbox.site/word-counter-og.jpg" />
      
      {/* Structured Data for Rich Snippets */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Word Counter",
          "applicationCategory": "WebApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Count words, characters, sentences, and paragraphs in your text with our free online word counter tool. Get reading time estimates and word frequency analysis.",
          "featureList": [
            "Word count",
            "Character count",
            "Sentence count",
            "Paragraph count",
            "Reading time estimation",
            "Word frequency analysis",
            "No registration required",
            "Free to use"
          ],
          "screenshot": "https://mytoolbox.site/word-counter-screenshot.jpg",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "952",
            "reviewCount": "189"
          }
        }
      `}</script>
    </Helmet>
  );
};

export default WordCounterSEO;
