
import React from 'react';
import { Upload, FileImage, Download } from 'lucide-react';

const HowToUse = () => {
  const steps = [
    {
      icon: <Upload className="h-8 w-8 text-indigo-500" />,
      title: 'Upload Your Image',
      description: 'Drag and drop your image file or click to browse and select from your device.'
    },
    {
      icon: <FileImage className="h-8 w-8 text-indigo-500" />,
      title: 'Convert to PDF',
      description: 'Click the "Convert to PDF" button to transform your image into a high-quality PDF document.'
    },
    {
      icon: <Download className="h-8 w-8 text-indigo-500" />,
      title: 'Download Your PDF',
      description: 'Once conversion is complete, download your PDF file with a single click.'
    }
  ];

  return (
    <section id="how-to-use" className="py-16 px-6 sm:px-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">How to Use Image2PDF</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Converting your images to PDF is simple and fast. Follow these three easy steps to get started.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="glass-card p-6 rounded-xl text-center transition-transform hover:scale-105 duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
