
import React from 'react';
import { Helmet } from 'react-helmet-async';

const AddAudioToVideoSEO = () => {
  return (
    <Helmet>
      <title>Add Audio to Video | Free Online Video Sound Mixer & Editor</title>
      <meta name="description" content="Add or replace audio tracks in your videos for free online. Combine video with music, voiceovers, or sound effects without installing any software." />
      <meta name="keywords" content="add audio to video, replace video sound, video audio mixer, combine audio and video, video sound editor, add music to video" />
      <link rel="canonical" href="https://mytoolbox.site/add-audio-to-video" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mytoolbox.site/add-audio-to-video" />
      <meta property="og:title" content="Add Audio to Video Online | Free Video Sound Editor" />
      <meta property="og:description" content="Easily add or replace audio tracks in your videos for free. Combine your video with music, voiceovers, or sound effects - no software installation needed." />
      <meta property="og:image" content="https://mytoolbox.site/add-audio-to-video-og.jpg" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://mytoolbox.site/add-audio-to-video" />
      <meta property="twitter:title" content="Add Audio to Video Online | Free Video Sound Editor" />
      <meta property="twitter:description" content="Easily add or replace audio tracks in your videos for free. Combine your video with music, voiceovers, or sound effects - no software installation needed." />
      <meta property="twitter:image" content="https://mytoolbox.site/add-audio-to-video-og.jpg" />
      
      {/* Structured Data for Rich Snippets */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Add Audio to Video",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Add or replace audio tracks in videos online for free. Combine your video with background music, voiceovers, or sound effects without installing any software.",
          "featureList": [
            "Add any audio file to video",
            "Replace existing audio tracks",
            "Adjust audio volume",
            "Preview before processing",
            "High-quality processing",
            "Browser-based - no downloads needed",
            "Supports all common video and audio formats"
          ],
          "screenshot": "https://mytoolbox.site/add-audio-to-video-screenshot.jpg",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "2173",
            "reviewCount": "428"
          }
        }
      `}</script>
    </Helmet>
  );
};

export default AddAudioToVideoSEO;
