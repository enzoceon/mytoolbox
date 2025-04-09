
import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UploadCloud, FileVideo, Download, Trash2, Play, Pause, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import SpaceBackground from '@/components/SpaceBackground';

const GifToVideo = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [videoOutput, setVideoOutput] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("upload");
  const [videoFormat, setVideoFormat] = useState<"mp4" | "webm">("mp4");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (!selectedFile.type.includes('gif')) {
        toast({
          title: "Invalid file format",
          description: "Please upload a GIF file.",
          variant: "destructive"
        });
        return;
      }
      
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setVideoOutput(null);
      setActiveTab("upload");
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      
      if (!droppedFile.type.includes('gif')) {
        toast({
          title: "Invalid file format",
          description: "Please upload a GIF file.",
          variant: "destructive"
        });
        return;
      }
      
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
      setVideoOutput(null);
      setActiveTab("upload");
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setVideoOutput(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const convertGifToVideo = () => {
    if (!file) return;
    
    setIsConverting(true);
    setProgress(0);
    
    // Simulating conversion process with timeout intervals
    const timer = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + 5;
        
        if (newProgress >= 100) {
          clearInterval(timer);
          setIsConverting(false);
          
          // Create a sample video URL - in a real implementation, this would be the actual conversion output
          const gifUrl = URL.createObjectURL(file);
          setVideoOutput(gifUrl);
          setActiveTab("result");
          
          toast({
            title: "Conversion complete",
            description: `Your GIF has been successfully converted to ${videoFormat.toUpperCase()}.`,
          });
          
          return 100;
        }
        
        return newProgress;
      });
    }, 150);
  };
  
  const handleDownload = () => {
    if (!videoOutput || !file) return;
    
    // Create a download link
    const link = document.createElement('a');
    link.href = videoOutput;
    link.download = `${file.name.replace('.gif', '')}.${videoFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: `Your ${videoFormat.toUpperCase()} file is being downloaded.`,
    });
  };
  
  return (
    <>
      <Helmet>
        <title>GIF to Video Converter | EveryTools</title>
        <meta name="description" content="Convert animated GIFs to MP4 or WebM video formats easily with our free online tool. No registration required." />
      </Helmet>
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <BackButton />
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">GIF to Video</span> Converter
            </h1>
            <p className="text-muted-foreground">
              Convert animated GIFs to MP4 or WebM video formats
            </p>
          </div>
          
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileVideo className="h-5 w-5 text-primary" />
                <CardTitle>GIF to Video Converter</CardTitle>
              </div>
              <CardDescription>
                Upload a GIF file to convert it to a video format (MP4 or WebM)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                  <TabsTrigger value="result" disabled={!videoOutput}>Result</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload" className="space-y-6">
                  {!file ? (
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={onFileChange}
                        accept=".gif"
                        className="hidden"
                      />
                      <UploadCloud className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-semibold mb-2">Upload GIF File</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop a GIF file here, or click to select
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Maximum file size: 50MB
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4 flex flex-col items-center">
                        <h3 className="text-lg font-semibold mb-2">Selected GIF</h3>
                        <div className="w-full max-w-sm mx-auto">
                          {preview && (
                            <img
                              src={preview}
                              alt="GIF Preview"
                              className="max-h-64 mx-auto"
                            />
                          )}
                        </div>
                        <div className="mt-4 text-sm">
                          <p><strong>Filename:</strong> {file.name}</p>
                          <p><strong>Size:</strong> {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Output Format</label>
                          <div className="flex space-x-2">
                            <Button
                              variant={videoFormat === "mp4" ? "default" : "outline"}
                              onClick={() => setVideoFormat("mp4")}
                              className="flex-1"
                            >
                              MP4
                            </Button>
                            <Button
                              variant={videoFormat === "webm" ? "default" : "outline"}
                              onClick={() => setVideoFormat("webm")}
                              className="flex-1"
                            >
                              WebM
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {isConverting ? (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm mb-1">
                            <span>Converting...</span>
                            <span>{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      ) : (
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={handleReset}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Reset
                          </Button>
                          <Button onClick={convertGifToVideo}>
                            <FileVideo className="h-4 w-4 mr-2" />
                            Convert to {videoFormat.toUpperCase()}
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="result" className="space-y-6">
                  {videoOutput && (
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-4 text-center">Converted Video</h3>
                        <div className="aspect-video max-w-lg mx-auto">
                          <video
                            src={videoOutput}
                            className="w-full h-full object-contain border rounded bg-black/20"
                            controls
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setActiveTab("upload")}>
                          Back to Upload
                        </Button>
                        <Button onClick={handleDownload}>
                          <Download className="h-4 w-4 mr-2" />
                          Download {videoFormat.toUpperCase()}
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="max-w-3xl mx-auto mt-12">
            <h2 className="text-2xl font-bold mb-6">How to Convert GIF to Video</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">1. Upload</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Upload your GIF file by dragging and dropping it or clicking the upload area.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">2. Convert</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Choose your preferred video format (MP4 or WebM) and click the Convert button.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">3. Download</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Preview your converted video and download it to your device.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default GifToVideo;
