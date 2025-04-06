
import React, { useEffect, useRef } from 'react';
import { Upload, FileImage, Download } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const HowToUse = () => {
  const location = useLocation();
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // Check if the URL hash matches this section
    if (location.hash === '#how-to-use' && sectionRef.current) {
      // Add delay to ensure DOM is fully rendered
      setTimeout(() => {
        // Apply offset of 80px to account for header
        const yOffset = -80;
        const element = sectionRef.current;
        if (element) {
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  const steps = [
    {
      icon: <Upload className="h-8 w-8 text-indigo-500" />,
      title: 'Upload Your Images',
      description: 'Drag and drop JPG, PNG, or other image files directly into the upload area or click to browse from your device.'
    },
    {
      icon: <FileImage className="h-8 w-8 text-indigo-500" />,
      title: 'Arrange and Preview',
      description: "Review your images, rearrange their order if needed, and remove any you don't want to include in your PDF."
    },
    {
      icon: <Download className="h-8 w-8 text-indigo-500" />,
      title: 'Convert and Download',
      description: 'Click "Convert to PDF" button and download your newly created PDF with the exact quality and dimensions of your original images.'
    }
  ];

  return (
    <section id="how-to-use" ref={sectionRef} className="py-16 px-6 sm:px-10 bg-[#030a1c]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">How to Convert Images to PDF</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Converting your images to PDF is simple and takes just a few seconds. Follow these three easy steps to get started.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="glass-card p-6 rounded-xl text-center transition-transform hover:scale-105 duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-900/30 flex items-center justify-center">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">{step.title}</h3>
              <p className="text-sm text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="p-6 rounded-xl glass-card max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-white">Why Choose Our Image to PDF Converter?</h3>
            <ul className="text-left text-gray-400 space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">✓</span>
                <span>Preserves the original quality and resolution of your images</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">✓</span>
                <span>Processes everything in your browser - no files are uploaded to any server</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">✓</span>
                <span>Creates optimized PDFs with adjustable quality settings</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">✓</span>
                <span>Works on any device - mobile, tablet, or desktop</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">✓</span>
                <span>Completely free with no limitations on file size or number of conversions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
