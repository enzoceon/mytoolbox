
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';

const HowToUse = () => {
  return (
    <>
      <Helmet>
        <title>How to Use - MyToolbox</title>
        <meta name="description" content="Learn how to use MyToolbox's online conversion tools with our step-by-step guide." />
      </Helmet>
      
      <BackgroundAnimation />
      <Header />
      
      <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-200px)]">
        <div className="mb-6">
          <Link to="/" className="inline-block">
            <Button variant="outline" size="sm" className="gap-2 bg-background/80 backdrop-blur-sm border-border/40">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">How to Use MyToolbox</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <h2>Image to PDF Converter</h2>
            <p>Converting your images to PDF is simple and fast with MyToolbox. Follow these three easy steps:</p>
            
            <ol>
              <li>
                <strong>Upload Your Images</strong>: Drag and drop multiple image files or click to browse and select from your device. Supports JPG, PNG, GIF, BMP, WEBP and TIFF formats.
              </li>
              <li>
                <strong>Convert to PDF</strong>: Click the "Convert to PDF" button to transform your images into a high-quality PDF document.
              </li>
              <li>
                <strong>Download Your PDF</strong>: Once conversion is complete, download your PDF file with a single click.
              </li>
            </ol>
            
            <h2>PDF to Image Converter</h2>
            <p>Need to extract images from a PDF? Here's how:</p>
            
            <ol>
              <li>
                <strong>Upload Your PDF</strong>: Drag and drop a PDF file or click to browse and select from your device. Files up to 50MB are supported for high-quality conversion.
              </li>
              <li>
                <strong>Convert to Images</strong>: Click the "Convert to Images" button to transform your PDF pages into high-quality images. Choose between JPG or PNG format.
              </li>
              <li>
                <strong>Download Your Images</strong>: Once conversion is complete, download all images as a ZIP file or view and download individual pages.
              </li>
            </ol>
            
            <h2>JPG to PNG Converter</h2>
            <p>Convert your JPG files to transparent PNG images with these steps:</p>
            
            <ol>
              <li>
                <strong>Upload Your JPG Images</strong>: Drag and drop JPG/JPEG files or click to browse and select from your device. Multiple files supported for batch conversion.
              </li>
              <li>
                <strong>Convert to PNG</strong>: Click the "Convert to PNG" button to transform your JPG images into transparent PNG format with preserved quality and details.
              </li>
              <li>
                <strong>Download Your PNGs</strong>: Once conversion is complete, download all PNG files individually or as a ZIP archive with a single click.
              </li>
            </ol>
            
            <h2>QR Code Generator</h2>
            <p>Create custom QR codes quickly with these steps:</p>
            
            <ol>
              <li>
                <strong>Enter QR Code Content</strong>: Type the URL, text, or contact information you want to encode in the QR code. Select the content type from the dropdown.
              </li>
              <li>
                <strong>Customize Your QR Code</strong>: Adjust the size, colors, and error correction level to create a unique QR code that matches your requirements.
              </li>
              <li>
                <strong>Download Your QR Code</strong>: Once you're satisfied with the preview, download your QR code as a PNG image or copy it to clipboard.
              </li>
            </ol>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default HowToUse;
