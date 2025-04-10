
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Privacy = () => {
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
          <h1 className="text-3xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">Privacy Policy</h1>
          
          <div className="space-y-4 text-foreground">
            <p><strong>Last Updated: April 04, 2025</strong></p>
            
            <p>
              At MyToolbox, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect
              your information when you use our website.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Information We Don't Collect</h2>
            <p>
              MyToolbox is designed with privacy in mind. We do not:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Store your images or PDFs on our servers</li>
              <li>Require you to create an account</li>
              <li>Ask for personal information</li>
              <li>Track your individual usage patterns</li>
              <li>Share or sell any user data to third parties</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">How Your Files Are Processed</h2>
            <p>
              When you upload an image to convert:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>The image is processed entirely within your browser</li>
              <li>Your image never leaves your device</li>
              <li>The conversion is performed using client-side JavaScript</li>
              <li>The resulting PDF is generated on your device</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Cookies and Analytics</h2>
            <p>
              We use anonymous analytics to understand how our website is being used. This helps us improve the
              functionality and user experience. These analytics do not identify individual users and only collect
              aggregate information such as page views, browser types, and general geographic regions.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
              new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Contact Us</h2>
            <p>
              If you have any questions about our Privacy Policy, please contact us at:
              <a href="mailto:contactmytoolbox@gmail.com" className="text-primary hover:underline ml-1">contactmytoolbox@gmail.com</a>
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
