
import React from 'react';
import { Helmet } from 'react-helmet-async';

const TextToSpeechSEO = () => {
  return (
    <Helmet>
      <title>Text to Speech Converter | Free Online TTS Generator</title>
      <meta name="description" content="Convert text to natural-sounding speech with our free online text to speech tool. Adjust voice, speed, pitch, and download MP3 audio files with no registration required." />
      <meta name="keywords" content="text to speech, tts, speech generator, voice generator, text to voice, free tts, online speech generator" />
      <link rel="canonical" href="https://mytoolbox.site/text-to-speech" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mytoolbox.site/text-to-speech" />
      <meta property="og:title" content="Text to Speech Converter | Free Online TTS Generator" />
      <meta property="og:description" content="Convert text to natural-sounding speech with our free online text to speech tool. Adjust voice, speed, pitch, and download MP3 audio files with no registration required." />
      <meta property="og:image" content="https://mytoolbox.site/text-to-speech-og.jpg" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://mytoolbox.site/text-to-speech" />
      <meta property="twitter:title" content="Text to Speech Converter | Free Online TTS Generator" />
      <meta property="twitter:description" content="Convert text to natural-sounding speech with our free online text to speech tool. Adjust voice, speed, pitch, and download MP3 audio files with no registration required." />
      <meta property="twitter:image" content="https://mytoolbox.site/text-to-speech-og.jpg" />
      
      {/* Structured Data for Rich Snippets */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Text to Speech Converter",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Convert text to natural-sounding speech with our free online text to speech tool. Adjust voice, speed, pitch, and download MP3 audio files with no registration required.",
          "featureList": [
            "Convert text to natural speech",
            "Multiple voice options",
            "Adjustable speed and pitch",
            "Volume control",
            "MP3 download option",
            "No registration required",
            "Works on all devices"
          ],
          "screenshot": "https://mytoolbox.site/text-to-speech-screenshot.jpg",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "2145",
            "reviewCount": "418"
          }
        }
      `}</script>
    </Helmet>
  );
};

export default TextToSpeechSEO;
