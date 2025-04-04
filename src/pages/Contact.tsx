
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you'd send the form data to a server
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundAnimation />
      <Header />
      
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-10">
        <section className="glass-card rounded-xl p-8 mb-10 animate-fade-in">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">Contact Us</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-foreground">
                Have a question, suggestion, or just want to say hello? We'd love to hear from you!
                Fill out the form or email us directly at:
              </p>
              
              <div className="flex items-center space-x-2 text-primary font-medium">
                <Mail className="h-5 w-5" />
                <a href="mailto:image2pdfsite@gmail.com" className="hover:underline">
                  image2pdfsite@gmail.com
                </a>
              </div>
              
              <div className="mt-8 pt-8 border-t border-border">
                <h2 className="text-xl font-semibold mb-4">Our Response Time</h2>
                <p className="text-foreground">
                  We aim to respond to all inquiries within 24-48 hours during business days.
                  For urgent matters, please indicate this in the subject line of your message.
                </p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Your Name
                </label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  required 
                  className="w-full" 
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  required 
                  className="w-full" 
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <Input 
                  id="subject" 
                  placeholder="Question about Image2PDF" 
                  required 
                  className="w-full" 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Your message here..." 
                  required 
                  className="w-full min-h-[120px]" 
                />
              </div>
              
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
