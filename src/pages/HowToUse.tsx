
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
          <div className="glass-card p-8 rounded-xl bg-[#0c1224] border border-white/10 text-gray-100">
            <h1 className="text-3xl font-bold mb-6">How to Use MyToolbox</h1>
            
            <div className="prose dark:prose-invert max-w-none text-gray-300">
              <h2 className="text-white text-2xl mt-8 mb-4">QR Code Generator</h2>
              <p className="mb-4">Create custom QR codes quickly with these steps:</p>
              
              <ol className="space-y-4 list-decimal pl-6">
                <li>
                  <strong className="text-white">Enter QR Code Content</strong>: Type the URL, text, or contact information you want to encode in the QR code. Select the content type from the dropdown.
                </li>
                <li>
                  <strong className="text-white">Customize Your QR Code</strong>: Adjust the size, colors, and error correction level to create a unique QR code that matches your requirements.
                </li>
                <li>
                  <strong className="text-white">Download Your QR Code</strong>: Once you're satisfied with the preview, download your QR code as a PNG image or copy it to clipboard.
                </li>
              </ol>
              
              <h2 className="text-white text-2xl mt-8 mb-4">PDF to Image Converter</h2>
              <p className="mb-4">Need to extract images from a PDF? Here's how:</p>
              
              <ol className="space-y-4 list-decimal pl-6">
                <li>
                  <strong className="text-white">Upload Your PDF</strong>: Drag and drop a PDF file or click to browse and select from your device. Files up to 50MB are supported for high-quality conversion.
                </li>
                <li>
                  <strong className="text-white">Convert to Images</strong>: Click the "Convert to Images" button to transform your PDF pages into high-quality images. Choose between JPG or PNG format.
                </li>
                <li>
                  <strong className="text-white">Download Your Images</strong>: Once conversion is complete, download all images as a ZIP file or view and download individual pages.
                </li>
              </ol>
              
              <h2 className="text-white text-2xl mt-8 mb-4">JPG to PNG Converter</h2>
              <p className="mb-4">Convert your JPG files to transparent PNG images with these steps:</p>
              
              <ol className="space-y-4 list-decimal pl-6">
                <li>
                  <strong className="text-white">Upload Your JPG Images</strong>: Drag and drop JPG/JPEG files or click to browse and select from your device. Multiple files supported for batch conversion.
                </li>
                <li>
                  <strong className="text-white">Convert to PNG</strong>: Click the "Convert to PNG" button to transform your JPG images into transparent PNG format with preserved quality and details.
                </li>
                <li>
                  <strong className="text-white">Download Your PNGs</strong>: Once conversion is complete, download all PNG files individually or as a ZIP archive with a single click.
                </li>
              </ol>
            </div>
            
            <p className="mt-10 text-sm text-gray-400">
              Last Updated: April 8, 2025
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default HowToUse;
