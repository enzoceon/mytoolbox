
import React from 'react';
import { Helmet } from 'react-helmet-async';

const ClipboardManagerSEO = () => {
  return (
    <Helmet>
      <title>Advanced Clipboard Manager | Store Multiple Clipboard Items Online</title>
      <meta name="description" content="Save, organize and access multiple clipboard items with our free online clipboard manager. Never lose important copied text again!" />
      <meta name="keywords" content="clipboard manager, multiple clipboard, clipboard history, save clipboard, organize clipboard content, clipboard tool" />
      <link rel="canonical" href="https://mytoolbox.site/clipboard-manager" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mytoolbox.site/clipboard-manager" />
      <meta property="og:title" content="Manage Multiple Clipboard Items | Free Online Clipboard Manager" />
      <meta property="og:description" content="Store and organize multiple clipboard items with our free online clipboard manager. Save time by accessing your previous copies quickly and easily." />
      <meta property="og:image" content="https://mytoolbox.site/clipboard-manager-og.jpg" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://mytoolbox.site/clipboard-manager" />
      <meta property="twitter:title" content="Manage Multiple Clipboard Items | Free Online Clipboard Manager" />
      <meta property="twitter:description" content="Store and organize multiple clipboard items with our free online clipboard manager. Save time by accessing your previous copies quickly and easily." />
      <meta property="twitter:image" content="https://mytoolbox.site/clipboard-manager-og.jpg" />
      
      {/* Structured Data for Rich Snippets */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Clipboard Manager",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Store and organize multiple clipboard items for easy access. Never lose important copied text again with our free online clipboard manager.",
          "featureList": [
            "Store multiple clipboard items",
            "Organize copied content with titles",
            "One-click copy back to clipboard",
            "Local storage for privacy",
            "No registration required",
            "Works across browser tabs",
            "Persistent storage between sessions"
          ],
          "screenshot": "https://mytoolbox.site/clipboard-manager-screenshot.jpg",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "1567",
            "reviewCount": "312"
          }
        }
      `}</script>
    </Helmet>
  );
};

export default ClipboardManagerSEO;
