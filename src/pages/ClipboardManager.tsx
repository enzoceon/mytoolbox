
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import BackButton from '@/components/BackButton';
import HowToUse from '@/components/HowToUse';
import ClipboardManagerSEO from '@/components/SEO/ClipboardManagerSEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Clipboard, 
  Copy, 
  Trash2, 
  Plus, 
  Check, 
  Edit,
  ChevronUp,
  ChevronDown,
  Search
} from 'lucide-react';
import { toast } from "sonner";
import BackgroundAnimation from '@/components/BackgroundAnimation';

interface ClipboardItem {
  id: string;
  title: string;
  content: string;
  timestamp: number;
}

const ClipboardManager: React.FC = () => {
  const [items, setItems] = useState<ClipboardItem[]>([]);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemContent, setNewItemContent] = useState('');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'alphabetical'>('newest');

  useEffect(() => {
    // Load saved clipboard items from localStorage
    const savedItems = localStorage.getItem('clipboardItems');
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (error) {
        console.error("Error loading clipboard items:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Save items to localStorage whenever they change
    localStorage.setItem('clipboardItems', JSON.stringify(items));
  }, [items]);

  const handleAddItem = () => {
    if (!newItemContent.trim()) {
      toast.error("Content cannot be empty");
      return;
    }

    const newItem: ClipboardItem = {
      id: Date.now().toString(),
      title: newItemTitle.trim() || `Clip ${items.length + 1}`,
      content: newItemContent.trim(),
      timestamp: Date.now()
    };

    setItems([newItem, ...items]);
    setNewItemTitle('');
    setNewItemContent('');
    toast.success("Item added to clipboard manager");
  };

  const handleCopyItem = (content: string) => {
    navigator.clipboard.writeText(content)
      .then(() => toast.success("Copied to clipboard"))
      .catch(() => toast.error("Failed to copy"));
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast.success("Item deleted");
  };

  const handleEditStart = (item: ClipboardItem) => {
    setEditingItem(item.id);
    setEditTitle(item.title);
    setEditContent(item.content);
  };

  const handleEditSave = (id: string) => {
    if (!editContent.trim()) {
      toast.error("Content cannot be empty");
      return;
    }

    setItems(items.map(item => 
      item.id === id 
        ? { ...item, title: editTitle.trim() || item.title, content: editContent.trim() }
        : item
    ));
    
    setEditingItem(null);
    toast.success("Item updated");
  };

  const handleEditCancel = () => {
    setEditingItem(null);
  };

  const changeSortOrder = (order: 'newest' | 'oldest' | 'alphabetical') => {
    setSortOrder(order);
  };

  // Filter and sort items based on search term and sort order
  const filteredAndSortedItems = items
    .filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return b.timestamp - a.timestamp;
      } else if (sortOrder === 'oldest') {
        return a.timestamp - b.timestamp;
      } else {
        return a.title.localeCompare(b.title);
      }
    });

  return (
    <>
      <ClipboardManagerSEO />
      <BackgroundAnimation />
      <Header />
      <PageContainer>
        <BackButton />
        <PageHeader 
          title="Clipboard Manager" 
          description="Save and organize multiple clipboard items for easy access"
          accentWord="Clipboard"
        />
        
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="bg-card rounded-lg border border-border p-4">
              <h3 className="text-lg font-medium mb-4">Add New Item</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="item-title" className="text-sm font-medium block mb-2">
                    Title (Optional)
                  </label>
                  <Input
                    id="item-title"
                    placeholder="Enter a title for your clipboard item"
                    value={newItemTitle}
                    onChange={(e) => setNewItemTitle(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="item-content" className="text-sm font-medium block mb-2">
                    Content
                  </label>
                  <Textarea
                    id="item-content"
                    placeholder="Paste or type content to save"
                    rows={4}
                    value={newItemContent}
                    onChange={(e) => setNewItemContent(e.target.value)}
                    className="resize-y"
                  />
                </div>
                
                <Button onClick={handleAddItem} className="w-full">
                  <Plus size={16} className="mr-2" />
                  Add to Clipboard
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-medium">Saved Clipboard Items</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 h-9 w-[200px]"
                  />
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant={sortOrder === 'newest' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => changeSortOrder('newest')}
                  >
                    <ChevronUp className="h-4 w-4 mr-1" />
                    New
                  </Button>
                  <Button
                    variant={sortOrder === 'oldest' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => changeSortOrder('oldest')}
                  >
                    <ChevronDown className="h-4 w-4 mr-1" />
                    Old
                  </Button>
                  <Button
                    variant={sortOrder === 'alphabetical' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => changeSortOrder('alphabetical')}
                  >
                    A-Z
                  </Button>
                </div>
              </div>
            </div>
            
            {filteredAndSortedItems.length === 0 ? (
              <div className="text-center py-10 bg-card/50 rounded-lg border border-border">
                <Clipboard className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-2" />
                <p className="text-muted-foreground">
                  {searchTerm ? "No matching clipboard items found" : "No clipboard items saved yet"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAndSortedItems.map(item => (
                  <div key={item.id} className="bg-card rounded-lg border border-border overflow-hidden">
                    {editingItem === item.id ? (
                      <div className="p-4">
                        <Input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="mb-2"
                          placeholder="Enter title"
                        />
                        <Textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          rows={4}
                          className="mb-3 resize-y"
                        />
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" onClick={handleEditCancel}>
                            Cancel
                          </Button>
                          <Button size="sm" onClick={() => handleEditSave(item.id)}>
                            <Check size={16} className="mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="p-4 bg-muted/30">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium truncate">{item.title}</h4>
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleEditStart(item)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit size={16} />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleCopyItem(item.content)}
                                className="h-8 w-8 p-0"
                              >
                                <Copy size={16} />
                                <span className="sr-only">Copy</span>
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleDeleteItem(item.id)}
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                              >
                                <Trash2 size={16} />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(item.timestamp).toLocaleString()}
                          </div>
                        </div>
                        <div className="p-4 bg-card">
                          <pre className="text-sm whitespace-pre-wrap break-all">
                            {item.content}
                          </pre>
                        </div>
                        <div className="p-2 bg-muted/30 flex justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCopyItem(item.content)}
                            className="text-xs"
                          >
                            <Copy size={14} className="mr-1" />
                            Copy to Clipboard
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 p-4 rounded-lg border border-border bg-card/50 text-center">
            <h3 className="font-medium mb-2">Your Data is Local and Private</h3>
            <p className="text-sm text-muted-foreground">
              All clipboard items are stored locally in your browser. They are never sent to any server,
              ensuring complete privacy. Be aware that clearing your browser data will remove saved items.
            </p>
          </div>
        </div>
        
        <HowToUse />
      </PageContainer>
      <Footer />
    </>
  );
};

export default ClipboardManager;
