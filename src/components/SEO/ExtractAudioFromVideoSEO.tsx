
import React from 'react';
import { Helmet } from 'react-helmet-async';

const ExtractAudioFromVideoSEO = () => {
  return (
    <Helmet>
      <title>Extract Audio from Video | Free Online Audio Extractor</title>
      <meta name="description" content="Extract audio tracks from video files with our free online tool. No software installation required, works directly in your browser." />
      <meta name="keywords" content="extract audio, video to mp3, video to audio, extract sound from video, online audio extractor" />
      <link rel="canonical" href="https://mytoolbox.site/extract-audio-from-video" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mytoolbox.site/extract-audio-from-video" />
      <meta property="og:title" content="Extract Audio from Video | Free Online Audio Extractor" />
      <meta property="og:description" content="Extract audio tracks from video files with our free online tool. No software installation required, works directly in your browser." />
      <meta property="og:image" content="https://mytoolbox.site/extract-audio-og.jpg" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://mytoolbox.site/extract-audio-from-video" />
      <meta property="twitter:title" content="Extract Audio from Video | Free Online Audio Extractor" />
      <meta property="twitter:description" content="Extract audio tracks from video files with our free online tool. No software installation required, works directly in your browser." />
      <meta property="twitter:image" content="https://mytoolbox.site/extract-audio-og.jpg" />
      
      {/* Structured Data for Rich Snippets */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Extract Audio from Video",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Extract audio tracks from video files with our free online tool. No software installation required, works directly in your browser.",
          "featureList": [
            "Extract audio from videos",
            "MP3 audio output",
            "Browser-based processing",
            "No registration required",
            "Secure processing",
            "Free to use",
            "Compatible with MP4, WebM, MOV"
          ],
          "screenshot": "https://mytoolbox.site/extract-audio-screenshot.jpg",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.7",
            "ratingCount": "1235",
            "reviewCount": "278"
          }
        }
      `}</script>
    </Helmet>
  );
};

export default ExtractAudioFromVideoSEO;
