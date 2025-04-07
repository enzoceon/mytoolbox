
import React, { useEffect, useRef } from 'react';
import { Upload, FileImage, Download } from 'lucide-react';
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
      description: 'Once conversion is complete, download all PNG files individually or as a ZIP archive with a single click. No watermarks added.'
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
      description: 'Click the "Convert to PDF" button to transform your images into a high-quality PDF document. Arrange and reorder images as needed before conversion.'
    },
    {
      icon: <Download className="h-8 w-8 text-blue-500" />,
      title: 'Download Your PDF',
      description: 'Once conversion is complete, download your PDF file with a single click. Your document will be ready to view, share, or print without watermarks.'
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
      description: 'Click the "Convert to Images" button to transform your PDF pages into high-quality images. Choose between JPG or PNG format and adjust quality settings.'
    },
    {
      icon: <Download className="h-8 w-8 text-blue-500" />,
      title: 'Download Your Images',
      description: 'Once conversion is complete, download all images as a ZIP file or view and download individual pages. All images maintain the original PDF quality.'
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
  } else {
    steps = imageToPathSteps;
    toolName = 'Image to PDF';
  }

  return (
    <section id="how-to-use" ref={sectionRef} className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">How to Use {toolName}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {isJPGtoPNG 
              ? 'Converting your JPG files to transparent PNG images is simple and fast. Follow these three easy steps to get started.'
              : isPdfToImage 
                ? 'Converting your PDF to high-quality images is simple and fast. Follow these three easy steps to get started.'
                : 'Converting your images to a professional PDF document is simple and fast. Follow these three easy steps to get started.'
            }
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-[#0c1224] p-6 rounded-xl text-center transition-transform hover:scale-105 duration-300 border border-white/10"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-900/30 flex items-center justify-center">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">{step.title}</h3>
              <p className="text-sm text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
