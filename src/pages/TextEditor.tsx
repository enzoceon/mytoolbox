
import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  ListOrdered,
  Link as LinkIcon,
  Type,
  Download,
  Copy,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const TextEditor = () => {
  const [content, setContent] = useState<string>('');
  const [showLinkDialog, setShowLinkDialog] = useState<boolean>(false);
  const [linkUrl, setLinkUrl] = useState<string>('');
  const [linkText, setLinkText] = useState<string>('');
  const [fontSize, setFontSize] = useState<string>('16px');
  const [fontFamily, setFontFamily] = useState<string>('Arial');
  const editorRef = useRef<HTMLDivElement>(null);

  const handleCommand = (command: string, value: string | null = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const addLink = () => {
    if (linkUrl && linkText) {
      document.execCommand('createLink', false, linkUrl);
      setShowLinkDialog(false);
      setLinkUrl('');
      setLinkText('');
    } else {
      toast.error('Please enter both URL and text for the link');
    }
  };

  const handleFontSizeChange = (size: string) => {
    setFontSize(size);
    if (editorRef.current) {
      editorRef.current.style.fontSize = size;
    }
  };

  const handleFontFamilyChange = (font: string) => {
    setFontFamily(font);
    if (editorRef.current) {
      editorRef.current.style.fontFamily = font;
    }
  };

  const handleCopyText = () => {
    if (editorRef.current) {
      const text = editorRef.current.innerText;
      navigator.clipboard.writeText(text)
        .then(() => {
          toast.success('Text copied to clipboard');
        })
        .catch(() => {
          toast.error('Failed to copy text');
        });
    }
  };

  const handleDownload = () => {
    if (editorRef.current) {
      const text = editorRef.current.innerHTML;
      const element = document.createElement('a');
      const file = new Blob([text], {type: 'text/html'});
      element.href = URL.createObjectURL(file);
      element.download = 'document.html';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      toast.success('Document downloaded successfully');
    }
  };

  const clearEditor = () => {
    if (window.confirm('Are you sure you want to clear the editor? This cannot be undone.')) {
      if (editorRef.current) {
        editorRef.current.innerHTML = '';
        setContent('');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Text Editor | EveryTools</title>
        <meta name="description" content="Simple text editor with formatting options. Create, edit and format your text online." />
      </Helmet>
      
      <BackgroundAnimation />
      <Header />
      
      <main className="flex-1 container px-4 mx-auto py-12">
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/tools">Tools</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Text Editor</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <BackButton />
        
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 glow-text">Text Editor</h1>
            <p className="text-muted-foreground">Create and format text documents</p>
          </div>
          
          <div className="bg-card rounded-lg shadow-sm border mb-6">
            <div className="p-2 border-b flex flex-wrap items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleCommand('bold')}
                title="Bold"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleCommand('italic')}
                title="Italic"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleCommand('underline')}
                title="Underline"
              >
                <Underline className="h-4 w-4" />
              </Button>
              
              <div className="h-6 w-px bg-border mx-1"></div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleCommand('justifyLeft')}
                title="Align Left"
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleCommand('justifyCenter')}
                title="Align Center"
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleCommand('justifyRight')}
                title="Align Right"
              >
                <AlignRight className="h-4 w-4" />
              </Button>
              
              <div className="h-6 w-px bg-border mx-1"></div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleCommand('insertUnorderedList')}
                title="Bullet List"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleCommand('insertOrderedList')}
                title="Numbered List"
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
              
              <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    title="Insert Link"
                  >
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Insert Link</DialogTitle>
                    <DialogDescription>
                      Add a hyperlink to your document
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="link-text" className="text-right">
                        Text
                      </Label>
                      <Input
                        id="link-text"
                        value={linkText}
                        onChange={(e) => setLinkText(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="link-url" className="text-right">
                        URL
                      </Label>
                      <Input
                        id="link-url"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        className="col-span-3"
                        placeholder="https://"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={addLink}>Insert Link</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <div className="h-6 w-px bg-border mx-1"></div>
              
              <div className="flex items-center gap-2">
                <Label htmlFor="font-size" className="text-xs">Size:</Label>
                <Select value={fontSize} onValueChange={handleFontSizeChange}>
                  <SelectTrigger className="w-20 h-8">
                    <SelectValue placeholder="16px" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12px">12px</SelectItem>
                    <SelectItem value="14px">14px</SelectItem>
                    <SelectItem value="16px">16px</SelectItem>
                    <SelectItem value="18px">18px</SelectItem>
                    <SelectItem value="20px">20px</SelectItem>
                    <SelectItem value="24px">24px</SelectItem>
                    <SelectItem value="28px">28px</SelectItem>
                    <SelectItem value="32px">32px</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Label htmlFor="font-family" className="text-xs">Font:</Label>
                <Select value={fontFamily} onValueChange={handleFontFamilyChange}>
                  <SelectTrigger className="w-28 h-8">
                    <SelectValue placeholder="Arial" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Arial">Arial</SelectItem>
                    <SelectItem value="Georgia">Georgia</SelectItem>
                    <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                    <SelectItem value="Courier New">Courier New</SelectItem>
                    <SelectItem value="Verdana">Verdana</SelectItem>
                    <SelectItem value="Tahoma">Tahoma</SelectItem>
                    <SelectItem value="Trebuchet MS">Trebuchet MS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="ml-auto flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleCopyText}
                  title="Copy Text"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleDownload}
                  title="Download as HTML"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearEditor}
                  title="Clear Editor"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              </div>
            </div>
            
            <div 
              ref={editorRef}
              contentEditable="true"
              className="min-h-[300px] p-4 focus:outline-none"
              style={{ fontSize, fontFamily }}
              onInput={(e) => setContent((e.target as HTMLDivElement).innerHTML)}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
          
          <div className="mt-8 p-4 border rounded-lg bg-card shadow-sm">
            <div className="flex items-start gap-3">
              <Type className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h3 className="font-medium">About the Text Editor</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  This simple text editor allows you to create and format documents online. 
                  You can use the toolbar to apply different formatting options, insert links, and more. 
                  When you're done, you can copy the text or download it as an HTML file.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TextEditor;
