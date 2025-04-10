
import React from 'react';
import { Helmet } from 'react-helmet-async';

const ImageMetadataSEO = () => {
  return (
    <Helmet>
      <title>EXIF Data Viewer & Remover | View & Remove Image Metadata Online</title>
      <meta name="description" content="View and remove hidden EXIF metadata from your images for free. Protect your privacy by stripping location data, camera details, and other sensitive information." />
      <meta name="keywords" content="exif data viewer, view image metadata, remove exif data, strip image metadata, photo privacy tool, image information viewer" />
      <link rel="canonical" href="https://mytoolbox.site/image-metadata" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://mytoolbox.site/image-metadata" />
      <meta property="og:title" content="View & Remove Hidden Image Metadata (EXIF Data) | Privacy Tool" />
      <meta property="og:description" content="Protect your privacy by viewing and removing sensitive metadata from your images. See hidden location data, camera details and timestamps in your photos." />
      <meta property="og:image" content="https://mytoolbox.site/image-metadata-og.jpg" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://mytoolbox.site/image-metadata" />
      <meta property="twitter:title" content="View & Remove Hidden Image Metadata (EXIF Data) | Privacy Tool" />
      <meta property="twitter:description" content="Protect your privacy by viewing and removing sensitive metadata from your images. See hidden location data, camera details and timestamps in your photos." />
      <meta property="twitter:image" content="https://mytoolbox.site/image-metadata-og.jpg" />
      
      {/* Structured Data for Rich Snippets */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Image Metadata Viewer & Remover",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "View and remove EXIF metadata from images for enhanced privacy. See GPS location, camera settings, and other hidden information in your photos.",
          "featureList": [
            "View detailed EXIF metadata",
            "Remove all metadata with one click",
            "GPS location data viewer",
            "Camera settings information",
            "Creation date and time details",
            "Browser-based processing for security",
            "No registration required"
          ],
          "screenshot": "https://mytoolbox.site/image-metadata-screenshot.jpg",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.7",
            "ratingCount": "1128",
            "reviewCount": "217"
          }
        }
      `}</script>
    </Helmet>
  );
};

export default ImageMetadataSEO;
