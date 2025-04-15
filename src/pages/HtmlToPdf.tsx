
import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpaceBackground from '@/components/SpaceBackground';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Code, FileCode, Link as LinkIcon, FileText, RefreshCw, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/utils/toast-utils";
import { jsPDF } from "jspdf";

const HtmlToPdf = () => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('code');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<string>('a4');
  const [orientation, setOrientation] = useState<string>('portrait');
  const [margins, setMargins] = useState<number>(10);
  const [includeBackground, setIncludeBackground] = useState<boolean>(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const resetState = () => {
    setHtmlContent('');
    setUrl('');
    setPdfUrl(null);
  };

  const generateFromHtml = async () => {
    if (!htmlContent.trim()) {
      toast.error('Please enter HTML content');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const iframe = iframeRef.current;
      if (!iframe) throw new Error('Iframe not available');
      
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) throw new Error('Cannot access iframe document');
      
      iframeDoc.open();
      iframeDoc.write(htmlContent);
      iframeDoc.close();
      
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 1000);
      });
      
      const pdf = new jsPDF({
        orientation: orientation as "portrait" | "landscape",
        unit: 'mm',
        format: pageSize
      });
      
      const element = iframeDoc.body;
      
      await pdf.html(element, {
        callback: (pdf) => {
          const pdfBlob = pdf.output('blob');
          const url = URL.createObjectURL(pdfBlob);
          setPdfUrl(url);
          setIsGenerating(false);
          toast.success('PDF generated successfully');
        },
        x: margins,
        y: margins,
        html2canvas: {
          backgroundColor: includeBackground ? undefined : '#ffffff',
        }
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Check your HTML code.');
      setIsGenerating(false);
    }
  };

  const generateFromUrl = async () => {
    if (!url.trim() || !url.startsWith('http')) {
      toast.error('Please enter a valid URL starting with http:// or https://');
      return;
    }
    
    toast.info('Due to security limitations, external URL fetching is disabled in this demo. Try using the HTML tab instead.');
  };

  const handlePdfGeneration = () => {
    if (activeTab === 'code') {
      generateFromHtml();
    } else {
      generateFromUrl();
    }
  };

  const handleDownload = () => {
    if (!pdfUrl) return;
    
    const downloadLink = document.createElement('a');
    downloadLink.href = pdfUrl;
    downloadLink.download = 'converted-document.pdf';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    toast.success('PDF downloaded successfully');
  };

  return (
    <>
      <Helmet>
        <title>HTML to PDF Converter | Free Online Tool | EveryTools</title>
        <meta name="description" content="Convert HTML code to PDF documents online. Free, secure, and no registration required. Customize page size, orientation, and more." />
      </Helmet>
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">HTML to PDF</h1>
              <p className="text-muted-foreground">Convert HTML code or webpages to PDF documents</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="glass-card p-6 rounded-xl">
              <div className="mb-4 w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Code className="h-8 w-8 text-emerald-400" />
              </div>
              
              <h2 className="text-xl font-semibold mb-6">HTML Source</h2>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="mb-4">
                  <TabsTrigger value="code">
                    <FileCode className="h-4 w-4 mr-2" />
                    HTML Code
                  </TabsTrigger>
                  <TabsTrigger value="url">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    URL
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="code">
                  <div className="space-y-4">
                    <Textarea
                      placeholder="<html><body><h1>Hello, World!</h1><p>Convert this HTML to PDF.</p></body></html>"
                      className="font-mono min-h-[300px] resize-none"
                      value={htmlContent}
                      onChange={(e) => setHtmlContent(e.target.value)}
                    />
                    
                    {!htmlContent && (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setHtmlContent(`<!DOCTYPE html>
<html>
<head>
  <title>Sample Document</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #2563eb; }
    p { line-height: 1.6; }
    .note { background: #f3f4f6; padding: 15px; border-radius: 5px; }
  </style>
</head>
<body>
  <h1>Sample PDF Document</h1>
  <p>This is a sample HTML document that has been converted to PDF using EveryTools HTML to PDF converter.</p>
  
  <h2>Features:</h2>
  <ul>
    <li>Convert any HTML to PDF</li>
    <li>Maintain styles and formatting</li>
    <li>Free to use</li>
    <li>No registration required</li>
  </ul>
  
  <div class="note">
    <p><strong>Note:</strong> This is just an example. You can input any valid HTML code to convert it to PDF.</p>
  </div>
</body>
</html>`)}
                      >
                        Load Sample HTML
                      </Button>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="url">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="url-input">Website URL</Label>
                      <Input
                        id="url-input"
                        placeholder="https://example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Enter the URL of the website you want to convert to PDF
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-base font-medium">PDF Settings</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="page-size">Page Size</Label>
                    <Select value={pageSize} onValueChange={setPageSize}>
                      <SelectTrigger id="page-size">
                        <SelectValue placeholder="Select page size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a4">A4</SelectItem>
                        <SelectItem value="letter">Letter</SelectItem>
                        <SelectItem value="legal">Legal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="orientation">Orientation</Label>
                    <Select value={orientation} onValueChange={setOrientation}>
                      <SelectTrigger id="orientation">
                        <SelectValue placeholder="Select orientation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="portrait">Portrait</SelectItem>
                        <SelectItem value="landscape">Landscape</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="margins">Margins (mm)</Label>
                    <Input
                      id="margins"
                      type="number"
                      min={0}
                      max={50}
                      value={margins}
                      onChange={(e) => setMargins(Number(e.target.value))}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-7">
                    <Switch
                      id="background"
                      checked={includeBackground}
                      onCheckedChange={setIncludeBackground}
                    />
                    <Label htmlFor="background">Include Background Colors</Label>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700"
                  onClick={handlePdfGeneration}
                  disabled={isGenerating || (activeTab === 'code' && !htmlContent) || (activeTab === 'url' && !url)}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Generate PDF
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <div className="mb-4 w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center">
                <FileText className="h-8 w-8 text-blue-400" />
              </div>
              
              <h2 className="text-xl font-semibold mb-6">PDF Result</h2>
              
              {!pdfUrl ? (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center min-h-[300px] flex items-center justify-center">
                  <div>
                    <div className="mx-auto w-16 h-16 mb-4 text-muted-foreground">
                      <FileText className="h-16 w-16" />
                    </div>
                    <p className="text-lg font-medium mb-2">PDF Preview</p>
                    <p className="text-sm text-muted-foreground">
                      Generate a PDF to see the preview here
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden bg-white min-h-[300px]">
                    <iframe 
                      src={pdfUrl} 
                      className="w-full h-[400px]" 
                      title="PDF Preview"
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={resetState}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Start New
                    </Button>
                    
                    <Button onClick={handleDownload}>
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              )}
              
              <iframe 
                ref={iframeRef} 
                style={{ display: 'none' }} 
                title="HTML Renderer"
              />
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto mt-12 glass-card p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">How to Use HTML to PDF Converter</h2>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
              <li>Enter your HTML code in the editor or paste a website URL.</li>
              <li>Customize PDF settings like page size, orientation, and margins.</li>
              <li>Click "Generate PDF" to convert your HTML to a PDF document.</li>
              <li>Preview the generated PDF in the preview area.</li>
              <li>Download your PDF when you're satisfied with the result.</li>
            </ol>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default HtmlToPdf;
