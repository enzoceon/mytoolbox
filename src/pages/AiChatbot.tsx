
import React, { useState, useRef, useEffect } from 'react';
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
  SelectValue,
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Bot, Send, Trash2, DownloadCloud, Sparkles, MessageSquare, Settings } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import SpaceBackground from '@/components/SpaceBackground';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Sample responses for the mock AI chat
const SAMPLE_RESPONSES = [
  "That's an interesting question. Based on the available information, I would say there are several factors to consider.",
  "I understand what you're asking. The answer depends on a few different variables and context.",
  "Great question! There are multiple perspectives on this topic that I can share with you.",
  "I'd be happy to help with that. Here's what I know about your question.",
  "Thanks for asking. Let me provide some information that might be useful for you.",
  "I can certainly assist with that. Let me walk you through some relevant information.",
  "That's a complex topic. I'll try to break it down into simpler concepts for better understanding.",
  "I appreciate your curiosity. Here's an explanation that should address your question.",
  "Let me think about this... There are several ways to approach your question.",
  "I'll do my best to provide a helpful response. Here's what I can tell you about that topic."
];

const AiChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatModel, setChatModel] = useState('default');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1024);
  const [memoryEnabled, setMemoryEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Auto-scroll to bottom of chat when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Focus back on input
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    
    // Simulate AI thinking and responding
    setTimeout(() => {
      const randomResponse = SAMPLE_RESPONSES[Math.floor(Math.random() * SAMPLE_RESPONSES.length)];
      
      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hello! I'm your AI assistant. How can I help you today?",
        timestamp: new Date()
      }
    ]);
    
    toast({
      title: 'Chat cleared',
      description: 'All previous messages have been removed',
    });
  };
  
  const handleExportChat = () => {
    const chatText = messages
      .map(msg => `${msg.role === 'user' ? 'You' : 'AI'}: ${msg.content}`)
      .join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-chat-${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Chat exported',
      description: 'Your conversation has been downloaded as a text file',
    });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <>
      <Helmet>
        <title>AI Chatbot | EveryTools</title>
        <meta 
          name="description" 
          content="Chat with our AI assistant to get answers, creative ideas, code help, and more." 
        />
      </Helmet>
      
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 container px-4 py-8 mx-auto">
          <BackButton />
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-primary bg-clip-text text-transparent">AI</span> Chatbot
            </h1>
            <p className="text-muted-foreground">
              Chat with our AI assistant for information, creative ideas, and more
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Chat Interface */}
            <div className="lg:col-span-3">
              <Card className="h-[calc(100vh-250px)] min-h-[500px] flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bot className="h-5 w-5 text-primary mr-2" />
                      <CardTitle>AI Assistant</CardTitle>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleClearChat}
                        title="Clear chat"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleExportChat}
                        title="Export chat"
                      >
                        <DownloadCloud className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow overflow-y-auto p-4">
                  <div className="space-y-4">
                    {messages.map(message => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`px-4 py-2 rounded-lg max-w-[80%] ${
                            message.role === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted border'
                          }`}
                        >
                          <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                          <div className={`text-xs mt-1 ${
                            message.role === 'user' 
                              ? 'text-primary-foreground/70' 
                              : 'text-muted-foreground'
                          }`}>
                            {formatDate(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="px-4 py-2 rounded-lg bg-muted border">
                          <div className="text-sm flex items-center gap-1">
                            <span className="animate-bounce">•</span>
                            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>•</span>
                            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>•</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4">
                  <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                    <Input
                      ref={inputRef}
                      type="text"
                      placeholder="Type your message..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      className="flex-grow"
                      autoComplete="off"
                    />
                    <Button type="submit" disabled={!inputMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </div>
            
            {/* Settings Panel */}
            <div className="lg:col-span-1">
              <Card className="h-[calc(100vh-250px)] min-h-[500px]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                    <CardTitle>Settings</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">AI Model</label>
                    <Select value={chatModel} onValueChange={setChatModel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                        <SelectItem value="analytical">Analytical</SelectItem>
                        <SelectItem value="balanced">Balanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Different models specialize in different types of responses
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">Temperature</label>
                        <span className="text-xs text-muted-foreground">{temperature}</span>
                      </div>
                      <input 
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={temperature}
                        onChange={(e) => setTemperature(parseFloat(e.target.value))}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        Lower values make responses more focused and deterministic
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm font-medium">Max Length</label>
                        <span className="text-xs text-muted-foreground">{maxTokens}</span>
                      </div>
                      <input 
                        type="range"
                        min="256"
                        max="4096"
                        step="256"
                        value={maxTokens}
                        onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        Maximum length of the AI response
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between py-1">
                      <label className="text-sm font-medium">Chat Memory</label>
                      <Switch 
                        checked={memoryEnabled} 
                        onCheckedChange={setMemoryEnabled} 
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Remember previous messages in this conversation
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="max-w-6xl mx-auto mt-12">
            <h2 className="text-2xl font-bold mb-6">What You Can Ask</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Get Creative Ideas</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ask for creative writing prompts, story ideas, or brainstorm concepts for your projects.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Answer Questions</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get informative answers about history, science, technology, and many other topics.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Digital Assistant</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Help with planning, organizing information, or creating structured content.
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

export default AiChatbot;
