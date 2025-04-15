
import React from 'react';
import { AlignJustify, X, Home, FileImage, Video, Music, FileText, File, Camera, Folder, Brain, Crop, Replace, HandMetal, Coffee, Download } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import MenuCategory from './MenuCategory';
import { tools } from '@/data/tools';

interface MobileMenuProps {
  icon?: React.ReactNode;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ icon }) => {
  // Filter tools to only include functional ones
  const functionalTools = tools.filter(tool => tool.isFunctional !== false);
  
  // Create a mapping of tools by category
  const toolsByCategory = functionalTools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push({
      name: tool.name,
      path: tool.path
    });
    return acc;
  }, {} as Record<string, {name: string, path: string}[]>);
  
  // Menu categories based on the available tools
  const menuCategories = [
    {
      title: "Home",
      icon: <Home className="h-5 w-5" />,
      items: [
        { name: "Home", path: "/" },
      ]
    },
    {
      title: "Photo & Image",
      icon: <FileImage className="h-5 w-5" />,
      items: toolsByCategory['image'] || []
    },
    {
      title: "Video",
      icon: <Video className="h-5 w-5" />,
      items: toolsByCategory['video'] || []
    },
    {
      title: "Audio",
      icon: <Music className="h-5 w-5" />,
      items: toolsByCategory['audio'] || []
    },
    {
      title: "AI Tools",
      icon: <Brain className="h-5 w-5" />,
      items: toolsByCategory['ai'] || []
    },
    {
      title: "PDF",
      icon: <FileText className="h-5 w-5" />,
      items: toolsByCategory['pdf'] || []
    },
    {
      title: "Text",
      icon: <File className="h-5 w-5" />,
      items: toolsByCategory['text'] || []
    },
    {
      title: "Scanner & Camera",
      icon: <Camera className="h-5 w-5" />,
      items: toolsByCategory['scanner'] || []
    },
    {
      title: "File & Device",
      icon: <Folder className="h-5 w-5" />,
      items: toolsByCategory['file'] || []
    },
    {
      title: "Animation",
      icon: <Download className="h-5 w-5" />,
      items: toolsByCategory['animation'] || []
    },
    {
      title: "Emoji",
      icon: <Coffee className="h-5 w-5" />,
      items: toolsByCategory['emoji'] || []
    },
    {
      title: "QR Code",
      icon: <Camera className="h-5 w-5" />,
      items: toolsByCategory['qrcode'] || []
    },
    {
      title: "Converter",
      icon: <Replace className="h-5 w-5" />,
      items: toolsByCategory['converter'] || []
    },
    {
      title: "Utility",
      icon: <Folder className="h-5 w-5" />,
      items: toolsByCategory['utility'] || []
    },
  ];

  // Filter out categories with no items
  const filteredCategories = menuCategories.filter(category => 
    category.items && category.items.length > 0
  );
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button 
          className="p-2 text-foreground bg-accent/10 hover:bg-accent/15 rounded-md flex items-center justify-center"
          aria-label="Menu"
        >
          {icon || <AlignJustify className="h-5 w-5" />}
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
            <h2 className="font-semibold text-xl text-foreground">MyToolbox</h2>
            <SheetClose className="rounded-full p-2 hover:bg-accent/10 transition-colors">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="py-4">
              {filteredCategories.map((category) => (
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
