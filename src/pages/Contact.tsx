
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AdPlacement from '@/components/AdPlacement';
import { toast } from 'sonner';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate sending the message
    setTimeout(() => {
      toast.success("Your message has been sent successfully!");
      setName('');
      setEmail('');
      setMessage('');
      setIsSending(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Contact Us - Image2PDF</title>
        <meta name="description" content="Get in touch with the Image2PDF team. We welcome your questions, feedback, and suggestions about our free image to PDF converter tool." />
        <link rel="canonical" href="https://image2pdf.site/contact" />
      </Helmet>
      
      <BackgroundAnimation />
      <Header />
      
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-10">
        <div className="mb-4">
          <Link to="/">
            <Button variant="ghost" className="flex items-center gap-1 mb-4">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
        
        <section className="glass-card rounded-xl p-8 mb-10 animate-fade-in">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">Contact Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <p className="text-foreground">
                Have a question, suggestion, or just want to say hello? We'd love to hear from you!
                Our team is here to help with any inquiries about our image to PDF conversion tool.
              </p>
              
              <div className="flex items-center space-x-3 text-primary font-medium">
                <Mail className="h-5 w-5" />
                <a href="mailto:everytoolssite@gmail.com" className="hover:underline">
                  everytoolssite@gmail.com
                </a>
              </div>
              
              <div className="mt-8 pt-8 border-t border-border">
                <h2 className="text-xl font-semibold mb-4">Our Response Time</h2>
                <p className="text-foreground">
                  We aim to respond to all inquiries within 24-48 hours during business days.
                  For urgent matters, please indicate this in the subject line of your message.
                </p>
              </div>
              
              <div className="mt-8 pt-8 border-t border-border">
                <h2 className="text-xl font-semibold mb-4">Feedback Welcome</h2>
                <p className="text-foreground">
                  Your feedback helps us improve! Let us know what features you'd like to see,
                  or if you've encountered any issues while using our tool.
                </p>
              </div>
            </div>
            
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
                  <Input 
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name" 
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" 
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Your Message</label>
                  <Textarea 
                    id="message" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What would you like to tell us?" 
                    rows={6} 
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full mt-4 flex items-center justify-center gap-2"
                  disabled={isSending}
                >
                  {isSending ? 'Sending...' : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </section>
        
        {/* Only show ad when there is substantial content */}
        <AdPlacement />
        
        <section className="glass-card rounded-xl p-8 mt-10 animate-fade-in">
          <h2 className="text-2xl font-bold mb-6">Common Questions</h2>
          
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium mb-2">How quickly will I get a response?</h3>
              <p>We typically respond to all inquiries within 1-2 business days. Our team is committed to providing helpful and timely assistance.</p>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium mb-2">I found a bug, how should I report it?</h3>
              <p>Please provide detailed information about the bug, including what you were trying to do, what browser you're using, and any error messages you received. Screenshots are also very helpful.</p>
            </div>
            
            <div className="pb-4">
              <h3 className="text-lg font-medium mb-2">Do you offer custom development services?</h3>
              <p>While our primary focus is on maintaining and improving Image2PDF, we're open to discussing custom development projects related to document conversion. Please contact us with details about your requirements.</p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
