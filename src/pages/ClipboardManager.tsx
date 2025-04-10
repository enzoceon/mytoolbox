
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
import ClipboardManagerSEO from '@/components/SEO/ClipboardManagerSEO';

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
      <ClipboardManagerSEO />
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
                  <Button variant="ghost" onClick={() => { setCurrentText(''); setCurrentTitle(''); }}>
                    <X className="mr-2 h-4 w-4" />
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
          
          {/* Items List */}
          <Card className="md:col-span-2 shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Saved Items</CardTitle>
              <CardDescription>
                Click on an item to copy it to your clipboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              {clipboardItems.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No items saved yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Add items using the form on the left
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-[400px] rounded-md border p-4">
                  <div className="space-y-4">
                    {clipboardItems.map((item) => (
                      <div key={item.id} className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium line-clamp-1">{item.title}</h3>
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditItem(item)}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleCopyItem(item.content, item.title)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <div className="cursor-pointer hover:bg-accent p-2 rounded-md transition-colors">
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {item.content}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {formatTimestamp(item.timestamp)}
                              </p>
                            </div>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{item.title}</DialogTitle>
                              <DialogDescription>
                                Saved on {formatTimestamp(item.timestamp)}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4 bg-muted p-4 rounded-md max-h-[300px] overflow-auto">
                              <pre className="whitespace-pre-wrap break-words text-sm">
                                {item.content}
                              </pre>
                            </div>
                            <DialogFooter>
                              <Button 
                                onClick={() => handleCopyItem(item.content, item.title)}
                              >
                                <Copy className="mr-2 h-4 w-4" />
                                Copy to Clipboard
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Separator />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 p-6 border rounded-lg">
          <h2 className="text-xl font-bold mb-4">About Clipboard Manager</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              The Clipboard Manager helps you store multiple texts, snippets, and other content that you copy frequently. 
              It's perfect for anyone who works with multiple pieces of text and needs quick access to them.
            </p>
            <p>
              <strong>Key features:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Store unlimited clipboard items</li>
              <li>Add titles for easy organization</li>
              <li>Edit saved items anytime</li>
              <li>One-click copying back to clipboard</li>
              <li>All data stored locally in your browser</li>
              <li>No registration or login required</li>
            </ul>
            <p>
              <strong>Note:</strong> All your clipboard items are stored in your browser's local storage. 
              They will persist between sessions but will be lost if you clear your browser data.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ClipboardManager;
