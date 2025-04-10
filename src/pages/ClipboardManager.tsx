
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Clipboard, Copy, Trash, Save, Check, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Helmet } from 'react-helmet-async';

interface ClipboardItem {
  id: string;
  content: string;
  title: string;
  timestamp: number;
}

const ClipboardManager = () => {
  const [clipboardItems, setClipboardItems] = useState<ClipboardItem[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [editingItem, setEditingItem] = useState<ClipboardItem | null>(null);
  const { toast } = useToast();

  // Load saved items from localStorage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem('clipboardItems');
    if (savedItems) {
      try {
        setClipboardItems(JSON.parse(savedItems));
      } catch (e) {
        console.error('Error parsing saved clipboard items:', e);
      }
    }
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('clipboardItems', JSON.stringify(clipboardItems));
  }, [clipboardItems]);
  
  // Try to get clipboard content when focused
  const handleGetClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setCurrentText(text);
      setCurrentTitle(generateDefaultTitle(text));
      
      toast({
        title: "Clipboard content loaded",
        description: "Text has been loaded from your clipboard",
      });
    } catch (error) {
      console.error('Failed to read clipboard content:', error);
      toast({
        title: "Could not access clipboard",
        description: "Please check your browser permissions",
        variant: "destructive",
      });
    }
  };
  
  const generateDefaultTitle = (content: string): string => {
    const firstLine = content.split('\n')[0].trim();
    return firstLine.substring(0, 30) + (firstLine.length > 30 ? '...' : '');
  };
  
  const handleSaveItem = () => {
    if (!currentText.trim()) {
      toast({
        title: "Cannot save empty content",
        description: "Please enter some text to save",
        variant: "destructive",
      });
      return;
    }
    
    const title = currentTitle.trim() || generateDefaultTitle(currentText);
    
    if (editingItem) {
      // Update existing item
      setClipboardItems(items => 
        items.map(item => 
          item.id === editingItem.id 
            ? { ...item, content: currentText, title, timestamp: Date.now() }
            : item
        )
      );
      
      toast({
        title: "Item updated",
        description: `"${title}" has been updated`,
      });
    } else {
      // Create new item
      const newItem: ClipboardItem = {
        id: Date.now().toString(),
        content: currentText,
        title,
        timestamp: Date.now()
      };
      
      setClipboardItems(items => [newItem, ...items]);
      
      toast({
        title: "Item saved",
        description: `"${title}" has been added to your clipboard manager`,
      });
    }
    
    // Reset form
    setCurrentText('');
    setCurrentTitle('');
    setEditingItem(null);
  };
  
  const handleCopyItem = (content: string, title: string) => {
    navigator.clipboard.writeText(content)
      .then(() => {
        toast({
          title: "Copied to clipboard",
          description: `"${title}" has been copied`,
        });
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        toast({
          title: "Failed to copy",
          description: "Could not copy to clipboard",
          variant: "destructive",
        });
      });
  };
  
  const handleEditItem = (item: ClipboardItem) => {
    setCurrentText(item.content);
    setCurrentTitle(item.title);
    setEditingItem(item);
  };
  
  const handleDeleteItem = (id: string) => {
    setClipboardItems(items => items.filter(item => item.id !== id));
    
    toast({
      title: "Item deleted",
      description: "The item has been removed",
    });
    
    // If we were editing this item, reset the form
    if (editingItem && editingItem.id === id) {
      setCurrentText('');
      setCurrentTitle('');
      setEditingItem(null);
    }
  };
  
  const handleCancelEdit = () => {
    setCurrentText('');
    setCurrentTitle('');
    setEditingItem(null);
  };
  
  const formatTimestamp = (timestamp: number): string => {
    return new Date(timestamp).toLocaleString();
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Clipboard Manager - MyToolbox</title>
        <meta name="description" content="Store and organize multiple clipboard items for easy access with our free online clipboard manager." />
      </Helmet>

      <Header />
      
      <div className="container max-w-5xl mx-auto px-4 py-8 flex-grow">
        <BackButton />
        
        <h1 className="text-3xl font-bold mb-6">Clipboard Manager</h1>
        <p className="mb-6 text-muted-foreground">
          Store and organize multiple clipboard items for easy access. All data is stored locally in your browser.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Input Section */}
          <Card className="md:col-span-1 shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>{editingItem ? 'Edit Item' : 'New Item'}</CardTitle>
              <CardDescription>
                {editingItem ? 'Update this clipboard item' : 'Add a new clipboard item'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="item-title" className="text-sm font-medium">Title</label>
                <Input 
                  id="item-title"
                  placeholder="Enter a title or leave blank for auto-title"
                  value={currentTitle}
                  onChange={(e) => setCurrentTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="item-content" className="text-sm font-medium">Content</label>
                <Textarea 
                  id="item-content"
                  placeholder="Enter text or paste from clipboard"
                  className="min-h-[150px]"
                  value={currentText}
                  onChange={(e) => setCurrentText(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                onClick={handleGetClipboard}
                className="w-full"
              >
                <Clipboard className="mr-2 h-4 w-4" />
                Paste from Clipboard
              </Button>
            </CardContent>
            <CardFooter className="flex justify-between">
              {editingItem ? (
                <>
                  <Button variant="ghost" onClick={handleCancelEdit}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button onClick={handleSaveItem}>
                    <Save className="mr-2 h-4 w-4" />
                    Update
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => setCurrentText('')}>
                    <Trash className="mr-2 h-4 w-4" />
                    Clear
                  </Button>
                  <Button onClick={handleSaveItem}>
                    <Plus className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
          
          {/* Saved Items Section */}
          <Card className="md:col-span-2 shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Saved Items</CardTitle>
              <CardDescription>
                {clipboardItems.length === 0 
                  ? 'No saved items yet. Add some by pasting into the form.' 
                  : `You have ${clipboardItems.length} saved item${clipboardItems.length !== 1 ? 's' : ''}.`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                {clipboardItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[300px] text-center text-muted-foreground">
                    <Clipboard className="h-12 w-12 mb-4" />
                    <p>Your saved clipboard items will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {clipboardItems.map((item) => (
                      <div key={item.id} className="group">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{item.title}</h3>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleCopyItem(item.content, item.title)}
                            >
                              <Copy className="h-4 w-4" />
                              <span className="sr-only">Copy</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleEditItem(item)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                                <path d="m15 5 4 4"></path>
                              </svg>
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-destructive/80 hover:text-destructive"
                                >
                                  <Trash className="h-4 w-4" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Delete Item</DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to delete "{item.title}"? This action cannot be undone.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => document.body.click()}>Cancel</Button>
                                  <Button variant="destructive" onClick={() => {
                                    handleDeleteItem(item.id);
                                    document.body.click();
                                  }}>Delete</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          Saved {formatTimestamp(item.timestamp)}
                        </p>
                        
                        <div className="bg-card/30 p-3 rounded-md border border-input text-sm max-h-24 overflow-y-auto break-words">
                          {item.content}
                        </div>
                        
                        <Separator className="my-4" />
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
            {clipboardItems.length > 0 && (
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Trash className="mr-2 h-4 w-4" />
                      Clear All Items
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Clear All Items</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete all clipboard items? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => document.body.click()}>Cancel</Button>
                      <Button variant="destructive" onClick={() => {
                        setClipboardItems([]);
                        document.body.click();
                        toast({
                          title: "All items deleted",
                          description: "Your clipboard manager has been cleared",
                        });
                      }}>Delete All</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ClipboardManager;
