
import { IconType } from 'react-icons';
import { FileType, QrCode, FileImage, File, Camera, Download, Undo, Link, Palette, ArrowRightLeft, Volume2, FileVideo, FileBox, FileAudio, PencilLine, RotateCcw, RefreshCcw, Wand2, Coffee, HandMetal, Replace, Crop, LucideIcon } from 'lucide-react';

export interface ToolType {
  name: string;
  description: string;
  path: string;
  icon: LucideIcon;
  isNew?: boolean;
  category?: string;
}

const tools: ToolType[] = [
  {
    name: "Image to PDF",
    description: "Convert JPG, PNG, and other image files to PDF",
    path: "/image-to-pdf",
    icon: FileImage,
    category: "conversion"
  },
  {
    name: "PDF to Image",
    description: "Convert PDF files to JPG or PNG images",
    path: "/pdf-to-image",
    icon: FileType,
    category: "conversion"
  },
  {
    name: "JPG to PNG",
    description: "Convert JPG images to transparent PNG format",
    path: "/jpg-to-png",
    icon: FileImage,
    category: "conversion"
  },
  {
    name: "QR Code Generator",
    description: "Create custom QR codes for websites, text, and more",
    path: "/qr-code-generator",
    icon: QrCode,
    category: "generators"
  },
  {
    name: "Image to QR Code",
    description: "Convert your images to scannable QR codes",
    path: "/image-to-qr",
    icon: QrCode,
    category: "conversion"
  },
  {
    name: "Video to QR Code",
    description: "Convert videos to QR codes for easy sharing",
    path: "/video-to-qr",
    icon: QrCode,
    category: "conversion"
  },
  {
    name: "Audio to QR Code",
    description: "Convert audio files to QR codes for easy sharing",
    path: "/audio-to-qr",
    icon: QrCode,
    category: "conversion"
  },
  {
    name: "Image Compressor",
    description: "Compress images while maintaining quality",
    path: "/image-compressor",
    icon: FileImage,
    category: "optimization"
  },
  {
    name: "HTML to PDF",
    description: "Convert HTML code or URLs to PDF files",
    path: "/html-to-pdf",
    icon: FileType,
    category: "conversion"
  },
  {
    name: "Color Picker",
    description: "Choose and extract colors from images",
    path: "/color-picker",
    icon: Palette,
    category: "design"
  },
  {
    name: "Password Generator",
    description: "Create strong, secure passwords easily",
    path: "/password-generator",
    icon: FileBox,
    category: "generators"
  },
  {
    name: "Countdown Timer",
    description: "Create countdown timers for your events",
    path: "/countdown-timer",
    icon: RotateCcw,
    category: "utilities"
  },
  {
    name: "Text Editor",
    description: "Simple text editor with formatting options",
    path: "/text-editor",
    icon: PencilLine,
    category: "utilities"
  },
  {
    name: "PDF Merger",
    description: "Combine multiple PDF files into one document",
    path: "/pdf-merger",
    icon: FileType,
    category: "utilities"
  },
  {
    name: "PDF Splitter",
    description: "Split PDF files into separate pages or sections",
    path: "/pdf-splitter",
    icon: FileType,
    category: "utilities"
  },
  {
    name: "PDF Compressor",
    description: "Reduce PDF file size without quality loss",
    path: "/pdf-compressor",
    icon: FileBox,
    category: "optimization"
  },
  {
    name: "Text to Speech",
    description: "Convert text to natural-sounding speech",
    path: "/text-to-speech",
    icon: Volume2,
    category: "utilities"
  },
  {
    name: "Audio Trimmer",
    description: "Cut and trim audio files to your desired length",
    path: "/audio-trimmer",
    icon: FileAudio,
    category: "utilities"
  },
  {
    name: "OCR Tool",
    description: "Extract text from images and scanned documents",
    path: "/ocr-tool",
    icon: Camera,
    category: "utilities"
  },
  {
    name: "AI Content Summarizer",
    description: "Automatically summarize long texts with AI",
    path: "/ai-content-summarizer",
    icon: Wand2,
    category: "ai-tools"
  },
  {
    name: "Currency Converter",
    description: "Convert between different currencies with live rates",
    path: "/currency-converter",
    icon: ArrowRightLeft,
    category: "utilities"
  },
  {
    name: "Text Replacer",
    description: "Find and replace text in documents",
    path: "/text-replacer",
    icon: Replace,
    category: "utilities"
  },
  {
    name: "Image Cropper",
    description: "Crop, resize, and edit images online",
    path: "/image-cropper",
    icon: Crop,
    category: "design"
  },
  {
    name: "Text to Handwriting",
    description: "Convert text to realistic handwriting",
    path: "/text-to-handwriting",
    icon: HandMetal,
    category: "conversion"
  },
  {
    name: "Text to Emoji",
    description: "Convert text to emoji-filled messages",
    path: "/text-to-emoji",
    icon: Coffee,
    category: "conversion"
  },
  {
    name: "Video to GIF",
    description: "Convert video clips to animated GIFs",
    path: "/video-to-gif",
    icon: FileVideo,
    category: "conversion"
  }
];

export default tools;
