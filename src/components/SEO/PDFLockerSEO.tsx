
import React from 'react';
import { Helmet } from 'react-helmet-async';

const PDFLockerSEO = () => {
  return (
    <Helmet>
      <title>PDF Password Protector | Secure PDF Files Online Free</title>
      <meta name="description" content="Protect sensitive PDF documents with passwords using our free PDF Locker tool. Add 256-bit AES encryption to your files with no registration required." />
      <meta name="keywords" content="pdf password protection, secure pdf files, encrypt pdf, password protect pdf, pdf security, pdf locker, free pdf encryption" />
      <link rel="canonical" href="https://mytoolbox.site/pdf-locker" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mytoolbox.site/pdf-locker" />
      <meta property="og:title" content="Password Protect PDF Files Online | Free PDF Security Tool" />
      <meta property="og:description" content="Protect sensitive PDF documents with strong encryption. Add password protection to your PDF files in seconds with no registration or watermarks." />
      <meta property="og:image" content="https://mytoolbox.site/pdf-locker-og.jpg" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://mytoolbox.site/pdf-locker" />
      <meta property="twitter:title" content="Password Protect PDF Files Online | Free PDF Security Tool" />
      <meta property="twitter:description" content="Protect sensitive PDF documents with strong encryption. Add password protection to your PDF files in seconds with no registration or watermarks." />
      <meta property="twitter:image" content="https://mytoolbox.site/pdf-locker-og.jpg" />
      
      {/* Structured Data for Rich Snippets */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "PDF Locker",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Protect PDF documents with passwords using 256-bit AES encryption. Free online tool with no registration required.",
          "featureList": [
            "Password protect PDF files",
            "256-bit AES encryption",
            "No registration required",
            "No watermarks added",
            "Browser-based processing for security",
            "Compatible with all PDF viewers",
            "Instant downloading"
          ],
          "screenshot": "https://mytoolbox.site/pdf-locker-screenshot.jpg",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1354",
            "reviewCount": "256"
          }
        }
      `}</script>
    </Helmet>
  );
};

export default PDFLockerSEO;
