
import React from 'react';
import { Link } from 'react-router-dom';
import { SheetClose } from "@/components/ui/sheet";

interface MenuItem {
  name: string;
  path: string;
}

interface MenuCategoryProps {
  title: string;
  icon: React.ReactNode;
  items: MenuItem[];
}

const MenuCategory = ({ title, icon, items }: MenuCategoryProps) => {
  return (
    <div className="px-6 py-3 border-b border-white/5 last:border-0">
      <div className="flex items-center py-2 text-base font-medium">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-500/30 to-purple-500/30 mr-3">
          {icon}
        </div>
        <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent dark:from-white dark:to-white/80">{title}</span>
      </div>
      <div className="mt-2 pl-11">
        {items.map((item) => (
          <SheetClose asChild key={item.name}>
            <Link 
              to={item.path}
              className="flex py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          </SheetClose>
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;
