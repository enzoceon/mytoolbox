
import React from 'react';
import { Helmet } from 'react-helmet-async';

const UnitConverterSEO: React.FC = () => {
  return (
    <Helmet>
      <title>Unit Converter - Convert Between Different Measurement Units | MyToolbox</title>
      <meta 
        name="description" 
        content="Convert between different units of measurement with our free online unit converter. Handles length, weight, volume, temperature, area, speed and more." 
      />
      <meta 
        name="keywords" 
        content="unit converter, measurement converter, length converter, weight converter, temperature converter, metric to imperial, conversion tool" 
      />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Unit Converter - Convert Between Different Measurement Units" />
      <meta property="og:description" content="Convert between different units of measurement with our free online unit converter." />
      <meta property="og:url" content="https://mytoolbox.site/unit-converter" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Unit Converter - Convert Between Different Measurement Units" />
      <meta name="twitter:description" content="Convert between different units of measurement with our free online unit converter." />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://mytoolbox.site/unit-converter" />
    </Helmet>
  );
};

export default UnitConverterSEO;
