
import React, { useEffect, useRef } from 'react';
import { Upload, FileImage, Download } from 'lucide-react';
// Import Palette separately to ensure it's properly loaded
import { Palette } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const HowToUse = () => {
  const location = useLocation();
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (location.hash === '#how-to-use' && sectionRef.current) {
      setTimeout(() => {
        const yOffset = -80;
        const element = sectionRef.current;
        if (element) {
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  // Determine which page we're on
  const isJPGtoPNG = location.pathname === '/jpg-to-png';
  const isPdfToImage = location.pathname === '/pdf-to-image';
  const isQrCodeGenerator = location.pathname === '/qr-code-generator';
  const isTextToEmoji = location.pathname === '/text-to-emoji';
  
  const jpgToPngSteps = [
    {
      icon: <Upload className="h-8 w-8 text-blue-500" />,
      title: 'Upload Your JPG Images',
      description: 'Drag and drop JPG/JPEG files or click to browse and select from your device. Multiple files supported for batch conversion.'
    },
    {
      icon: <FileImage className="h-8 w-8 text-blue-500" />,
      title: 'Convert to PNG',
      description: 'Click the "Convert to PNG" button to transform your JPG images into transparent PNG format with preserved quality and details.'
    },
    {
      icon: <Download className="h-8 w-8 text-blue-500" />,
      title: 'Download Your PNGs',
      description: 'Once conversion is complete, download all PNG files individually or as a ZIP archive with a single click.'
    }
  ];
  
  const imageToPathSteps = [
    {
      icon: <Upload className="h-8 w-8 text-blue-500" />,
      title: 'Upload Your Images',
      description: 'Drag and drop multiple image files or click to browse and select from your device. Supports JPG, PNG, GIF, BMP, WEBP and TIFF formats.'
    },
    {
      icon: <FileImage className="h-8 w-8 text-blue-500" />,
      title: 'Convert to PDF',
      description: 'Click the "Convert to PDF" button to transform your images into a high-quality PDF document.'
    },
    {
      icon: <Download className="h-8 w-8 text-blue-500" />,
      title: 'Download Your PDF',
      description: 'Once conversion is complete, download your PDF file with a single click.'
    }
  ];
  
  const pdfToImageSteps = [
    {
      icon: <Upload className="h-8 w-8 text-blue-500" />,
      title: 'Upload Your PDF',
      description: 'Drag and drop a PDF file or click to browse and select from your device. Files up to 50MB are supported for high-quality conversion.'
    },
    {
      icon: <FileImage className="h-8 w-8 text-blue-500" />,
      title: 'Convert to Images',
      description: 'Click the "Convert to Images" button to transform your PDF pages into high-quality images. Choose between JPG or PNG format.'
    },
    {
      icon: <Download className="h-8 w-8 text-blue-500" />,
      title: 'Download Your Images',
      description: 'Once conversion is complete, download all images as a ZIP file or view and download individual pages.'
    }
  ];
  
  const qrCodeGeneratorSteps = [
    {
      icon: <FileImage className="h-8 w-8 text-blue-500" />,
      title: 'Enter QR Code Content',
      description: 'Type the URL, text, or contact information you want to encode in the QR code. Select the content type from the dropdown.'
    },
    {
      icon: <Palette className="h-8 w-8 text-blue-500" />,
      title: 'Customize Your QR Code',
      description: 'Adjust the size, colors, and error correction level to create a unique QR code that matches your requirements.'
    },
    {
      icon: <Download className="h-8 w-8 text-blue-500" />,
      title: 'Download Your QR Code',
      description: 'Once you\'re satisfied with the preview, download your QR code as a PNG image or copy it to clipboard.'
    }
  ];
  
  const textToEmojiSteps = [
    {
      icon: <FileImage className="h-8 w-8 text-blue-500" />,
      title: 'Enter Your Text',
      description: 'Type or paste the words or phrases you want to convert to emojis in the text area. You can enter single words or complete sentences.'
    },
    {
      icon: <FileImage className="h-8 w-8 text-blue-500" />,
      title: 'Convert to Emojis',
      description: 'Click the "Convert to Emojis" button to transform your text into multiple relevant emojis for each word.'
    },
    {
      icon: <Download className="h-8 w-8 text-blue-500" />,
      title: 'Copy Your Emojis',
      description: 'Browse through the emoji results for each word and click on any emoji to copy it to your clipboard for easy use elsewhere.'
    }
  ];
  
  // Choose the appropriate steps based on the current page
  let steps;
  let toolName;
  
  if (isJPGtoPNG) {
    steps = jpgToPngSteps;
    toolName = 'JPG to PNG';
  } else if (isPdfToImage) {
    steps = pdfToImageSteps;
    toolName = 'PDF to Image';
  } else if (isQrCodeGenerator) {
    steps = qrCodeGeneratorSteps;
    toolName = 'QR Code Generator';
  } else if (isTextToEmoji) {
    steps = textToEmojiSteps;
    toolName = 'Text to Emoji';
  } else {
    steps = imageToPathSteps;
    toolName = 'Image to PDF';
  }

  return (
    <section id="how-to-use" ref={sectionRef} className="py-12 px-4 bg-[#070b19]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3 text-white">How to Use {toolName}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {isJPGtoPNG 
              ? 'MyToolbox makes converting your JPG files to transparent PNG images simple and fast. Follow these three easy steps to get started.'
              : isPdfToImage 
                ? 'MyToolbox makes converting your PDF to high-quality images simple and fast. Follow these three easy steps to get started.'
                : isQrCodeGenerator
                  ? 'MyToolbox makes generating custom QR codes simple and fast. Follow these three easy steps to get started.'
                  : isTextToEmoji
                    ? 'MyToolbox makes converting your text to expressive emojis simple and fast. Follow these three easy steps to get started.'
                    : 'MyToolbox makes converting your images to PDF simple and fast. Follow these three easy steps to get started.'
            }
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-[#0c1224] p-6 rounded-xl text-center transition-all duration-300 border border-white/10 shadow-lg flex flex-col items-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-900/30 flex items-center justify-center">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
              <p className="text-sm text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
