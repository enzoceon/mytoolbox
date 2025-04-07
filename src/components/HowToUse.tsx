
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

  // Determine if we're on the PDF to Image page
  const isPdfToImage = location.pathname === '/pdf-to-image';
  
  const imageToPathSteps = [
    {
      icon: <Upload className="h-8 w-8 text-blue-500" />,
      title: 'Upload Your Images',
      description: 'Drag and drop multiple image files or click to browse and select from your device.'
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
      description: 'Drag and drop a PDF file or click to browse and select from your device.'
    },
    {
      icon: <FileImage className="h-8 w-8 text-blue-500" />,
      title: 'Convert to Images',
      description: 'Click the "Convert to Images" button to transform your PDF pages into high-quality images.'
    },
    {
      icon: <Download className="h-8 w-8 text-blue-500" />,
      title: 'Download Your Images',
      description: 'Once conversion is complete, download all images as a ZIP file or view individual pages.'
    }
  ];
  
  // Choose the appropriate steps based on the current page
  const steps = isPdfToImage ? pdfToImageSteps : imageToPathSteps;
  const toolName = isPdfToImage ? 'PDF to Image' : 'Image to PDF';

  return (
    <section id="how-to-use" ref={sectionRef} className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">How to Use {toolName}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {isPdfToImage 
              ? 'Converting your PDF to images is simple and fast. Follow these three easy steps to get started.'
              : 'Converting your images to PDF is simple and fast. Follow these three easy steps to get started.'
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

