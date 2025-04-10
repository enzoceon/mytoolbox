
import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOMetadata = () => {
  return (
    <Helmet>
      <title>MyToolbox - Free Online Tools For Everyone</title>
      <meta name="description" content="Access dozens of powerful online tools in MyToolbox. Convert, edit, animate and transform files with no sign up required." />
      <meta name="keywords" content="online tools, file converter, pdf tools, image converter, free conversion, no watermarks, batch conversion, high quality, online tool" />
      <link rel="canonical" href="https://mytoolbox.site/" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mytoolbox.site/" />
      <meta property="og:title" content="MyToolbox - Free Online Tools For Everyone | No Registration" />
      <meta property="og:description" content="Access dozens of powerful online tools in MyToolbox. Convert, edit, animate and transform files with no sign up required." />
      <meta property="og:image" content="https://mytoolbox.site/og-image.jpg" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://mytoolbox.site/" />
      <meta property="twitter:title" content="MyToolbox - Free Online Tools For Everyone | No Registration" />
      <meta property="twitter:description" content="Access dozens of powerful online tools in MyToolbox. Convert, edit, animate and transform files with no sign up required." />
      <meta property="twitter:image" content="https://mytoolbox.site/og-image.jpg" />
      
      {/* Structured Data for Rich Snippets */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "MyToolbox",
          "url": "https://mytoolbox.site/",
          "description": "Access dozens of powerful online tools in MyToolbox. Convert, edit, animate and transform files with no sign up required.",
          "applicationCategory": "Utility",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "Convert JPG, PNG, GIF, BMP, WEBP, TIFF to PDF",
            "No registration required",
            "No watermarks",
            "High quality conversion",
            "Multiple images to single PDF",
            "Browser-based processing for privacy",
            "Instant download"
          ]
        }
      `}</script>
    </Helmet>
  );
};

export default SEOMetadata;
