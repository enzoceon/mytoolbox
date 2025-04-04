
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
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
          
          <div className="space-y-6">
            <p className="text-foreground">
              Have a question, suggestion, or just want to say hello? We'd love to hear from you!
              Send us an email directly at:
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
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
