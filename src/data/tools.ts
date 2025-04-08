
import React from 'react';
import { 
  FileImage, FileUp, FileDown, QrCode, CloudUpload, Code, Palette, KeySquare, Clock, FileText, FileArchive, 
  Layers, FileAudio, Scissors, MoreHorizontal, Scan, LineChart, Columns, DollarSign, Shuffle, Ruler, FileSearch, 
  FileEdit, Archive, FolderArchive, Stamp, Camera, Sparkle, MessageSquare, AlignJustify, Scissors as PixelTool,
  Clipboard
} from 'lucide-react';

export interface CategoryType {
  id: string;
  name: string;
}

export interface ToolType {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

export const categories: CategoryType[] = [
  { id: 'image', name: 'Image Tools' },
  { id: 'pdf', name: 'PDF Tools' },
  { id: 'file', name: 'File Utilities' },
  { id: 'text', name: 'Text Tools' },
  { id: 'code', name: 'Developer Tools' },
  { id: 'converter', name: 'Converters' },
  { id: 'utility', name: 'Utilities' },
  { id: 'audio', name: 'Audio Tools' },
];

export const tools: ToolType[] = [
  {
    id: 'image-to-pdf',
    name: 'Image to PDF',
    description: 'Convert JPG, PNG, GIF, and other image formats to PDF document',
    path: '/converter',
    icon: <FileImage className="h-6 w-6 text-indigo-400" />,
    category: 'converter',
    isFeatured: true
  },
  {
    id: 'pdf-to-image',
    name: 'PDF to Image',
    description: 'Convert PDF pages to high-quality JPG or PNG images',
    path: '/pdf-to-image',
    icon: <FileDown className="h-6 w-6 text-indigo-400" />,
    category: 'pdf',
    isFeatured: true
  },
  {
    id: 'jpg-to-png',
    name: 'JPG to PNG',
    description: 'Convert JPG images to transparent PNG format',
    path: '/jpg-to-png',
    icon: <FileUp className="h-6 w-6 text-indigo-400" />,
    category: 'image',
    isFeatured: true
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Create custom QR codes for URLs, text, contacts, and more',
    path: '/qr-code-generator',
    icon: <QrCode className="h-6 w-6 text-indigo-400" />,
    category: 'utility',
    isFeatured: true
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Reduce image file size while preserving quality',
    path: '/image-compressor',
    icon: <CloudUpload className="h-6 w-6 text-indigo-400" />,
    category: 'image'
  },
  {
    id: 'html-to-pdf',
    name: 'HTML to PDF',
    description: 'Convert HTML code or URL to PDF document',
    path: '/html-to-pdf',
    icon: <Code className="h-6 w-6 text-indigo-400" />,
    category: 'converter'
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    description: 'Select and extract colors from images with HEX, RGB, HSL values',
    path: '/color-picker',
    icon: <Palette className="h-6 w-6 text-indigo-400" />,
    category: 'utility'
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Create strong, secure passwords with custom settings',
    path: '/password-generator',
    icon: <KeySquare className="h-6 w-6 text-indigo-400" />,
    category: 'utility'
  },
  {
    id: 'countdown-timer',
    name: 'Countdown Timer',
    description: 'Create custom countdown timers for events and deadlines',
    path: '/countdown-timer',
    icon: <Clock className="h-6 w-6 text-indigo-400" />,
    category: 'utility'
  },
  {
    id: 'text-editor',
    name: 'Text Editor',
    description: 'Simple online text editor with formatting options',
    path: '/text-editor',
    icon: <FileText className="h-6 w-6 text-indigo-400" />,
    category: 'text'
  },
  {
    id: 'pdf-merger',
    name: 'PDF Merger',
    description: 'Combine multiple PDF files into a single document',
    path: '/pdf-merger',
    icon: <Layers className="h-6 w-6 text-indigo-400" />,
    category: 'pdf'
  },
  {
    id: 'pdf-splitter',
    name: 'PDF Splitter',
    description: 'Extract specific pages from PDF files',
    path: '/pdf-splitter',
    icon: <Scissors className="h-6 w-6 text-indigo-400" />,
    category: 'pdf'
  },
  {
    id: 'pdf-compressor',
    name: 'PDF Compressor',
    description: 'Reduce PDF file size while preserving quality',
    path: '/pdf-compressor',
    icon: <FileArchive className="h-6 w-6 text-indigo-400" />,
    category: 'pdf'
  },
  {
    id: 'text-to-speech',
    name: 'Text to Speech',
    description: 'Convert text to natural-sounding speech',
    path: '/text-to-speech',
    icon: <FileAudio className="h-6 w-6 text-indigo-400" />,
    category: 'audio'
  },
  {
    id: 'audio-trimmer',
    name: 'Audio Trimmer',
    description: 'Cut and trim audio files with precision',
    path: '/audio-trimmer',
    icon: <Scissors className="h-6 w-6 text-indigo-400" />,
    category: 'audio'
  },
  {
    id: 'ocr-tool',
    name: 'OCR Tool',
    description: 'Extract text from images and scanned documents',
    path: '/ocr-tool',
    icon: <Scan className="h-6 w-6 text-indigo-400" />,
    category: 'text'
  },
  {
    id: 'ai-content-summarizer',
    name: 'AI Content Summarizer',
    description: 'Automatically generate summaries of long texts',
    path: '/ai-content-summarizer',
    icon: <LineChart className="h-6 w-6 text-indigo-400" />,
    category: 'text'
  },
  // New tools based on the user's request
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Convert between different currencies with up-to-date exchange rates',
    path: '/currency-converter',
    icon: <DollarSign className="h-6 w-6 text-indigo-400" />,
    category: 'converter',
    isNew: true
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between different units of measurement (length, weight, volume, etc.)',
    path: '/unit-converter',
    icon: <Ruler className="h-6 w-6 text-indigo-400" />,
    category: 'converter',
    isNew: true
  },
  {
    id: 'file-metadata-viewer',
    name: 'File Metadata Viewer',
    description: 'View detailed metadata information for any file type',
    path: '/file-metadata',
    icon: <FileSearch className="h-6 w-6 text-indigo-400" />,
    category: 'file',
    isNew: true
  },
  {
    id: 'file-rename-tool',
    name: 'File Rename Tool',
    description: 'Batch rename multiple files with custom patterns and sequences',
    path: '/file-rename',
    icon: <FileEdit className="h-6 w-6 text-indigo-400" />,
    category: 'file',
    isNew: true
  },
  {
    id: 'rar-extractor',
    name: 'RAR Extractor',
    description: 'Extract contents from RAR archive files online',
    path: '/rar-extractor',
    icon: <Archive className="h-6 w-6 text-indigo-400" />,
    category: 'file',
    isNew: true
  },
  {
    id: 'zip-extractor',
    name: 'ZIP Extractor',
    description: 'Extract contents from ZIP archive files without downloading software',
    path: '/zip-extractor',
    icon: <FolderArchive className="h-6 w-6 text-indigo-400" />,
    category: 'file',
    isNew: true
  },
  {
    id: 'zip-creator',
    name: 'ZIP File Creator',
    description: 'Create ZIP archives from multiple files and folders',
    path: '/zip-creator',
    icon: <Archive className="h-6 w-6 text-indigo-400" />,
    category: 'file',
    isNew: true
  },
  {
    id: 'image-watermark-generator',
    name: 'Image Watermark Generator',
    description: 'Add custom text or image watermarks to protect your images',
    path: '/image-watermark',
    icon: <Stamp className="h-6 w-6 text-indigo-400" />,
    category: 'image',
    isNew: true
  },
  {
    id: 'image-metadata-viewer',
    name: 'Image Metadata Viewer',
    description: 'View and optionally remove EXIF and other metadata from images',
    path: '/image-metadata',
    icon: <Camera className="h-6 w-6 text-indigo-400" />,
    category: 'image',
    isNew: true
  },
  {
    id: 'random-text-generator',
    name: 'Random Text Generator',
    description: 'Generate random text, lorem ipsum, and placeholder content',
    path: '/random-text',
    icon: <Sparkle className="h-6 w-6 text-indigo-400" />,
    category: 'text',
    isNew: true
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs in text',
    path: '/word-counter',
    icon: <AlignJustify className="h-6 w-6 text-indigo-400" />,
    category: 'text',
    isNew: true
  },
  {
    id: 'pixelate-image',
    name: 'Pixelate Image Tool',
    description: 'Apply pixelation effects to images for censoring or artistic purposes',
    path: '/pixelate-image',
    icon: <PixelTool className="h-6 w-6 text-indigo-400" />,
    category: 'image',
    isNew: true
  },
  {
    id: 'clipboard-manager',
    name: 'Clipboard Manager',
    description: 'Store and organize multiple clipboard items for easy access',
    path: '/clipboard-manager',
    icon: <Clipboard className="h-6 w-6 text-indigo-400" />,
    category: 'utility',
    isNew: true
  }
];

// Helper function to get tools by category
export const getToolsByCategory = (categoryId: string): ToolType[] => {
  return tools.filter(tool => tool.category === categoryId);
};

// Helper function to get featured tools
export const getFeaturedTools = (): ToolType[] => {
  return tools.filter(tool => tool.isFeatured);
};

// Helper function to get new tools
export const getNewTools = (): ToolType[] => {
  return tools.filter(tool => tool.isNew);
};
