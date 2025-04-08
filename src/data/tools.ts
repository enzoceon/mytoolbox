import React from 'react';
import { 
  FileImage, FileUp, FileDown, QrCode, CloudUpload, Code, Palette, KeySquare, Clock, FileText, FileArchive, 
  Layers, FileAudio, Scissors, MoreHorizontal, Scan, LineChart, Columns, DollarSign, Shuffle, Ruler, FileSearch, 
  FileEdit, Archive, FolderArchive, Stamp, Camera, Sparkle, MessageSquare, AlignJustify, Scissors as PixelTool,
  Clipboard, LucideIcon, Brain, BrainCircuit, Bot, Sparkles, Zap, Lock, Video, Mic, Gift, VolumeX, Music,
  ImageOff, Unlock, ScanSearch, PencilRuler, Scale, FileDigit
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
  icon: LucideIcon;
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

export const categories: CategoryType[] = [
  { id: 'image', name: 'Image Tools' },
  { id: 'pdf', name: 'PDF Tools' },
  { id: 'file', name: 'File Utilities' },
  { id: 'ai', name: 'AI Tools' },
  { id: 'text', name: 'Text Tools' },
  { id: 'code', name: 'Developer Tools' },
  { id: 'converter', name: 'Converters' },
  { id: 'utility', name: 'Utilities' },
  { id: 'audio', name: 'Audio Tools' },
  { id: 'video', name: 'Video Tools' },
  { id: 'qrcode', name: 'QR Code Tools' },
];

export const tools: ToolType[] = [
  {
    id: 'image-to-pdf',
    name: 'Image to PDF',
    description: 'Convert JPG, PNG, GIF, and other image formats to PDF document',
    path: '/image-to-pdf',
    icon: FileImage,
    category: 'converter',
    isFeatured: true
  },
  {
    id: 'pdf-to-image',
    name: 'PDF to Image',
    description: 'Convert PDF pages to high-quality JPG or PNG images',
    path: '/pdf-to-image',
    icon: FileDown,
    category: 'pdf',
    isFeatured: true
  },
  {
    id: 'jpg-to-png',
    name: 'JPG to PNG',
    description: 'Convert JPG images to transparent PNG format',
    path: '/jpg-to-png',
    icon: FileUp,
    category: 'image',
    isFeatured: true
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Create custom QR codes for URLs, text, contacts, and more',
    path: '/qr-code-generator',
    icon: QrCode,
    category: 'qrcode',
    isFeatured: true
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Reduce image file size while preserving quality',
    path: '/image-compressor',
    icon: CloudUpload,
    category: 'image'
  },
  {
    id: 'html-to-pdf',
    name: 'HTML to PDF',
    description: 'Convert HTML code or URL to PDF document',
    path: '/html-to-pdf',
    icon: Code,
    category: 'converter'
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    description: 'Select and extract colors from images with HEX, RGB, HSL values',
    path: '/color-picker',
    icon: Palette,
    category: 'utility'
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Create strong, secure passwords with custom settings',
    path: '/password-generator',
    icon: KeySquare,
    category: 'utility'
  },
  {
    id: 'countdown-timer',
    name: 'Countdown Timer',
    description: 'Create custom countdown timers for events and deadlines',
    path: '/countdown-timer',
    icon: Clock,
    category: 'utility'
  },
  {
    id: 'text-editor',
    name: 'Text Editor',
    description: 'Simple online text editor with formatting options',
    path: '/text-editor',
    icon: FileText,
    category: 'text'
  },
  {
    id: 'pdf-merger',
    name: 'PDF Merger',
    description: 'Combine multiple PDF files into a single document',
    path: '/pdf-merger',
    icon: Layers,
    category: 'pdf'
  },
  {
    id: 'pdf-splitter',
    name: 'PDF Splitter',
    description: 'Extract specific pages from PDF files',
    path: '/pdf-splitter',
    icon: Scissors,
    category: 'pdf'
  },
  {
    id: 'pdf-compressor',
    name: 'PDF Compressor',
    description: 'Reduce PDF file size while preserving quality',
    path: '/pdf-compressor',
    icon: FileArchive,
    category: 'pdf'
  },
  {
    id: 'text-to-speech',
    name: 'Text to Speech',
    description: 'Convert text to natural-sounding speech',
    path: '/text-to-speech',
    icon: FileAudio,
    category: 'audio'
  },
  {
    id: 'audio-trimmer',
    name: 'Audio Trimmer',
    description: 'Cut and trim audio files with precision',
    path: '/audio-trimmer',
    icon: Scissors,
    category: 'audio'
  },
  {
    id: 'ocr-tool',
    name: 'Extract Text from Image',
    description: 'Extract text from images and scanned documents',
    path: '/ocr-tool',
    icon: Scan,
    category: 'text'
  },
  {
    id: 'ai-content-summarizer',
    name: 'AI Content Summarizer',
    description: 'Automatically generate summaries of long texts',
    path: '/ai-content-summarizer',
    icon: LineChart,
    category: 'ai',
    isNew: true
  },
  {
    id: 'ai-text-generator',
    name: 'AI Text Generator',
    description: 'Generate high-quality text content for various purposes',
    path: '/ai-text-generator',
    icon: Brain,
    category: 'ai',
    isNew: true
  },
  {
    id: 'ai-chatbot',
    name: 'AI Chatbot',
    description: 'Interact with an AI assistant for answering questions',
    path: '/ai-chatbot',
    icon: Bot,
    category: 'ai',
    isNew: true
  },
  {
    id: 'ai-image-generator',
    name: 'AI Image Generator',
    description: 'Create unique images from text descriptions',
    path: '/ai-image-generator',
    icon: Sparkles,
    category: 'ai',
    isNew: true
  },
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Convert between different currencies with up-to-date exchange rates',
    path: '/currency-converter',
    icon: DollarSign,
    category: 'converter',
    isNew: true
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between different units of measurement (length, weight, volume, etc.)',
    path: '/unit-converter',
    icon: Ruler,
    category: 'converter',
    isNew: true
  },
  {
    id: 'file-metadata-viewer',
    name: 'File Metadata Viewer',
    description: 'View detailed metadata information for any file type',
    path: '/file-metadata',
    icon: FileSearch,
    category: 'file',
    isNew: true
  },
  {
    id: 'file-rename-tool',
    name: 'File Rename Tool',
    description: 'Batch rename multiple files with custom patterns and sequences',
    path: '/file-rename',
    icon: FileEdit,
    category: 'file',
    isNew: true
  },
  {
    id: 'rar-extractor',
    name: 'RAR Extractor',
    description: 'Extract contents from RAR archive files online',
    path: '/rar-extractor',
    icon: Archive,
    category: 'file',
    isNew: true
  },
  {
    id: 'zip-extractor',
    name: 'ZIP Extractor',
    description: 'Extract contents from ZIP archive files without downloading software',
    path: '/zip-extractor',
    icon: FolderArchive,
    category: 'file',
    isNew: true
  },
  {
    id: 'zip-creator',
    name: 'ZIP File Creator',
    description: 'Create ZIP archives from multiple files and folders',
    path: '/zip-creator',
    icon: Archive,
    category: 'file',
    isNew: true
  },
  {
    id: 'image-watermark-generator',
    name: 'Image Watermark Generator',
    description: 'Add custom text or image watermarks to protect your images',
    path: '/image-watermark',
    icon: Stamp,
    category: 'image',
    isNew: true
  },
  {
    id: 'image-metadata-viewer',
    name: 'Image Metadata Viewer',
    description: 'View and optionally remove EXIF and other metadata from images',
    path: '/image-metadata',
    icon: Camera,
    category: 'image',
    isNew: true
  },
  {
    id: 'random-text-generator',
    name: 'Random Text Generator',
    description: 'Generate random text, lorem ipsum, and placeholder content',
    path: '/random-text',
    icon: Sparkle,
    category: 'text',
    isNew: true
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs in text',
    path: '/word-counter',
    icon: AlignJustify,
    category: 'text',
    isNew: true
  },
  {
    id: 'pixelate-image',
    name: 'Pixelate Image Tool',
    description: 'Apply pixelation effects to images for censoring or artistic purposes',
    path: '/pixelate-image',
    icon: PixelTool,
    category: 'image',
    isNew: true
  },
  {
    id: 'clipboard-manager',
    name: 'Clipboard Manager',
    description: 'Store and organize multiple clipboard items for easy access',
    path: '/clipboard-manager',
    icon: Clipboard,
    category: 'utility',
    isNew: true
  },
  {
    id: 'image-to-qr-code',
    name: 'Image to QR Code',
    description: 'Convert images to scannable QR codes',
    path: '/image-to-qr-code',
    icon: QrCode,
    category: 'qrcode',
    isNew: true
  },
  {
    id: 'video-to-qr-code',
    name: 'Video to QR Code',
    description: 'Generate QR codes from video content',
    path: '/video-to-qr-code',
    icon: Video,
    category: 'qrcode',
    isNew: true
  },
  {
    id: 'video-compressor',
    name: 'Video Compressor',
    description: 'Reduce video file size while maintaining quality',
    path: '/video-compressor',
    icon: Video,
    category: 'video',
    isNew: true
  },
  {
    id: 'pdf-watermark',
    name: 'PDF Watermark',
    description: 'Add custom text or image watermarks to PDF documents',
    path: '/pdf-watermark',
    icon: Stamp,
    category: 'pdf',
    isNew: true
  },
  {
    id: 'pdf-locker',
    name: 'PDF Locker',
    description: 'Password protect your PDF files for secure sharing',
    path: '/pdf-locker',
    icon: Lock,
    category: 'pdf',
    isNew: true
  },
  {
    id: 'audio-extractor',
    name: 'Audio Extractor',
    description: 'Extract audio tracks from video files',
    path: '/audio-extractor',
    icon: Mic,
    category: 'audio',
    isNew: true
  },
  {
    id: 'gif-to-video',
    name: 'GIF to Video',
    description: 'Convert animated GIFs to video formats',
    path: '/gif-to-video',
    icon: Gift,
    category: 'video',
    isNew: true
  },
  {
    id: 'video-audio-remover',
    name: 'Video Audio Remover',
    description: 'Remove audio tracks from video files',
    path: '/video-audio-remover',
    icon: VolumeX,
    category: 'video',
    isNew: true
  },
  {
    id: 'add-audio-to-video',
    name: 'Add Audio to Video',
    description: 'Add or replace audio tracks in video files',
    path: '/add-audio-to-video',
    icon: Music,
    category: 'video',
    isNew: true
  },
  {
    id: 'background-remover',
    name: 'Background Remover',
    description: 'Remove backgrounds from images automatically',
    path: '/background-remover',
    icon: ImageOff,
    category: 'image',
    isNew: true
  },
  {
    id: 'pdf-password-remover',
    name: 'PDF Password Remover',
    description: 'Remove passwords from PDF files',
    path: '/pdf-password-remover',
    icon: Unlock,
    category: 'pdf',
    isNew: true
  },
  {
    id: 'pdf-to-qr-code',
    name: 'PDF to QR Code',
    description: 'Generate QR codes from PDF documents',
    path: '/pdf-to-qr-code',
    icon: QrCode,
    category: 'qrcode',
    isNew: true
  },
  {
    id: 'audio-to-qr-code',
    name: 'Audio to QR Code',
    description: 'Convert audio files to QR codes',
    path: '/audio-to-qr-code',
    icon: QrCode,
    category: 'qrcode',
    isNew: true
  },
  {
    id: 'qr-code-scanner',
    name: 'QR Code Scanner',
    description: 'Scan and decode QR codes from images or webcam',
    path: '/qr-code-scanner',
    icon: ScanSearch,
    category: 'qrcode',
    isNew: true
  },
  {
    id: 'qr-code-styler',
    name: 'QR Code Styler',
    description: 'Create custom styled QR codes with logos and colors',
    path: '/qr-code-styler',
    icon: PencilRuler,
    category: 'qrcode',
    isNew: true
  },
  {
    id: 'pdf-to-text',
    name: 'PDF to Text',
    description: 'Extract text content from PDF documents',
    path: '/pdf-to-text',
    icon: FileText,
    category: 'pdf',
    isNew: true
  }
];

export const getToolsByCategory = (categoryId: string): ToolType[] => {
  return tools.filter(tool => tool.category === categoryId);
};

export const getFeaturedTools = (): ToolType[] => {
  return tools.filter(tool => tool.isFeatured);
};

export const getNewTools = (): ToolType[] => {
  return tools.filter(tool => tool.isNew);
};
