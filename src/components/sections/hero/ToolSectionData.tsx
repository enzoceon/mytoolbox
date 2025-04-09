
import React from 'react';
import { 
  Zap, DollarSign, Ruler, Image, FileSearch, FileEdit, 
  Archive, Brain, Bot, MessageSquare, AlignJustify, 
  Replace, HandMetal, Crop, CloudUpload, ImageOff, QrCode
} from 'lucide-react';

export interface ToolCategoryData {
  title: string;
  category: string;
  tools: {
    path: string;
    icon: React.ReactNode;
    name: string;
    comingSoon?: boolean;
  }[];
  animationDelay: string;
}

export const getToolsSectionsData = (): ToolCategoryData[] => {
  return [
    {
      title: "Converter Tools",
      category: "converter",
      animationDelay: "0.35s",
      tools: [
        {
          path: "/image-to-pdf",
          icon: <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />,
          name: "Image to PDF"
        },
        {
          path: "/currency-converter",
          icon: <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />,
          name: "Currency Converter"
        },
        {
          path: "/unit-converter",
          icon: <Ruler className="h-8 w-8 text-blue-500 mx-auto mb-2" />,
          name: "Unit Converter",
          comingSoon: true
        },
        {
          path: "/jpg-to-png",
          icon: <Image className="h-8 w-8 text-green-500 mx-auto mb-2" />,
          name: "JPG to PNG"
        }
      ]
    },
    {
      title: "File Tools",
      category: "file",
      animationDelay: "0.38s",
      tools: [
        {
          path: "/file-metadata",
          icon: <FileSearch className="h-8 w-8 text-blue-500 mx-auto mb-2" />,
          name: "File Metadata Viewer",
          comingSoon: true
        },
        {
          path: "/file-rename",
          icon: <FileEdit className="h-8 w-8 text-purple-500 mx-auto mb-2" />,
          name: "File Rename Tool",
          comingSoon: true
        },
        {
          path: "/zip-creator",
          icon: <Archive className="h-8 w-8 text-amber-500 mx-auto mb-2" />,
          name: "ZIP File Creator",
          comingSoon: true
        },
        {
          path: "/pdf-to-image",
          icon: <Image className="h-8 w-8 text-blue-500 mx-auto mb-2" />,
          name: "PDF to Image"
        }
      ]
    },
    {
      title: "AI Tools",
      category: "AI",
      animationDelay: "0.38s",
      tools: [
        {
          path: "/ai-text-generator",
          icon: <Brain className="h-8 w-8 text-purple-500 mx-auto mb-2" />,
          name: "Text Generator",
          comingSoon: true
        },
        {
          path: "/ai-chatbot",
          icon: <Bot className="h-8 w-8 text-blue-500 mx-auto mb-2" />,
          name: "Chatbot",
          comingSoon: true
        },
        {
          path: "/ai-image-generator",
          icon: <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />,
          name: "Image Generator",
          comingSoon: true
        },
        {
          path: "/ai-content-summarizer",
          icon: <MessageSquare className="h-8 w-8 text-green-500 mx-auto mb-2" />,
          name: "Summarizer",
          comingSoon: true
        }
      ]
    },
    {
      title: "Text Tools",
      category: "text",
      animationDelay: "0.40s",
      tools: [
        {
          path: "/word-counter",
          icon: <AlignJustify className="h-8 w-8 text-green-500 mx-auto mb-2" />,
          name: "Word Counter",
          comingSoon: true
        },
        {
          path: "/text-replacer",
          icon: <Replace className="h-8 w-8 text-blue-500 mx-auto mb-2" />,
          name: "Text Replacer",
          comingSoon: true
        },
        {
          path: "/text-to-handwriting",
          icon: <HandMetal className="h-8 w-8 text-purple-500 mx-auto mb-2" />,
          name: "Text to Handwriting",
          comingSoon: true
        },
        {
          path: "/text-editor",
          icon: <FileEdit className="h-8 w-8 text-indigo-500 mx-auto mb-2" />,
          name: "Text Editor",
          comingSoon: true
        }
      ]
    },
    {
      title: "Image Tools",
      category: "image",
      animationDelay: "0.42s",
      tools: [
        {
          path: "/image-cropper",
          icon: <Crop className="h-8 w-8 text-green-500 mx-auto mb-2" />,
          name: "Image Cropper",
          comingSoon: true
        },
        {
          path: "/image-compressor",
          icon: <CloudUpload className="h-8 w-8 text-blue-500 mx-auto mb-2" />,
          name: "Image Compressor"
        },
        {
          path: "/background-remover",
          icon: <ImageOff className="h-8 w-8 text-purple-500 mx-auto mb-2" />,
          name: "Background Remover",
          comingSoon: true
        },
        {
          path: "/jpg-to-png",
          icon: <Image className="h-8 w-8 text-indigo-500 mx-auto mb-2" />,
          name: "JPG to PNG"
        }
      ]
    },
    {
      title: "QR Code Tools",
      category: "qrcode",
      animationDelay: "0.44s",
      tools: [
        {
          path: "/qr-code-generator",
          icon: <QrCode className="h-8 w-8 text-blue-500 mx-auto mb-2" />,
          name: "QR Generator"
        },
        {
          path: "/qr-code-scanner",
          icon: <QrCode className="h-8 w-8 text-purple-500 mx-auto mb-2" />,
          name: "QR Scanner",
          comingSoon: true
        },
        {
          path: "/qr-code-styler",
          icon: <QrCode className="h-8 w-8 text-pink-500 mx-auto mb-2" />,
          name: "QR Styler",
          comingSoon: true
        },
        {
          path: "/image-to-qr-code",
          icon: <Image className="h-8 w-8 text-green-500 mx-auto mb-2" />,
          name: "Image to QR",
          comingSoon: true
        }
      ]
    }
  ];
};
