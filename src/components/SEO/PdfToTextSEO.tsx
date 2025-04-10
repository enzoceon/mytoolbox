
import React from 'react';
import { Helmet } from 'react-helmet-async';

const PdfToTextSEO: React.FC = () => {
  return (
    <Helmet>
      <title>PDF to Text Converter - Extract Text from PDF Files | MyToolbox</title>
      <meta 
        name="description" 
        content="Extract text from PDF files with our free online PDF to Text converter. No registration required, works with all PDF documents." 
      />
      <meta 
        name="keywords" 
        content="pdf to text, extract text from pdf, pdf text extractor, pdf converter, convert pdf to text, online pdf tool" 
      />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="PDF to Text Converter - Extract Text from PDF Files" />
      <meta property="og:description" content="Extract text from PDF files with our free online PDF to Text converter." />
      <meta property="og:url" content="https://mytoolbox.site/pdf-to-text" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="PDF to Text Converter - Extract Text from PDF Files" />
      <meta name="twitter:description" content="Extract text from PDF files with our free online PDF to Text converter." />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://mytoolbox.site/pdf-to-text" />
    </Helmet>
  );
};

export default PdfToTextSEO;
