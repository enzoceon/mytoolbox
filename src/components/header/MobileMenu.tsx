import React from 'react';
import { AlignJustify, X, Home, FileImage, Video, Music, FileText, File, Camera, Folder, Brain, Crop, Replace, HandMetal, Coffee, Download } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import MenuCategory from './MenuCategory';

interface MobileMenuProps {
  icon?: React.ReactNode;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ icon }) => {
  // Menu categories based on the reference image
  const menuCategories = [
    {
      title: "Home",
      icon: <Home className="h-5 w-5" />,
      items: [
        { name: "Home", path: "/" },
        { name: "All Tools", path: "/tools" },
      ]
    },
    {
      title: "Photo & Image",
      icon: <FileImage className="h-5 w-5" />,
      items: [
        { name: "Image to PDF", path: "/image-to-pdf" },
        { name: "PDF to Image", path: "/pdf-to-image" },
        { name: "Image Cropper", path: "/image-cropper" },
        { name: "JPG to PNG", path: "/jpg-to-png" },
      ]
    },
    {
      title: "Video",
      icon: <Video className="h-5 w-5" />,
      items: [
        { name: "Video Converter", path: "/tools" },
        { name: "Video Compressor", path: "/tools" },
        { name: "Video to GIF", path: "/video-to-gif" },
      ]
    },
    {
      title: "Audio",
      icon: <Music className="h-5 w-5" />,
      items: [
        { name: "Audio Converter", path: "/tools" },
        { name: "Audio Compressor", path: "/tools" },
      ]
    },
    {
      title: "AI Tools",
      icon: <Brain className="h-5 w-5" />,
      items: [
        { name: "AI Text Generator", path: "/ai-text-generator" },
        { name: "AI Content Summarizer", path: "/ai-content-summarizer" },
        { name: "AI Chatbot", path: "/ai-chatbot" },
        { name: "AI Image Generator", path: "/ai-image-generator" },
      ]
    },
    {
      title: "PDF",
      icon: <FileText className="h-5 w-5" />,
      items: [
        { name: "Unlock PDF", path: "/tools" },
        { name: "Protect PDF", path: "/tools" },
        { name: "HTML to PDF", path: "/tools" },
      ]
    },
    {
      title: "Text",
      icon: <File className="h-5 w-5" />,
      items: [
        { name: "Text Editor", path: "/tools" },
        { name: "Text Replacer", path: "/text-replacer" },
        { name: "Text to Handwriting", path: "/text-to-handwriting" },
        { name: "Text to Emoji", path: "/text-to-emoji" },
        { name: "OCR", path: "/extract-text-from-image" },
      ]
    },
    {
      title: "Scanner & Camera",
      icon: <Camera className="h-5 w-5" />,
      items: [
        { name: "Scan Document", path: "/tools" },
        { name: "Camera to PDF", path: "/tools" },
      ]
    },
    {
      title: "File & Device",
      icon: <Folder className="h-5 w-5" />,
      items: [
        { name: "File Converter", path: "/tools" },
        { name: "File Compressor", path: "/tools" },
      ]
    },
    {
      title: "Animation",
      icon: <Download className="h-5 w-5" />,
      items: [
        { name: "Video to GIF", path: "/video-to-gif" },
        { name: "GIF to Video", path: "/gif-to-video" },
      ]
    },
    {
      title: "Emoji",
      icon: <Coffee className="h-5 w-5" />,
      items: [
        { name: "Text to Emoji", path: "/text-to-emoji" },
      ]
    },
  ];
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button 
          className="p-2 text-foreground bg-accent/10 hover:bg-accent/15 rounded-md flex items-center justify-center"
          aria-label="Menu"
        >
          {icon || <AlignJustify className="h-5 w-5" />} {/* Use provided icon or default */}
        </button>
      </SheetTrigger>
      <SheetContent 
        className="w-[100vw] sm:max-w-none h-[100dvh] p-0 border-none"
        // Prevent closing on outside click or escape key
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        side="right"
      >
        <div className="flex flex-col h-full bg-background">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="font-semibold text-xl text-foreground">EveryTools</h2>
            <SheetClose className="rounded-full p-2 hover:bg-accent/10 transition-colors">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="py-4">
              {menuCategories.map((category) => (
                <MenuCategory 
                  key={category.title}
                  title={category.title}
                  icon={category.icon}
                  items={category.items}
                />
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
