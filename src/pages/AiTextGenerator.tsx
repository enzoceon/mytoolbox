
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Brain, Copy, Download, Loader2, RotateCcw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import SpaceBackground from '@/components/SpaceBackground';

// For demo purposes - sample text for each content type
const SAMPLE_OUTPUTS = {
  'blog-post': `# The Future of AI Technology\n\nArtificial Intelligence has come a long way in recent years. From simple rule-based systems to complex neural networks, the evolution has been nothing short of remarkable. In this post, we'll explore how AI is changing the landscape of modern technology and what we can expect in the coming years.\n\n## Current Trends in AI\n\nThe most significant developments in AI technology today revolve around machine learning models that can process vast amounts of data to identify patterns and make predictions. These models are becoming increasingly sophisticated, with capabilities that extend beyond simple pattern recognition to complex decision-making processes.\n\nOne area where AI is making substantial strides is natural language processing. Large language models can now generate human-like text, translate between languages, and even understand context and nuance in ways that were previously impossible.\n\n## The Future of AI\n\nAs we look to the future, several exciting possibilities emerge. Quantum computing may unlock new potentials for AI, enabling models to process information in ways that are currently impossible with classical computing architecture.\n\nPersonalized AI assistants will become more integrated into our daily lives, helping us make decisions, manage our schedules, and even take care of routine tasks without our intervention.\n\n## Ethical Considerations\n\nWith these advancements come important ethical questions. How do we ensure AI systems operate with fairness and transparency? How do we protect privacy while still allowing AI to learn from data? These questions will become increasingly important as AI becomes more powerful and prevalent in our society.\n\n## Conclusion\n\nThe future of AI is both exciting and challenging. By embracing the potential while carefully addressing the ethical implications, we can ensure that AI technology develops in ways that benefit humanity and enhance our capabilities rather than diminishing them.`,
  
  'article': `# Understanding Climate Change: A Comprehensive Overview\n\nClimate change represents one of the most pressing challenges facing our planet today. This article aims to provide a clear, science-based explanation of what climate change is, its causes, effects, and potential solutions.\n\n## What is Climate Change?\n\nClimate change refers to long-term shifts in temperatures and weather patterns. These shifts can occur naturally, such as through variations in the solar cycle or large volcanic eruptions. However, since the 1800s, human activities have been the main driver of climate change, primarily due to the burning of fossil fuels like coal, oil, and gas, which produces heat-trapping gases.\n\n## The Science Behind Climate Change\n\nThe Earth's atmosphere contains gases that trap heat from the sun, creating what scientists call the "greenhouse effect." This natural process keeps our planet warm enough to sustain life. However, human activities have dramatically increased the concentration of these greenhouse gases, particularly carbon dioxide (CO2), methane, and nitrous oxide, enhancing the greenhouse effect and leading to global warming.\n\n## Observable Effects\n\nEvidence of climate change is apparent worldwide. Global temperatures have risen by about 1.1°C since the pre-industrial period. Oceans have warmed, snow and ice amounts have diminished, and sea levels have risen. Weather patterns have become more extreme, with more frequent and intense heatwaves, droughts, and heavy rainfall events.\n\n## Potential Solutions\n\nAddressing climate change requires a multi-faceted approach:\n\n1. **Mitigation**: Reducing greenhouse gas emissions through renewable energy, energy efficiency, and sustainable land use.\n\n2. **Adaptation**: Preparing for and adjusting to current and future climate impacts.\n\n3. **Policy Changes**: Implementing carbon pricing, regulations, and incentives for clean technology.\n\n4. **Individual Action**: Making sustainable lifestyle choices like reducing meat consumption, minimizing air travel, and using energy-efficient appliances.\n\n## Conclusion\n\nClimate change presents significant challenges but also opportunities for innovation and cooperation. By understanding the science behind climate change and taking decisive action at global, national, and individual levels, we can work toward a more sustainable future.`,
  
  'email': `Subject: Invitation to Annual Tech Conference 2025\n\nDear [Recipient],\n\nI hope this email finds you well. I'm writing to invite you to our Annual Tech Conference, which will be held on June 15-17, 2025, at the Grand Convention Center in San Francisco.\n\nThis year's theme is "The Future of AI and Human Collaboration," and we're excited to have assembled an impressive lineup of speakers and workshops. As a respected professional in the tech industry, your presence would greatly enhance our event.\n\nHighlights of the conference include:\n\n- Keynote address by Dr. Maria Rodriguez, CTO of Future Technologies\n- Panel discussion on ethical considerations in AI development\n- Hands-on workshops for both beginners and advanced practitioners\n- Networking opportunities with industry leaders\n\nEarly bird registration is now open until March 1, 2025, offering a 20% discount on the standard registration fee. You can register and find more details about the conference at www.techtconfernce2025.com.\n\nIf you have any questions or require additional information, please don't hesitate to contact me.\n\nWe look forward to seeing you at the conference!\n\nBest regards,\n\n[Your Name]\nEvent Coordinator\nAnnual Tech Conference 2025\nPhone: (555) 123-4567\nEmail: coordinator@techconference2025.com`,
  
  'story': `# The Quantum Librarian\n\nIn the quiet corner of Westfield, there stood a library unlike any other. From the outside, it appeared ordinary—red brick, large windows, and a set of heavy oak doors that creaked when opened. But those who frequented the place knew it held secrets beyond imagination.\n\nMarco had been the librarian for fifteen years. With his silver-streaked hair and round spectacles that sat perpetually on the bridge of his nose, he looked the part. What most people didn't know was that Marco wasn't just a keeper of books; he was a keeper of realities.\n\n"Excuse me," a voice interrupted his cataloging. "I'm looking for a book on quantum physics."\n\nMarco looked up to see a young woman with curious eyes and a notebook clutched to her chest. Something about her seemed familiar, though he couldn't place it.\n\n"Quantum physics? Any particular aspect?" he asked, rising from his chair.\n\n"Multiple worlds theory," she replied without hesitation.\n\nA smile crept onto Marco's face. "Follow me."\n\nHe led her through the maze of shelves, past the sections on history, literature, and science, to a door marked "Advanced Studies." Inside was a small room with a single bookshelf containing exactly seven books.\n\n"These aren't just books about the theory," Marco said softly. "They're portals to those worlds."\n\nThe young woman didn't look surprised. Instead, she nodded as if confirming something she already knew.\n\n"I've been searching for this library for a long time," she said. "In my world, I'm the librarian. My name is Mara."\n\nMarco's breath caught. Mara—the female version of his name. Could it be?\n\n"How did you cross over?" he asked.\n\nShe pointed to a worn blue book on his desk. "That one. In my world, it's red. I've been using it to search for other librarians like me, guardians of the quantum library."\n\n"Why?"\n\n"Because something is collapsing the multiverse, erasing worlds one by one. And I believe it started here, in this reality."\n\nMarco's mind raced. He had noticed books disappearing from the special collection, entire genres fading away. He'd attributed it to misplacement or memory lapses.\n\n"The anomalies began six months ago," Mara continued. "Have you noticed anything unusual?"\n\nMarco thought about the new assistant who had joined the library exactly six months ago—always eager to shelve books in the restricted section, always asking questions about the library's oldest texts.\n\n"I think I might know where to start looking," he said.\n\nAs they moved toward the main desk, a book fell from a nearby shelf, its pages flipping open by themselves. The text inside began to fade before their eyes, words disappearing letter by letter.\n\n"It's happening here too," Mara whispered. "We don't have much time."\n\nMarco nodded, determination setting in. "Then let's save the multiverse, one book at a time."\n\nTogether, the quantum librarians stepped into the maze of shelves, guardians of stories across infinite worlds, ready to face whatever threatened the very fabric of reality itself.`,
  
  'social-media': `🚀 Just launched our new AI-powered productivity tool! After months of development and testing, we're excited to share it with the world. \n\n✨ Features include:\n- Smart task prioritization\n- Automated scheduling\n- Integration with your favorite apps\n- Personalized productivity insights\n\n🔍 Early users are reporting a 40% increase in task completion and better work-life balance!\n\n🎉 Special launch pricing: Get 30% off for the first 3 months with code LAUNCH30\n\nTry it free for 14 days: [link]\n\n#ProductivityTool #AITechnology #WorkSmarter #ProductLaunch`,
  
  'product-description': `# Ultra Comfort Smart Pillow\n\n**Transform your sleep experience with cutting-edge comfort technology**\n\nThe Ultra Comfort Smart Pillow is not just a pillow—it's your personal sleep scientist, designed to provide the perfect night's rest through adaptive technology and premium materials.\n\n## Key Features\n\n### Responsive Memory Foam Core\nOur proprietary blend of high-density memory foam responds dynamically to your movements throughout the night, maintaining optimal neck and spine alignment regardless of your sleeping position.\n\n### Temperature Regulation System\nBuilt-in cooling gel technology disperses body heat, while the breathable outer layer ensures you stay cool in summer and warm in winter, maintaining the ideal sleeping temperature all year round.\n\n### Sleep Tracking Technology\nSeamlessly integrated sensors monitor your sleep patterns, breathing rate, and movement, providing detailed insights via our companion app to help you understand and improve your sleep quality.\n\n### Customizable Firmness\nWith the touch of a button on our intuitive app, adjust the pillow's firmness to your preference, choosing from ultra-soft to extra-firm support.\n\n### Anti-Allergen Cover\nThe premium bamboo-derived cover is naturally antimicrobial and hypoallergenic, perfect for sensitive sleepers and those with allergies.\n\n## Technical Specifications\n\n- Dimensions: 25\" x 16\" x 5\"\n- Weight: 3.2 lbs\n- Battery Life: 30 days on a single charge\n- Connectivity: Bluetooth 5.0, Wi-Fi compatible\n- App Compatibility: iOS and Android\n- Warranty: 5-year limited warranty\n\n## What's Included\n\n- Ultra Comfort Smart Pillow\n- Premium bamboo pillowcase\n- USB-C charging cable\n- Quick start guide\n- Access to the Ultra Comfort Sleep App\n\nExperience the future of sleep with the Ultra Comfort Smart Pillow—because every great day starts with a perfect night's sleep.`
};

const AiTextGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentType, setContentType] = useState('blog-post');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [creativity, setCreativity] = useState([50]);
  const [activeTab, setActiveTab] = useState('generate');
  const { toast } = useToast();
  
  const contentTypeOptions = [
    { value: 'blog-post', label: 'Blog Post' },
    { value: 'article', label: 'Article' },
    { value: 'email', label: 'Email' },
    { value: 'story', label: 'Story' },
    { value: 'social-media', label: 'Social Media Post' },
    { value: 'product-description', label: 'Product Description' }
  ];
  
  const toneOptions = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'formal', label: 'Formal' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'humorous', label: 'Humorous' },
    { value: 'persuasive', label: 'Persuasive' }
  ];
  
  const lengthOptions = [
    { value: 'short', label: 'Short (150-300 words)' },
    { value: 'medium', label: 'Medium (300-600 words)' },
    { value: 'long', label: 'Long (600-1000 words)' },
    { value: 'very-long', label: 'Very Long (1000+ words)' }
  ];
  
  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: 'Empty prompt',
        description: 'Please provide a prompt to generate text',
        variant: 'destructive'
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI text generation with a delay
    setTimeout(() => {
      // For demo, use sample text corresponding to the selected content type
      setOutput(SAMPLE_OUTPUTS[contentType as keyof typeof SAMPLE_OUTPUTS]);
      setIsGenerating(false);
      setActiveTab('result');
      
      toast({
        title: 'Text generated successfully',
        description: 'Your AI-generated text is ready',
      });
    }, 2000);
  };
  
  const handleReset = () => {
    setPrompt('');
    setOutput('');
    setContentType('blog-post');
    setTone('professional');
    setLength('medium');
    setCreativity([50]);
    setActiveTab('generate');
  };
  
  const handleCopy = () => {
    if (!output) return;
    
    navigator.clipboard.writeText(output);
    toast({
      title: 'Copied to clipboard',
      description: 'Text has been copied to your clipboard',
    });
  };
  
  const handleDownload = () => {
    if (!output) return;
    
    const element = document.createElement('a');
    const file = new Blob([output], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `generated-${contentType}-${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: 'Download started',
      description: 'Your generated text is being downloaded',
    });
  };
  
  return (
    <>
      <Helmet>
        <title>AI Text Generator | EveryTools</title>
        <meta 
          name="description" 
          content="Generate high-quality text content for blogs, articles, emails, and more with our AI Text Generator tool." 
        />
      </Helmet>
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container px-4 py-8 mx-auto">
          <BackButton />
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-primary bg-clip-text text-transparent">AI Text</span> Generator
            </h1>
            <p className="text-muted-foreground">
              Create high-quality content for any purpose
            </p>
          </div>
          
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <CardTitle>AI Text Generator</CardTitle>
              </div>
              <CardDescription>
                Generate blog posts, articles, emails, stories, and more with AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="generate" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="generate">Generate</TabsTrigger>
                  <TabsTrigger value="result" disabled={!output}>Result</TabsTrigger>
                </TabsList>
                
                <TabsContent value="generate" className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Prompt</label>
                    <Textarea 
                      placeholder="Describe what you want to generate..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground">
                      For best results, be specific about what you want the AI to create
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Content Type</label>
                      <Select value={contentType} onValueChange={setContentType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select content type" />
                        </SelectTrigger>
                        <SelectContent>
                          {contentTypeOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tone</label>
                      <Select value={tone} onValueChange={setTone}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent>
                          {toneOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Length</label>
                      <Select value={length} onValueChange={setLength}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select length" />
                        </SelectTrigger>
                        <SelectContent>
                          {lengthOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">Creativity</label>
                        <span className="text-sm text-muted-foreground">
                          {creativity[0] < 30 ? 'Conservative' : 
                           creativity[0] > 70 ? 'Very creative' : 'Balanced'}
                        </span>
                      </div>
                      <Slider 
                        defaultValue={[50]} 
                        max={100} 
                        step={1}
                        value={creativity}
                        onValueChange={setCreativity}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={handleReset}>
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                    <Button onClick={handleGenerate} disabled={isGenerating || !prompt.trim()}>
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Brain className="mr-2 h-4 w-4" />
                          Generate
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="result" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Generated Text</label>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline" onClick={handleCopy}>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleDownload}>
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-md p-4 min-h-[300px] max-h-[500px] overflow-y-auto bg-muted/20">
                      {output ? (
                        <pre className="whitespace-pre-wrap font-sans">{output}</pre>
                      ) : (
                        <div className="text-center text-muted-foreground py-20">
                          No content generated yet
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setActiveTab('generate')}>
                      Edit Prompt
                    </Button>
                    <Button onClick={handleGenerate} disabled={isGenerating}>
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Regenerating...
                        </>
                      ) : (
                        <>
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Regenerate
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="max-w-4xl mx-auto mt-12">
            <h2 className="text-2xl font-bold mb-6">Tips for Effective Text Generation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Be Specific</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The more detailed your prompt, the better the results. Include key points you want covered.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Specify Your Audience</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Mention who the content is for to get appropriate tone and terminology.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Iterate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Use the generated text as a starting point, then refine your prompt for better results.
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

export default AiTextGenerator;
