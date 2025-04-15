
import React, { useEffect, useRef } from 'react';
import { Upload, FileImage, Download, Palette, Code, Lock, FileText, Pipette } from 'lucide-react';
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
  const isColorPicker = location.pathname === '/color-picker';
  const isHtmlToPdf = location.pathname === '/html-to-pdf';
  const isPasswordGenerator = location.pathname === '/password-generator';
  const isJPGtoPNG = location.pathname === '/jpg-to-png';
  const isPdfToImage = location.pathname === '/pdf-to-image';
  const isQrCodeGenerator = location.pathname === '/qr-code-generator';
  const isTextToEmoji = location.pathname === '/text-to-emoji';
  
  const colorPickerSteps = [
    {
      icon: <Palette className="h-8 w-8 text-blue-500" />,
      title: 'Select a Color',
      description: 'Use the color picker, RGB/HSL sliders, or upload an image to select a color. You can pick colors directly from your images.'
    },
    {
      icon: <Pipette className="h-8 w-8 text-blue-500" />,
      title: 'Convert & Edit',
      description: 'Convert between HEX, RGB, and HSL color formats with real-time preview. Adjust sliders to fine-tune your colors.'
    },
    {
      icon: <Download className="h-8 w-8 text-blue-500" />,
      title: 'Save Your Colors',
      description: 'Save your favorite colors with custom names and copy them to clipboard in different formats for your projects.'
    }
  ];
  
  const htmlToPdfSteps = [
    {
      icon: <Code className="h-8 w-8 text-blue-500" />,
      title: 'Enter HTML Code',
      description: 'Type or paste your HTML code in the editor. You can use our sample HTML or import your own content.'
    },
    {
      icon: <FileText className="h-8 w-8 text-blue-500" />,
      title: 'Configure Settings',
      description: 'Adjust page size, orientation, margins, and background settings to customize your PDF document.'
    },
    {
      icon: <Download className="h-8 w-8 text-blue-500" />,
      title: 'Generate & Download PDF',
      description: 'Click "Generate PDF" to convert your HTML to a PDF document, then download it when you\'re satisfied with the preview.'
    }
  ];
  
  const passwordGeneratorSteps = [
    {
      icon: <Lock className="h-8 w-8 text-blue-500" />,
      title: 'Set Your Parameters',
      description: 'Adjust password length and select which characters to include: uppercase, lowercase, numbers, and symbols.'
    },
    {
      icon: <FileText className="h-8 w-8 text-blue-500" />,
      title: 'Generate Password',
      description: 'Click "Generate New Password" to create a random, secure password based on your selected parameters.'
    },
    {
      icon: <Download className="h-8 w-8 text-blue-500" />,
      title: 'Save & Copy',
      description: 'Copy your password to clipboard or save it with a custom label for future reference.'
    }
  ];
  
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
  
  if (isColorPicker) {
    steps = colorPickerSteps;
    toolName = 'Color Picker';
  } else if (isHtmlToPdf) {
    steps = htmlToPdfSteps;
    toolName = 'HTML to PDF';
  } else if (isPasswordGenerator) {
    steps = passwordGeneratorSteps;
    toolName = 'Password Generator';
  } else if (isJPGtoPNG) {
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
    // Default steps for general tools
    steps = [
      {
        icon: <Upload className="h-8 w-8 text-blue-500" />,
        title: 'Upload or Input',
        description: 'Upload your files or input your data to get started with this tool.'
      },
      {
        icon: <FileText className="h-8 w-8 text-blue-500" />,
        title: 'Customize Settings',
        description: 'Adjust the settings and options to customize the output according to your needs.'
      },
      {
        icon: <Download className="h-8 w-8 text-blue-500" />,
        title: 'Download Result',
        description: 'Process your data and download the results when ready.'
      }
    ];
    toolName = 'This Tool';
  }

  return (
    <section id="how-to-use" ref={sectionRef} className="py-12 px-4 bg-[#070b19]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3 text-white">How to Use {toolName}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            MyToolbox makes working with {toolName.toLowerCase()} simple and fast. Follow these three easy steps to get started.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-[#0c1224] p-6 rounded-xl text-center transition-all duration-300 border border-white/10 shadow-lg flex flex-col items-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
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
