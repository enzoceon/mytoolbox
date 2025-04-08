
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Card,
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Download, Share2, Copy, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import SpaceBackground from '@/components/SpaceBackground';

// Mock AI-generated image URLs for demonstration
const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1645529324278-155c29c8ea37',
  'https://images.unsplash.com/photo-1656077217715-bdaeb06bd01f',
  'https://images.unsplash.com/photo-1623610290463-40a7c7594046',
  'https://images.unsplash.com/photo-1675726760605-40e9b1823705',
];

const AiImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [size, setSize] = useState('1024x1024');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: 'Prompt required',
        description: 'Please enter a description of what you want to generate',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI image generation with a delay
    setTimeout(() => {
      // For demo, use sample images
      const images = SAMPLE_IMAGES.map(url => `${url}?random=${Math.random()}`);
      setGeneratedImages(images);
      setSelectedImage(images[0]);
      setIsGenerating(false);
      
      toast({
        title: 'Images generated!',
        description: 'Your AI-generated images are ready to view',
      });
    }, 3000);
  };

  const handleDownload = () => {
    if (!selectedImage) return;
    
    // Create an anchor element and trigger download
    const link = document.createElement('a');
    link.href = selectedImage;
    link.download = `ai-image-${new Date().getTime()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: 'Image downloaded',
      description: 'Your image has been downloaded successfully',
    });
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    toast({
      title: 'Prompt copied',
      description: 'The prompt has been copied to your clipboard',
    });
  };

  const handleShare = () => {
    if (!selectedImage) return;
    
    // Use Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: 'AI Generated Image',
        text: prompt,
        url: selectedImage,
      }).catch(() => {
        toast({
          title: 'Sharing failed',
          description: 'Could not share the image',
          variant: 'destructive',
        });
      });
    } else {
      // Fallback
      toast({
        title: 'Sharing not supported',
        description: 'Your browser does not support sharing',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>AI Image Generator | EveryTools</title>
        <meta 
          name="description" 
          content="Generate stunning images from text descriptions with our AI Image Generator tool. Create artwork, designs, and illustrations in seconds."
        />
      </Helmet>
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container px-4 py-8 mx-auto">
          <BackButton />
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-primary bg-clip-text text-transparent">AI Image</span> Generator
            </h1>
            <p className="text-muted-foreground">
              Generate stunning images from text descriptions
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Panel */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Create Image</CardTitle>
                  <CardDescription>
                    Describe what you want to see in your image
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Prompt</label>
                    <Textarea 
                      placeholder="A futuristic cityscape with flying cars and neon lights..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground">
                      Be descriptive for better results
                    </p>
                  </div>
                  
                  <Tabs defaultValue="basic">
                    <TabsList className="grid grid-cols-2">
                      <TabsTrigger value="basic">Basic</TabsTrigger>
                      <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="basic" className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Style</label>
                        <Select value={style} onValueChange={setStyle}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="realistic">Realistic</SelectItem>
                            <SelectItem value="cartoon">Cartoon</SelectItem>
                            <SelectItem value="anime">Anime</SelectItem>
                            <SelectItem value="digital-art">Digital Art</SelectItem>
                            <SelectItem value="oil-painting">Oil Painting</SelectItem>
                            <SelectItem value="watercolor">Watercolor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Size</label>
                        <Select value={size} onValueChange={setSize}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1024x1024">Square (1024x1024)</SelectItem>
                            <SelectItem value="1024x1792">Portrait (1024x1792)</SelectItem>
                            <SelectItem value="1792x1024">Landscape (1792x1024)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="advanced" className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Negative Prompt</label>
                        <Textarea 
                          placeholder="What to avoid in the generated image..."
                          value={negativePrompt}
                          onChange={(e) => setNegativePrompt(e.target.value)}
                          rows={3}
                          className="resize-none"
                        />
                        <p className="text-xs text-muted-foreground">
                          Specify elements you don't want in the image
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Images
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Results Panel */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Generated Images</CardTitle>
                  <CardDescription>
                    Select an image to download or share
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {generatedImages.length > 0 ? (
                    <div className="space-y-6">
                      {/* Main selected image */}
                      <div className="aspect-square overflow-hidden rounded-lg border">
                        <img 
                          src={selectedImage || generatedImages[0]} 
                          alt="AI generated" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Thumbnail grid */}
                      <div className="grid grid-cols-4 gap-2">
                        {generatedImages.map((img, idx) => (
                          <button 
                            key={idx}
                            className={`aspect-square rounded-md overflow-hidden border-2 ${selectedImage === img ? 'border-primary' : 'border-transparent'}`}
                            onClick={() => setSelectedImage(img)}
                          >
                            <img 
                              src={img} 
                              alt={`Variation ${idx + 1}`} 
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex flex-wrap gap-2">
                        <Button variant="default" onClick={handleDownload}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button variant="outline" onClick={handleShare}>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </Button>
                        <Button variant="outline" onClick={handleCopyPrompt}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Prompt
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[400px] text-center">
                      {isGenerating ? (
                        <div className="space-y-4">
                          <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto" />
                          <div>
                            <h3 className="text-lg font-medium">Creating your images</h3>
                            <p className="text-muted-foreground">
                              This may take a few moments...
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Sparkles className="h-16 w-16 text-muted-foreground mx-auto" />
                          <div>
                            <h3 className="text-lg font-medium">No images generated yet</h3>
                            <p className="text-muted-foreground">
                              Enter a prompt and click 'Generate Images' to begin
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-12 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Tips for Better Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Be Specific</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Include details about scene, lighting, style, and perspective for better results.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Use References</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Mention specific artists, art styles, or time periods to influence the output.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Try Different Styles</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Experiment with different styles to see which works best for your concept.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Use Negative Prompts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Specify what to avoid in the image for better control over the output.
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

export default AiImageGenerator;
